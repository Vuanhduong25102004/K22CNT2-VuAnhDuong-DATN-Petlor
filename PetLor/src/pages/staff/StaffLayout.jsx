import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import userService from "../../services/userService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useWebSocket from "../../hooks/useWebSocket";
import StaffSidebar from "./components/StaffSidebar";
import StaffHeader from "./components/StaffHeader";

const StaffLayout = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const userData = await userService.getMe();
        setUser(userData);
      } catch (err) {
        console.error("Lỗi lấy thông tin user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, []);

  const token = localStorage.getItem("accessToken");
  const wsUser = user && token ? { token: token, role: user.role } : null;
  useWebSocket(wsUser);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-white font-sans text-[#1A1C1E] overflow-hidden">
      <ToastContainer position="top-right" autoClose={5000} />

      <StaffSidebar user={user} />

      <main className="flex-1 flex flex-col overflow-hidden bg-[#F9FAFB] min-w-0">
        <StaffHeader user={user} />

        <div className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth">
          <Outlet context={{ user }} />
        </div>
      </main>
    </div>
  );
};

export default StaffLayout;
