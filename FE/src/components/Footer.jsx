import React from "react";
import { FaFacebook, FaYoutube, FaGoogle } from "react-icons/fa";
import { SiZalo } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-green-50 to-green-100 text-gray-700 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Company Information */}
          <div className="space-y-6 p-6  rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-green-800 border-b border-green-200 pb-3">PVBook Shop</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              Chúng tôi tự hào là điểm đến lý tưởng cho những người yêu sách, mang đến cho bạn đọc một bộ sưu tập đa dạng các thể loại sách từ văn học, kinh doanh đến sách thiếu nhi. Với cam kết về chất lượng và dịch vụ, PVBook Shop luôn nỗ lực để mang đến trải nghiệm mua sắm sách tuyệt vời nhất.
            </p>
          </div>

          {/* Policies */}
          <div className="space-y-6 p-6  rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-green-800 border-b border-green-200 pb-3">Chính sách</h3>
            <ul className="space-y-3">
              <li className="hover:text-green-600 transition-colors duration-300 cursor-pointer flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Chính sách thành viên
              </li>
              <li className="hover:text-green-600 transition-colors duration-300 cursor-pointer flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Chính sách thanh toán
              </li>
              <li className="hover:text-green-600 transition-colors duration-300 cursor-pointer flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Hướng dẫn mua hàng
              </li>
              <li className="hover:text-green-600 transition-colors duration-300 cursor-pointer flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Bảo mật thông tin cá nhân
              </li>
              <li className="hover:text-green-600 transition-colors duration-300 cursor-pointer flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Quà tặng tri ân
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 p-6  rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-green-800 border-b border-green-200 pb-3">Liên hệ</h3>
            <div className="space-y-4">
              <p className="flex items-start space-x-3">
                <span className="font-medium min-w-[80px]">Địa chỉ:</span>
                <span className="text-gray-600">70 Lữ Gia, Phường 15, Quận 11, TP.HCM</span>
              </p>
              <p className="flex items-center space-x-3">
                <span className="font-medium min-w-[80px]">Điện thoại:</span>
                <a href="tel:1900-6750" className="text-gray-600 hover:text-green-600 transition-colors duration-300">1900-6750</a>
              </p>
              <p className="flex items-center space-x-3">
                <span className="font-medium min-w-[80px]">Email:</span>
                <a href="mailto:support@sapo.vn" className="text-gray-600 hover:text-green-600 transition-colors duration-300">support@sapo.vn</a>
              </p>
            </div>

            {/* Social Media Links */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Kết nối với chúng tôi</h4>
              <div className="flex space-x-6">
                <a href="#" className="text-3xl hover:text-green-600 transition-colors duration-300 transform hover:scale-110">
                  <SiZalo />
                </a>
                <a href="#" className="text-3xl hover:text-green-600 transition-colors duration-300 transform hover:scale-110">
                  <FaFacebook />
                </a>
                <a href="#" className="text-3xl hover:text-green-600 transition-colors duration-300 transform hover:scale-110">
                  <FaYoutube />
                </a>
                <a href="#" className="text-3xl hover:text-green-600 transition-colors duration-300 transform hover:scale-110">
                  <FaGoogle />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        {/* <div className="mt-16 pt-8 border-t border-green-200 text-center">
          <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} PVBook Shop. All rights reserved.</p>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;