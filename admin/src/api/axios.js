import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // Thay đổi URL này nếu backend của bạn dùng URL khác
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
