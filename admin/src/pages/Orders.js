import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

function Orders() {
  // Dữ liệu giả cho danh sách đơn hàng với thông tin sản phẩm
  const [orders, setOrders] = useState([
    { id: "123456789012", customer: "John Doe", status: "Pending", date: "01-12-2024", total: 500000, product: "Sách JavaScript" },
    { id: "987654321098", customer: "Jane Smith", status: "Completed", date: "30-11-2024", total: 1200000, product: "Sách React" },
    { id: "345678901234", customer: "Alice Brown", status: "Pending", date: "29-11-2024", total: 300000, product: "Sách Node.js" },
    { id: "234567890123", customer: "Bob Johnson", status: "Completed", date: "28-11-2024", total: 750000, product: "Sách CSS" },
    // Các đơn hàng khác...
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [formData, setFormData] = useState({ customer: "", status: "", date: "", total: "", product: "" });
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const ordersPerPage = 10; // Số lượng đơn hàng hiển thị trên mỗi trang

  // Tính toán chỉ số bắt đầu và kết thúc của các đơn hàng trên trang hiện tại
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Tính toán số trang
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  // Hiển thị modal khi chỉnh sửa đơn hàng
  const handleShowModal = (order) => {
    setCurrentOrder(order);
    setFormData({ ...order });
    setError("");
    setShowModal(true);
  };

  // Đóng modal
  const handleCloseModal = () => setShowModal(false);

  // Thay đổi giá trị form
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Lưu đơn hàng mới hoặc cập nhật đơn hàng hiện tại
  const handleSave = () => {
    if (!formData.customer || !formData.status || !formData.date || !formData.total || !formData.product) {
      setError("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Cập nhật thời gian khi sửa đơn hàng
    const updatedOrder = { 
      ...formData, 
      date: new Date().toLocaleDateString('vi-VN'), // Cập nhật thời gian hiện tại theo định dạng tiếng Việt
      status: formData.status === "Pending" ? "Chờ Xử Lý" : "Hoàn Thành" // Chuyển trạng thái sang tiếng Việt
    };

    if (currentOrder) {
      setOrders(orders.map((order) => order.id === currentOrder.id ? { ...order, ...updatedOrder } : order));
    }

    setShowModal(false);
  };

  // Xóa đơn hàng
  const handleDelete = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">Quản Lý Đơn Hàng</h2>

      {/* Bảng danh sách đơn hàng */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Mã Đơn Hàng</th>
              <th>Tên Khách Hàng</th>
              <th>Tên Sản Phẩm</th>
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
                    className={`badge ${order.status === "Hoàn Thành" ? "bg-success" : "bg-warning text-dark"}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>{order.date}</td>
                <td>{order.total.toLocaleString()} VND</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleShowModal(order)}
                  >
                    Xem
                  </button>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleShowModal(order)}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(order.id)}
                  >
                    Xóa
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

      {/* Nút thêm đơn hàng */}
      <div className="mt-4">
        <button
          className="btn btn-success"
          onClick={() => handleShowModal({ id: "", customer: "", status: "", date: "", total: "", product: "" })}
        >
          Thêm Đơn Hàng
        </button>
      </div>

      {/* Modal chỉnh sửa đơn hàng */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentOrder ? "Sửa Đơn Hàng" : "Thêm Đơn Hàng"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group controlId="formCustomer">
              <Form.Label>Tên Khách Hàng</Form.Label>
              <Form.Control
                type="text"
                name="customer"
                value={formData.customer}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formProduct">
              <Form.Label>Tên Sản Phẩm</Form.Label>
              <Form.Control
                type="text"
                name="product"
                value={formData.product}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Trạng Thái</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Pending">Chờ Xử Lý</option>
                <option value="Completed">Hoàn Thành</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>Ngày</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formTotal">
              <Form.Label>Tổng Tiền</Form.Label>
              <Form.Control
                type="number"
                name="total"
                value={formData.total}
                onChange={handleChange}
                required
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
    </div>
  );
}

export default Orders;
