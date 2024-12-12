import React, { useState } from "react";
import { FaBook, FaPlus, FaMinus, FaBookReader } from "react-icons/fa";

const Layout = () => {
  const [isProductExpanded, setIsProductExpanded] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  const bookCategories = [
    "Tiểu thuyết",
    "Văn học cổ điển",
    "Sách self-help",
    "Sách thiếu nhi",
    "Sách khoa học",
    "Sách kinh doanh",
    "Truyện tranh",
    "Sách học ngoại ngữ",
    "Sách lịch sử",
    "Sách tâm lý học"
  ];

  const categories = [
    { id: 1, title: "Trang chủ" },
    { id: 2, title: "Sản phẩm", expandable: true },
    { id: 3, title: "Sản phẩm khuyến mãi" },
    { id: 4, title: "Tin tức" },
    { id: 5, title: "Giới thiệu" },
    { id: 6, title: "Liên hệ" },
    { id: 7, title: "Đặt hàng nhanh" },
    { id: 8, title: "Chính sách thành viên" }
  ];

  const featuredNews = [
    {
      id: 1,
      title: "Top sách bán chạy tháng này",
      image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090"
    },
    {
      id: 2,
      title: "Xu hướng đọc sách 2023",
      image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353"
    },
    {
      id: 3,
      title: "Cách giữ thói quen đọc sách",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794"
    }
  ];

  const articles = [
    {
      id: 1,
      title: "Top 10 cuốn sách hay nhất mọi thời đại",
      date: "04-Tháng-05",
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
    },
    {
      id: 2,
      title: "Cách tạo thói quen đọc sách mỗi ngày",
      date: "03-Tháng-05",
      image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090"
    },
    {
      id: 3,
      title: "Lợi ích của việc đọc sách mỗi ngày",
      date: "02-Tháng-05",
      image: "https://images.unsplash.com/photo-1513001900722-370f803f498d"
    },
    {
      id: 4,
      title: "Phương pháp đọc sách hiệu quả",
      date: "01-Tháng-05",
      image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353"
    },
    {
      id: 5,
      title: "Những cuốn sách nên đọc trong đời",
      date: "30-Tháng-04",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794"
    },
    {
      id: 6,
      title: "Cách chọn sách phù hợp với bản thân",
      date: "29-Tháng-04",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6"
    },
    {
      id: 7,
      title: "Xu hướng đọc sách của giới trẻ",
      date: "28-Tháng-04",
      image: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7"
    },
    {
      id: 8,
      title: "Sách điện tử vs sách giấy",
      date: "27-Tháng-04",
      image: "https://images.unsplash.com/photo-1509266272358-7701da638078"
    },
    {
      id: 9,
      title: "Cách bảo quản sách đúng cách",
      date: "26-Tháng-04",
      image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090"
    }
  ];

  return (
    <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 py-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="md:w-3/4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onMouseEnter={() => setHoveredId(article.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-110"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1524578271613-d550eacf6090";
                  }}
                />
                <span className="absolute top-2 left-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-md text-sm shadow-md">
                  {article.date}
                </span>
              </div>
              <div className="p-4 bg-gradient-to-b from-white to-gray-50">
                <h3 className="text-lg font-semibold mb-3 line-clamp-2 text-gray-800">{article.title}</h3>
                <button className="block w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md">
                  Đọc tiếp
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="md:w-1/4 space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6 backdrop-blur-lg bg-opacity-90">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
              <FaBook className="text-white text-xl" />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Danh mục sản phẩm</h2>
          </div>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id} className="border-b border-gray-200 last:border-0">
                <div className="flex items-center justify-between py-2 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                  <span>{category.title}</span>
                  {category.expandable && (
                    <button
                      onClick={() => setIsProductExpanded(!isProductExpanded)}
                      className="p-1 hover:bg-blue-100 rounded-full transition-colors duration-200"
                    >
                      {isProductExpanded ? <FaMinus className="text-purple-600" /> : <FaPlus className="text-blue-600" />}
                    </button>
                  )}
                </div>
                {category.expandable && isProductExpanded && (
                  <ul className="pl-4 space-y-2 mt-2">
                    {bookCategories.map((bookCategory, index) => (
                      <li
                        key={index}
                        className="text-sm py-1 hover:text-purple-600 cursor-pointer transition-colors duration-200 hover:translate-x-2 transform"
                      >
                        {bookCategory}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 backdrop-blur-lg bg-opacity-90">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
              <FaBookReader className="text-white text-xl" />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Tin tức nổi bật</h2>
          </div>
          <div className="space-y-4">
            {featuredNews.map((news) => (
              <div
                key={news.id}
                className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer"
              >
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-20 h-20 object-cover rounded-md shadow-md transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1524578271613-d550eacf6090";
                  }}
                />
                <h3 className="text-sm font-medium line-clamp-2 text-gray-800 hover:text-blue-600 transition-colors duration-200">
                  {news.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;