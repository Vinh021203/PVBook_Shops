const Employee = require("../models/employeeModel");

// Lấy danh sách nhân viên
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tải danh sách nhân viên!", error: error.message });
  }
};

// Thêm nhân viên mới
const createEmployee = async (req, res) => {
  try {
    const { name, position, status } = req.body;

    // Tự động tạo mã nhân viên
    const employeeCount = await Employee.countDocuments();
    const newEmployee = new Employee({
      id: `E${(employeeCount + 1).toString().padStart(3, "0")}`, // Tạo mã nhân viên E001, E002...
      name,
      position,
      status,
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi thêm nhân viên mới!", error: error.message });
  }
};

// Cập nhật nhân viên
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, status } = req.body;

    const updatedEmployee = await Employee.findOneAndUpdate(
      { id },
      { name, position, status },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Nhân viên không tồn tại!" });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi cập nhật nhân viên!", error: error.message });
  }
};

// Xóa nhân viên
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEmployee = await Employee.findOneAndDelete({ id });

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Nhân viên không tồn tại!" });
    }

    res.status(200).json({ message: "Nhân viên đã được xóa thành công!" });
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi xóa nhân viên!", error: error.message });
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
