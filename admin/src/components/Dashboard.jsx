import React, { useState, useEffect } from "react";
import { useReport } from "../components/ReportContext";
import {
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaMoneyBill,
  FaClock,
  FaUserTie,
} from "react-icons/fa";

function Dashboard() {
  const { reportData } = useReport();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalEmployees: 0,
    monthlyRevenue: 0,
    pendingOrders: 0,
    totalCustomers: 0,
  });

  // Hiệu ứng tăng dần khi dữ liệu thay đổi
  useEffect(() => {
    const interval = 30; // Thời gian giữa mỗi lần tăng
    const duration = 1000; // Tổng thời gian (1 giây)
    const steps = duration / interval;

    // Tính toán bước tăng dần
    const increments = Object.keys(reportData).reduce((acc, key) => {
      acc[key] = (reportData[key] - stats[key]) / steps;
      return acc;
    }, {});

    let currentStats = { ...stats };

    const timer = setInterval(() => {
      let hasReachedTarget = true;
      const newStats = { ...currentStats };

      Object.keys(reportData).forEach((key) => {
        if (newStats[key] < reportData[key]) {
          hasReachedTarget = false;
          newStats[key] = Math.min(
            currentStats[key] + increments[key],
            reportData[key]
          );
        }
      });

      setStats(newStats);
      currentStats = newStats;

      if (hasReachedTarget) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer); // Cleanup khi component bị unmounted
  }, [reportData, stats]);

  // Khôi phục dữ liệu từ localStorage khi load trang
  useEffect(() => {
    const savedData = localStorage.getItem("reportData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setStats(parsedData); // Khôi phục trạng thái từ localStorage
    }
  }, []);

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
      <h2
        className="text-center font-bold text-3xl mb-6"
        style={{
          background: "linear-gradient(90deg, #007bff, #6610f2)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Dashboard Tổng Quan
      </h2>
      <div className="row g-4">
        {[
          {
            icon: <FaBox className="text-4xl mb-3" />,
            title: "Tổng Số Sản Phẩm",
            value: Math.floor(totalProducts),
            bgColor: "bg-primary",
          },
          {
            icon: <FaShoppingCart className="text-4xl mb-3" />,
            title: "Tổng Số Đơn Hàng",
            value: Math.floor(totalOrders),
            bgColor: "bg-success",
          },
          {
            icon: <FaUserTie className="text-4xl mb-3" />,
            title: "Tổng Số Nhân Viên",
            value: Math.floor(totalEmployees),
            bgColor: "bg-warning",
          },
          {
            icon: <FaUsers className="text-4xl mb-3" />,
            title: "Tổng Số Khách Hàng",
            value: Math.floor(totalCustomers),
            bgColor: "bg-info",
          },
        ].map((item, index) => (
          <div key={index} className="col-md-3">
            <div
              className={`card shadow-sm border-0 text-center text-white p-4 d-flex align-items-center justify-content-center ${item.bgColor}`}
              style={{
                height: "200px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              {item.icon}
              <h5 className="card-title">{item.title}</h5>
              <p className="fw-bold display-5">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <h3 className="text-center text-dark font-bold text-2xl mb-4">
          Chi Tiết Thống Kê
        </h3>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm p-4 d-flex align-items-center">
              <FaMoneyBill className="text-success text-5xl me-4" />
              <div>
                <h5 className="card-title text-muted mb-2">
                  Doanh Thu Tháng Này
                </h5>
                <p className="text-success fw-bold display-6">
                  ₫{Math.floor(monthlyRevenue).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-sm p-4 d-flex align-items-center">
              <FaClock className="text-danger text-5xl me-4" />
              <div>
                <h5 className="card-title text-muted mb-2">
                  Đơn Hàng Chờ Xử Lý
                </h5>
                <p className="text-danger fw-bold display-6">
                  {Math.floor(pendingOrders)} đơn
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
