import React, { useState } from "react";
import { FaBook, FaPlus, FaMinus, FaFeatherAlt } from "react-icons/fa";

const EcommerceSidebar = () => {
  const [expandedCategories, setExpandedCategories] = useState({});

  const categories = [
    "Văn học",
    "Tiểu thuyết",
    "Khoa học",
    "Tâm lý học",
    "Kinh tế",
    "Lịch sử",
    "Thiếu nhi",
    "Học tập"
  ];

  const priceRanges = [
    "Dưới 10.000đ",
    "Từ 10.000đ - 50.000đ",
    "Từ 50.000đ - 100.000đ",
    "Từ 100.000đ - 200.000đ",
    "Từ 200.000đ - 300.000đ",
    "Từ 300.000đ - 500.000đ",
    "Từ 500.000đ - 1 triệu"
  ];

  const authors = [
    "Nguyễn Nhật Ánh",
    "Tô Hoài",
    "Nam Cao",
    "Ngô Tất Tố",
    "Thạch Lam",
    "Xuân Diệu",
    "Hồ Xuân Hương",
    "Nguyễn Du",
    "Vũ Trọng Phụng",
    "Nguyễn Tuân"
  ];

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="w-64 min-h-screen bg-blue-50 p-4 shadow-lg container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <FaBook className="text-blue-600 text-xl animate-pulse" />
          <h2 className="text-lg font-semibold text-gray-800">Danh mục sách</h2>
        </div>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category}
              className="flex items-center justify-between p-2 hover:bg-blue-100 rounded-md transition-colors duration-300 transform hover:scale-105"
            >
              <span className="text-gray-700">{category}</span>
              <button
                onClick={() => toggleCategory(category)}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                {expandedCategories[category] ? <FaMinus size={12} /> : <FaPlus size={12} />}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <div className="border-2 border-dashed border-blue-300 p-3 mb-4 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
          <h2 className="text-lg font-semibold text-gray-800">Bộ lọc sách</h2>
        </div>
        <div className="mb-6">
          <h3 className="text-md font-medium text-gray-700 mb-3">Chọn mức giá</h3>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label
                key={range}
                className="flex items-center space-x-2 cursor-pointer hover:bg-blue-100 p-2 rounded-md transition-all duration-300"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">{range}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <FaFeatherAlt className="text-blue-600" />
            <h3 className="text-md font-medium text-gray-700">Tác giả</h3>
          </div>
          <div className="space-y-2">
            {authors.map((author) => (
              <label
                key={author}
                className="flex items-center space-x-2 cursor-pointer hover:bg-blue-100 p-2 rounded-md transition-all duration-300"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">{author}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceSidebar;
