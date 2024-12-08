import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlusCircle, FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Customers() {
  const [customers, setCustomers] = useState([
    { id: "C001", name: "Nguyễn Văn A", email: "nguyenvana@example.com", phone: "0901234567", status: "Active" },
    { id: "C002", name: "Trần Thị B", email: "tranthib@example.com", phone: "0912345678", status: "Inactive" },
    { id: "C003", name: "Lê Minh C", email: "leminhc@example.com", phone: "0987654321", status: "Active" },
    { id: "C004", name: "Phạm Thị D", email: "phamthid@example.com", phone: "0971234567", status: "Inactive" },
    { id: "C005", name: "Bùi Quang E", email: "buiquange@example.com", phone: "0934567890", status: "Active" },
    { id: "C006", name: "Đoàn Minh F", email: "doanminhf@example.com", phone: "0945678901", status: "Inactive" },
    { id: "C007", name: "Vũ Thị G", email: "vuthig@example.com", phone: "0956789012", status: "Active" },
    { id: "C008", name: "Hoàng Anh H", email: "hoanganhh@example.com", phone: "0967890123", status: "Active" },
    { id: "C009", name: "Nguyễn Thị I", email: "nguyenthii@example.com", phone: "0978901234", status: "Inactive" },
    { id: "C010", name: "Lâm Thanh J", email: "lamthanj@example.com", phone: "0989012345", status: "Active" },
  ]);

  const [searchTerm, setSearchTerm] = useState(""); // Giá trị tìm kiếm
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: "", name: "", email: "", phone: "", status: "Active" });
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const customersPerPage = 5; // Số khách hàng trên mỗi trang

  // Lọc khách hàng theo tìm kiếm
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Phân trang
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
  };

  const handleShowModal = (customer = null) => {
    setCurrentCustomer(customer);
    setFormData(
      customer
        ? { ...customer }
        : { id: "", name: "", email: "", phone: "", status: "Active" }
    );
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ id: "", name: "", email: "", phone: "", status: "Active" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Vui lòng điền đầy đủ thông tin khách hàng!");
      return;
    }

    if (currentCustomer) {
      // Cập nhật thông tin khách hàng
      setCustomers(
        customers.map((customer) =>
          customer.id === currentCustomer.id ? { ...customer, ...formData } : customer
        )
      );
      toast.success("Thông tin khách hàng đã được cập nhật!");
    } else {
      // Thêm khách hàng mới với ID duy nhất
      const newCustomer = {
        ...formData,
        id: `C${customers.length + 1}`.padStart(3, "0"),
      };
      setCustomers([...customers, newCustomer]);
      toast.success("Khách hàng mới đã được thêm thành công!");
    }

    handleCloseModal();
  };

  const handleDelete = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
    toast.success("Khách hàng đã được xóa thành công!");
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Quản Lý Khách Hàng</h2>

      {/* Thanh tìm kiếm */}
      <div className="mb-4 d-flex align-items-center">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Tìm kiếm khách hàng theo tên, email hoặc mã..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FaSearch size={20} />
      </div>

      {/* Bảng danh sách khách hàng */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Mã KH</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Trạng Thái</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>
                  <span
                    className={`badge ${customer.status === "Active" ? "bg-success" : "bg-danger text-white"}`}
                  >
                    {customer.status === "Active" ? "Đang Hoạt Động" : "Ngừng Hoạt Động"}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleShowModal(customer)}
                  >
                    <FaEdit /> Sửa
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(customer.id)}
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

      {/* Nút thêm khách hàng */}
      <div className="mt-4 text-center">
        <button className="btn btn-success" onClick={() => handleShowModal()}>
          <FaPlusCircle /> Thêm Khách Hàng
        </button>
      </div>

      {/* Modal thêm/sửa khách hàng */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentCustomer ? "Cập Nhật Khách Hàng" : "Thêm Khách Hàng"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập tên khách hàng"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập email"
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
              />
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Trạng Thái</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Đang Hoạt Động</option>
                <option value="Inactive">Ngừng Hoạt Động</option>
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

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Customers;
