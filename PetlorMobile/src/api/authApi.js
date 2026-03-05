import axios from 'axios';

const API_URL = 'http://192.168.1.4:8080/api/auth'; 

export const loginAPI = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; 
  } catch (error) {
    throw error.response ? error.response.data : new Error('Không thể kết nối tới server');
  }
};