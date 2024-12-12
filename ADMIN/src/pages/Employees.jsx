import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlusCircle, FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../api/axios"; // Import API instance

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: "", name: "", position: "Nhân Viên", status: "Active" });
  const [currentEmployee, setCurrentEmployee] = useState(null);

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

  // Tìm kiếm
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Phân trang
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

  // Hiển thị modal
  const handleShowModal = (employee = null) => {
    setCurrentEmployee(employee);
    setFormData(employee ? { ...employee } : { id: "", name: "", position: "Nhân Viên", status: "Active" });
    setShowModal(true);
  };

  // Đóng modal
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ id: "", name: "", position: "Nhân Viên", status: "Active" });
  };

  // Thay đổi form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Lưu nhân viên (thêm mới hoặc cập nhật)
  const handleSave = async () => {
    if (!formData.name) {
      toast.error("Vui lòng nhập tên nhân viên!");
      return;
    }

    try {
      if (currentEmployee) {
        // Cập nhật nhân viên
        await axios.put(`/employees/${currentEmployee.id}`, formData);
        toast.success("Thông tin nhân viên đã được cập nhật!");
      } else {
        // Thêm nhân viên mới
        await axios.post("/employees", formData);
        toast.success("Nhân viên mới đã được thêm thành công!");
      }
      fetchEmployees(); // Refresh danh sách nhân viên
      handleCloseModal();
    } catch (error) {
      toast.error("Có lỗi xảy ra khi lưu nhân viên!");
      console.error(error);
    }
  };

  // Xóa nhân viên
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/employees/${id}`);
      toast.success("Nhân viên đã được xóa thành công!");
      fetchEmployees(); // Refresh danh sách nhân viên
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa nhân viên!");
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Quản Lý Nhân Viên</h2>

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

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Mã Nhân Viên</th>
              <th>Tên</th>
              <th>Chức Vụ</th>
              <th>Trạng Thái</th>
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
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleShowModal(employee)}
                  >
                    <FaEdit /> Sửa
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

      <div className="mt-4 text-center">
        <button className="btn btn-success" onClick={() => handleShowModal()}>
          <FaPlusCircle /> Thêm Nhân Viên
        </button>
      </div>

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
                onChange={handleChange}
                placeholder="Nhập tên nhân viên"
              />
            </Form.Group>
            <Form.Group controlId="formPosition">
              <Form.Label>Chức Vụ</Form.Label>
              <Form.Control
                as="select"
                name="position"
                value={formData.position}
                onChange={handleChange}
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
                onChange={handleChange}
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

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Employees;
