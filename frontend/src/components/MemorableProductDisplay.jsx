import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axios from "../api/axios";

const MemorableProductDisplay = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        const sortedBooks = response.data
          .sort((a, b) => a.price - b.price)
          .slice(0, 10)
          .map((book) => ({
            ...book,
            originalPrice: Math.ceil(book.price * 1.2),
            discountPercent: 20,
          }));
        setBooks(sortedBooks);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        setBooks([]);
      }
    };

    fetchBooks();
  }, []);

  const handlePrevious = () => {
    setStartIndex((prev) => (prev === 0 ? books.length - itemsPerPage : prev - itemsPerPage));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev === books.length - itemsPerPage ? 0 : prev + itemsPerPage));
  };

  const visibleBooks = books.slice(startIndex, startIndex + itemsPerPage);

  const BookCard = ({ book }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 relative">
      {/* Badge giảm giá */}
      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold z-10">
        -{book.discountPercent}%
      </div>
      {/* Hình ảnh sản phẩm */}
      <img
        src={book.image ? `http://localhost:5000${book.image}` : "https://via.placeholder.com/150"}
        alt={book.name}
        className="w-full h-64 object-cover"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/150";
        }}
      />
      {/* Nút yêu thích */}
      <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors duration-300">
        <FaHeart className="text-red-500" />
      </button>
      {/* Thông tin sản phẩm */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 truncate">{book.name}</h3> {/* Tên sách */}
        <p className="text-sm text-gray-600 mb-2 truncate">Tác giả: {book.author}</p> {/* Tác giả */}
        <div className="flex items-center mb-2">
          <FaStar className="text-yellow-400" />
          <span className="ml-1 text-sm text-gray-600">{book.rating || "Chưa có đánh giá"}</span>
        </div>
        <div className="mb-4">
          <span className="text-lg font-bold text-red-600">{book.price.toLocaleString()}đ</span>
          <span className="ml-2 text-sm text-gray-400 line-through">
            {book.originalPrice?.toLocaleString()}đ
          </span>
        </div>
        <button
          onClick={() => navigate(`/product/book-detail/${book._id}`)}
          className="w-full px-3 py-2 bg-green-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 text-sm"
        >
          Xem thêm
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="border-b-2 border-gray-300 pb-4 mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">Khuyến mãi hấp dẫn</h2>
          <div className="flex space-x-2">
            <button
              onClick={handlePrevious}
              className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full shadow-md transition"
            >
              <FiChevronLeft className="w-5 h-5 text-gray-800" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full shadow-md transition"
            >
              <FiChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          </div>
        </div>
      </div>
      {/* Hiển thị sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {visibleBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default MemorableProductDisplay;
