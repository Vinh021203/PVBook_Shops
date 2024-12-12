import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FaLaptopCode, FaBrain, FaChild, FaHistory, FaPalette, FaBook, FaUserGraduate, FaChartLine } from "react-icons/fa";

const BookCategoryGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    { name: "Sách Lập Trình", icon: <FaLaptopCode className="text-blue-500 w-12 h-12" /> },
    { name: "Sách Kỹ Năng", icon: <FaUserGraduate className="text-green-500 w-12 h-12" /> },
    { name: "Sách Khoa Học", icon: <FaBrain className="text-purple-500 w-12 h-12" /> },
    { name: "Sách Văn Học", icon: <FaBook className="text-red-500 w-12 h-12" /> },
    { name: "Sách Thiếu Nhi", icon: <FaChild className="text-yellow-500 w-12 h-12" /> },
    { name: "Sách Kinh Tế", icon: <FaChartLine className="text-orange-500 w-12 h-12" /> },
    { name: "Sách Nghệ Thuật", icon: <FaPalette className="text-pink-500 w-12 h-12" /> },
    { name: "Sách Lịch Sử", icon: <FaHistory className="text-indigo-500 w-12 h-12" /> },
  ];

  const itemsToShow = 6; // Number of items to display at a time

  const displayedCategories = categories.slice(currentIndex, currentIndex + itemsToShow);

  const nextCategory = () => {
    setCurrentIndex((prev) => (prev + itemsToShow) % categories.length);
  };

  const prevCategory = () => {
    setCurrentIndex((prev) => (prev - itemsToShow + categories.length) % categories.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Title and Navigation */}
      <div className="flex items-center justify-between mb-6 border-b-2 border-gray-300 pb-2">
        <h1 className="text-3xl font-bold text-gray-800">Thể Loại Sách</h1>
        <div className="flex space-x-2">
          <button
            onClick={prevCategory}
            className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-transform transform hover:scale-110"
          >
            <BsChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextCategory}
            className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-transform transform hover:scale-110"
          >
            <BsChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {displayedCategories.map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="mb-4">{category.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 text-center">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookCategoryGallery;
