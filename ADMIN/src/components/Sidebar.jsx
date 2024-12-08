import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiHome, FiShoppingBag, FiLayers, FiBox, FiUsers, FiFileText, FiSettings, FiShoppingCart } from "react-icons/fi";

function Sidebar() {
  return (
    <>
      <style>
        {`
          .sidebar-link {
            font-size: 1rem;
            font-weight: 500;
            text-decoration: none;
            color: #f8f9fa;
            padding: 10px 15px;
            display: flex;
            align-items: center;
            border-radius: 5px;
            transition: background-color 0.3s, transform 0.3s, padding-left 0.3s;
          }
          .sidebar-link:hover {
            background-color: #ff9900;
            transform: scale(1.05);
            padding-left: 20px;
          }
          .sidebar ul {
            padding: 0;
            margin: 0;
            list-style: none;
          }
          .icon {
            margin-right: 10px;
            font-size: 1.25rem;
            color: #ffc107;
          }
          h3 {
            border-bottom: 2px solid #ff9900;
            padding-bottom: 5px;
            margin-bottom: 15px;
            font-size: 1.5rem;
            text-align: center;
            color: #f8f9fa;
          }
        `}
      </style>

      <div className="sidebar bg-dark p-3 h-100">
        <h3>Menu Quản Trị - Vinh đẹp trai</h3>
        <ul>
          <li className="mb-3">
            <Link to="/" className="sidebar-link">
              <FiHome className="icon" /> Bảng điều khiển
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/products" className="sidebar-link">
              <FiShoppingBag className="icon" /> Sản phẩm
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/categories" className="sidebar-link">
              <FiLayers className="icon" /> Danh mục
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/orders" className="sidebar-link">
              <FiBox className="icon" /> Đơn hàng
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/cart" className="sidebar-link">
              <FiShoppingCart className="icon" /> Giỏ hàng
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/employees" className="sidebar-link">
              <FiUsers className="icon" /> Nhân viên
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/customers" className="sidebar-link">
              <FiUsers className="icon" /> Khách hàng
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/reports" className="sidebar-link">
              <FiFileText className="icon" /> Báo cáo
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/settings" className="sidebar-link">
              <FiSettings className="icon" /> Cài đặt
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
