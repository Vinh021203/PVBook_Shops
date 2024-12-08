const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  position: { type: String, required: true, default: "Nhân Viên" },
  status: { type: String, required: true, default: "Active" },
});

module.exports = mongoose.model("Employee", employeeSchema);
