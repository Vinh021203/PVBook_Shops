import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const BookDisplay = () => {
  const books = [
    {
      id: 1,
      title: "The Art of Programming",
      author: "Robert C. Martin",
      rating: 4.5,
      price: "299.000đ",
      originalPrice: "399.000đ",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3",
    },
    {
      id: 2,
      title: "Clean Code",
      author: "Robert C. Martin",
      rating: 4.7,
      price: "349.000đ",
      originalPrice: "450.000đ",
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3",
    },
    {
      id: 3,
      title: "You Don't Know JS",
      author: "Kyle Simpson",
      rating: 4.6,
      price: "259.000đ",
      originalPrice: "320.000đ",
      image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3",
    },
    {
      id: 4,
      title: "JavaScript: The Good Parts",
      author: "Douglas Crockford",
      rating: 4.8,
      price: "299.000đ",
      originalPrice: "399.000đ",
      image: "https://images.unsplash.com/photo-1525785967371-87ba44b3e6cf?ixlib=rb-4.0.3",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);

  const handlePrevious = () => {
    setStartIndex((prev) => (prev === 0 ? books.length - 4 : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev === books.length - 4 ? 0 : prev + 1));
  };

  const visibleBooks = books.slice(startIndex, startIndex + 4);

  return (
    <div className="flex flex-col md:flex-row w-full p-24">
      {/* Advertisement Banner */}
      <div className="w-full md:w-1/4 p-6 bg-gradient-to-b from-blue-500 to-blue-600 flex items-center justify-center rounded-3xl ">
        <div className="flex flex-col items-center justify-center text-white space-y-4">
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3"
            alt="Advertisement"
            className="w-full h-48 object-cover rounded-lg shadow-lg"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3";
            }}
          />
          <h3 className="text-2xl font-bold text-center">Summer Reading Sale!</h3>
          <p className="text-center text-sm">
            Get 50% off on all classic literature books. Limited time offer!
          </p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors">
            Shop Now
          </button>
        </div>
      </div>

      {/* Book Display */}
      <div className="w-full md:w-3/4 p-6 flex flex-col justify-center">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h2 className="text-3xl font-bold text-gray-800">Featured Books</h2>
          <div className="flex space-x-2">
            <button
              onClick={handlePrevious}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Previous books"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Next books"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col justify-between h-[400px]"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3";
                }}
              />
              <div className="p-4 flex flex-col items-center">
                <h3 className="text-lg font-semibold text-gray-800 truncate text-center">
                  {book.title}
                </h3>
                <p className="text-gray-600 truncate text-center">{book.author}</p>
                <div className="flex items-center space-x-1 mt-2">
                  <FaStar className="text-yellow-400" />
                  <span className="text-sm text-gray-600">{book.rating}</span>
                </div>
                <div className="mt-2">
                  <span className="text-lg font-bold text-red-600">{book.price}</span>
                  <span className="text-sm text-gray-400 line-through ml-2">
                    {book.originalPrice}
                  </span>
                </div>
              </div>
              <div className="flex justify-center mt-auto mb-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
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
