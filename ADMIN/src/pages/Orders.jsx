import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlusCircle, FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Orders() {
  const [orders, setOrders] = useState([
    { id: "123456789012", customer: "John Doe", status: "Pending", date: "01-12-2024", total: 500000, product: "Sách JavaScript" },
    { id: "987654321098", customer: "Jane Smith", status: "Completed", date: "30-11-2024", total: 1200000, product: "Sách React" },
    { id: "345678901234", customer: "Alice Brown", status: "Pending", date: "29-11-2024", total: 300000, product: "Sách Node.js" },
    { id: "234567890123", customer: "Bob Johnson", status: "Completed", date: "28-11-2024", total: 750000, product: "Sách CSS" },
    // Thêm nhiều đơn hàng khác để kiểm tra phân trang
  ]);

  const [searchTerm, setSearchTerm] = useState(""); // Giá trị tìm kiếm
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: "", customer: "", status: "Pending", date: "", total: "", product: "" });
  const [currentOrder, setCurrentOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10; // Số lượng đơn hàng trên mỗi trang

  // Lọc đơn hàng theo tìm kiếm
  const filteredOrders = orders.filter(
    (order) =>
      order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Xử lý phân trang
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
  };

  const handleShowModal = (order = null) => {
    setCurrentOrder(order);
    setFormData(order ? { ...order } : { id: "", customer: "", status: "Pending", date: "", total: "", product: "" });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    if (!formData.customer || !formData.status || !formData.date || !formData.total || !formData.product) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (currentOrder) {
      setOrders(orders.map((order) => (order.id === currentOrder.id ? { ...order, ...formData } : order)));
      toast.success("Đơn hàng đã được cập nhật thành công!");
    } else {
      const newOrder = {
        ...formData,
        id: Date.now().toString(),
        date: new Date().toLocaleDateString("vi-VN"),
      };
      setOrders([...orders, newOrder]);
      toast.success("Đơn hàng đã được thêm thành công!");
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
    toast.success("Đơn hàng đã được xóa thành công!");
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Quản Lý Đơn Hàng</h2>

      {/* Thanh tìm kiếm */}
      <div className="mb-4 d-flex align-items-center">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Tìm kiếm theo tên sản phẩm hoặc khách hàng..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FaSearch size={20} />
      </div>

      {/* Danh sách đơn hàng */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Mã Đơn Hàng</th>
              <th>Tên Khách Hàng</th>
              <th>Sản Phẩm</th>
              <th>Trạng Thái</th>
              <th>Ngày</th>
              <th>Tổng</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.product}</td>
                <td>
                  <span
                    className={`badge ${order.status === "Completed" ? "bg-success" : "bg-warning text-dark"}`}
                  >
                    {order.status === "Completed" ? "Hoàn Thành" : "Chờ Xử Lý"}
                  </span>
                </td>
                <td>{order.date}</td>
                <td>{order.total.toLocaleString()} VND</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleShowModal(order)}
                  >
                    <FaEdit /> Sửa
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(order.id)}
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

      {/* Nút thêm đơn hàng */}
      <div className="mt-4 text-center">
        <button className="btn btn-success" onClick={() => handleShowModal()}>
          <FaPlusCircle /> Thêm Đơn Hàng
        </button>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentOrder ? "Sửa Đơn Hàng" : "Thêm Đơn Hàng"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCustomer">
              <Form.Label>Tên Khách Hàng</Form.Label>
              <Form.Control
                type="text"
                name="customer"
                value={formData.customer}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formProduct">
              <Form.Label>Tên Sản Phẩm</Form.Label>
              <Form.Control
                type="text"
                name="product"
                value={formData.product}
                onChange={handleChange}
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
                <option value="Pending">Chờ Xử Lý</option>
                <option value="Completed">Hoàn Thành</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formTotal">
              <Form.Label>Tổng Tiền</Form.Label>
              <Form.Control
                type="number"
                name="total"
                value={formData.total}
                onChange={handleChange}
              />
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

export default Orders;
