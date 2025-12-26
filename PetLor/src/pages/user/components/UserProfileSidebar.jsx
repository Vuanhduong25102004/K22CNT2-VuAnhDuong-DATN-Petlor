import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import authService from "../../../services/authService";

const UserProfileSidebar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  // Helper xử lý ảnh (giữ nguyên logic cũ)
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

  // Helper xác định trạng thái Active của menu
  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    const baseClass = "flex items-center gap-3 px-4 py-3 transition-all";
    const activeStyle =
      "bg-white rounded-xl shadow-sm border border-gray-100 text-[#2a9d8f] font-bold";
    const inactiveStyle =
      "text-gray-500 hover:bg-white hover:text-[#111827] hover:shadow-sm hover:rounded-xl";

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
        <div className="pt-4 border-t border-gray-200 mx-2">
          <button
            onClick={() => {
              authService.logout();
              navigate("/");
            }}
            className="flex items-center gap-3 px-2 py-2 text-red-500 hover:text-red-600 text-sm font-medium transition-colors w-full text-left"
          >
            <span className="material-symbols-outlined">logout</span>
            Đăng xuất
          </button>
        </div>
      </div>
    </aside>
  );
};

export default UserProfileSidebar;
