const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.get("/", employeeController.getEmployees); // Định nghĩa GET /api/employees
router.post("/", employeeController.createEmployee); // Thêm nhân viên mới
router.put("/:id", employeeController.updateEmployee); // Cập nhật nhân viên
router.delete("/:id", employeeController.deleteEmployee); // Xóa nhân viên

module.exports = router;
