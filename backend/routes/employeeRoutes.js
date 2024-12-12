const express = require("express");
const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const router = express.Router();

// Lấy danh sách nhân viên
router.get("/", getEmployees);

// Thêm nhân viên mới
router.post("/", createEmployee);

// Cập nhật thông tin nhân viên
router.put("/:id", updateEmployee);

// Xóa nhân viên
router.delete("/:id", deleteEmployee);

module.exports = router;
