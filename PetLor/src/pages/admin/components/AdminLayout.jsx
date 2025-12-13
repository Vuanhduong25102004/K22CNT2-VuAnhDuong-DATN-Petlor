import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authService from "../../../services/authService";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        const decodedUser = JSON.parse(jsonPayload);

        if (decodedUser.exp && decodedUser.exp < Date.now() / 1000) {
          handleLogout();
        } else {
          setUser(decodedUser);
        }
      } catch (error) {
        handleLogout();
      }
    } else {
      // Nếu không có token, đá về trang chủ hoặc login
      navigate("/login");
    }
  }, []);

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
