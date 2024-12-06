const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productCode: { type: String, required: true, unique: true }, // Mã Sản Phẩm
    name: { type: String, required: true }, // Tên
    image: { type: String }, // Hình Ảnh
    price: { type: Number, required: true }, // Giá
    description: { type: String }, // Mô Tả
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Liên kết Danh Mục
    createdAt: { type: Date, default: Date.now }, // Ngày Thêm
});

module.exports = mongoose.model('Product', ProductSchema);
