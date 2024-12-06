import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { FiHome, FiShoppingBag, FiLayers, FiBox, FiUsers, FiFileText, FiSettings } from "react-icons/fi"; // Import icon từ react-icons

function Sidebar() {
  return (
    <>
      {/* CSS trực tiếp trong JSX */}
      <style>
        {`
          /* Tùy chỉnh liên kết Sidebar */
          .sidebar-link {
            font-size: 1.25rem; /* Cỡ chữ hợp lý */
            font-weight: 500; /* Cân bằng giữa dày và nhẹ */
            text-decoration: none; /* Bỏ gạch chân */
            color: white; /* Màu chữ trắng */
            padding: 12px 20px;
            display: flex;
            align-items: center;
            border-radius: 5px;
            transition: background-color 0.3s ease, transform 0.3s ease, padding-left 0.3s ease;
          }

          /* Hiệu ứng hover */
          .sidebar-link:hover {
            background-color: #ff9900; /* Màu vàng khi hover */
            transform: scale(1.05); /* Tăng kích thước khi hover */
            padding-left: 30px; /* Đẩy mục menu sang trái khi hover */
          }

          /* Tạo khoảng cách đẹp cho sidebar */
          .sidebar ul {
            padding-left: 0;
            margin-bottom: 0;
          }

          /* Khoảng cách giữa icon và chữ */
          .sidebar-link .icon {
            margin-right: 15px; /* Khoảng cách giữa icon và chữ */
          }

          /* Thêm viền cho thẻ h3 */
          h3 {
            border-bottom: 2px solid #ff9900; /* Viền dưới màu vàng */
            padding-bottom: 10px;
            margin-bottom: 20px; /* Khoảng cách dưới của thẻ h3 */
            text-align: center; /* Căn giữa văn bản */
          }

          /* Hiệu ứng sidebar */
          .sidebar {
            transition: all 0.3s ease;
          }
        `}
      </style>

      <div className="sidebar bg-gradient text-white p-4 h-100" style={sidebarStyle}>
        <h3 className="text-white mb-6">Menu Quản Trị - Vinh đẹp trai</h3>
        <ul className="list-unstyled">
          <li className="mb-4">
            <Link to="/" className="sidebar-link">
              <FiHome className="mr-3 icon" /> Bảng điều khiển
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/products" className="sidebar-link">
              <FiShoppingBag className="mr-3 icon" /> Sản phẩm
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/categories" className="sidebar-link">
              <FiLayers className="mr-3 icon" /> Danh mục
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/orders" className="sidebar-link">
              <FiBox className="mr-3 icon" /> Đơn hàng
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/employees" className="sidebar-link">
              <FiUsers className="mr-3 icon" /> Nhân viên
            </Link>
          </li>
          {/* Thêm các mục mới */}
          <li className="mb-4">
            <Link to="/customers" className="sidebar-link">
              <FiUsers className="mr-3 icon" /> Khách hàng
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/reports" className="sidebar-link">
              <FiFileText className="mr-3 icon" /> Báo cáo
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/settings" className="sidebar-link">
              <FiSettings className="mr-3 icon" /> Cài đặt
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

const sidebarStyle = {
  background: 'linear-gradient(to right, #ff6f61, #ff4e50)', // Gradient màu cam nhẹ và đỏ
  fontFamily: 'Arial, sans-serif', // Sử dụng phông chữ Arial
  height: '100vh', // Full chiều cao của màn hình
};

export default Sidebar;
