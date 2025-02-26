import React, { useState, useEffect  } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { FaUser, FaLock, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import axios from "../api/axios";

const AuthForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    setErrors({ ...errors, recaptcha: "" });
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // Handle forgot password input change
  const handleForgotPasswordChange = (e) => {
    setForgotPasswordEmail(e.target.value);
    setErrors({ ...errors, email: "" });
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!isLogin) {
      if (!formData.fullName) newErrors.fullName = "Họ và tên là bắt buộc";
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Mật khẩu không khớp";
      }
    }
    if (!formData.email) newErrors.email = "Email là bắt buộc";
    if (!formData.password) newErrors.password = "Mật khẩu là bắt buộc";
    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    if (!recaptchaToken) {
      newErrors.recaptcha = "Vui lòng hoàn thành reCAPTCHA";
    }
    return newErrors;
  };  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      try {
        if (isLogin) {
          const response = await axios.post("/users/login", {
            email: formData.email,
            password: formData.password,
          });
  
          if (!response.data.user || !response.data.user.id) {
            throw new Error("Phản hồi từ server không hợp lệ.");
          }
  
          setSuccessMessage("Đăng nhập thành công!");
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.user.id);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("isLoggedIn", true);
  
          setTimeout(() => {
            navigate(from);
          }, 1500);
        } else {
          await axios.post("/users/register", {
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            address: formData.address,
            recaptchaToken, // Token reCAPTCHA
          });
          setSuccessMessage("Đăng ký thành công! Chuyển sang đăng nhập...");
          setTimeout(() => {
            setIsLogin(true);
            setFormData({
              fullName: "",
              email: "",
              password: "",
              confirmPassword: "",
              phone: "",
              address: "",
            });
          }, 2000);
        }
      } catch (error) {
        console.error(error);
        setErrors({ form: error.response?.data?.message || "Đã xảy ra lỗi" });
      }
    } else {
      setErrors(newErrors);
    }
  };
  

  // Handle forgot password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotPasswordEmail) {
      setErrors({ email: "Vui lòng nhập email của bạn" });
      return;
    }
    try {
      const response = await axios.post("/users/forgot-password", {
        email: forgotPasswordEmail,
      });
      setSuccessMessage(response.data.message);
      setForgotPasswordEmail("");
      setIsForgotPassword(false);
    } catch (error) {
      console.error("Error Response:", error.response);
      setErrors({ form: error.response?.data?.message || "Đã xảy ra lỗi!" });
    }     
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8 flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="w-full md:w-1/2 p-4 md:p-8 space-y-6">
          {isForgotPassword ? (
            <>
              <h2 className="text-center text-2xl md:text-3xl font-extrabold text-gray-900">
                Quên mật khẩu
              </h2>
              {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                  {successMessage}
                </div>
              )}
              {errors.form && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                  {errors.form}
                </div>
              )}
              <form className="space-y-4" onSubmit={handleForgotPassword}>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    id="forgotPasswordEmail"
                    value={forgotPasswordEmail}
                    onChange={handleForgotPasswordChange}
                    className="w-full pl-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Nhập email của bạn"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Gửi yêu cầu
                </button>
              </form>
              <button
                onClick={() => setIsForgotPassword(false)}
                className="text-indigo-600 hover:text-indigo-500 mt-4 block text-center"
              >
                Quay lại đăng nhập
              </button>
            </>
          ) : (
            <>
              <h2 className="text-center text-2xl md:text-3xl font-extrabold text-gray-900">
                {isLogin ? "Đăng nhập tài khoản" : "Tạo tài khoản mới"}
              </h2>

              {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                  {successMessage}
                </div>
              )}

              {errors.form && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                  {errors.form}
                </div>
              )}

              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {!isLogin && (
                    <>
                      <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full pl-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Nhập họ và tên"
                        />
                      </div>

                      <div className="relative">
                        <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Nhập số điện thoại"
                        />
                      </div>

                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full pl-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Nhập địa chỉ"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Nhập địa chỉ email"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Nhập mật khẩu"
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                {!isLogin && (
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Xác nhận mật khẩu"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                    )}
                  </div>
                )}

                {/* Thêm reCAPTCHA tại đây */}
                <ReCAPTCHA
                  sitekey="6LfWdbMqAAAAAHSEq73aCffwiHQx2VfNx5C51NZS" // Thay bằng site key thật của bạn
                  onChange={handleRecaptchaChange}
                />
                {errors.recaptcha && <p className="text-red-500 text-sm">{errors.recaptcha}</p>}

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isLogin ? "Đăng nhập" : "Đăng ký"}
                </button>
              </form>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  {isLogin ? "Chưa có tài khoản? Đăng ký" : "Đã có tài khoản? Đăng nhập"}
                </button>
                <button
                  onClick={() => setIsForgotPassword(true)}
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  Quên mật khẩu?
                </button>
              </div>
            </>
          )}
        </div>

        <div className="hidden md:block w-full md:w-1/2 relative">
          <img
            src={
              isLogin
                ? "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                : "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            }
            alt="Auth"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
