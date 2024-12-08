import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaTrash, FaEdit, FaShoppingCart, FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: "1", name: "Sản phẩm A", quantity: 2, price: 100000 },
    { id: "2", name: "Sản phẩm B", quantity: 1, price: 200000 },
    { id: "3", name: "Sản phẩm C", quantity: 3, price: 150000 },
  ]);

  const [searchTerm, setSearchTerm] = useState(""); // Giá trị tìm kiếm
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: "", name: "", quantity: "", price: "" });
  const [currentItem, setCurrentItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Lọc sản phẩm theo tìm kiếm
  const filteredItems = cartItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleShowModal = (item = null) => {
    setCurrentItem(item);
    setFormData(
      item
        ? { ...item }
        : { id: "", name: "", quantity: "", price: "" }
    );
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    if (!formData.name || !formData.quantity || !formData.price) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (currentItem) {
      // Cập nhật sản phẩm
      setCartItems(
        cartItems.map((item) =>
          item.id === currentItem.id ? { ...item, ...formData, quantity: parseInt(formData.quantity, 10), price: parseInt(formData.price, 10) } : item
        )
      );
      toast.success("Sản phẩm đã được cập nhật!");
    } else {
      // Thêm sản phẩm mới
      const newItem = {
        ...formData,
        id: Date.now().toString(),
        quantity: parseInt(formData.quantity, 10),
        price: parseInt(formData.price, 10),
      };
      setCartItems([...cartItems, newItem]);
      toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast.success("Sản phẩm đã được xóa!");
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
         Giỏ Hàng
      </h2>

      {/* Thanh tìm kiếm */}
      <div className="mb-4 d-flex align-items-center">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
          }}
        />
        <FaSearch size={20} />
      </div>

      {/* Bảng danh sách sản phẩm */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên Sản Phẩm</th>
              <th>Số Lượng</th>
              <th>Giá (VND)</th>
              <th>Tổng (VND)</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price.toLocaleString()}</td>
                <td>{(item.quantity * item.price).toLocaleString()}</td>
                <td>
                  <div className="d-flex align-items-center justify-content-center">
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleShowModal(item)}
                    >
                      <FaEdit /> Sửa
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaTrash /> Xóa
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

      {/* Nút thêm sản phẩm */}
      <div className="mt-4 text-center">
        <button className="btn btn-success" onClick={() => handleShowModal()}>
          <FaShoppingCart className="me-2" /> Thêm Sản Phẩm
        </button>
      </div>

      {/* Modal thêm/sửa sản phẩm */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentItem ? "Sửa Sản Phẩm" : "Thêm Sản Phẩm"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Tên Sản Phẩm</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập tên sản phẩm"
              />
            </Form.Group>
            <Form.Group controlId="formQuantity">
              <Form.Label>Số Lượng</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Nhập số lượng"
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Giá</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Nhập giá sản phẩm"
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

export default Cart;
