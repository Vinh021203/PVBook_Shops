import React from "react";
import { FaSignOutAlt, FaPhoneAlt, FaUserCircle } from "react-icons/fa";

function Navbar() {
  const handleLogout = () => {
    alert("Bạn đã đăng xuất thành công!");
    // Điều hướng về trang đăng nhập nếu cần
    // window.location.href = "/login";
  };

  return (
    <div className="bg-primary text-white py-3 px-4 d-flex justify-content-between align-items-center shadow-sm">
      {/* Tên shop và số điện thoại */}
      <div className="d-flex align-items-center">
        <h1 className="h5 mb-0 fw-bold me-4 hover:underline cursor-pointer">PVBook Shop</h1>
        <div className="d-flex align-items-center">
          <FaPhoneAlt className="me-2 text-light" />
          <span className="fw-bold">0901234567</span>
        </div>
      </div>

      {/* Lời chào admin và nút logout */}
      <div className="d-flex align-items-center">
        {/* Avatar và chào admin */}
        <div className="d-flex align-items-center me-3">
          <FaUserCircle className="text-light" style={{ fontSize: "2rem" }} />
          <span className="fw-bold ms-2">Chào, Admin</span>
        </div>

        {/* Nút Logout */}
        <button
          className="btn btn-danger px-3 py-2 d-flex align-items-center hover:scale-105 transition-transform"
          onClick={handleLogout}
          style={{
            transition: "all 0.3s ease-in-out",
          }}
        >
          <FaSignOutAlt className="me-2" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
