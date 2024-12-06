const fs = require('fs');
const multer = require('multer');
const path = require('path');

// Tự động tạo thư mục nếu chưa tồn tại
const ensureUploadsDirExists = () => {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true }); // Tạo thư mục nếu chưa tồn tại
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        ensureUploadsDirExists(); // Kiểm tra thư mục trước khi lưu file
        const uploadPath = path.join(__dirname, '../uploads');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage });

module.exports = { upload: upload.single('image') };
