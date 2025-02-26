const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const nodemailer = require("nodemailer"); // Thêm Nodemailer
const connectDB = require("./config/db");

// Import routes
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config(); // Load biến môi trường
connectDB(); // Kết nối MongoDB

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Static files

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Contact API (Send email)
app.post("/api/contact", async (req, res) => {
  const { name, phone, address, workingHours } = req.body;

  // Validate form data
  if (!name || !phone || !address || !workingHours) {
    return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin!" });
  }

  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER, // Email của bạn từ .env
      pass: process.env.EMAIL_PASS, // Mật khẩu ứng dụng từ .env
    },
  });

  try {
    // Send email
    await transporter.sendMail({
      from: `"PVBook Shops" <${process.env.EMAIL_USER}>`, // Người gửi
      to: process.env.EMAIL_USER, // Người nhận
      subject: "Liên hệ từ người dùng", // Tiêu đề email
      text: `Tên: ${name}\nSố điện thoại: ${phone}\nĐịa chỉ: ${address}\nThời gian làm việc: ${workingHours}`, // Nội dung email
    });

    res.status(200).json({ message: "Email đã được gửi thành công!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi gửi email." });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Đã xảy ra lỗi!",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
