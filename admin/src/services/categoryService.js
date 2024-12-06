import axios from 'axios';

const API_URL = 'http://localhost:5000/api/categories';

// Lấy token JWT từ localStorage (hoặc nơi bạn lưu token sau khi đăng nhập)
const getToken = () => localStorage.getItem('token');

// Axios instance để thêm token tự động
const axiosInstance = axios.create({
  baseURL: API_URL,
});


// Interceptor thêm token vào tất cả request
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Lấy tất cả danh mục
export const fetchCategories = async () => {
  const response = await axiosInstance.get('/');
  return response.data;
};

// Tạo danh mục mới
export const createCategory = async (category) => {
  const response = await axiosInstance.post('/', category);
  return response.data;
};

// Cập nhật danh mục
export const updateCategory = async (id, updatedData) => {
  const response = await axiosInstance.put(`/${id}`, updatedData);
  return response.data;
};

// Xóa danh mục
export const deleteCategory = async (id) => {
  const response = await axiosInstance.delete(`/${id}`);
  return response.data;
};
