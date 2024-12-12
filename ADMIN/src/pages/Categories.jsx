import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlusCircle, FaCheck, FaTimes, FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../api/axios";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [formData, setFormData] = useState({ id: "", name: "", description: "", isActive: true });
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 5;

  // Lấy danh sách danh mục từ backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get("/categories");
      setCategories(response.data);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách danh mục!");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Tìm kiếm
  const handleSearch = (e) => setSearchTerm(e.target.value);

  // Phân trang
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Xóa danh mục
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/categories/${id}`);
      toast.success("Danh mục đã được xóa thành công!");
      fetchCategories();
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa danh mục!");
      console.error(error);
    }
  };

  // Hiển thị modal
  const handleShowModal = (category = null) => {
    setCurrentCategory(category);
    setFormData(category ? { ...category } : { id: "", name: "", description: "", isActive: true });
    setShowModal(true);
  };

  // Đóng modal
  const handleCloseModal = () => setShowModal(false);

  // Thay đổi form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Lưu danh mục (Thêm mới hoặc cập nhật)
  const handleSave = async () => {
    if (!formData.name || !formData.description) {
      toast.error("Vui lòng điền đủ tên và mô tả!");
      return;
    }

    try {
      if (currentCategory) {
        // Cập nhật danh mục
        await axios.put(`/categories/${currentCategory.id}`, formData);
        toast.success("Danh mục đã được cập nhật thành công!");
      } else {
        // Thêm danh mục mới
        await axios.post("/categories", formData);
        toast.success("Danh mục mới đã được thêm thành công!");
      }
      fetchCategories();
      setShowModal(false);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi lưu danh mục!");
      console.error(error);
    }
  };

  // Lọc và phân trang
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);
  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Quản Lý Danh Mục</h2>

      {/* Thanh tìm kiếm */}
      <div className="mb-4">
        <div className="input-group">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm danh mục..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Bảng danh mục */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Mã</th>
              <th>Tên Danh Mục</th>
              <th>Mô Tả</th>
              <th>Trạng Thái</th>
              <th>Sản Phẩm</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  {category.isActive ? (
                    <span className="text-success">
                      <FaCheck /> Kích hoạt
                    </span>
                  ) : (
                    <span className="text-danger">
                      <FaTimes /> Không kích hoạt
                    </span>
                  )}
                </td>
                <td>{category.productCount || 0}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleShowModal(category)}
                  >
                    <FaEdit /> Sửa
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(category.id)}
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

      {/* Nút thêm danh mục */}
      <div className="mt-4 text-center">
        <button className="btn btn-success" onClick={() => handleShowModal()}>
          <FaPlusCircle /> Thêm Danh Mục
        </button>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentCategory ? "Cập Nhật Danh Mục" : "Thêm Danh Mục"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Tên Danh Mục</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập tên danh mục"
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Mô Tả</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Nhập mô tả danh mục"
              />
            </Form.Group>
            <Form.Group controlId="formIsActive">
              <Form.Label>Trạng Thái</Form.Label>
              <Form.Check
                type="checkbox"
                name="isActive"
                label="Kích hoạt"
                checked={formData.isActive}
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

      {/* ToastContainer */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Categories;
