import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "./userApi"; 

export const addToCartAPI = async (sanPhamId, soLuong = 1) => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    const userInfoString = await AsyncStorage.getItem("userInfo");

    if (!token || !userInfoString) {
      throw new Error("Vui lòng đăng nhập để mua hàng!");
    }

    const userInfo = JSON.parse(userInfoString);
    const userId = userInfo.userId;

    const payload = {
      userId: userId,
      sanPhamId: sanPhamId,
      soLuong: soLuong,
    };

    const response = await axios.post(`${BASE_URL}/api/gio-hang/me/add`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi gọi API Thêm giỏ hàng:", error);
    throw error;
  }
};

export const getCartAPI = async () => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    if (!token) return null;
    const response = await axios.get(`${BASE_URL}/api/gio-hang/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi lấy giỏ hàng:", error);
    throw error;
  }
};


export const getPromotionsAPI = async () => {
  try {

    const token = await AsyncStorage.getItem("accessToken");
    if (!token) {
      throw new Error("Vui lòng đăng nhập để xem khuyến mãi!");
    }

    const response = await axios.get(`${BASE_URL}/api/khuyen-mai`, {
      params: { size: 100 }, 
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy danh sách khuyến mãi:", error);
    throw error;
  }
};

export const updateCartItemAPI = async (sanPhamId, soLuongMoi) => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    if (!token) throw new Error("Vui lòng đăng nhập!");

    const payload = { soLuong: soLuongMoi };

    const response = await axios.put(
      `${BASE_URL}/api/gio-hang/me/update/${sanPhamId}`, 
      payload, 
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Lỗi cập nhật số lượng:", error);
    throw error;
  }
};

export const removeFromCartAPI = async (sanPhamId) => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    if (!token) throw new Error("Vui lòng đăng nhập!");

    const response = await axios.delete(
      `${BASE_URL}/api/gio-hang/me/remove/${sanPhamId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Lỗi xóa sản phẩm:", error);
    throw error;
  }
};