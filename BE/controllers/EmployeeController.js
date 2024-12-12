const Employee = require("../models/Employee");

// Lấy danh sách nhân viên
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách nhân viên", error: error.message });
  }
};

// Thêm nhân viên mới
exports.createEmployee = async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi thêm nhân viên mới", error: error.message });
  }
};

// Cập nhật thông tin nhân viên
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = await Employee.findOneAndUpdate({ id }, req.body, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Không tìm thấy nhân viên" });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi cập nhật nhân viên", error: error.message });
  }
};

// Xóa nhân viên
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findOneAndDelete({ id });
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Không tìm thấy nhân viên" });
    }
    res.status(200).json({ message: "Nhân viên đã được xóa" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa nhân viên", error: error.message });
  }
};
