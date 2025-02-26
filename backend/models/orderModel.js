const mongoose = require("mongoose");

// Hàm tạo mã ngẫu nhiên
const generateOrderCode = () => {
  return Math.floor(100000000000 + Math.random() * 900000000000).toString();
};

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    orderCode: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Hook tạo mã đơn hàng trước khi lưu
orderSchema.pre("save", function (next) {
  if (!this.orderCode) {
    this.orderCode = generateOrderCode();
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);
