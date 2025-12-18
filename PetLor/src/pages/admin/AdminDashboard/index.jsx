/**
 * @file index.jsx
 * @description Tổng quan Dashboard cho quản trị viên.
 */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import Mock Data
import { statsData, recentOrders, upcomingAppointments } from "./mockData";

// Import Components
import DashboardStats from "./components/DashboardStats";
import RecentOrders from "./components/RecentOrders";
import UpcomingAppointments from "./components/UpcomingAppointments";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra vai trò của người dùng khi component được render.
    // Nếu người dùng có vai trò là 'DOCTOR', chuyển hướng họ đến trang quản lý lịch hẹn.
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "DOCTOR") {
      navigate("/admin/appointments");
    }
  }, [navigate]);

  return (
    <>
      {/* Tiêu đề trang */}
      <div className="flex flex-wrap justify-between gap-3 mb-6">
        <p className="text-gray-900 text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
          Tổng quan Dashboard
        </p>
      </div>

      {/* Lưới hiển thị các thẻ thống kê */}
      <DashboardStats stats={statsData} />

      {/* Lưới chính chứa các phần Đơn hàng gần đây và Lịch hẹn sắp tới */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Phần: Đơn hàng gần đây */}
        <RecentOrders orders={recentOrders} />

        {/* Phần: Lịch hẹn sắp tới */}
        <UpcomingAppointments appointments={upcomingAppointments} />
      </div>
    </>
  );
};

export default AdminDashboard;
