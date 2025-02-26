import React, { useState } from "react";
import EcommerceSidebar from "../components/EcommerceSidebar";
import DiscountedProducts from "../components/DiscountedProducts";
import { BsFilter } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

const ProductPage = ({ searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState(""); // Lưu danh mục được chọn
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Trạng thái mở/đóng Sidebar

  // Xử lý chọn danh mục
  const handleCategorySelect = (category) => {
    setSelectedCategory(category); // Lưu danh mục được chọn
    setIsSidebarOpen(false); // Đóng Sidebar sau khi chọn
    window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn lên đầu trang
  };

  // Xử lý chọn khoảng giá
  const handlePriceRangeSelect = (priceRange) => {
    setSelectedPriceRange(priceRange); // Lưu khoảng giá được chọn
    setIsSidebarOpen(false); // Đóng Sidebar sau khi chọn
    window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn lên đầu trang
  };

  // Xử lý chọn tác giả
  const handleAuthorSelect = (author) => {
    setSelectedAuthor(author); // Lưu tác giả được chọn
    setIsSidebarOpen(false); // Đóng Sidebar sau khi chọn
    window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn lên đầu trang
  };

  return (
    <div className="relative flex flex-col lg:flex-row">
      {/* Nút mở Sidebar */}
      <button
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-blue-500 text-white rounded-full shadow-md"
        onClick={() => setIsSidebarOpen(true)}
      >
        <BsFilter className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 bg-gray-100 w-64 p-4 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-1/4 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <h2 className="text-xl font-bold">Lọc Sản Phẩm</h2>
          <button
            className="p-2 bg-gray-300 rounded-full"
            onClick={() => setIsSidebarOpen(false)}
          >
            <AiOutlineClose className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Sidebar Component */}
        <EcommerceSidebar
          setSelectedCategory={handleCategorySelect}
          setSelectedPriceRange={handlePriceRangeSelect}
          setSelectedAuthor={handleAuthorSelect}
          selectedCategory={selectedCategory} // Truyền danh mục đã chọn để highlight
        />
      </div>

      {/* Overlay khi Sidebar mở */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Danh sách sản phẩm */}
      <div className="w-full lg:w-3/4 bg-white p-4 lg:p-10">
        <DiscountedProducts
          searchQuery={searchQuery} // Truyền searchQuery từ App
          selectedCategory={selectedCategory}
          filters={{}}
          selectedPriceRange={selectedPriceRange}
          selectedAuthor={selectedAuthor}
        />
      </div>
    </div>
  );
};

export default ProductPage;
