import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlusCircle, FaCheck, FaTimes, FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Categories() {
  const [categories, setCategories] = useState([
    { id: "C001", name: "Sách Kỹ Năng Sống", description: "Các sách liên quan đến kỹ năng sống.", isActive: true, productCount: 20 },
    { id: "C002", name: "Sách Lịch Sử", description: "Các sách liên quan đến lịch sử Việt Nam và thế giới.", isActive: false, productCount: 15 },
    { id: "C003", name: "Sách Kinh Tế", description: "Các sách về kinh tế, tài chính, và quản trị.", isActive: true, productCount: 10 },
    // Thêm nhiều danh mục để kiểm tra phân trang
    ...Array.from({ length: 12 }, (_, i) => ({
      id: `C${i + 4}`.padStart(4, "0"),
      name: `Danh mục ${i + 4}`,
      description: `Mô tả danh mục ${i + 4}`,
      isActive: i % 2 === 0,
      productCount: Math.floor(Math.random() * 50),
    })),
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [formData, setFormData] = useState({ id: "", name: "", description: "", isActive: true });
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 5;

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Xử lý phân trang
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);
  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
    toast.success("Danh mục đã được xóa thành công!", { autoClose: 3000 });
  };

  const handleShowModal = (category = null) => {
    setCurrentCategory(category);
    setFormData(category ? { ...category } : { id: "", name: "", description: "", isActive: true });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.description) {
      toast.error("Vui lòng điền đủ tên và mô tả!");
      return;
    }

    if (currentCategory) {
      setCategories(
        categories.map((category) =>
          category.id === currentCategory.id ? { ...currentCategory, ...formData } : category
        )
      );
      toast.success("Danh mục đã được cập nhật thành công!", { autoClose: 3000 });
    } else {
      const newCategory = {
        ...formData,
        id: `C${categories.length + 1}`.padStart(4, "0"),
        productCount: 0,
      };
      setCategories([...categories, newCategory]);
      toast.success("Danh mục đã được thêm thành công!", { autoClose: 3000 });
    }

    setShowModal(false);
  };

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
                <td>{category.productCount}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleShowModal(category)}
                  >
                    <FaEdit /> Sửa
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(category.id)}>
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

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Categories;
