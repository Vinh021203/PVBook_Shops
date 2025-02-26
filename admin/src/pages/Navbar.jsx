import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaSignOutAlt, FaPhoneAlt, FaBell } from "react-icons/fa";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user")); // Lấy thông tin user từ localStorage
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Trạng thái hiển thị modal

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    window.location.href = "/login"; // Chuyển hướng đến trang đăng nhập
  };

  const handleShowLogoutModal = () => setShowLogoutModal(true); // Hiển thị modal
  const handleCloseLogoutModal = () => setShowLogoutModal(false); // Đóng modal

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

      {/* Lời chào user, thông báo và nút logout */}
      <div className="d-flex align-items-center">
        {/* Chuông thông báo */}
        <div className="position-relative cursor-pointer me-3">
          <FaBell className="fs-4 text-light" />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            3
          </span>
        </div>

        {/* Avatar và chào user */}
        <div className="d-flex align-items-center me-3">
          <img
            src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/471202673_1573267496895704_27058025311994501_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFwakevCj2xqi3P8ChY8Wc0NfsLUwB6FR81-wtTAHoVH6ueqyJF5je4ctSCvd3Ndw1KmY6Mmhdjz_OBHx7BYEOg&_nc_ohc=dv_gAlYIraIQ7kNvgEMjAMI&_nc_oc=AdhnjDa2NGoES3NnDf4yIOGyzK9_cG6-76HehXelmJxXxHTNixqzvU6AygRs3aOd0Iw&_nc_zt=23&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AaQr-eZifR_ary-WNlPaj35&oh=00_AYDq6UYR8cq_rNe8clrz5hTm9IgyfFlITi0S8Z3mIc3IGg&oe=6781B75C"
            alt="Avatar"
            className="rounded-circle border border-white shadow-sm me-2"
            style={{ width: "40px", height: "40px" }}
          />
          <span className="fw-bold">{user ? `Chào, ${user.fullName}` : "Chào, Admin"}</span>
        </div>

        {/* Nút Logout */}
        <button
          className="btn btn-danger px-3 py-2 d-flex align-items-center hover:scale-105 transition-transform"
          onClick={handleShowLogoutModal}
          style={{
            transition: "all 0.3s ease-in-out",
          }}
        >
          <FaSignOutAlt className="me-2" />
          Logout
        </button>
      </div>

      {/* Modal xác nhận đăng xuất */}
      <Modal show={showLogoutModal} onHide={handleCloseLogoutModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xác Nhận Đăng Xuất</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn đăng xuất không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogoutModal}>
            Hủy
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Đăng Xuất
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Navbar;
