import React from "react";
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa token và trạng thái đăng nhập
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    // Điều hướng về trang login
    navigate("/login");
  };

  return (
    <div className="bg-primary text-white py-3 px-4 d-flex justify-content-between align-items-center shadow-sm">
      {/* Tên ứng dụng */}
      <h1 className="h5 mb-0 font-weight-bold">Shop Management</h1>

      {/* Thông tin Admin */}
      <div className="d-flex align-items-center">
        <span className="me-4 fw-bold">Admin</span>
        <button className="btn btn-danger px-4 py-2" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
