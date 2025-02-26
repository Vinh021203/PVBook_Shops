import React, { useState, useEffect } from "react";
import { FaBook, FaPlus, FaMinus } from "react-icons/fa";
import axios from "../api/axios"; // Import axios
import { useNavigate } from "react-router-dom"; // Import useNavigate để điều hướng

const EcommerceSidebar = ({ setSelectedCategory, setSelectedPriceRange, setSelectedAuthor }) => {
  const [categories, setCategories] = useState([]); // Danh mục từ backend
  const [authors, setAuthors] = useState([]); // Danh sách tác giả từ backend
  const [expandedCategories, setExpandedCategories] = useState({});
  const [loadingCategories, setLoadingCategories] = useState(true); // State loading danh mục
  const [loadingAuthors, setLoadingAuthors] = useState(true); // State loading tác giả
  const navigate = useNavigate(); // Hook để điều hướng trang

  const priceRanges = [
    { label: "Dưới 10.000đ", min: 0, max: 10000 },
    { label: "Từ 10.000đ - 50.000đ", min: 10000, max: 50000 },
    { label: "Từ 50.000đ - 100.000đ", min: 50000, max: 100000 },
    { label: "Từ 100.000đ - 200.000đ", min: 100000, max: 200000 },
    { label: "Từ 200.000đ - 300.000đ", min: 200000, max: 300000 },
    { label: "Từ 300.000đ - 500.000đ", min: 300000, max: 500000 },
    { label: "Từ 500.000đ - 1 triệu", min: 500000, max: 1000000 },
  ];

  // Gọi API để lấy danh mục sách từ backend
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true); // Bắt đầu loading danh mục
      try {
        const response = await axios.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      } finally {
        setLoadingCategories(false); // Kết thúc loading danh mục
      }
    };

    fetchCategories();
  }, []);

  // Gọi API để lấy danh sách tác giả từ backend
  useEffect(() => {
    const fetchAuthors = async () => {
      setLoadingAuthors(true); // Bắt đầu loading tác giả
      try {
        const response = await axios.get("/products/authors"); // Gọi API lấy danh sách tác giả
        setAuthors(response.data);
      } catch (error) {
        console.error("Error fetching authors:", error.message);
      } finally {
        setLoadingAuthors(false); // Kết thúc loading tác giả
      }
    };

    fetchAuthors();
  }, []);

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Chuyển hướng khi click vào danh mục
  const handleCategoryClick = (name) => {
    setSelectedCategory(name);
    const categoryPath = name.replace(/\s+/g, "-").toLowerCase(); // Tạo URL thân thiện
    navigate(`/products/${categoryPath}`);
  };

  return (
    <div className="w-64 min-h-screen bg-blue-50 p-4 shadow-lg container mx-auto px-4 py-8">
      {/* Danh Mục Sách */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <FaBook className="text-blue-600 text-xl animate-pulse" />
          <h2 className="text-lg font-semibold text-gray-800">Danh mục sách</h2>
        </div>

        {/* Hiệu ứng loading */}
        {loadingCategories ? (
          <div className="flex justify-center items-center py-6">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <ul className="space-y-2">
            {categories.map((category) => (
              <li
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className="flex items-center justify-between p-2 hover:bg-blue-100 rounded-md transition-colors duration-300 transform hover:scale-105 cursor-pointer"
              >
                <span className="text-gray-700">{category.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Ngăn chặn sự kiện click vào toàn bộ danh mục
                    toggleCategory(category.id);
                  }}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {expandedCategories[category.id] ? <FaMinus size={12} /> : <FaPlus size={12} />}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Bộ Lọc Sách */}
      <div className="mb-8">
        <div className="border-2 border-dashed border-blue-300 p-3 mb-4 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
          <h2 className="text-lg font-semibold text-gray-800">Bộ lọc sách</h2>
        </div>
        <div className="mb-6">
          <h3 className="text-md font-medium text-gray-700 mb-3">Chọn mức giá</h3>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label
                key={range.label}
                className="flex items-center space-x-2 cursor-pointer hover:bg-blue-100 p-2 rounded-md transition-all duration-300"
              >
                <input
                  type="radio"
                  name="priceRange"
                  className="form-radio h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  onChange={() => setSelectedPriceRange(range)}
                />
                <span className="text-gray-700 text-sm">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-md font-medium text-gray-700 mb-3">Tác giả</h3>
          {loadingAuthors ? (
            <div className="flex justify-center items-center py-6">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            </div>
          ) : (
            <div className="space-y-2">
              {authors.map((author) => (
                <label
                  key={author}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-blue-100 p-2 rounded-md transition-all duration-300"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    onChange={(e) => {
                      setSelectedAuthor((prev) =>
                        e.target.checked ? [...(prev || []), author] : prev?.filter((a) => a !== author)
                      );
                    }}
                  />
                  <span className="text-gray-700 text-sm">{author}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EcommerceSidebar;
