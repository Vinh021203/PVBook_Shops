import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import axios from "../api/axios";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("userId");

  // Fetch cart items on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!isLoggedIn) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/cart/${isLoggedIn}`);
        setCartItems(response.data.items);
      } catch (error) {
        setError("Không thể tải dữ liệu giỏ hàng. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [isLoggedIn]);

  // Remove an item from the cart
  const removeItem = async (itemId) => {
    if (!isLoggedIn) {
      alert("Vui lòng đăng nhập để thực hiện hành động này.");
      return;
    }

    try {
      await axios.delete(`/cart/${isLoggedIn}/${itemId}`);
      setCartItems(cartItems.filter((item) => item._id !== itemId));
    } catch (error) {
      alert("Không thể xóa sản phẩm khỏi giỏ hàng. Vui lòng thử lại sau.");
    }
  };

  // Update item quantity in the cart
  const updateQuantity = async (itemId, change) => {
    if (!isLoggedIn) {
      alert("Vui lòng đăng nhập để thực hiện hành động này.");
      return;
    }

    try {
      const item = cartItems.find((item) => item._id === itemId);
      const updatedQuantity = item.quantity + change;

      if (updatedQuantity <= 0) return;

      await axios.post("/cart/update", {
        userId: isLoggedIn,
        productId: item.productId._id,
        quantity: updatedQuantity,
      });

      const response = await axios.get(`/cart/${isLoggedIn}`);
      setCartItems(response.data.items);
    } catch (error) {
      alert("Không thể cập nhật số lượng sản phẩm. Vui lòng thử lại sau.");
    }
  };

  // Calculate total price of items in the cart
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0);
  };

  // Navigate to payment page
  const handlePayment = () => {
    navigate("/payment");
    setTimeout(() => {
      window.scrollTo(0, 0); // Cuộn lên đầu sau khi điều hướng
    }, 0);
  };

  // Render loading state
  if (loading) return <div>Đang tải giỏ hàng...</div>;

  // Render UI for logged-out users
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
        <FaShoppingCart className="text-6xl text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Bạn chưa đăng nhập</h2>
        <p className="text-gray-500">Hãy đăng nhập để thêm sản phẩm vào giỏ hàng!</p>
        <button
          onClick={() => navigate("/authform")}
          className="mt-6 bg-indigo-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-600 transition-all"
        >
          Đăng nhập
        </button>
      </div>
    );
  }

  // Render UI for logged-in users with an empty cart
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
        <FaShoppingCart className="text-6xl text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Giỏ hàng của bạn đang trống</h2>
        <p className="text-gray-500">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm!</p>
      </div>
    );
  }

  // Render the cart UI
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Giỏ Hàng</h1>
          <div className="flex items-center space-x-2">
            <FaShoppingCart className="text-gray-600" />
            <span className="text-gray-600">{cartItems.length} sản phẩm</span>
          </div>
        </div>

        {/* Cart items */}
        <div className="space-y-4">
          {cartItems.map((item) => {
            const imageUrl = item.productId.image.startsWith("http")
              ? item.productId.image
              : `http://localhost:5000${item.productId.image}`;

            return (
              <div
                key={item._id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
              >
                <div className="flex items-center space-x-4">
                  {/* Product image */}
                  <img
                    src={imageUrl}
                    alt={item.productId.name}
                    className="w-24 h-32 object-cover rounded"
                  />
                  {/* Product details */}
                  <div>
                    <h3 className="text-lg font-semibold">{item.productId.name}</h3>
                    <p className="text-gray-600">{item.productId.author}</p>
                    <p className="text-indigo-600 font-semibold">
                      {item.productId.price.toLocaleString()}đ
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Quantity controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item._id, -1)}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      <FaMinus />
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, 1)}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <p className="font-semibold">
                    {(item.productId.price * item.quantity).toLocaleString()}đ
                  </p>
                  {/* Remove item button */}
                  <button
                    onClick={() => removeItem(item._id)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total price and payment button */}
        {cartItems.length > 0 && (
          <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900">Tổng cộng:</span>
              <span className="text-xl font-bold text-green-700">
                {getTotalPrice().toLocaleString()}đ
              </span>
            </div>
            <button
              onClick={handlePayment}
              className="mt-4 w-full bg-green-500 text-white py-3 rounded-lg shadow-md hover:bg-green-700 transition-all font-semibold"
            >
              Thanh toán
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
