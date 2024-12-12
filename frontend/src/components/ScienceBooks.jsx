import React from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ScienceBooks = () => {
  const navigate = useNavigate();

  const books = [
    {
      id: 1,
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      rating: 4.9,
      price: "329.000đ",
      originalPrice: "429.000đ",
      image: "https://product.hstatic.net/200000612501/product/an_mang_o_bar_khuyen_tu_d3e46fe28f69432dab5e11279aa909d7_medium.jpg",
    },
    {
      id: 2,
      title: "Cosmos",
      author: "Carl Sagan",
      rating: 4.8,
      price: "339.000đ",
      originalPrice: "450.000đ",
      image: "https://product.hstatic.net/200000612501/product/an_mang_o_bar_khuyen_tu_d3e46fe28f69432dab5e11279aa909d7_medium.jpg",
    },
    {
      id: 3,
      title: "A Brief History of Time",
      author: "Stephen Hawking",
      rating: 4.9,
      price: "349.000đ",
      originalPrice: "450.000đ",
      image: "https://product.hstatic.net/200000612501/product/an_mang_o_bar_khuyen_tu_d3e46fe28f69432dab5e11279aa909d7_medium.jpg",
    },
    {
        id: 4,
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        rating: 4.9,
        price: "349.000đ",
        originalPrice: "450.000đ",
        image: "https://product.hstatic.net/200000612501/product/an_mang_o_bar_khuyen_tu_d3e46fe28f69432dab5e11279aa909d7_medium.jpg",
      },
  ];

  return (
    <div className="bg-white rounded-lg p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b-2 border-red-600 pb-2">
        <h2 className="text-2xl font-bold text-red-800">Sách Khoa Học</h2>
        <button
          onClick={() => navigate("/products")}
          className="text-sm font-medium text-red-600 hover:text-red-800 transition"
        >
          Xem tất cả
        </button>
      </div>
      
      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white shadow rounded-lg p-4 flex flex-col">
            {/* Image */}
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-[200px] object-cover rounded mb-4"
            />
            {/* Title */}
            <h3
              className="text-lg font-semibold text-gray-800 mb-2"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {book.title}
            </h3>
            {/* Author */}
            <p className="text-sm text-gray-600 mb-2">{book.author}</p>
            {/* Rating */}
            <div className="flex items-center mb-2">
              <FaStar className="text-yellow-400" />
              <span className="text-sm text-gray-600 ml-1">{book.rating}</span>
            </div>
            {/* Price */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-400 line-through">{book.originalPrice}</span>
              <span className="ml-2 text-lg font-bold text-red-600">{book.price}</span>
            </div>
            {/* Button */}
            <button
              onClick={() => navigate("/products")}
              className="mt-auto py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Xem thêm
            </button>
          </div>
        ))}
      </div>

      {/* Banner */}
      <div className="relative bg-blue-100 rounded-md overflow-hidden shadow-md group">
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
