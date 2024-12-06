import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCreditCard, FaLock, FaCalendarAlt, FaPaypal, FaMoneyBillWave } from "react-icons/fa";

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paypalEmail: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập địa chỉ email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ giao hàng";
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Vui lòng chọn phương thức thanh toán";
    }

    if (formData.paymentMethod === "card") {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = "Vui lòng nhập số thẻ";
      } else if (!/^[0-9]{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
        newErrors.cardNumber = "Số thẻ không hợp lệ";
      }
      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = "Vui lòng nhập ngày hết hạn";
      }
      if (!formData.cvv.trim()) {
        newErrors.cvv = "Vui lòng nhập mã CVV";
      } else if (!/^[0-9]{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = "Mã CVV không hợp lệ";
      }
    }

    if (formData.paymentMethod === "paypal" && !formData.paypalEmail.trim()) {
      newErrors.paypalEmail = "Vui lòng nhập email PayPal";
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      // Process payment logic here
    } else {
      setErrors(newErrors);
    }
    setIsSubmitting(false);
  };

  const InputField = ({ icon: Icon, label, name, type = "text", placeholder, value, onChange, error }) => (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"}`}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );

  const renderPaymentFields = () => {
    switch (formData.paymentMethod) {
      case "card":
        return (
          <div>
            <InputField
              icon={FaCreditCard}
              label="Số Thẻ"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={handleInputChange}
              error={errors.cardNumber}
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                icon={FaCalendarAlt}
                label="Ngày Hết Hạn"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleInputChange}
                error={errors.expiryDate}
              />
              <InputField
                icon={FaLock}
                label="Mã CVV"
                name="cvv"
                type="password"
                placeholder="123"
                value={formData.cvv}
                onChange={handleInputChange}
                error={errors.cvv}
              />
            </div>
          </div>
        );
      case "paypal":
        return (
          <InputField
            icon={FaPaypal}
            label="Email PayPal"
            name="paypalEmail"
            type="email"
            placeholder="paypal@email.com"
            value={formData.paypalEmail}
            onChange={handleInputChange}
            error={errors.paypalEmail}
          />
        );
      case "cod":
        return (
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">Bạn sẽ thanh toán khi nhận hàng</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">Trang Thanh Toán</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            icon={FaUser}
            label="Họ và Tên"
            name="fullName"
            placeholder="Nguyễn Văn A"
            value={formData.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />
          <InputField
            icon={FaEnvelope}
            label="Địa chỉ Email"
            name="email"
            type="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <InputField
            icon={FaPhone}
            label="Số Điện Thoại"
            name="phone"
            placeholder="0123456789"
            value={formData.phone}
            onChange={handleInputChange}
            error={errors.phone}
          />
          <InputField
            icon={FaMapMarkerAlt}
            label="Địa chỉ Giao Hàng"
            name="address"
            placeholder="Số nhà, Đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố"
            value={formData.address}
            onChange={handleInputChange}
            error={errors.address}
          />

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Phương Thức Thanh Toán</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === "card"}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600"
                />
                <label htmlFor="card" className="flex items-center space-x-2">
                  <FaCreditCard className="text-gray-600" />
                  <span>Thẻ ATM</span>
                </label>
              </div>

              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  checked={formData.paymentMethod === "paypal"}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600"
                />
                <label htmlFor="paypal" className="flex items-center space-x-2">
                  <FaPaypal className="text-gray-600" />
                  <span>PayPal</span>
                </label>
              </div>

              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  id="cod"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === "cod"}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600"
                />
                <label htmlFor="cod" className="flex items-center space-x-2">
                  <FaMoneyBillWave className="text-gray-600" />
                  <span>Thanh toán khi nhận hàng</span>
                </label>
              </div>
            </div>

            {errors.paymentMethod && (
              <p className="mt-1 text-sm text-red-500">{errors.paymentMethod}</p>
            )}

            <div className="mt-6">{renderPaymentFields()}</div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Đang xử lý..." : "Thanh Toán"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;