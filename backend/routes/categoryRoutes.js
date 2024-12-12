const express = require("express");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

// CRUD Danh mục
router.get("/", getCategories); // Lấy danh sách danh mục
router.post("/", createCategory); // Thêm danh mục mới
router.put("/:id", updateCategory); // Cập nhật danh mục
router.delete("/:id", deleteCategory); // Xóa danh mục

module.exports = router;
