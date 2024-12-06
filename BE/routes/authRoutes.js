const express = require('express');
const { login, register } = require('../controllers/AuthController');

const router = express.Router();

// Định nghĩa các route cho xác thực
router.post('/login', login); // Đăng nhập
router.post('/register', register); // Đăng ký (Chỉ cho Admin khi cần bổ sung user)

module.exports = router;
