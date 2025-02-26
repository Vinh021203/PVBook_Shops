// middlewares/accessControl.js
module.exports = (req, res, next) => {
    const source = req.headers["x-source"]; // Header để phân biệt nguồn
    if (source === "admin") {
      // Cho phép admin truy cập mà không cần token
      return next();
    } else if (source === "site") {
      // Yêu cầu xác thực nếu là site
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Token không tồn tại! Vui lòng đăng nhập." });
      }
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Token không hợp lệ!" });
        }
        req.user = decoded; // Lưu thông tin user từ token
        next();
      });
    } else {
      return res.status(400).json({ message: "Nguồn truy cập không hợp lệ." });
    }
  };
  