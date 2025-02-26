import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 1, name: "Trang chủ", link: "/" },
    { id: 2, name: "Sản phẩm", link: "/products" },
    { id: 5, name: "Giới thiệu", link: "/introduction" },
    { id: 6, name: "Liên hệ", link: "/contact" },
    { id: 8, name: "Chính sách thành viên", link: "/memberpolicy" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-100 text-black-100 flex w-full fixed top-[70px] z-40" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Desktop Menu */}
          <div className="hidden md:block w-full">
            <div className="flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <div key={item.id} className="relative group">
                  <a
                    href={item.link}
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors duration-200"
                    aria-current={item.link === "/" ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown on the Right) */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden fixed top-[70px] right-0 w-64 h-screen bg-gray-100 shadow-lg z-50 transition-transform duration-300 ease-in-out`}
        id="mobile-menu"
      >
        <div className="px-2 pt-4 pb-3 space-y-1 sm:px-3">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={item.link}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors duration-200"
              aria-current={item.link === "/" ? "page" : undefined}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
