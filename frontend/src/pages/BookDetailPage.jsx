import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaChevronLeft, FaChevronRight, FaArrowLeft } from "react-icons/fa";
import axios from "../api/axios";

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [notification, setNotification] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleBuyNow = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/authform", { state: { from: `/payment` } });
    } else {
      const selectedProduct = {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
      };
      localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
      navigate(`/payment`);
    }
  };

  const handleAddToCart = async () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userId = localStorage.getItem("userId");
  
    if (!isLoggedIn || !userId) {
      setNotification({
        message: "Bạn chưa đăng nhập. Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.",
        type: "error",
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
  
    const productId = product?._id;
  
    if (!productId) {
      setNotification({
        message: "Thông tin sản phẩm không hợp lệ. Vui lòng kiểm tra lại.",
        type: "error",
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
  
    // Kiểm tra số lượng tồn kho
    if (product.stock <= 0) {
      setNotification({
        message: "Sản phẩm đã hết hàng. Vui lòng chọn sản phẩm khác.",
        type: "error",
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
  
    try {
      const cartItem = {
        userId,
        productId,
        quantity: 1, // Mặc định thêm 1 sản phẩm
      };
  
      const response = await axios.post(`/cart`, cartItem);
      setNotification({
        message: response.data.message || "Sản phẩm đã được thêm vào giỏ hàng!",
        type: "success",
      });
    } catch (error) {
      setNotification({
        message: "Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại sau.",
        type: "error",
      });
    } finally {
      setTimeout(() => setNotification(null), 3000);
    }
  };
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/${id}`);
        setProduct(response.data);
        fetchRelatedProducts(response.data.category?._id);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        console.error(err.response?.data?.message || "Error fetching product");
      }
    };

    const fetchRelatedProducts = async (categoryId) => {
      try {
        if (categoryId) {
          const response = await axios.get(`/products?category=${categoryId}&limit=10`);
          setRelatedProducts(response.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm liên quan:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const imageUrl = (path) =>
    path.startsWith("http") ? path : `http://localhost:5000${path}`;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % relatedProducts.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + relatedProducts.length) % relatedProducts.length
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-8 lg:p-14 bg-gray-50 rounded-xl shadow-xl relative">
      {/* Thông báo */}
      {notification && (
        <div
          className={`fixed top-16 right-4 z-50 p-4 rounded-md shadow-lg text-white ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Nút Trở lại */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-blue-500 hover:underline space-x-2"
      >
        <FaArrowLeft />
        <span>Trở lại</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="rounded-xl overflow-hidden shadow-md">
          <img
            src={imageUrl(product?.image || "https://via.placeholder.com/150")}
            alt={product?.name}
            className="w-full h-[600px] object-cover object-top rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105"
          />
        </div>

        <div className="space-y-8">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight hover:underline transition-all">
            {product?.name}
          </h1>

          <div className="grid grid-cols-2 gap-y-4">
            <div>
              <p className="text-lg text-gray-600 font-semibold">Tác giả:</p>
              <p className="text-lg text-gray-900 font-medium">{product?.author}</p>
            </div>
            <div>
              <p className="text-lg text-gray-600 font-semibold">Mã sản phẩm:</p>
              <p className="text-lg text-blue-800 font-bold">{product?.productCode}</p>
            </div>
            <div>
              <p className="text-lg text-gray-600 font-semibold">Ngày tạo:</p>
              <p className="text-lg text-blue-800 font-bold">
                {new Date(product?.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-lg text-gray-600 font-semibold">Thể loại:</p>
              <p className="text-lg text-blue-800 font-bold">
                {product?.category?.name || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-lg text-gray-600 font-semibold">Số lượng tồn kho:</p>
              <p className="text-lg text-red-600 font-bold">{product?.stock || 0}</p>
            </div>
            <div className="col-span-2">
              <p className="text-lg text-gray-600 font-semibold">Giá:</p>
              <p className="text-3xl font-extrabold text-green-600">
                {product?.price.toLocaleString()}đ
              </p>
            </div>
          </div>

          <p className="text-gray-700 text-base leading-relaxed hover:text-gray-900 transition-colors">
            {product?.description}
          </p>

          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white py-4 rounded-lg shadow-md hover:bg-blue-800 transition-all font-semibold flex items-center justify-center space-x-2"
            >
              <FaShoppingCart />
              <span>Thêm vào giỏ hàng</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-green-600 text-white py-4 rounded-lg shadow-md hover:bg-green-800 transition-all font-semibold"
            >
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      {/* Sản phẩm liên quan */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Sản phẩm liên quan</h2>
        <div className="relative">
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600"
          >
            <FaChevronLeft size={24} />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 overflow-hidden">
            {relatedProducts.slice(currentIndex, currentIndex + 4).map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col"
              >
                {/* Hình ảnh sách */}
                <img
                  src={imageUrl(item.image || "https://via.placeholder.com/150")}
                  alt={item.name}
                  className="w-full h-60 object-cover rounded-md mb-4"
                />
                {/* Tên sách */}
                <h3 className="text-lg font-semibold text-center line-clamp-2 h-[48px]">
                  {item.name}
                </h3>
                {/* Tác giả */}
                <p className="text-sm text-gray-500 text-center mt-2 h-[20px]">
                  {item.author || "N/A"}
                </p>
                {/* Số lượng tồn kho */}
                <p className="text-red-600 font-bold text-center mt-2 h-[20px]">
                  Tồn kho: {item.stock || 0}
                </p>
                {/* Giá */}
                <p className="text-green-600 font-bold text-center mt-2 h-[24px]">
                  {item.price.toLocaleString()}đ
                </p>
                {/* Nút Xem chi tiết */}
                <div className="mt-auto">
                  <button
                    onClick={() => navigate(`/product/book-detail/${item._id}`)}
                    className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 transition-all"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600"
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
