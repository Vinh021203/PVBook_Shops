import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { BsCart3 } from "react-icons/bs";
import axios from "../api/axios";

const Header = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Fetch cart count
  useEffect(() => {
    const fetchCartCount = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setCartCount(0);
        return;
      }

      try {
        const response = await axios.get(`/cart/${userId}`);
        const items = response.data.items || [];
        const totalCount = items.reduce((total, item) => total + item.quantity, 0);
        setCartCount(totalCount);
      } catch (error) {
        console.error("Error fetching cart count:", error);
        setCartCount(0);
      }
    };

    fetchCartCount();
  }, []);

  // Fetch suggestions
  const fetchSuggestions = async (keyword) => {
    try {
      const response = await axios.get(`/products/suggestions`, {
        params: { keyword },
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    navigate(`/product/book-detail/${suggestion._id}`);
    setSearchQuery("");
    setSuggestions([]);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("Logged out.");
    setIsDropdownOpen(false);
    navigate("/");
  };

  const handleDropdownOptionClick = (action) => {
    setIsDropdownOpen(false);
    if (action === "profile") navigate("/profile");
    if (action === "orders") navigate("/orderstatus");
    if (action === "logout") handleLogout();
    setTimeout(() => {
      window.location.reload();
      window.scrollTo(0, 0); // Cuộn lên đầu sau khi điều hướng
    }, 0);
  };

  return (
    <header className="bg-white shadow-lg w-full z-50 fixed top-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center py-4 space-y-4 md:space-y-0">
          {/* Logo */}
          <div className="flex items-center w-full md:w-auto justify-between">
            <Link to="/">
              <h1 className="text-2xl md:text-3xl font-bold text-blue-600">PVBook Shop</h1>
            </Link>
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Search bar */}
          <div
            className={`flex-1 w-full md:max-w-xl md:mx-8 ${
              isMobileMenuOpen ? "block" : "hidden md:block"
            }`}
          >
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for books..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                value={searchQuery}
                onChange={handleInputChange}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500"
                >
                  ✖
                </button>
              )}
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
              >
                <FiSearch className="w-5 h-5" />
              </button>
              {searchQuery && (
                <ul className="absolute w-full bg-white border border-gray-300 mt-2 rounded-lg shadow-lg z-10">
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion._id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion.name} - {suggestion.author}
                    </li>
                  ))}
                </ul>
              )}
            </form>
          </div>

          {/* Cart and profile icons */}
          <div
            className={`flex items-center space-x-4 ${
              isMobileMenuOpen ? "block" : "hidden md:flex"
            }`}
          >
            <button 
              className="relative p-2 hover:bg-gray-100 rounded-full"
              onClick={() => {
                setTimeout(() => {
                  window.scrollTo(0, 0); // Cuộn lên đầu
                }, 0);
              }}
            >
              <Link to="/shoppingcart">
                <BsCart3 className="h-6 w-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              </Link>
            </button>
            
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
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
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-[60]">
                  {isLoggedIn ? (
                    <>
                      <span className="block px-4 py-2 text-sm text-gray-700">
                        Xin chào, {user?.fullName}
                      </span>
                      <button
                        onClick={() => handleDropdownOptionClick("profile")}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Thông tin tài khoản
                      </button>
                      <button
                        onClick={() => handleDropdownOptionClick("orders")}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Đơn hàng của tôi
                      </button>
                      <button
                        onClick={() => handleDropdownOptionClick("logout")}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Đăng xuất
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        navigate("/authform");
                        setTimeout(() => {
                          window.location.reload();
                          window.scrollTo(0, 0); // Cuộn lên đầu sau khi điều hướng
                        }, 0);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Đăng nhập
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
