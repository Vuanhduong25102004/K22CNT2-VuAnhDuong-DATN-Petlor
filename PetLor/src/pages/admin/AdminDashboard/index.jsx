/**
 * @file index.jsx
 * @description Tổng quan Dashboard - Đã fix lỗi hiển thị Đơn hàng & Lịch hẹn.
 */
import React, { useEffect, useState } from "react";
import useEscapeKey from "../../../hooks/useEscapeKey";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Services
import userService from "../../../services/userService";
import bookingService from "../../../services/bookingService";
import orderService from "../../../services/orderService";

// Utils
import { formatCurrency } from "../../../utils/formatters";

// Components
import DashboardStats from "./components/DashboardStats";
import RecentOrders from "./components/RecentOrders";
import UpcomingAppointments from "./components/UpcomingAppointments";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // State dữ liệu
  const [stats, setStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "DOCTOR") {
      navigate("/admin/appointments");
    } else {
      fetchAllData();
    }
  }, [navigate]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [userRes, staffRes, petRes, apptRes, orderRes] = await Promise.all([
        userService.getAllUsers({ page: 0, size: 1000 }),
        userService.getAllStaff({ page: 0, size: 1000 }),
        bookingService.getAllPets({ page: 0, size: 1000 }),
        bookingService.getAllAppointments({ page: 0, size: 1000 }),
        orderService.getAllOrders({ page: 0, size: 1000 }),
      ]);

      // --- CHUẨN BỊ DỮ LIỆU ---
      const allOrders = orderRes?.content || [];
      const allAppts = apptRes?.content || [];
      const now = new Date();

      // Lấy mốc thời gian là 00:00 sáng nay (để không bị ẩn các lịch hẹn sáng nay)
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      // --- PHẦN 1: THỐNG KÊ (STATS) ---
      const totalUsers =
        userRes?.content?.filter((u) => u.role === "USER").length || 0;
      const totalStaff = staffRes?.totalElements || 0;
      const totalPets = petRes?.totalElements || 0;

      // Đơn hàng tháng này
      const ordersThisMonth = allOrders.filter((o) => {
        if (!o.ngayDatHang) return false;
        const d = new Date(o.ngayDatHang);
        return (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      }).length;

      // Doanh thu (Dựa trên 'tongThanhToan' và trạng thái 'Đã giao')
      const revenue = allOrders.reduce((sum, order) => {
        const s = order.trangThai ? order.trangThai.toLowerCase() : "";
        // Kiểm tra status tiếng Việt từ API
        if (s.includes("đã giao") || s.includes("hoàn thành")) {
          return sum + (order.tongThanhToan || 0);
        }
        return sum;
      }, 0);

      // Lịch hẹn tuần này
      const next7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      const apptsThisWeek = allAppts.filter((a) => {
        if (!a.thoiGianBatDau) return false;
        const d = new Date(a.thoiGianBatDau);
        return d >= startOfToday && d <= next7Days;
      }).length;

      setStats([
        {
          title: "Tổng người dùng",
          value: totalUsers,
          change: "Hệ thống",
          isPositive: true,
        },
        {
          title: "Tổng thú cưng",
          value: totalPets,
          change: "Đang quản lý",
          isPositive: true,
        },
        {
          title: "Đơn hàng tháng",
          value: ordersThisMonth,
          change: "Tháng này",
          isPositive: true,
        },
        {
          title: "Lịch hẹn (7 ngày)",
          value: apptsThisWeek,
          change: "Sắp tới",
          isPositive: true,
        },
        {
          title: "Nhân viên",
          value: totalStaff,
          change: "Đang làm việc",
          isPositive: true,
        },
        {
          title: "Doanh thu",
          value: formatCurrency(revenue),
          change: "Thực thu",
          isPositive: true,
        },
      ]);

      // --- PHẦN 2: ĐƠN HÀNG GẦN ĐÂY (FIX MAPPING) ---
      const topOrders = [...allOrders]
        .sort((a, b) => new Date(b.ngayDatHang) - new Date(a.ngayDatHang))
        .slice(0, 8)
        .map((order) => ({
          id: `#${order.donHangId}`,
          // Fix: Dùng đúng trường 'tenNguoiDung' từ JSON
          customer: order.tenNguoiDung || "Khách lẻ",
          // Fix: Dùng 'ngayDatHang' thay vì 'ngayTao'
          date: new Date(order.ngayDatHang).toLocaleDateString("vi-VN"),
          // Fix: Dùng 'tongThanhToan' thay vì 'tongTien'
          total: formatCurrency(order.tongThanhToan),
          status: mapOrderStatus(order.trangThai).label,
          statusColor: mapOrderStatus(order.trangThai).color,
        }));
      setRecentOrders(topOrders);

      // --- PHẦN 3: LỊCH HẸN SẮP TỚI (FIX LOGIC THỜI GIAN) ---
      const topAppts = allAppts
        .sort((a, b) => new Date(a.thoiGianBatDau) - new Date(b.thoiGianBatDau))
        .slice(0, 5)
        .map((apt) => {
          const d = new Date(apt.thoiGianBatDau);
          const hours = d.getHours();
          const minutes = d.getMinutes().toString().padStart(2, "0");

          let typeColor = "primary";
          if (apt.trangThaiLichHen === "CHO_XAC_NHAN") typeColor = "yellow";

          return {
            id: apt.lichHenId,
            time: `${hours}:${minutes}`,
            period: hours >= 12 ? "PM" : "AM",
            title: apt.tenDichVu || "Dịch vụ",
            customer: apt.tenKhachHang || "---",
            staff: apt.tenNhanVien || "Chưa xếp",
            type: typeColor,
          };
        });
      setUpcomingAppointments(topAppts);
    } catch (error) {
      console.error("Lỗi tải dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const mapOrderStatus = (status) => {
    const s = status ? status.toLowerCase() : "";
    if (s.includes("đã giao") || s.includes("hoàn thành"))
      return { label: status, color: "bg-green-100 text-green-800" };
    if (s.includes("chờ") || s.includes("đang xử lý"))
      return { label: status, color: "bg-yellow-100 text-yellow-800" };
    if (s.includes("đang giao"))
      return { label: status, color: "bg-blue-100 text-blue-800" };
    if (s.includes("hủy"))
      return { label: status, color: "bg-red-100 text-red-800" };
    return { label: status, color: "bg-gray-100 text-gray-800" };
  };

  return (
    <>
      <div className="flex flex-wrap justify-between gap-3 mb-6">
        <p className="text-gray-900 text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
          Tổng quan Dashboard
        </p>
      </div>

      {loading ? (
        <div className="h-96 flex flex-col items-center justify-center text-gray-500">
          <span className="material-symbols-outlined text-4xl animate-spin mb-2">
            sync
          </span>
          <p>Đang tải dữ liệu...</p>
        </div>
      ) : (
        <>
          <DashboardStats stats={stats} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <RecentOrders orders={recentOrders} />
            <UpcomingAppointments appointments={upcomingAppointments} />
          </div>
        </>
      )}
    </>
  );
};

export default AdminDashboard;
