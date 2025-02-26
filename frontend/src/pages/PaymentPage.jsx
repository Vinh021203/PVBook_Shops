import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import qrCodeImage from "../api/QR_code.jpg";
import axios from "../api/axios";

const PaymentPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "",
  });
  const [deliveryTime, setDeliveryTime] = useState(""); // Thời gian giao hàng
  const [showQrImage, setShowQrImage] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Bạn chưa đăng nhập!");
        return;
      }

      try {
        const response = await axios.get(`/cart/${userId}`);
        setCartItems(response.data.items);
        const total = response.data.items.reduce(
          (sum, item) => sum + item.productId.price * item.quantity,
          0
        );
        setTotalPrice(total);
      } catch (error) {
        console.error("Lỗi khi tải giỏ hàng:", error);
        alert("Không thể tải giỏ hàng. Vui lòng thử lại sau.");
      }
    };

    fetchCartItems();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập địa chỉ email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ giao hàng";
    }
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Vui lòng chọn phương thức thanh toán";
    }
    if (!deliveryTime) {
      newErrors.deliveryTime = "Vui lòng chọn thời gian giao hàng";
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "paymentMethod" && value === "qr") {
      setShowQrImage(true);
    } else if (name === "paymentMethod") {
      setShowQrImage(false);
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          alert("Bạn chưa đăng nhập!");
          return;
        }
  
        // Giảm số lượng tồn kho
        const stockUpdatePromises = cartItems.map((item) => {
          return axios.put(`/products/${item.productId._id}/stock`, {
            stockChange: -item.quantity, // Giảm số lượng trong kho
          });
        });
  
        await Promise.all(stockUpdatePromises);
  
        // Tạo đơn hàng với trạng thái Pending
        const paymentStatus = formData.paymentMethod === "qr" ? "Completed" : "Pending"; // QR sẽ hoàn thành ngay
        const response = await axios.post("/orders", {
          userId,
          paymentStatus,
          deliveryTime,
          items: cartItems.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
          })),
          totalAmount: totalPrice,
        });
  
        if (response.status === 201) {
          setSuccessMessage(
            `Bạn đã mua hàng thành công! Đơn hàng sẽ được giao vào ${deliveryTime}.`
          );
          setCartItems([]);
          setTotalPrice(0);
  
          setTimeout(() => {
            setSuccessMessage("");
            navigate("/orderstatus");
          }, 3000);
        }
      } catch (error) {
        console.error("Lỗi khi thanh toán:", error.response?.data || error.message);
        alert("Không thể thanh toán. Vui lòng thử lại.");
      }
    } else {
      setErrors(newErrors);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">Trang Thanh Toán</h2>

        {successMessage && (
          <div className="mb-6 p-4 text-green-800 bg-green-200 border border-green-300 rounded-md">
            {successMessage}
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-lg font-semibold">Danh Sách Sản Phẩm</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id} className="flex justify-between py-2">
                <span>{item.productId.name}</span>
                <span>
                  {item.quantity} x {item.productId.price.toLocaleString()}đ
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold mt-4">
            <span>Tổng cộng:</span>
            <span>{totalPrice.toLocaleString()}đ</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Họ và Tên</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              placeholder="Nguyễn Văn A"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Địa chỉ Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              placeholder="example@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Số Điện Thoại</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              placeholder="0123456789"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Địa chỉ Giao Hàng</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              placeholder="Số nhà, Đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold">Phương Thức Thanh Toán</h3>
            <div className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={handleInputChange}
                className="h-4 w-4"
              />
              <label className="ml-2 text-sm font-medium text-gray-700">Thanh toán khi nhận hàng</label>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                name="paymentMethod"
                value="qr"
                checked={formData.paymentMethod === "qr"}
                onChange={handleInputChange}
                className="h-4 w-4"
              />
              <label className="ml-2 text-sm font-medium text-gray-700">Thanh toán qua mã QR</label>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Thời Gian Giao Hàng</h3>
            <select
              name="deliveryTime"
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
              className="mt-2 w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Chọn thời gian giao hàng</option>
              <option value="Giao trong ngày">Giao trong ngày</option>
              <option value="Giao nhanh 2 giờ">Giao nhanh 2 giờ</option>
              <option value="Giao chuẩn">Giao chuẩn</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-3">
            {formData.paymentMethod === "qr" ? "Quét Mã QR" : "Thanh Toán"}
          </button>
        </form>

        {showQrImage && (
          <div className="mt-6 flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2 text-blue-600">Quét Mã QR Để Thanh Toán</h3>
            <div className="p-4 bg-white border-2 border-blue-400 rounded-md shadow-lg">
              <img src={qrCodeImage} alt="Mã QR Thanh Toán" className="w-48 h-48 object-contain" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
