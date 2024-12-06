import React, { useState } from "react";

function Categories() {
  // Dữ liệu giả cho danh sách danh mục
  const [categories, setCategories] = useState([
    { id: "C001", name: "Sách Kỹ Năng Sống", description: "Các sách liên quan đến kỹ năng sống." },
    { id: "C002", name: "Sách Lịch Sử", description: "Các sách liên quan đến lịch sử Việt Nam và thế giới." },
    { id: "C003", name: "Sách Kinh Tế", description: "Các sách về kinh tế, tài chính, và quản trị." },
    { id: "C004", name: "Sách Giáo Dục", description: "Các sách giáo dục dành cho học sinh, sinh viên và giáo viên." },
    { id: "C005", name: "Sách Nghệ Thuật", description: "Các sách về nghệ thuật, âm nhạc, hội họa và sáng tạo." },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
  });
  const [error, setError] = useState(""); // Trạng thái lỗi

  const handleDelete = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleShowModal = (category = null) => {
    if (category) {
      setCurrentCategory(category);
      setFormData({
        id: category.id,
        name: category.name,
        description: category.description,
      });
    } else {
      setCurrentCategory(null);
      setFormData({ id: "", name: "", description: "" });
    }
    setError(""); // Reset lỗi khi mở modal
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Kiểm tra nếu tên và mô tả không hợp lệ
    if (!formData.name || !formData.description) {
      setError("Vui lòng điền đủ tên và mô tả!");
      
      // Ẩn thông báo sau 3 giây
      setTimeout(() => {
        setError("");
      }, 3000);

      return;
    }

    if (currentCategory) {
      // Cập nhật danh mục
      setCategories(
        categories.map((category) =>
          category.id === currentCategory.id ? { ...currentCategory, ...formData } : category
        )
      );
    } else {
      // Thêm danh mục mới
      setCategories([ 
        ...categories, 
        { id: formData.id, name: formData.name, description: formData.description } 
      ]);
    }
    setShowModal(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">Quản Lý Danh Mục</h2>

      {/* Bảng danh sách danh mục */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Mã Danh Mục</th>
              <th>Tên</th>
              <th>Mô Tả</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleShowModal(category)}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(category.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Nút thêm danh mục */}
      <div className="mt-4">
        <button
          className="btn btn-success"
          onClick={() => handleShowModal()}
        >
          Thêm Danh Mục
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" style={overlayStyle} onClick={handleCloseModal}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={modalDialogStyle}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-center">
                  {currentCategory ? "Cập Nhật Danh Mục" : "Thêm Danh Mục"}
                </h5>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger">{error}</div>} {/* Hiển thị lỗi */}

                <div className="form-group mb-4">
                  <label htmlFor="categoryId">Mã Danh Mục</label>
                  <input
                    type="text"
                    className="form-control"
                    id="categoryId"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    disabled={currentCategory !== null} // Disable edit when updating
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="categoryName">Tên Danh Mục</label>
                  <input
                    type="text"
                    className="form-control"
                    id="categoryName"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="categoryDescription">Mô Tả</label>
                  <textarea
                    className="form-control"
                    id="categoryDescription"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Đóng
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  {currentCategory ? "Cập Nhật" : "Thêm"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Style cho modal overlay và modal content
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền tối
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalDialogStyle = {
  backgroundColor: "#fff",
  borderRadius: "8px",
  padding: "30px",
  width: "600px", // Kích thước modal lớn hơn
};

export default Categories;
