// const express = require("express");
// const {
//   getProducts,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } = require("../controllers/productController");

// const router = express.Router();

// router.get("/", getProducts);
// router.post("/", createProduct);
// router.put("/:id", updateProduct);
// router.delete("/:id", deleteProduct);

// module.exports = router;
const fs = require("fs");

// Tạo thư mục uploads nếu chưa tồn tại
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const express = require("express");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Cấu hình Multer cho việc upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Thư mục lưu file
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên file với timestamp
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn kích thước file 5MB
  fileFilter: (req, file, cb) => {
    // Kiểm tra nếu không có file
    if (!file) {
      return cb(null, false); // Cho phép không có file
    }

    // Kiểm tra định dạng file
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Chỉ chấp nhận định dạng ảnh (jpeg, jpg, png, gif)!"));
    }
  },
});

// Endpoint upload file
router.post("/upload", upload.single("image"), (req, res) => {
  // Trường hợp không có file được tải lên
  if (!req.file) {
    return res.status(200).json({ message: "Không có file nào được tải lên!", imageUrl: null });
  }

  // Trả về URL của file được tải lên
  res.status(200).json({ imageUrl: `/uploads/${req.file.filename}` });
});

// CRUD Sản phẩm
router.get("/", getProducts); // Lấy danh sách sản phẩm
router.post("/", createProduct); // Thêm sản phẩm mới
router.put("/:id", updateProduct); // Cập nhật sản phẩm theo ID
router.delete("/:id", deleteProduct); // Xóa sản phẩm theo ID

module.exports = router;

