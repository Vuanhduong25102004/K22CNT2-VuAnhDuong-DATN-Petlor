import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    // Chưa đăng nhập -> Chuyển về trang login
    return <Navigate to="/login" replace />;
  }

  try {
    // Giải mã JWT Payload (phần ở giữa token)
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    const user = JSON.parse(jsonPayload);

    // Kiểm tra thời gian hết hạn (exp)
    const currentTime = Date.now() / 1000;
    if (user.exp && user.exp < currentTime) {
      localStorage.removeItem("accessToken");
      return <Navigate to="/login" replace />;
    }

    // Kiểm tra quyền ADMIN
    if (user.role === "ADMIN") {
      return <Outlet />;
    } else {
      // Đã đăng nhập nhưng không phải Admin -> Về trang chủ
      return <Navigate to="/admin/dashboard" replace />;
    }
  } catch (error) {
    // Token lỗi -> Xóa token và về login
    localStorage.removeItem("accessToken");
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;
