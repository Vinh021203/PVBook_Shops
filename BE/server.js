const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load biến môi trường
dotenv.config();

// Kết nối MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" })); // Tăng giới hạn kích thước payload lên 10MB
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Cho phép xử lý payload lớn với form-urlencoded

// Routes
app.use("/api/products", require("./routes/productRoutes")); // Đường dẫn sản phẩm
app.use("/api/employees", require("./routes/employeeRoutes")); // Đường dẫn nhân viên

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server đang chạy tại http://localhost:${PORT}`));
