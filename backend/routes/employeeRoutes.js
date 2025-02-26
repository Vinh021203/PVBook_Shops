const express = require("express");
const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  updateSales,
} = require("../controllers/employeeController");

const router = express.Router();

// Lấy danh sách nhân viên
router.get("/", getEmployees);

// Thêm nhân viên mới
router.post("/", createEmployee);

// Cập nhật doanh số bán hàng
router.patch("/:id/sales", updateSales);

// Cập nhật thông tin nhân viên
router.put("/:id", updateEmployee);

// Xóa nhân viên
router.delete("/:id", deleteEmployee);

module.exports = router;
