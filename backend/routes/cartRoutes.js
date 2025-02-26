const express = require("express");
const {
  addItemToCart,
  getCartByUserId,
  removeItemFromCart,
  getAllCarts, // Import thêm hàm này
  updateCart,
} = require("../controllers/cartController");

const router = express.Router();

// @route   GET /api/cart
// @desc    Lấy tất cả giỏ hàng
router.get("/", getAllCarts);

// @route   POST /api/cart
// @desc    Thêm sản phẩm vào giỏ hàng
router.post("/", addItemToCart);
router.post("/update", updateCart);

// @route   GET /api/cart/:userId
// @desc    Lấy giỏ hàng của một user
router.get("/:userId", getCartByUserId);

// @route   DELETE /api/cart/:userId/:itemId
// @desc    Xóa sản phẩm khỏi giỏ hàng
router.delete("/:userId/:itemId", removeItemFromCart);

module.exports = router;
