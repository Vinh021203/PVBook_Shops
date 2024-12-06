import React, { useState } from "react";

function Customers() {
  const [customers, setCustomers] = useState([
    { id: "C001", name: "Nguyễn Văn A", email: "nguyenvana@example.com", phone: "0901234567", address: "123 Nguyễn Trãi, TP.HCM", status: "Active" },
    { id: "C002", name: "Trần Thị B", email: "tranthib@example.com", phone: "0912345678", address: "456 Lê Lợi, Hà Nội", status: "Inactive" },
    { id: "C003", name: "Lê Minh C", email: "leminhc@example.com", phone: "0987654321", address: "789 Phan Đình Phùng, Đà Nẵng", status: "Active" },
    { id: "C004", name: "Phạm Thị D", email: "phamthid@example.com", phone: "0971234567", address: "101 Trần Hưng Đạo, Hải Phòng", status: "Inactive" },
    { id: "C005", name: "Bùi Quang E", email: "buiquange@example.com", phone: "0934567890", address: "202 Hồ Tùng Mậu, TP.HCM", status: "Active" },
    { id: "C006", name: "Đoàn Minh F", email: "doanminhf@example.com", phone: "0945678901", address: "303 Nguyễn Văn Linh, Bình Dương", status: "Inactive" },
    { id: "C007", name: "Vũ Thị G", email: "vuthig@example.com", phone: "0956789012", address: "404 Láng Hạ, Hà Nội", status: "Active" },
    { id: "C008", name: "Hoàng Anh H", email: "hoanganhh@example.com", phone: "0967890123", address: "505 Quang Trung, TP.HCM", status: "Active" },
    { id: "C009", name: "Nguyễn Thị I", email: "nguyenthii@example.com", phone: "0978901234", address: "606 Nguyễn Văn Cừ, Hà Nội", status: "Inactive" },
    { id: "C010", name: "Lâm Thanh J", email: "lamthanj@example.com", phone: "0989012345", address: "707 Võ Thị Sáu, Đà Nẵng", status: "Active" }
  ]);

  const handleDelete = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
  };

  const handleEdit = (id) => {
    alert(`Edit customer with ID: ${id}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">Quản Lý Khách Hàng</h2>

      {/* Bảng danh sách khách hàng */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Mã Khách Hàng</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th>Trạng Thái</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>
                <td>
                  <span
                    className={`badge ${
                      customer.status === "Active" ? "bg-success" : "bg-danger text-white"
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(customer.id)}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(customer.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Nút thêm khách hàng */}
      <div className="mt-4">
        <button
          className="btn btn-success"
          onClick={() => alert("Thêm khách hàng chưa được triển khai!")}
        >
          Thêm Khách Hàng
        </button>
      </div>
    </div>
  );
}

export default Customers;
