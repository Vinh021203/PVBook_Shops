import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProductMenu, setShowProductMenu] = useState(false);

  const menuItems = [
    { id: 1, name: "Trang chủ", link: "/" },
    {
      id: 2,
      name: "Sản phẩm",
      link: "/products",
      subMenu: [
        { id: "col1", items: [
          { id: "1-1", name: "Điện thoại", link: "/products/phones" },
          { id: "1-2", name: "Máy tính", link: "/products/computers" },
        ]},
        { id: "col2", items: [
          { id: "2-1", name: "Phụ kiện", link: "/products/accessories" },
          { id: "2-2", name: "Thiết bị", link: "/products/devices" },
        ]}
      ]
    },
    { id: 3, name: "Sản phẩm khuyến mãi", link: "/promotions" },
    { id: 4, name: "Tin tức", link: "/news" },
    { id: 5, name: "Giới thiệu", link: "/about" },
    { id: 6, name: "Liên hệ", link: "/contact" },
    { id: 8, name: "Chính sách thành viên", link: "/member-policy" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-800 text-white w-full fixed top-[75px] z-50" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="hidden md:block w-full">
            <div className="flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <div key={item.id} className="relative group">
                  <a
                    href={item.link}
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors duration-200"
                    aria-current={item.link === "/" ? "page" : undefined}
                    onMouseEnter={() => item.id === 2 && setShowProductMenu(true)}
                    onMouseLeave={() => item.id === 2 && setShowProductMenu(false)}
                  >
                    {item.name}
                  </a>
                  {item.id === 2 && showProductMenu && (
                    <div 
                      className="absolute z-10 w-96 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      onMouseEnter={() => setShowProductMenu(true)}
                      onMouseLeave={() => setShowProductMenu(false)}
                    >
                      <div className="flex p-4">
                        {item.subMenu.map((column) => (
                          <div key={column.id} className="flex-1">
                            {column.items.map((subItem) => (
                              <a
                                key={subItem.id}
                                href={subItem.link}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                {subItem.name}
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
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

      <div
        className={`${isOpen ? "block" : "hidden"} md:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
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