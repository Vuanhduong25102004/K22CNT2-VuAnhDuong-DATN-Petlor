import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "./userApi";

export const getServicesAPI = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/dich-vu`);
    return response.data.content; 
  } catch (error) {
    console.error("Lỗi lấy danh sách dịch vụ:", error);
    throw error;
  }
};

export const getMyPetsAPI = async () => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    if (!token) throw new Error("Vui lòng đăng nhập!");

    const response = await axios.get(`${BASE_URL}/api/thu-cung/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Lỗi lấy danh sách thú cưng:", error);
    return [];
  }
};

export const createBookingAPI = async (bookingData) => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    const userInfoString = await AsyncStorage.getItem("userInfo");

    if (!token || !userInfoString) throw new Error("Vui lòng đăng nhập để đặt lịch!");

    const userInfo = JSON.parse(userInfoString);

    const payload = {
      ...bookingData,
      userId: userInfo.userId,
    };

    const response = await axios.post(`${BASE_URL}/api/lich-hen`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi đặt lịch hẹn:", error);
    throw error;
  }
};
export const getMyBookingHistoryAPI = async () => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    if (!token) throw new Error("Vui lòng đăng nhập!");

    const response = await axios.get(`${BASE_URL}/api/lich-hen/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Lỗi lấy lịch sử đặt lịch:", error);
    return [];
  }
};