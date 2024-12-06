const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    employeeCode: { type: String, required: true, unique: true }, // Mã Nhân Viên
    name: { type: String, required: true }, // Tên
    role: { type: String, required: true }, // Chức Vụ
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }, // Trạng Thái
});

module.exports = mongoose.model('Employee', EmployeeSchema);
