import axios from 'axios';

export const SERVER_URL = 'http://localhost:8080';

const API_BASE_URL = `${SERVER_URL}/api`;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

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

apiClient.interceptors.response.use(
  (response) => response.data, 
  (error) => {
    const customError = error.response ? error.response.data : { message: error.message };
    return Promise.reject(customError);
  }
);

export default apiClient;