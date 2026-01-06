import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import authService from "../../../services/authService";

const UserProfileSidebar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

<<<<<<< HEAD
=======
  // Helper xử lý ảnh (giữ nguyên logic cũ)
>>>>>>> fb28d851564a6753a782d5ccb9a31d6e44cd4328
  const getAvatarUrl = (user) => {
    if (user?.anhDaiDien) {
      return user.anhDaiDien.startsWith("http")
        ? user.anhDaiDien
        : `${API_URL}/uploads/${user.anhDaiDien}`;
    }
    return `https://ui-avatars.com/api/?name=${
      user?.hoTen || "User"
    }&background=random`;
  };

<<<<<<< HEAD
=======
  // Helper xác định trạng thái Active của menu
>>>>>>> fb28d851564a6753a782d5ccb9a31d6e44cd4328
  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    const baseClass = "flex items-center gap-3 px-4 py-3 transition-all";
    const activeStyle =
      "bg-white rounded-xl shadow-sm border border-gray-100 text-[#2a9d8f] font-bold";
    const inactiveStyle =
      "text-gray-500 hover:bg-white hover:text-[#111827] hover:shadow-sm hover:rounded-xl";
<<<<<<< HEAD
    return `${baseClass} ${isActive ? activeStyle : inactiveStyle}`;
  };

  const getIconClass = (path) => {
    return location.pathname === path
      ? "material-symbols-outlined icon-filled"
      : "material-symbols-outlined";
  };

  return (
    <aside className="w-full lg:w-64 flex-shrink-0" data-aos="fade-right">
      <div className="sticky top-24 space-y-8">
=======

    return `${baseClass} ${isActive ? activeStyle : inactiveStyle}`;
  };

  // Helper icon style
  const getIconClass = (path, iconName) => {
    const isActive = location.pathname === path;
    return isActive
      ? `material-symbols-outlined icon-filled`
      : `material-symbols-outlined`;
  };

  return (
    <aside className="w-full md:w-64 flex-shrink-0" data-aos="fade-right">
      <div className="sticky top-24 space-y-8">
        {/* User Mini Card */}
>>>>>>> fb28d851564a6753a782d5ccb9a31d6e44cd4328
        <div className="flex items-center gap-4 px-2">
          <div
            className="size-14 rounded-full bg-neutral-200 bg-cover bg-center border-2 border-white shadow-sm"
            style={{ backgroundImage: `url("${getAvatarUrl(user)}")` }}
          ></div>
          <div>
            <h2 className="font-bold text-[#111827]">
              {user?.hoTen || "Khách"}
            </h2>
            <p className="text-xs text-gray-500">Thành viên Bạc</p>
          </div>
        </div>

<<<<<<< HEAD
        <nav className="space-y-1">
          <Link to="/profile" className={getLinkClass("/profile")}>
            <span className={getIconClass("/profile")}>person</span> Hồ sơ của
            tôi
          </Link>
          <Link to="/my-pets" className={getLinkClass("/my-pets")}>
            <span className={getIconClass("/my-pets")}>pets</span> Thú cưng
          </Link>
          <Link
            to="/my-appointments"
            className={getLinkClass("/my-appointments")}
          >
            <span className={getIconClass("/my-appointments")}>
              calendar_month
            </span>{" "}
            Lịch sử hẹn
          </Link>
          <Link to="/my-orders" className={getLinkClass("/my-orders")}>
            <span className={getIconClass("/my-orders")}>receipt_long</span> Đơn
            hàng
          </Link>
          <Link to="/settings" className={getLinkClass("/settings")}>
            <span className={getIconClass("/settings")}>settings</span> Cài đặt
          </Link>
        </nav>

=======
        {/* Navigation */}
        <nav className="space-y-1">
          <Link to="/profile" className={getLinkClass("/profile")}>
            <span className={getIconClass("/profile")}>person</span>
            Hồ sơ của tôi
          </Link>

          <Link to="/my-pets" className={getLinkClass("/my-pets")}>
            <span className={getIconClass("/my-pets")}>pets</span>
            Thú cưng
          </Link>

          <Link to="/history" className={getLinkClass("/history")}>
            <span className={getIconClass("/history")}>calendar_month</span>
            Lịch sử hẹn
          </Link>

          <Link to="/orders" className={getLinkClass("/orders")}>
            <span className={getIconClass("/orders")}>receipt_long</span>
            Lịch sử đơn hàng
          </Link>

          <Link to="/settings" className={getLinkClass("/settings")}>
            <span className={getIconClass("/settings")}>settings</span>
            Cài đặt
          </Link>
        </nav>

        {/* Logout */}
>>>>>>> fb28d851564a6753a782d5ccb9a31d6e44cd4328
        <div className="pt-4 border-t border-gray-200 mx-2">
          <button
            onClick={() => {
              authService.logout();
              navigate("/");
            }}
<<<<<<< HEAD
            className="flex items-center gap-3 px-2 py-2 text-red-500 hover:text-red-600 text-sm font-medium w-full text-left"
          >
            <span className="material-symbols-outlined">logout</span> Đăng xuất
=======
            className="flex items-center gap-3 px-2 py-2 text-red-500 hover:text-red-600 text-sm font-medium transition-colors w-full text-left"
          >
            <span className="material-symbols-outlined">logout</span>
            Đăng xuất
>>>>>>> fb28d851564a6753a782d5ccb9a31d6e44cd4328
          </button>
        </div>
      </div>
    </aside>
  );
};

export default UserProfileSidebar;
