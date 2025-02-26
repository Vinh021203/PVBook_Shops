import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaEye, FaSearch, FaEdit } from "react-icons/fa";
import axios from "../api/axios";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [editCustomer, setEditCustomer] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5;

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers(response.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách khách hàng!", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const generateCustomerCode = (index) =>
    `KH${(index + 1).toString().padStart(3, "0")}`;

  const filteredCustomers = customers.filter((customer, index) => {
    const customerCode = generateCustomerCode(index);
    return (
      customerCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleShowModal = (customer) => {
    setCurrentCustomer(customer);
    setShowModal(true);
  };

  const handleShowEditModal = (customer) => {
    setEditCustomer(customer);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentCustomer(null);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditCustomer({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateCustomer = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `/users/${editCustomer._id}`,
        editCustomer,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCustomers(); // Refresh data
      setShowEditModal(false);
      alert(response.data.message);
    } catch (error) {
      console.error("Lỗi khi cập nhật khách hàng!", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Quản Lý Khách Hàng</h2>

      <div className="mb-4 d-flex align-items-center">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Tìm kiếm khách hàng theo mã, tên hoặc email..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FaSearch size={20} />
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Mã KH</th>
              <th style={{ width: "20%" }}>Tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer, index) => (
              <tr key={customer._id}>
                <td>{generateCustomerCode(indexOfFirstCustomer + index)}</td>
                <td style={{ whiteSpace: "normal", wordWrap: "break-word" }}>{customer.fullName}</td>
                <td>{customer.email}</td>
                <td>{customer.phone || "N/A"}</td>
                <td>{customer.address || "N/A"}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleShowModal(customer)}
                  >
                    <FaEye /> Xem
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleShowEditModal(customer)}
                  >
                    <FaEdit /> Sửa
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
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thông Tin Khách Hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentCustomer ? (
            <div>
              <p>
                <strong>Mã KH:</strong> {generateCustomerCode(customers.findIndex((c) => c._id === currentCustomer._id))}
              </p>
              <p>
                <strong>Tên:</strong> {currentCustomer.fullName}
              </p>
              <p>
                <strong>Email:</strong> {currentCustomer.email}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {currentCustomer.phone || "N/A"}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {currentCustomer.address || "N/A"}
              </p>
            </div>
          ) : (
            <p>Không có thông tin khách hàng để hiển thị.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa Thông Tin Khách Hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={editCustomer.fullName || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editCustomer.email || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={editCustomer.phone || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={editCustomer.address || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={editCustomer.status || "Active"}
                onChange={handleEditChange}
              >
                <option value="Active">Đang Hoạt Động</option>
                <option value="Inactive">Ngừng Hoạt Động</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleUpdateCustomer}>
            Cập Nhật
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Customers;
