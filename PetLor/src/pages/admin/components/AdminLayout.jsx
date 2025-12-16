import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authService from "../../../services/authService";
import userService from "../../../services/userService";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          // 1. Decode token to get basic info (like ID)
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join("")
          );
          const decodedToken = JSON.parse(jsonPayload);

          if (decodedToken.exp && decodedToken.exp < Date.now() / 1000) {
            handleLogout();
            return; // Stop execution
          }

          // 2. Use the ID from token to fetch the full user profile from the database
          // (Assuming the token payload has a 'userId' field)
          if (decodedToken.userId) {
            const fullUserData = await userService.getUserById(
              decodedToken.userId
            );
            setUser(fullUserData); // 3. Set the full user object to state
          } else {
            setUser(decodedToken); // Fallback, though not ideal
          }
        } catch (error) {
          console.error("Lỗi xác thực hoặc tải dữ liệu người dùng:", error);
          handleLogout();
        }
      } else {
        // Nếu không có token, đá về trang chủ hoặc login
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate("/");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background-light font-display text-text-main">
      {/* Sidebar dùng chung */}
      <AdminSidebar onLogout={handleLogout} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header dùng chung */}
        <AdminHeader user={user} />

        {/* Nơi nội dung thay đổi sẽ hiển thị (Dashboard, Users, Orders...) */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
