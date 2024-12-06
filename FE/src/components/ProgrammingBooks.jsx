import React from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProgrammingBooks = () => {
  const navigate = useNavigate();

  const books = [
    { id: 1, title: "The Art of Programming", author: "Robert C. Martin", rating: 4.5, price: "299.000đ", originalPrice: "399.000đ", image: "https://product.hstatic.net/200000612501/product/tro_choi_cua_ripley_a4f8d20f25b140fe95fa6008385167e0_medium.jpg" },
    { id: 2, title: "Clean Code", author: "Robert C. Martin", rating: 4.7, price: "349.000đ", originalPrice: "450.000đ", image: "https://product.hstatic.net/200000612501/product/tro_choi_cua_ripley_a4f8d20f25b140fe95fa6008385167e0_medium.jpg" },
    { id: 3, title: "JavaScript The Good Parts", author: "Douglas Crockford", rating: 4.8, price: "259.000đ", originalPrice: "350.000đ", image: "https://product.hstatic.net/200000612501/product/tro_choi_cua_ripley_a4f8d20f25b140fe95fa6008385167e0_medium.jpg" },
    { id: 4, title: "You Don't Know JS", author: "Kyle Simpson", rating: 4.6, price: "299.000đ", originalPrice: "399.000đ", image: "https://product.hstatic.net/200000612501/product/tro_choi_cua_ripley_a4f8d20f25b140fe95fa6008385167e0_medium.jpg" },
    { id: 5, title: "JavaScript Patterns", author: "Stoyan Stefanov", rating: 4.4, price: "279.000đ", originalPrice: "349.000đ", image: "https://product.hstatic.net/200000612501/product/tro_choi_cua_ripley_a4f8d20f25b140fe95fa6008385167e0_medium.jpg" },
    { id: 6, title: "Effective Java", author: "Joshua Bloch", rating: 4.9, price: "319.000đ", originalPrice: "399.000đ", image: "https://product.hstatic.net/200000612501/product/tro_choi_cua_ripley_a4f8d20f25b140fe95fa6008385167e0_medium.jpg" },
    { id: 7, title: "Programming Pearls", author: "Jon Bentley", rating: 4.3, price: "249.000đ", originalPrice: "329.000đ", image: "https://product.hstatic.net/200000612501/product/tro_choi_cua_ripley_a4f8d20f25b140fe95fa6008385167e0_medium.jpg" },
    { id: 8, title: "Algorithms", author: "Robert Sedgewick", rating: 4.5, price: "299.000đ", originalPrice: "399.000đ", image: "https://product.hstatic.net/200000612501/product/tro_choi_cua_ripley_a4f8d20f25b140fe95fa6008385167e0_medium.jpg" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4 border-b-2 border-green-600 pb-2">
        <h2 className="text-2xl font-bold text-green-800">Sách Lập Trình</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white shadow rounded-lg overflow-hidden flex flex-col items-center"
          >
            <img
              src={book.image}
              alt={book.title}
              className="object-cover"
              style={{ width: "100px", height: "200px" }} // Đặt kích thước ảnh
            />
            <div className="p-4 flex flex-col w-full">
              <h3 className="text-lg font-semibold text-gray-800 truncate">{book.title}</h3>
              <p className="text-sm text-gray-600 truncate">{book.author}</p>
              <div className="flex items-center mt-2">
                <FaStar className="text-yellow-400" />
                <span className="text-sm text-gray-600 ml-1">{book.rating}</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <span className="text-sm text-gray-400 line-through">{book.originalPrice}</span>
                  <span className="ml-2 text-lg font-bold text-red-600">{book.price}</span>
                </div>
                <button
                  onClick={() => navigate("/products")}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Xem thêm
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8 mb-8">
        <button
          onClick={() => navigate("/products")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Xem tất cả
        </button>
      </div>
      <div className="relative bg-green-100 rounded-lg overflow-hidden shadow-md group">
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
