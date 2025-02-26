const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }, // Mã nhân viên
    name: { type: String, required: true }, // Tên nhân viên
    position: { type: String, required: true, enum: ["Nhân Viên", "Trưởng Phòng", "Giám Đốc"] }, // Chức vụ
    status: { type: String, required: true, enum: ["Active", "Inactive"] }, // Trạng thái
    sales: { type: Number, default: 0 },
  },
  { timestamps: true } // Thêm createdAt và updatedAt tự động
);

module.exports = mongoose.model("Employee", employeeSchema);
