import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const BookDetailPage = () => {
  const { id } = useParams();
  const [showReviewForm, setShowReviewForm] = useState(false);

  const books = [
    {
      id: 1,
      title: "The Art of Programming",
      author: "Robert C. Martin",
      description: "A comprehensive guide to programming.",
      isbn: "978-3-16-148410-0",
      publishDate: "2023-01-01",
      price: 299000,
      genre: "Programming",
      coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
      reviews: [
        {
          id: 1,
          name: "Alice Johnson",
          rating: 5,
          text: "An excellent resource for programmers.",
          date: "2023-12-01",
        },
      ],
    },
    {
      id: 2,
      title: "Data Structures Explained",
      author: "John Smith",
      description: "Understanding data structures in depth.",
      isbn: "978-3-16-148410-1",
      publishDate: "2023-02-01",
      price: 250000,
      genre: "Data Structures",
      coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646",
      reviews: [],
    },
  ];

  const book = books.find((b) => b.id === parseInt(id));

  if (!book) return <div>Book not found</div>;

  const RatingStars = ({ rating }) => (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        if (index < Math.floor(rating)) {
          return <BsStarFill key={index} className="text-yellow-400" />;
        } else if (index === Math.floor(rating) && rating % 1 !== 0) {
          return <BsStarHalf key={index} className="text-yellow-400" />;
        } else {
          return <BsStar key={index} className="text-yellow-400" />;
        }
      })}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-8">
      {/* Book Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="relative h-[500px] rounded-lg overflow-hidden">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e";
            }}
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">{book.title}</h1>
          <p className="text-xl text-gray-600">Tác giả: {book.author}</p>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Mã ISBN:</span>
              <span className="font-semibold">{book.isbn}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Ngày xuất bản:</span>
              <span className="font-semibold">{book.publishDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Thể loại:</span>
              <span className="font-semibold">{book.genre}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Giá:</span>
              <span className="text-2xl font-bold text-green-600">
                {book.price.toLocaleString()}đ
              </span>
            </div>
          </div>

          <p className="text-gray-700 mt-4">{book.description}</p>

          <div className="flex space-x-4">
            <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center">
              <FaShoppingCart className="mr-2" />
              Thêm vào giỏ hàng
            </button>
            <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-200">
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Đánh giá của khách hàng</h2>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Viết đánh giá
          </button>
        </div>

        {showReviewForm && (
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Đánh giá của bạn</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className="text-2xl cursor-pointer text-yellow-400"
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Nhận xét của bạn</label>
                <textarea
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Gửi đánh giá
              </button>
            </form>
          </div>
        )}

        <div className="space-y-6">
          {book.reviews.length > 0 ? (
            book.reviews.map((review) => (
              <div key={review.id} className="border-b pb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-lg">{review.name}</p>
                    <RatingStars rating={review.rating} />
                  </div>
                  <span className="text-gray-500 text-sm">{review.date}</span>
                </div>
                <p className="mt-4 text-gray-700">{review.text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Chưa có đánh giá nào.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
