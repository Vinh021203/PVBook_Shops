import React, { useState } from "react";
import { FaUser, FaPhone, FaMapMarkerAlt, FaClock, FaEnvelope } from "react-icons/fa";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    workingHours: ""
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Tên là bắt buộc";
    if (!formData.phone.trim()) {
      newErrors.phone = "Số điện thoại là bắt buộc";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Vui lòng nhập số điện thoại hợp lệ 10 chữ số";
    }
    if (!formData.address.trim()) newErrors.address = "Địa chỉ là bắt buộc";
    if (!formData.workingHours.trim()) newErrors.workingHours = "Thời gian làm việc là bắt buộc";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pb-2.5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cửa hàng PVBook Shops</h1>
          <p className="text-lg text-gray-600">Liên hệ với chúng tôi</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Store Information */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông tin cửa hàng</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Địa chỉ</h3>
                  <p className="text-gray-600">Hà Tu, Hạ Long, Quảng Ninh</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Thời gian làm việc</h3>
                  <p className="text-gray-600">8h - 22h</p>
                  <p className="text-gray-600">Từ thứ 2 đến chủ nhật</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Hotline</h3>
                  <p className="text-gray-600">0971.386.588</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-600">luongvinh01122003@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FaUser className="mr-2" /> Họ và tên
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.name ? "border-red-500" : "border-gray-300"}`}
                    placeholder="Nhập họ và tên"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FaPhone className="mr-2" /> Số điện thoại
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                    placeholder="Nhập số điện thoại"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FaMapMarkerAlt className="mr-2" /> Địa chỉ
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.address ? "border-red-500" : "border-gray-300"}`}
                    placeholder="Nhập địa chỉ của bạn"
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FaClock className="mr-2" /> Thời gian làm việc
                  </label>
                  <input
                    type="text"
                    name="workingHours"
                    value={formData.workingHours}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.workingHours ? "border-red-500" : "border-gray-300"}`}
                    placeholder="VD: 8h - 22h"
                  />
                  {errors.workingHours && <p className="mt-1 text-sm text-red-500">{errors.workingHours}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Gửi
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Map Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full min-h-[800px]">
            <iframe
              title="Halong Bay Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59558.13561936421!2d107.0501498!3d20.947777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a5796518cee87%3A0xa58bc0c92b209ce7!2zVOG6p24gxJDhu5ljLCBIYSBMb25nLCBRdeG6o25nIE5pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1645429738051!5m2!1svi!2s"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;