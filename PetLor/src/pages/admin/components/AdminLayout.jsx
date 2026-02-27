import React, { useState, useEffect } from "react";
import useEscapeKey from "../../../hooks/useEscapeKey";
import { Outlet, useNavigate } from "react-router-dom";
import authService from "../../../services/authService";
import userService from "../../../services/userService";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { jwtDecode } from "jwt-decode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useWebSocket from "../../../hooks/useWebSocket";

const AdminLayout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    const fetchUserData = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          if (decodedToken.userId) {
            const fullUserData = await userService.getUserById(
              decodedToken.userId,
            );
            setUser(fullUserData);
          }
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu người dùng:", error);
          setUser(null);
        }
      }
    };

    fetchUserData();

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const token = localStorage.getItem("accessToken");
  const wsUser = user && token ? { token: token, role: user.role } : null;
  useWebSocket(wsUser);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate("/");
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background-light font-display text-text-main">
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      <AdminSidebar onLogout={handleLogout} />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <AdminHeader user={user} />

        <div
          id="admin-content-area"
          className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar"
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
