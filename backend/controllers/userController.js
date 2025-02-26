const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Đăng ký người dùng
const registerUser = async (req, res) => {
  const { fullName, email, password, phone, address } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "Họ tên, email và mật khẩu là bắt buộc!" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã được sử dụng!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      phone: phone || "",
      address: address || "",
    });

    await newUser.save();

    res.status(201).json({ message: "Tạo tài khoản thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo tài khoản!", error: error.message });
  }
};

// Đăng nhập người dùng
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email và mật khẩu là bắt buộc!" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email không tồn tại!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Mật khẩu không chính xác!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
      message: "Đăng nhập thành công!",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi đăng nhập!", error: error.message });
  }
};

// Lấy danh sách người dùng
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Loại bỏ mật khẩu
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách người dùng!", error: error.message });
  }
};

// Quên mật khẩu
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email là bắt buộc" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    // Reset mật khẩu về một giá trị mặc định
    const defaultPassword = "123456789";
    user.password = await bcrypt.hash(defaultPassword, 10); // Mã hóa mật khẩu mặc định
    await user.save();

    return res.status(200).json({
      message: "Mật khẩu đã được đặt lại thành mặc định: 123456789. Vui lòng đổi mật khẩu sau khi đăng nhập.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Đã xảy ra lỗi!" });
  }
};

// Đặt lại mật khẩu
// const resetPassword = async (req, res) => {
//   const { token } = req.params;
//   const { password } = req.body;

//   if (!password) {
//     return res.status(400).json({ message: "Mật khẩu mới là bắt buộc!" });
//   }

//   try {
//     const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

//     const user = await User.findOne({
//       resetPasswordToken: hashedToken,
//       resetPasswordExpires: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn!" });
//     }

//     // Cập nhật mật khẩu
//     user.password = await bcrypt.hash(password, 10);
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;
//     await user.save();

//     res.status(200).json({ message: "Đặt lại mật khẩu thành công!" });
//   } catch (error) {
//     res.status(500).json({ message: "Lỗi khi đặt lại mật khẩu!", error: error.message });
//   }
// };
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { fullName, email, phone, address, status } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { fullName, email, phone, address, status },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Người dùng không tồn tại!" });
    }

    res.status(200).json({ message: "Cập nhật thông tin thành công!", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật thông tin!", error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUsers, forgotPassword, updateUser };
