require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

// Cấu hình CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Địa chỉ frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

const app = express();
connectDB();

app.use(cors(corsOptions)); // Áp dụng CORS
app.use(bodyParser.json());
app.use(express.static('uploads')); // Để cung cấp ảnh tĩnh từ thư mục 'uploads'

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
