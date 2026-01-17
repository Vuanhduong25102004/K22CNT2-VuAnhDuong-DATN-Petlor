import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const DoctorRoute = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    // Chưa đăng nhập -> Chuyển về trang Login
    return <Navigate to="/login" replace />;
  }

  try {
    const user = jwtDecode(token);

    // Kiểm tra token hết hạn
    const currentTime = Date.now() / 1000;
    if (user.exp && user.exp < currentTime) {
      localStorage.removeItem("accessToken");
      return <Navigate to="/login" replace />;
    }

    // --- KIỂM TRA QUYỀN DOCTOR ---
    // Nếu bạn muốn ADMIN cũng vào được trang này thì dùng:
    // if (user.role === "DOCTOR" || user.role === "ADMIN")
    if (user.role === "DOCTOR") {
      return <Outlet />;
    } else {
      // Đã đăng nhập nhưng không phải Doctor -> Về trang chủ
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    // Token lỗi -> Xóa token và về Login
    localStorage.removeItem("accessToken");
    return <Navigate to="/login" replace />;
  }
};

export default DoctorRoute;
