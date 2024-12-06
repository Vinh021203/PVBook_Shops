import React, { useState } from "react";

function Settings() {
  const [settings, setSettings] = useState({
    storeName: "",
    contactEmail: "",
    password: "",
    language: "Vietnamese",
  });

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSaveSettings = () => {
    alert("Cài đặt đã được lưu!");
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">Cài Đặt</h2>

      {/* Form cài đặt */}
      <div className="mb-4">
        <label className="form-label">Tên cửa hàng</label>
        <input
          type="text"
          name="storeName"
          className="form-control"
          value={settings.storeName}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Email liên hệ</label>
        <input
          type="email"
          name="contactEmail"
          className="form-control"
          value={settings.contactEmail}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Mật khẩu</label>
        <input
          type="password"
          name="password"
          className="form-control"
          value={settings.password}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Chọn ngôn ngữ</label>
        <select
          name="language"
          className="form-select"
          value={settings.language}
          onChange={handleChange}
        >
          <option value="Vietnamese">Tiếng Việt</option>
          <option value="English">English</option>
        </select>
      </div>

      {/* Nút lưu cài đặt */}
      <button className="btn btn-success" onClick={handleSaveSettings}>
        Lưu Cài Đặt
      </button>
    </div>
  );
}

export default Settings;
