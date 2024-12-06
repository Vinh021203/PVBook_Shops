import React from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { BsCart3 } from "react-icons/bs";

const Header = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  isDropdownOpen,
  toggleDropdown,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  // const categories = ["Văn học", "Khoa học", "Trẻ em", "Lịch sử", "Tiểu sử", "Thơ", "Công nghệ"];

  return (
    <header className="bg-white shadow-lg w-full z-50 fixed top-0">
      <div className="max-w-7xl mx-auto px-4">
        {/* Logo and Mobile Menu Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-center py-4 space-y-4 md:space-y-0">
          <div className="flex items-center w-full md:w-auto justify-between">
            {/* Logo as text */}
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600">PVBook Shop</h1>
            <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Search Bar */}
          <div className={`flex-1 w-full md:max-w-xl md:mx-8 ${isMobileMenuOpen ? "block" : "hidden md:block"}`}>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for books..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
              >
                <FiSearch className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* User Menu */}
          <div className={`flex items-center space-x-4 ${isMobileMenuOpen ? "block" : "hidden md:flex"}`}>
            <button className="relative p-2 hover:bg-gray-100 rounded-full">
              <BsCart3 className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>
            <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <CgProfile className="h-6 w-6 text-gray-600" />
                </div>
                <FiChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isDropdownOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Orders
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Log Out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Categories */}
        {/* <div className="border-t">
          <div
            className={`flex flex-col md:flex-row items-center md:justify-center space-y-2 md:space-y-0 md:space-x-8 py-3 ${
              isMobileMenuOpen ? "block" : "hidden md:flex"
            }`}
          >
            {categories.map((category, index) => (
              <button key={index} className="text-gray-600 hover:text-blue-600 whitespace-nowrap focus:outline-none">
                {category}
              </button>
            ))}
          </div>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
