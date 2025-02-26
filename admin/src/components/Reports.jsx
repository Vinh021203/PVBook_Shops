import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReport } from "../components/ReportContext";
import { Modal, Button } from "react-bootstrap";

function Reports() {
  const navigate = useNavigate();
  const { setReportData } = useReport();
  const [showModal, setShowModal] = useState(false);
  const [localReportData, setLocalReportData] = useState({
    startDate: "",
    endDate: "",
    revenue: 0,
    orders: 0,
    productsSold: 0,
    pendingOrders: 0,
    totalEmployees: 0,
    totalCustomers: 0,
  });

  const handleChange = (e) => {
    setLocalReportData({
      ...localReportData,
      [e.target.name]: Number(e.target.value) || e.target.value,
    });
  };

  const handleGenerateReport = () => {
    setReportData((prev) => ({
      ...prev,
      monthlyRevenue: localReportData.revenue,
      totalOrders: localReportData.orders,
      totalProducts: localReportData.productsSold,
      pendingOrders: localReportData.pendingOrders,
      totalEmployees: localReportData.totalEmployees,
      totalCustomers: localReportData.totalCustomers,
    }));
    setShowModal(true); // Hiển thị modal sau khi tạo báo cáo
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/"); // Chuyển hướng về Dashboard
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">Báo Cáo</h2>
      <div className="mb-4">
        <label className="form-label">Chọn thời gian</label>
        <div className="d-flex">
          <input
            type="date"
            name="startDate"
            className="form-control me-2"
            value={localReportData.startDate}
            onChange={handleChange}
          />
          <input
            type="date"
            name="endDate"
            className="form-control"
            value={localReportData.endDate}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="form-label">Doanh thu</label>
        <input
          type="number"
          name="revenue"
          className="form-control"
          value={localReportData.revenue}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="form-label">Số đơn hàng</label>
        <input
          type="number"
          name="orders"
          className="form-control"
          value={localReportData.orders}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="form-label">Số lượng sản phẩm bán được</label>
        <input
          type="number"
          name="productsSold"
          className="form-control"
          value={localReportData.productsSold}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="form-label">Đơn Hàng Chờ Xử Lý</label>
        <input
          type="number"
          name="pendingOrders"
          className="form-control"
          value={localReportData.pendingOrders}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="form-label">Tổng Số Nhân Viên</label>
        <input
          type="number"
          name="totalEmployees"
          className="form-control"
          value={localReportData.totalEmployees}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="form-label">Tổng Số Khách Hàng</label>
        <input
          type="number"
          name="totalCustomers"
          className="form-control"
          value={localReportData.totalCustomers}
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleGenerateReport}>
        Tạo Báo Cáo
      </button>

      {/* Modal thông báo */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thông Báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Báo cáo đã được tạo thành công!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Đồng Ý
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Reports;
