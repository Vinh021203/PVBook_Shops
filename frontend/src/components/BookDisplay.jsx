import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BookDisplay = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        const randomBooks = response.data
          .sort(() => 0.5 - Math.random())
          .slice(0, 10)
          .map((book) => ({
            ...book,
            originalPrice: Math.ceil(book.price * 1.2),
            discountPercent: 20,
          }));
        setBooks(randomBooks);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sách:", error);
        setBooks([]);
      }
    };

    fetchBooks();
  }, []);

  const handlePrevious = () => {
    setStartIndex((prev) => (prev === 0 ? books.length - 4 : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev === books.length - 4 ? 0 : prev + 1));
  };

  const visibleBooks = books.slice(startIndex, startIndex + 4);

  return (
    <div className="flex flex-col md:flex-row w-full p-8 container mx-auto">
      {/* Advertisement Banner */}
      <div
        className="w-full md:w-1/4 p-6 bg-gradient-to-b from-yellow-100 to-orange-500 flex flex-col items-center justify-between rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
        onClick={() => navigate("/promotion")}
      >
        <div className="flex flex-col items-center justify-center text-white space-y-4">
          <img
            src="https://bookbuy.vn/Res/Images/Banner/e257f889-aa02-45ec-85bc-700bac3ef1f7.jpg"
            alt="Advertisement"
            className="w-full h-72 object-cover rounded-lg shadow-lg"
          />
          <h3 className="text-3xl font-bold text-center">Giảm Giá Mùa Hè!</h3>
          <p className="text-center text-sm">
            Ưu đãi lớn cho sách cũ và hiếm. Giảm đến 70% trong thời gian có hạn!
          </p>
        </div>
        <button className="bg-white text-orange-600 px-6 py-2 rounded-full font-semibold hover:bg-orange-100 transition-colors">
          Khám phá ngay
        </button>
      </div>

      {/* Book Display */}
      <div className="w-full md:w-3/4 p-6 flex flex-col justify-center">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h2 className="text-3xl font-bold text-orange-700">Sách Nổi Bật</h2>
          <div className="flex space-x-2">
            <button
              onClick={handlePrevious}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              aria-label="Previous books"
            >
              <FiChevronLeft className="w-6 h-6 text-orange-700" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              aria-label="Next books"
            >
              <FiChevronRight className="w-6 h-6 text-orange-700" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleBooks.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-[450px] relative"
            >
              {/* Badge giảm giá */}
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold z-10">
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
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3";
                }}
              />

              {/* Thông tin sản phẩm */}
              <div className="p-4 flex flex-col items-start">
                <h3
                  className="text-sm font-semibold text-gray-800 truncate w-full"
                  title={book.name}
                >
                  {book.name}
                </h3>
                <p className="text-xs text-gray-600 truncate w-full">{book.author}</p>
                <div className="flex items-center mt-2">
                  <FaStar className="text-yellow-400 w-4 h-4" />
                  <span className="text-xs text-gray-600 ml-1">4.5</span>
                </div>
                <div className="mt-2">
                  <span className="text-lg font-bold text-red-600">
                    {book.price?.toLocaleString()}đ
                  </span>
                  <span className="text-sm text-gray-400 line-through ml-2">
                    {book.originalPrice?.toLocaleString()}đ
                  </span>
                </div>
              </div>

              <div className="flex justify-center mt-auto mb-4">
                <button
                  onClick={() => navigate(`/product/book-detail/${book._id}`)}
                  className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                >
                  Xem thêm
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDisplay;
