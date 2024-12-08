import React, { useState } from "react";

function Reports() {
  const [reportData, setReportData] = useState({
    startDate: "",
    endDate: "",
    revenue: 0,
    orders: 0,
    productsSold: 0,
  });

  const handleChange = (e) => {
    setReportData({ ...reportData, [e.target.name]: e.target.value });
  };

  const handleGenerateReport = () => {
    alert("Báo cáo được tạo thành công!");
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">Báo Cáo</h2>

      {/* Form báo cáo */}
      <div className="mb-4">
        <label className="form-label">Chọn thời gian</label>
        <div className="d-flex">
          <input
            type="date"
            name="startDate"
            className="form-control me-2"
            value={reportData.startDate}
            onChange={handleChange}
          />
          <input
            type="date"
            name="endDate"
            className="form-control"
            value={reportData.endDate}
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
          value={reportData.revenue}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Số đơn hàng</label>
        <input
          type="number"
          name="orders"
          className="form-control"
          value={reportData.orders}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Số lượng sản phẩm bán được</label>
        <input
          type="number"
          name="productsSold"
          className="form-control"
          value={reportData.productsSold}
          onChange={handleChange}
        />
      </div>

      {/* Nút tạo báo cáo */}
      <button className="btn btn-primary" onClick={handleGenerateReport}>
        Tạo Báo Cáo
      </button>
    </div>
  );
}

export default Reports;
