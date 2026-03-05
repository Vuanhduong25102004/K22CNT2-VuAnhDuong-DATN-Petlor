import axios from "axios";

export const BASE_URL = "http://192.168.1.4:8080";


export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/san-pham`, {
      params: {
        page: 0,
        size: 1000, 
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Lỗi gọi API getAllProducts:", error);
    throw error; 
  }
};