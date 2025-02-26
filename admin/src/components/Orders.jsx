import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import axios from "../api/axios";
import "react-toastify/dist/ReactToastify.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPendingOnly, setShowPendingOnly] = useState(false); // Chỉ hiển thị đơn hàng chờ duyệt
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    customer: "",
    status: "Pending",
    date: "",
    total: "",
    product: "",
  });
  const [currentOrder, setCurrentOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; // Số lượng đơn hàng trên mỗi trang

  const [totalRevenue, setTotalRevenue] = useState(0); // Tổng doanh thu

  // Lấy danh sách đơn hàng
  const fetchOrders = async () => {
    try {
      const response = await axios.get("/orders");
      setOrders(response.data);

      // Tính tổng doanh thu từ tất cả các đơn hàng
      const revenue = response.data.reduce(
        (acc, order) => acc + order.totalAmount,
        0
      );
      setTotalRevenue(revenue);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      toast.error("Không thể tải danh sách đơn hàng.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Lọc danh sách đơn hàng
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.items.some((item) =>
        item.productId.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) || order.userId.fullName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPending = showPendingOnly ? order.status === "Pending" : true;
    return matchesSearch && matchesPending;
  });

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

  const togglePendingView = () => {
    setShowPendingOnly((prev) => !prev); // Chuyển đổi giữa hiển thị tất cả và chỉ đơn hàng chờ duyệt
  };

  const handleShowModal = (order = null) => {
    setCurrentOrder(order);
    setFormData(
      order
        ? { ...order }
        : {
            id: "",
            customer: "",
            status: "Pending",
            date: "",
            total: "",
            product: "",
          }
    );
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      if (!formData.customer || !formData.status || !formData.total || !formData.product) {
        toast.error("Vui lòng điền đầy đủ thông tin!");
        return;
      }

      if (currentOrder) {
        const response = await axios.put(`/orders/${currentOrder._id}`, {
          ...formData,
        });
        toast.success(response.data.message || "Đơn hàng đã được cập nhật thành công!");
      } else {
        const response = await axios.post("/orders", {
          userId: "640b0b...", // Thay bằng ID người dùng thực tế
          items: [{ productId: formData.product, quantity: 1 }],
          totalAmount: formData.total,
        });
        toast.success(response.data.message || "Đơn hàng đã được thêm thành công!");
      }

      fetchOrders();
      setShowModal(false);
    } catch (error) {
      console.error("Lỗi khi lưu đơn hàng:", error);
      toast.error("Không thể lưu đơn hàng.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/orders/${id}`);
      toast.success(response.data.message || "Đơn hàng đã được xóa thành công!");
      fetchOrders();
    } catch (error) {
      console.error("Lỗi khi xóa đơn hàng:", error);
      toast.error("Không thể xóa đơn hàng.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Quản Lý Đơn Hàng</h2>

      {/* Tổng doanh thu */}
      <div className="mb-3">
        <h4 className="text-lg font-semibold">
          Tổng Doanh Thu: <span className="text-success">{totalRevenue.toLocaleString()} VND</span>
        </h4>
      </div>

      {/* Bộ lọc và tìm kiếm */}
      <div className="mb-4">
        <button
          className={`btn ${showPendingOnly ? "btn-primary" : "btn-outline-primary"} mb-2`}
          onClick={togglePendingView}
        >
          {showPendingOnly ? "Xem Tất Cả" : "Xem Chờ Duyệt"}
        </button>
        <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control flex-grow-1 me-3"
            placeholder="Tìm kiếm theo tên sản phẩm hoặc khách hàng..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FaSearch size={20} />
        </div>
      </div>

      {/* Bảng danh sách đơn hàng */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Mã Đơn Hàng</th>
              <th>Khách Hàng</th>
              <th>Sản Phẩm</th>
              <th>Trạng Thái</th>
              <th>Ngày</th>
              <th>Tổng</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order._id}>
                <td>{order.orderCode}</td>
                <td>{order.userId.fullName}</td>
                <td style={{ maxWidth: "230px" }} className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {order.items.map((item) => item.productId.name).join(", ")}
                </td>
                <td>
                  <span
                    className={`badge ${
                      order.status === "Completed" ? "bg-success" : "bg-warning text-dark"
                    }`}
                  >
                    {order.status === "Completed" ? "Hoàn Thành" : "Chờ Xử Lý"}
                  </span>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{order.totalAmount.toLocaleString()} VND</td>
                <td>
                  <div className="flex justify-start space-x-2">
                    <button
                      className="btn btn-warning btn-sm flex items-center space-x-1 m-2"
                      onClick={() => handleShowModal(order)}
                    >
                      <FaEdit />
                      <span>Sửa</span>
                    </button>
                    <button
                      className="btn btn-danger btn-sm flex items-center space-x-1"
                      onClick={() => handleDelete(order._id)}
                    >
                      <FaTrash />
                      <span>Xóa</span>
                    </button>
                  </div>
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

      {/* Modal Thêm/Sửa */}
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

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Orders;
