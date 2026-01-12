import axios from 'axios';

// 1. Tách URL gốc ra và EXPORT để các trang khác (như CartPage) dùng ghép link ảnh
export const SERVER_URL = 'http://localhost:8080';

// 2. URL dành riêng cho gọi API
const API_BASE_URL = `${SERVER_URL}/api`;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor Request: Thêm Token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor Response: Xử lý data và lỗi
apiClient.interceptors.response.use(
  (response) => response.data, 
  (error) => {
    const customError = error.response ? error.response.data : { message: error.message };
    return Promise.reject(customError);
  }
);

export default apiClient;