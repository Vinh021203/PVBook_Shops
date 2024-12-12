import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlusCircle, FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../api/axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    productCode: "",
    name: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  // Lấy danh sách sản phẩm và danh mục từ backend khi component được mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/products");
      setProducts(response.data);
    } catch (error) {
      toast.error("Lỗi khi tải sản phẩm từ server!");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/categories");
      setCategories(response.data);
    } catch (error) {
      toast.error("Lỗi khi tải danh mục từ server!");
    }
  };

  const handleShowModal = (product = null) => {
    setCurrentProduct(product);
    setFormData(
      product
        ? { ...product, category: product.category?._id || "" }
        : { productCode: "", name: "", price: "", description: "", category: "", image: null }
    );
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setFormData({ ...formData, image: e.target.files[0] });

  const handleSave = async () => {
    if (!formData.productCode || !formData.name || !formData.price || !formData.description || !formData.category) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      const formDataCopy = { ...formData };

      if (formData.image) {
        const formDataForUpload = new FormData();
        formDataForUpload.append("image", formData.image);

        const uploadResponse = await axios.post("/upload", formDataForUpload, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        formDataCopy.image = uploadResponse.data.imageUrl;
      }

      if (currentProduct) {
        await axios.put(`/products/${currentProduct._id}`, formDataCopy);
        toast.success("Sản phẩm đã được cập nhật thành công!");
      } else {
        await axios.post("/products", formDataCopy);
        toast.success("Sản phẩm mới đã được thêm thành công!");
      }

      fetchProducts();
      setShowModal(false);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi lưu sản phẩm!");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/products/${id}`);
      toast.success("Sản phẩm đã được xóa thành công!");
      fetchProducts();
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa sản phẩm!");
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Quản Lý Sản Phẩm</h2>

      {/* Thanh tìm kiếm */}
      <div className="mb-4 d-flex align-items-center">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Tìm kiếm theo tên, mã sản phẩm hoặc danh mục..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch size={20} />
      </div>

      {/* Bảng danh sách sản phẩm */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Mã Sản Phẩm</th>
              <th>Tên</th>
              <th>Hình Ảnh</th>
              <th>Giá</th>
              <th>Danh Mục</th>
              <th>Mô Tả</th>
              <th>Ngày Thêm</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.productCode}</td>
                <td>{product.name}</td>
                <td>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  ) : (
                    "Chưa có ảnh"
                  )}
                </td>
                <td>{product.price.toLocaleString()} VNĐ</td>
                <td>{product.category?.name || "Chưa có danh mục"}</td>
                <td>{product.description}</td>
                <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="d-flex align-items-center justify-content-center">
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleShowModal(product)}>
                      <FaEdit /> Sửa
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product._id)}>
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
          <FaPlusCircle /> Thêm Sản Phẩm
        </button>
      </div>

      {/* Modal Thêm/Sửa */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentProduct ? "Sửa Sản Phẩm" : "Thêm Sản Phẩm"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProductCode">
              <Form.Label>Mã Sản Phẩm</Form.Label>
              <Form.Control
                type="text"
                name="productCode"
                value={formData.productCode}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Tên Sản Phẩm</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Giá</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Mô Tả</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Danh Mục</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">-- Chọn danh mục --</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
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
          <Button variant="primary" onClick={handleSave}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Products;
