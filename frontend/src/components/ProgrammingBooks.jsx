import React, { useEffect, useState } from "react";
import { FaStar, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProgrammingBooks = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const categoryName = "Sách Lập Trình"; // Tên danh mục "Sách Lập Trình"

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products/category", {
          params: { category: categoryName },
        });
        const updatedBooks = response.data.map((book) => ({
          ...book,
          originalPrice: Math.ceil(book.price * 1.2),
          discountPercent: 20,
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
      <div className="flex justify-between items-center mb-4 border-b-2 border-green-600 pb-2">
        <h2 className="text-2xl font-bold text-green-800">Sách Lập Trình</h2>
        <button
          onClick={() => navigate("/products")}
          className="flex items-center space-x-2 text-green-600 hover:text-blue-800 transition duration-300"
        >
          <span className="text-sm font-semibold">Xem tất cả</span>
          <FaArrowRight />
        </button>
      </div>

      {/* Danh sách sách */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden relative flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
          >
            {/* Phần giảm giá */}
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
              className="object-cover w-full h-72"
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
                className="mt-4 px-3 py-2 w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white font-semibold rounded-md shadow-lg hover:from-green-500 hover:to-green-700 hover:scale-105 transform transition duration-300 flex items-center justify-center"
              >
                <span className="mr-2">Xem thêm</span>
                <FaArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Phần quảng cáo khuyến mãi */}
      <div className="relative bg-green-100 rounded-lg overflow-hidden shadow-md group mt-8">
        <img 
          src="https://thietkelogo.edu.vn/uploads/images/thiet-ke-do-hoa-khac/banner-sach/3.jpg" 
          alt="Khuyến mãi đặc biệt" 
          className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105 group-hover:opacity-75"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center transition-opacity duration-500 group-hover:bg-opacity-50">
          <h3 className="text-2xl font-bold text-white mb-2 transition-transform duration-500 group-hover:scale-110">
            Khuyến mãi đặc biệt!
          </h3>
          <p className="text-lg text-gray-200 transition-transform duration-500 group-hover:scale-110">
            Mua ngay sách lập trình với giá ưu đãi nhất.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgrammingBooks;
