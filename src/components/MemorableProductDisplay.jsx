import React, { useState } from "react";
import { FaStar, FaHeart } from "react-icons/fa";

const MemorableProductDisplay = () => {
  const [showAll, setShowAll] = useState(false);

  const books = [
    {
      id: 1,
      title: "The Art of Programming",
      author: "Robert C. Martin",
      price: "299.000đ",
      originalPrice: "399.000đ",
      rating: 4.5,
      // image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
    },
    {
      id: 2,
      title: "Data Structures Explained",
      author: "John Smith",
      price: "250.000đ",
      originalPrice: "350.000đ",
      rating: 4.8,
      // image: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
    },
    {
      id: 3,
      title: "Clean Architecture",
      author: "Michael Brown",
      price: "320.000đ",
      originalPrice: "420.000đ",
      rating: 4.6,
      // image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d",
    },
    {
      id: 4,
      title: "React Deep Dive",
      author: "Sarah Johnson",
      price: "300.000đ",
      originalPrice: "400.000đ",
      rating: 4.7,
      // image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    },
    {
      id: 5,
      title: "JavaScript Mastery",
      author: "Emily Davis",
      price: "270.000đ",
      originalPrice: "370.000đ",
      rating: 4.9,
      // image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
    },
    {
      id: 6,
      title: "Web Development Guide",
      author: "Peter Chang",
      price: "280.000đ",
      originalPrice: "380.000đ",
      rating: 4.5,
      // image: "https://images.unsplash.com/photo-1589998059171-988d887df646",
    },
    // Add more books...
  ];

  const displayedBooks = showAll ? books : books.slice(0, 5);

  const BookCard = ({ book }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <div className="relative">
        <img
          src={book.image}
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
          <button className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 text-sm">
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
