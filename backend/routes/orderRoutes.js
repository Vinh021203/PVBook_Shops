const express = require("express");
const {
  getAllOrders,
  getOrdersByUserId,
  createOrderFromCart,
  updateOrderStatus,
  deleteOrder,
  processQrPayment,
} = require("../controllers/orderController");

const router = express.Router();

// Lấy tất cả đơn hàng
router.get("/", getAllOrders);

// Lấy đơn hàng theo User ID
router.get("/:userId", getOrdersByUserId);

// Thêm vào orderRoutes.js
router.post("/process-qr-payment", processQrPayment);

// Tạo đơn hàng từ giỏ hàng
router.post("/", createOrderFromCart);

// Cập nhật trạng thái đơn hàng
router.put("/", updateOrderStatus);

// Xóa đơn hàng
router.delete("/:orderId", deleteOrder);

module.exports = router;
