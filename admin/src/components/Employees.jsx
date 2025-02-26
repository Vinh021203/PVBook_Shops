import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlusCircle, FaSearch, FaDollarSign } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../api/axios"; // Import API instance

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: "", name: "", position: "Nhân Viên", status: "Active", sales: 0 });
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [showSalesModal, setShowSalesModal] = useState(false);
  const [salesAmount, setSalesAmount] = useState(0);

  // Lấy danh sách nhân viên từ backend
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/employees");
      setEmployees(response.data);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách nhân viên!");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Tìm kiếm và phân trang
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Hiển thị và đóng modal
  const handleShowModal = (employee = null) => {
    setCurrentEmployee(employee);
    setFormData(employee ? { ...employee } : { id: "", name: "", position: "Nhân Viên", status: "Active", sales: 0 });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ id: "", name: "", position: "Nhân Viên", status: "Active", sales: 0 });
  };

  const handleShowSalesModal = (employee) => {
    setCurrentEmployee(employee);
    setSalesAmount(0);
    setShowSalesModal(true);
  };

  const handleCloseSalesModal = () => {
    setShowSalesModal(false);
    setSalesAmount(0);
  };

  // Cập nhật doanh thu
  const handleUpdateSales = async () => {
    if (salesAmount <= 0) {
      toast.error("Doanh thu phải lớn hơn 0!");
      return;
    }
    try {
      await axios.patch(`/employees/${currentEmployee.id}/sales`, { sales: salesAmount });
      toast.success("Doanh thu đã được cập nhật!");
      fetchEmployees();
      handleCloseSalesModal();
    } catch (error) {
      toast.error("Lỗi khi cập nhật doanh thu!");
      console.error(error);
    }
  };

  // Lưu nhân viên (thêm mới hoặc cập nhật)
  const handleSave = async () => {
    if (!formData.name || !formData.position || !formData.status) {
      toast.error("Vui lòng nhập đầy đủ thông tin nhân viên!");
      return;
    }
  
    try {
      // Xóa id khỏi formData nếu thêm mới nhân viên
      const dataToSend = { ...formData };
      if (!currentEmployee) {
        delete dataToSend.id;
      }
  
      console.log("Dữ liệu gửi đi:", dataToSend); // Kiểm tra dữ liệu gửi đi
  
      if (currentEmployee) {
        await axios.put(`/employees/${currentEmployee.id}`, dataToSend);
        toast.success("Thông tin nhân viên đã được cập nhật!");
      } else {
        await axios.post("/employees", dataToSend);
        toast.success("Nhân viên mới đã được thêm thành công!");
      }
  
      fetchEmployees();
      handleCloseModal();
    } catch (error) {
      if (error.response) {
        console.error("Phản hồi lỗi từ server:", error.response.data);
        toast.error(`Lỗi: ${error.response.data.message || "Có lỗi xảy ra khi lưu nhân viên!"}`);
      } else {
        console.error("Lỗi không xác định:", error);
        toast.error("Lỗi không xác định!");
      }
    }
  };
  
  // Xóa nhân viên
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/employees/${id}`);
      toast.success("Nhân viên đã được xóa thành công!");
      fetchEmployees();
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa nhân viên!");
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Quản Lý Nhân Viên</h2>

      {/* Báo cáo tổng quan */}
      <div className="mb-4 p-3 bg-light rounded shadow-sm">
        <h5 className="text-center">Báo Cáo Tổng Quan</h5>
        <p><strong>Tổng Doanh Thu:</strong> {employees.reduce((acc, emp) => acc + emp.sales, 0).toLocaleString()} VND</p>
        <p><strong>Nhân Viên Xuất Sắc Nhất:</strong> {employees.sort((a, b) => b.sales - a.sales)[0]?.name || "Không có dữ liệu"}</p>
        <p><strong>Tổng Số Nhân Viên:</strong> {employees.length}</p>
      </div>

      {/* Bộ lọc và tìm kiếm */}
      <div className="mb-4 d-flex align-items-center">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Tìm kiếm theo mã hoặc tên nhân viên..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FaSearch size={20} />
      </div>

      {/* Bảng nhân viên */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Mã Nhân Viên</th>
              <th>Tên</th>
              <th>Chức Vụ</th>
              <th>Trạng Thái</th>
              <th>Doanh Thu (VND)</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>
                  <span
                    className={`badge ${
                      employee.status === "Active" ? "bg-success" : "bg-danger text-white"
                    }`}
                  >
                    {employee.status === "Active" ? "Đang Làm Việc" : "Nghỉ Việc"}
                  </span>
                </td>
                <td>{employee.sales.toLocaleString()} VND</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleShowModal(employee)}
                  >
                    <FaEdit /> Sửa
                  </button>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleShowSalesModal(employee)}
                  >
                    <FaDollarSign /> Cập Nhật Doanh Thu
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(employee.id)}
                  >
                    <FaTrash /> Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Nút Thêm Nhân Viên */}
      <div className="mt-4 text-center">
        <button className="btn btn-success" onClick={() => handleShowModal()}>
          <FaPlusCircle /> Thêm Nhân Viên
        </button>
      </div>

      {/* Modal thêm/sửa nhân viên */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentEmployee ? "Cập Nhật Nhân Viên" : "Thêm Nhân Viên"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Tên Nhân Viên</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nhập tên nhân viên"
              />
            </Form.Group>
            <Form.Group controlId="formPosition">
              <Form.Label>Chức Vụ</Form.Label>
              <Form.Control
                as="select"
                name="position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              >
                <option value="Nhân Viên">Nhân Viên</option>
                <option value="Trưởng Phòng">Trưởng Phòng</option>
                <option value="Giám Đốc">Giám Đốc</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Trạng Thái</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Active">Đang Làm Việc</option>
                <option value="Inactive">Nghỉ Việc</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal cập nhật doanh thu */}
      <Modal show={showSalesModal} onHide={handleCloseSalesModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cập Nhật Doanh Thu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formSales">
              <Form.Label>Số Tiền (VND)</Form.Label>
              <Form.Control
                type="number"
                value={salesAmount}
                onChange={(e) => setSalesAmount(Number(e.target.value))}
                placeholder="Nhập số tiền doanh thu"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSalesModal}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleUpdateSales}>
            Cập Nhật
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Employees;
