import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const ProductCategoryGrid = () => {
  const categories = [
    {
      name: "Sách Lập Trình",
      products: [
        {
          id: 1,
          title: "The Art of Programming",
          author: "Robert C. Martin",
          rating: 4.5,
          price: "299.000đ",
          originalPrice: "399.000đ",
          image: "https://via.placeholder.com/150x300",
        },
        {
          id: 2,
          title: "Clean Code",
          author: "Robert C. Martin",
          rating: 4.7,
          price: "349.000đ",
          originalPrice: "450.000đ",
          image: "https://via.placeholder.com/150x300",
        },
        {
          id: 3,
          title: "JavaScript: The Good Parts",
          author: "Douglas Crockford",
          rating: 4.8,
          price: "259.000đ",
          originalPrice: "350.000đ",
          image: "https://via.placeholder.com/150x300",
        },
        {
          id: 4,
          title: "You Don't Know JS",
          author: "Kyle Simpson",
          rating: 4.6,
          price: "299.000đ",
          originalPrice: "399.000đ",
          image: "https://via.placeholder.com/150x300",
        },
        {
          id: 5,
          title: "JavaScript: Patterns",
          author: "Stoyan Stefanov",
          rating: 4.4,
          price: "279.000đ",
          originalPrice: "349.000đ",
          image: "https://via.placeholder.com/150x300",
        },
        {
          id: 6,
          title: "Effective Java",
          author: "Joshua Bloch",
          rating: 4.9,
          price: "319.000đ",
          originalPrice: "399.000đ",
          image: "https://via.placeholder.com/150x300",
        },
      ],
    },
    {
      name: "Sách Kỹ Năng",
      products: [
        {
          id: 1,
          title: "How to Win Friends",
          author: "Dale Carnegie",
          rating: 4.8,
          price: "199.000đ",
          originalPrice: "250.000đ",
          image: "https://via.placeholder.com/150x300",
        },
        {
          id: 2,
          title: "The 7 Habits",
          author: "Stephen Covey",
          rating: 4.9,
          price: "249.000đ",
          originalPrice: "300.000đ",
          image: "https://via.placeholder.com/150x300",
        },
        {
          id: 3,
          title: "Atomic Habits",
          author: "James Clear",
          rating: 4.7,
          price: "289.000đ",
          originalPrice: "350.000đ",
          image: "https://via.placeholder.com/150x300",
        },
        {
          id: 4,
          title: "Deep Work",
          author: "Cal Newport",
          rating: 4.6,
          price: "259.000đ",
          originalPrice: "329.000đ",
          image: "https://via.placeholder.com/150x300",
        },
        {
          id: 5,
          title: "Think and Grow Rich",
          author: "Napoleon Hill",
          rating: 4.5,
          price: "219.000đ",
          originalPrice: "279.000đ",
          image: "https://via.placeholder.com/150x300",
        },
        {
          id: 6,
          title: "Grit",
          author: "Angela Duckworth",
          rating: 4.6,
          price: "239.000đ",
          originalPrice: "299.000đ",
          image: "https://via.placeholder.com/150x300",
        },
      ],
    },
    {
      name: "Sách Khoa Học",
      products: [
        {
          id: 1,
          title: "A Brief History of Time",
          author: "Stephen Hawking",
          rating: 4.9,
          price: "349.000đ",
          originalPrice: "450.000đ",
          image: "https://via.placeholder.com/150x300",
        },
        {
          id: 2,
          title: "The Selfish Gene",
          author: "Richard Dawkins",
          rating: 4.7,
          price: "299.000đ",
          originalPrice: "399.000đ",
          image: "https://via.placeholder.com/150x300",
        },
        {
          id: 3,
          title: "Sapiens",
          author: "Yuval Noah Harari",
          rating: 4.8,
          price: "329.000đ",
          originalPrice: "429.000đ",
          image: "https://via.placeholder.com/150x300",
        },
        {
          id: 4,
          title: "Homo Deus",
          author: "Yuval Noah Harari",
          rating: 4.6,
          price: "299.000đ",
          originalPrice: "399.000đ",
          image: "https://via.placeholder.com/150x300",
        },
        {
          id: 5,
          title: "Cosmos",
          author: "Carl Sagan",
          rating: 4.8,
          price: "339.000đ",
          originalPrice: "450.000đ",
          image: "https://via.placeholder.com/150x300",
        },
        {
          id: 6,
          title: "The Gene",
          author: "Siddhartha Mukherjee",
          rating: 4.7,
          price: "319.000đ",
          originalPrice: "419.000đ",
          image: "https://via.placeholder.com/150x300",
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {categories.map((category, index) => (
        <React.Fragment key={index}>
          <CategorySection category={category} />
          {/* Banner Between Categories */}
          {index === 0 || index === 1 ? (
            <div className="my-8 bg-green-100 p-6 rounded-lg text-center shadow-md">
              <h3 className="text-xl font-bold text-green-800">Special Discounts on {category.name}!</h3>
              <p className="text-sm text-gray-600">Don't miss out on our exclusive deals. Shop now!</p>
            </div>
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
};

const CategorySection = ({ category }) => {
  const [startIndex, setStartIndex] = useState(0);
  const productsPerPage = 6;

  const handlePrevious = () => {
    setStartIndex((prev) => (prev === 0 ? category.products.length - productsPerPage : prev - productsPerPage));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + productsPerPage >= category.products.length ? 0 : prev + productsPerPage));
  };

  const visibleProducts = category.products.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6 border-b-2 pb-2 border-green-600">
        <h2 className="text-2xl font-bold text-green-800">{category.name}</h2>
        <div className="flex space-x-2">
          <button
            onClick={handlePrevious}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            &lt;
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            &gt;
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {visibleProducts.map((book) => (
          <div key={book.id} className="bg-white border rounded-lg shadow-md p-4 flex flex-col items-center">
            <img src={book.image} alt={book.title} className="h-64 w-full object-cover mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 truncate text-center">{book.title}</h3>
            <p className="text-gray-600 text-center">{book.author}</p>
            <div className="flex items-center space-x-1 mt-2">
              <FaStar className="text-yellow-400" />
              <span className="text-sm text-gray-600">{book.rating}</span>
            </div>
            <div className="mt-2">
              <span className="text-lg font-bold text-red-600">{book.price}</span>
              {book.originalPrice && (
                <span className="text-sm text-gray-400 line-through ml-2">{book.originalPrice}</span>
              )}
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 mt-4">
              Xem thêm
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategoryGrid;
