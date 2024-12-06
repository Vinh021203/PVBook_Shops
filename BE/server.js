require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

// Import các routes
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sử dụng các routes
app.use('/api/products', productRoutes); // API sản phẩm
app.use('/api/categories', categoryRoutes); // API danh mục
app.use('/api/orders', orderRoutes); // API đơn hàng
app.use('/api/employees', employeeRoutes); // API nhân viên
// app.use('/api/auth', authRoutes); // API xác thực

// Khởi chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
