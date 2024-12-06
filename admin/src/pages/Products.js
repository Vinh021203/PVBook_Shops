import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", price: "", description: "", category: "", image: null });
  const [currentProduct, setCurrentProduct] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiBaseUrl = "http://localhost:5000/api/products";

  // Fetch products on load
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(apiBaseUrl);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Không thể tải danh sách sản phẩm. Vui lòng thử lại.");
    }
  };

  const handleShowModal = (product = null) => {
    setCurrentProduct(product);
    setFormData(product ? { ...product } : { name: "", price: "", description: "", category: "", image: null });
    setError("");
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setFormData({ ...formData, image: e.target.files[0] });

  const handleSave = async () => {
    if (!formData.name || !formData.price || !formData.description || !formData.category) {
        setError("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    try {
        setLoading(true);

        const formDataWithImage = new FormData();
        Object.keys(formData).forEach((key) => formDataWithImage.append(key, formData[key]));

        console.log("FormData being sent:", formData); // Log dữ liệu FormData

        if (currentProduct) {
            const response = await axios.put(`${apiBaseUrl}/${currentProduct._id}`, formDataWithImage, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setProducts(products.map((p) => (p._id === response.data._id ? response.data : p)));
        } else {
            const response = await axios.post(apiBaseUrl, formDataWithImage, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setProducts([...products, response.data]);
        }
        setShowModal(false);
    } catch (error) {
        console.error("Error saving product:", error); // Log lỗi từ API
        setError("Không thể lưu sản phẩm. Vui lòng thử lại.");
    } finally {
        setLoading(false);
    }
};

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiBaseUrl}/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Không thể xóa sản phẩm. Vui lòng thử lại.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">Quản Lý Sản Phẩm</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Mã Sản Phẩm</th>
              <th>Tên</th>
              <th>Hình Ảnh</th>
              <th>Giá</th>
              <th>Mô Tả</th>
              <th>Danh Mục</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.productCode}</td>
                <td>{product.name}</td>
                <td>
                  {product.image ? (
                    <img
                      src={`http://localhost:5000/${product.image}`} // Image path from backend
                      alt={product.name}
                      style={{ width: "100px", height: "100px" }}
                    />
                  ) : (
                    "Chưa có ảnh"
                  )}
                </td>
                <td>{product.price.toLocaleString()} VNĐ</td>
                <td>{product.description}</td>
                <td>{product.category?.name || "Không rõ"}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleShowModal(product)}>
                      Sửa
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product._id)}>
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button variant="success" onClick={() => handleShowModal()}>
        Thêm Sản Phẩm
      </Button>

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
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Products;
