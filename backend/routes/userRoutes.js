// const express = require("express");
// const { registerUser, loginUser, getUsers } = require("../controllers/userController");
// const authMiddleware = require("../middleware/auth");

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/", authMiddleware, getUsers);

// module.exports = router;

const express = require("express");
const { registerUser, loginUser, getUsers, forgotPassword } = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// API công khai
router.post("/register", registerUser); // Đăng ký
router.post("/login", loginUser); // Đăng nhập

router.get("/", getUsers); // Dùng trên giao diện Admin (cần xác thực)
router.post("/forgot-password", forgotPassword); // Quên mật khẩu
// router.post("/reset-password/:token", resetPassword); // Đặt lại mật khẩu

// API yêu cầu xác thực
router.get("/users", authMiddleware, getUsers); // Dùng trên giao diện bán hàng (không cần xác thực)

module.exports = router;
