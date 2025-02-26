const mongoose = require("mongoose");

// Định nghĩa schema cho giỏ hàng
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Liên kết với User
      ref: "User", // Tham chiếu đến bảng User
      required: true, // Bắt buộc phải có userId
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId, // Liên kết với Product
          ref: "Product", // Tham chiếu đến bảng Product
          required: true, // Bắt buộc phải có productId
        },
        quantity: {
          type: Number, // Số lượng sản phẩm
          required: true, // Bắt buộc phải có quantity
          min: 1, // Giá trị nhỏ nhất là 1
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now, // Thời gian tạo giỏ hàng
    },
  },
  { timestamps: true } // Tự động thêm thời gian tạo và cập nhật
);

module.exports = mongoose.model("Cart", cartSchema);
