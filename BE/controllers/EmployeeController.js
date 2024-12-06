const Employee = require('../models/Employee');

// Create Employee
exports.createEmployee = async (req, res) => {
    try {
        const { employeeCode, name, role, status } = req.body;
        const newEmployee = await Employee.create({ employeeCode, name, role, status });
        res.status(201).json(newEmployee); // Trả về nhân viên vừa tạo
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees); // Trả về danh sách nhân viên
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
        res.status(200).json(updatedEmployee); // Trả về nhân viên đã cập nhật
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) return res.status(404).json({ message: 'Employee not found' });
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
