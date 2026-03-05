import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const BASE_URL = "http://192.168.1.4:8080";

export const getCurrentUser = async () => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    
    if (!token) return null;

    const response = await axios.get(`${BASE_URL}/api/nguoi-dung/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API getCurrentUser:", error);
    throw error;
  }
};