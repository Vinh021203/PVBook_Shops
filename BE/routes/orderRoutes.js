const express = require("express");
const { createOrder, getAllOrders, updateOrder, deleteOrder } = require("../controllers/OrderController");
const { authenticateJWT } = require("../config/auth");

const router = express.Router();

// Định nghĩa các route cho đơn hàng
router.post("/", createOrder); // Tạo đơn hàng mới
router.get("/", getAllOrders); // Lấy danh sách đơn hàng
router.put("/:id", updateOrder); // Cập nhật đơn hàng
router.delete("/:id", deleteOrder); // Xóa đơn hàng

module.exports = router;
