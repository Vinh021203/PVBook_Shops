import React from "react";
import { FaSignOutAlt, FaPhoneAlt, FaBell } from "react-icons/fa";

function Navbar() {
  const handleLogout = () => {
    alert("Bạn đã đăng xuất thành công!");
    window.location.href = "/login";
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

      {/* Lời chào admin, thông báo và nút logout */}
      <div className="d-flex align-items-center">
        {/* Chuông thông báo */}
        <div className="position-relative cursor-pointer me-3">
          <FaBell className="fs-4 text-light" />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            3
          </span>
        </div>

        {/* Avatar và chào admin */}
        <div className="d-flex align-items-center me-3">
          <img
            src="https://via.placeholder.com/40"
            alt="Avatar"
            className="rounded-circle border border-white shadow-sm me-2"
            style={{ width: "40px", height: "40px" }}
          />
          <span className="fw-bold">Chào, Admin</span>
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