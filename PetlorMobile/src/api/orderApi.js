import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "./userApi";

export const createOrderAPI = async (orderData) => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    const userInfoString = await AsyncStorage.getItem("userInfo");

    if (!token || !userInfoString) throw new Error("Vui lòng đăng nhập!");

    const userInfo = JSON.parse(userInfoString);
    const userId = userInfo.userId;

    const payload = {
      ...orderData,
      userId: userId,
    };

    const response = await axios.post(`${BASE_URL}/api/don-hang`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi tạo đơn hàng:", error);
    throw error;
  }
};

export const getMyOrdersAPI = async () => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    if (!token) throw new Error("Vui lòng đăng nhập!");

    const response = await axios.get(`${BASE_URL}/api/don-hang/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = Array.isArray(response.data) ? response.data : [];
    return data.sort((a, b) => new Date(b.ngayDatHang) - new Date(a.ngayDatHang));
  } catch (error) {
    console.error("Lỗi lấy danh sách đơn hàng:", error);
    return [];
  }
};