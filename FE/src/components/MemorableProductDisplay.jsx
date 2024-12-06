import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaStar, FaHeart } from "react-icons/fa";

const MemorableProductDisplay = () => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const books = [
    {
      id: 1,
      title: "The Art of Programming",
      author: "Robert C. Martin",
      price: "299.000đ",
      originalPrice: "399.000đ",
      rating: 4.5,
    },
    {
      id: 2,
      title: "Data Structures Explained",
      author: "John Smith",
      price: "250.000đ",
      originalPrice: "350.000đ",
      rating: 4.8,
    },
    {
      id: 3,
      title: "Clean Architecture",
      author: "Michael Brown",
      price: "320.000đ",
      originalPrice: "420.000đ",
      rating: 4.6,
    },
  ];

  const displayedBooks = showAll ? books : books.slice(0, 5);

  const handleNavigate = (bookId) => {
    navigate(`/book-detail/${bookId}`); // Navigate to the detail page
    setTimeout(() => {
      // Scroll down after navigation
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100); // Add a slight delay to ensure the page has navigated
  };

  const BookCard = ({ book }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <div className="relative">
        <img
          src="https://via.placeholder.com/150"
          alt={book.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e";
          }}
        />
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors duration-300">
          <FaHeart className="text-red-500" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{book.author}</p>
        <div className="flex items-center mb-2">
          <FaStar className="text-yellow-400" />
          <span className="ml-1 text-sm text-gray-600">{book.rating}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-red-600">{book.price}</span>
            <span className="ml-2 text-sm text-gray-400 line-through">
              {book.originalPrice}
            </span>
          </div>
          <button
            onClick={() => handleNavigate(book.id)} // Use handleNavigate
            className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 text-sm"
          >
            Xem thêm
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Khuyến mãi hấp dẫn
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {displayedBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 font-semibold shadow-md"
        >
          {showAll ? "Ẩn bớt sách" : "Xem tất cả sách"}
        </button>
      </div>
    </div>
  );
};

export default MemorableProductDisplay;
