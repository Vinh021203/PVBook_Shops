import React, { useState, useEffect } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import {
  FaLaptopCode,
  FaBrain,
  FaChild,
  FaHistory,
  FaPalette,
  FaBook,
  FaUserGraduate,
  FaChartLine,
} from "react-icons/fa";
import axios from "../api/axios"; // Import axios
import { useNavigate } from "react-router-dom"; // Điều hướng trang

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 6;
  const navigate = useNavigate(); // Hook để điều hướng trang

  // Tạo danh sách biểu tượng dựa trên loại danh mục
  const iconMapping = {
    "Sách Lập Trình": <FaLaptopCode className="text-blue-500 w-12 h-12" />,
    "Sách Kỹ Năng": <FaUserGraduate className="text-green-500 w-12 h-12" />,
    "Sách Khoa Học": <FaBrain className="text-purple-500 w-12 h-12" />,
    "Sách Văn Học": <FaBook className="text-red-500 w-12 h-12" />,
    "Sách Thiếu Nhi": <FaChild className="text-yellow-500 w-12 h-12" />,
    "Sách Kinh Tế": <FaChartLine className="text-orange-500 w-12 h-12" />,
    "Sách Nghệ Thuật": <FaPalette className="text-pink-500 w-12 h-12" />,
    "Sách Lịch Sử": <FaHistory className="text-indigo-500 w-12 h-12" />,
  };

  // Gọi API để lấy danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  const displayedCategories = categories.slice(currentIndex, currentIndex + itemsToShow);

  const nextCategory = () => {
    setCurrentIndex((prev) => (prev + itemsToShow) % categories.length);
  };

  const prevCategory = () => {
    setCurrentIndex((prev) => (prev - itemsToShow + categories.length) % categories.length);
  };

  // Chuyển hướng khi click vào danh mục
  const handleCategoryClick = (name) => {
    const categoryPath = name.replace(/\s+/g, "-").toLowerCase(); // Tạo URL thân thiện
    navigate(`/products/${categoryPath}`);
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
        {displayedCategories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.name)}
            className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="mb-4">
              {iconMapping[category.name] || <FaBook className="text-gray-500 w-12 h-12" />}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 text-center">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
