const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }, // Mã danh mục
    name: { type: String, required: true }, // Tên danh mục
    description: { type: String, required: true }, // Mô tả
    isActive: { type: Boolean, default: true }, // Trạng thái kích hoạt
    productCount: { type: Number, default: 0 }, // Số lượng sản phẩm trong danh mục
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
