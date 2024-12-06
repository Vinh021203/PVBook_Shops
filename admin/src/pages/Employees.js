import React, { useState } from "react";

function Employees() {
  // Dữ liệu giả cho danh sách nhân viên
  const [employees, setEmployees] = useState([
    { id: "E001", name: "Nguyễn Văn A", position: "Giám Đốc", status: "Active" },
    { id: "E002", name: "Trần Thị B", position: "Trưởng Phòng Kinh Doanh", status: "Inactive" },
    { id: "E003", name: "Lê Minh C", position: "Nhân Viên Bán Hàng", status: "Active" },
    { id: "E004", name: "Phạm Thị D", position: "Trợ Lý", status: "Inactive" },
    { id: "E005", name: "Bùi Quang E", position: "Lập Trình Viên", status: "Active" },
    { id: "E006", name: "Đoàn Minh F", position: "Kế Toán", status: "Inactive" },
    { id: "E007", name: "Vũ Thị G", position: "Nhân Viên Marketing", status: "Active" },
    { id: "E008", name: "Hoàng Anh H", position: "Giám Sát", status: "Active" },
    { id: "E009", name: "Nguyễn Thị I", position: "Nhân Viên Hỗ Trợ Khách Hàng", status: "Inactive" },
    { id: "E010", name: "Lâm Thanh J", position: "Chuyên Viên Phát Triển Sản Phẩm", status: "Active" }
  ]);

  const handleDelete = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const handleEdit = (id) => {
    alert(`Edit employee with ID: ${id}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">Quản Lý Nhân Viên</h2>

      {/* Bảng danh sách nhân viên */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Mã Nhân Viên</th>
              <th>Tên</th>
              <th>Chức Vụ</th>
              <th>Trạng Thái</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>
                  <span
                    className={`badge ${
                      employee.status === "Active"
                        ? "bg-success"
                        : "bg-danger text-white"
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(employee.id)}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Nút thêm nhân viên */}
      <div className="mt-4">
        <button
          className="btn btn-success"
          onClick={() => alert("Thêm nhân viên chưa được triển khai!")}
        >
          Thêm Nhân Viên
        </button>
      </div>
    </div>
  );
}

export default Employees;
