import React, { useEffect, useState } from "react";
import { FaStar, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ScienceBooks = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const categoryName = "Sách Khoa Học"; // Tên danh mục "Sách Khoa Học"

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products/category", {
          params: { category: categoryName },
        });
        const updatedBooks = response.data.map((book) => ({
          ...book,
          originalPrice: Math.ceil(book.price * 1.2), // Giá gốc (giá ban đầu + 20%)
          discountPercent: 20, // Phần trăm giảm giá
        }));
        setBooks(updatedBooks);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sách:", error);
        setBooks([]);
      }
    };

    fetchBooks();
  }, [categoryName]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Tiêu đề với nút Xem tất cả */}
      <div className="flex justify-between items-center mb-4 border-b-2 border-red-600 pb-2">
        <h2 className="text-2xl font-bold text-red-800">Sách Khoa Học</h2>
        <button
          onClick={() => navigate("/products")}
          className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition duration-300"
        >
          <span className="text-sm font-semibold">Xem tất cả</span>
          <FaArrowRight />
        </button>
      </div>

      {/* Danh sách sách */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden relative flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
          >
            {/* Badge giảm giá */}
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
              -{book.discountPercent}%
            </div>

            {/* Hình ảnh sản phẩm */}
            <img
              src={
                book.image
                  ? `http://localhost:5000${book.image}`
                  : "https://via.placeholder.com/150"
              }
              alt={book.name}
              className="w-full h-[200px] object-cover"
            />

            {/* Thông tin sản phẩm */}
            <div className="p-4 flex flex-col w-full">
              <h3 className="text-lg font-semibold text-gray-800 truncate">{book.name}</h3>
              <p className="text-sm text-gray-600 truncate">{book.author}</p>
              <div className="flex items-center mt-2">
                <FaStar className="text-yellow-400" />
                <span className="text-sm text-gray-600 ml-1">4.5</span>
              </div>

              {/* Giá sản phẩm */}
              <div className="mt-4">
                <span className="text-sm text-gray-400 line-through">
                  {book.originalPrice?.toLocaleString()}đ
                </span>
                <span className="ml-2 text-lg font-bold text-red-600">
                  {book.price?.toLocaleString()}đ
                </span>
              </div>

              {/* Nút Xem thêm */}
              <button
                onClick={() => navigate(`/product/book-detail/${book._id}`)}
                className="mt-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 w-full"
              >
                Xem thêm
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Banner khuyến mãi */}
      <div className="relative bg-blue-100 rounded-md overflow-hidden shadow-md group mt-8">
        <img 
          src="https://thietkelogo.edu.vn/uploads/images/thiet-ke-do-hoa-khac/banner-sach/6.png" 
          alt="Khuyến mãi hấp dẫn" 
          className="w-full h-[150px] object-cover transition-transform duration-500 group-hover:scale-105 group-hover:opacity-80"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center transition-opacity duration-500 group-hover:bg-opacity-50">
          <h3 className="text-lg font-bold text-white mb-1 transition-transform duration-500 group-hover:scale-110">
            Khuyến mãi hấp dẫn!
          </h3>
          <p className="text-sm text-gray-200 transition-transform duration-500 group-hover:scale-110">
            Mua ngay sách kỹ năng với giá tốt nhất hôm nay!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScienceBooks;
