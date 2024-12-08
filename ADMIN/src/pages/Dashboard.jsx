import React from "react";
import { FaBox, FaShoppingCart, FaUsers, FaMoneyBill, FaClock, FaUserTie } from "react-icons/fa";

function Dashboard() {
  const stats = {
    totalProducts: 50,
    totalOrders: 120,
    totalEmployees: 10,
    monthlyRevenue: 5000000,
    pendingOrders: 15,
    totalCustomers: 200,
  };

  const {
    totalProducts,
    totalOrders,
    totalEmployees,
    monthlyRevenue,
    pendingOrders,
    totalCustomers,
  } = stats;

  return (
    <div className="container py-5">
      <h2 className="text-center text-primary font-bold text-3xl mb-6">Dashboard Tổng Quan</h2>

      {/* Cards thống kê chính */}
      <div className="row g-4">
        {[
          {
            icon: <FaBox className="text-4xl mb-3" />,
            title: "Tổng Số Sản Phẩm",
            value: totalProducts,
            bgColor: "bg-primary",
          },
          {
            icon: <FaShoppingCart className="text-4xl mb-3" />,
            title: "Tổng Số Đơn Hàng",
            value: totalOrders,
            bgColor: "bg-success",
          },
          {
            icon: <FaUserTie className="text-4xl mb-3" />,
            title: "Tổng Số Nhân Viên",
            value: totalEmployees,
            bgColor: "bg-warning",
          },
          {
            icon: <FaUsers className="text-4xl mb-3" />,
            title: "Tổng Số Khách Hàng",
            value: totalCustomers,
            bgColor: "bg-info",
          },
        ].map((item, index) => (
          <div key={index} className="col-md-3">
            <div
              className={`card shadow-sm border-0 text-center text-white p-4 d-flex align-items-center justify-content-center ${item.bgColor}`}
              style={{ height: "200px" }} // Đặt chiều cao cố định để các khối bằng nhau
            >
              {item.icon}
              <h5 className="card-title">{item.title}</h5>
              <p className="fw-bold display-5">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chi tiết thống kê */}
      <div className="mt-5">
        <h3 className="text-center text-dark font-bold text-2xl mb-4">Chi Tiết Thống Kê</h3>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm p-4 d-flex align-items-center">
              <FaMoneyBill className="text-success text-5xl me-4" />
              <div>
                <h5 className="card-title text-muted mb-2">Doanh Thu Tháng Này</h5>
                <p className="text-success fw-bold display-6">
                  ₫{monthlyRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-sm p-4 d-flex align-items-center">
              <FaClock className="text-danger text-5xl me-4" />
              <div>
                <h5 className="card-title text-muted mb-2">Đơn Hàng Chờ Xử Lý</h5>
                <p className="text-danger fw-bold display-6">{pendingOrders} đơn</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
