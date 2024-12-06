import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

function Products() {
  const [products, setProducts] = useState([
    { id: "SP001", name: "Sách Kỹ Năng Sống", price: 120000, description: "Sách về kỹ năng sống.", category: "Kỹ năng", image: "", date: "01/12/2024" },
    { id: "SP001", name: "Sách Kỹ Năng Sống", price: 120000, description: "Sách về kỹ năng sống.", category: "Kỹ năng", image: "", date: "01/12/2024" },
    { id: "SP001", name: "Sách Kỹ Năng Sống", price: 120000, description: "Sách về kỹ năng sống.", category: "Kỹ năng", image: "", date: "01/12/2024" },
    { id: "SP001", name: "Sách Kỹ Năng Sống", price: 120000, description: "Sách về kỹ năng sống.", category: "Kỹ năng", image: "", date: "01/12/2024" },
    { id: "SP001", name: "Sách Kỹ Năng Sống", price: 120000, description: "Sách về kỹ năng sống.", category: "Kỹ năng", image: "", date: "01/12/2024" },
    { id: "SP001", name: "Sách Kỹ Năng Sống", price: 120000, description: "Sách về kỹ năng sống.", category: "Kỹ năng", image: "", date: "01/12/2024" },
    // Các sản phẩm khác...
  ]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", price: "", description: "", category: "", image: null });
  const [currentProduct, setCurrentProduct] = useState(null);
  const [error, setError] = useState("");

  const handleShowModal = (product = null) => {
    setCurrentProduct(product);
    setFormData(product ? { ...product } : { name: "", price: "", description: "", category: "", image: null });
    setError("");
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setFormData({ ...formData, image: e.target.files[0] });

  const handleSave = () => {
    if (!formData.name || !formData.price || !formData.description || !formData.category || !formData.image) {
      setError("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const formattedDate = new Date().toLocaleDateString("vi-VN"); // Định dạng ngày theo kiểu Việt Nam (ngày/tháng/năm)
    
    const newProduct = { ...formData, id: `SP${(products.length + 1).toString().padStart(3, "0")}`, date: formattedDate };

    if (currentProduct) {
      setProducts(products.map(p => p.id === currentProduct.id ? { ...p, ...formData, date: formattedDate } : p));
    } else {
      setProducts([...products, newProduct]);
    }

    setShowModal(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">Quản Lý Sản Phẩm</h2>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Mã Sản Phẩm</th>
            <th>Tên</th>
            <th>Hình Ảnh</th>
            <th>Giá</th>
            <th>Mô Tả</th>
            <th>Danh Mục</th>
            <th>Ngày Thêm</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>
                {product.image ? (
                  <img
                    src={URL.createObjectURL(product.image)} // Hiển thị ảnh từ file
                    alt={product.name}
                    style={{ width: "100px", height: "100px" }}
                  />
                ) : (
                  "Chưa có ảnh"
                )}
              </td>
              <td>{product.price.toLocaleString()} VNĐ</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>{product.date}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleShowModal(product)}>Sửa</button>
                <button className="btn btn-danger btn-sm" onClick={() => setProducts(products.filter(p => p.id !== product.id))}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button variant="success" onClick={() => handleShowModal()}>Thêm Sản Phẩm</Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentProduct ? "Sửa Sản Phẩm" : "Thêm Sản Phẩm"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Tên Sản Phẩm</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Giá</Form.Label>
              <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Mô Tả</Form.Label>
              <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Danh Mục</Form.Label>
              <Form.Control type="text" name="category" value={formData.category} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Chọn Hình Ảnh</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Đóng</Button>
          <Button variant="primary" onClick={handleSave}>Lưu</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Products;
