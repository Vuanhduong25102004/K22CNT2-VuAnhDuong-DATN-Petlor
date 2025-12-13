import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = ({ onLogout }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
      isActive(path)
        ? "bg-primary/10 text-primary border border-primary/20"
        : "text-gray-600 hover:bg-gray-50 hover:text-primary"
    }`;

  return (
    <aside className="w-64 flex-shrink-0 hidden md:flex flex-col bg-white border-r border-gray-200">
      {/* Header Sidebar */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <Link to="/admin" className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-primary text-3xl">
            pets
          </span>
          <span className="text-xl font-bold text-text-main">PetLor Admin</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {/* --- Dashboard --- */}
        <Link to="/admin/dashboard" className={linkClass("/admin/dashboard")}>
          <span className="material-symbols-outlined mr-3">dashboard</span>
          Tổng quan
        </Link>

        {/* --- NHÓM 1: CỬA HÀNG (E-commerce) --- */}
        <div className="pt-4 pb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Quản lý Cửa hàng
        </div>

        <Link to="/admin/categories" className={linkClass("/admin/categories")}>
          <span className="material-symbols-outlined mr-3">category</span>
          Danh mục
        </Link>

        <Link to="/admin/products" className={linkClass("/admin/products")}>
          <span className="material-symbols-outlined mr-3">inventory_2</span>
          Sản phẩm
        </Link>

        <Link to="/admin/orders" className={linkClass("/admin/orders")}>
          <span className="material-symbols-outlined mr-3">receipt_long</span>
          Đơn hàng
        </Link>

        {/* --- NHÓM 2: KHÁCH HÀNG & THÚ CƯNG (CRM) --- */}
        <div className="pt-4 pb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Khách hàng & Thú cưng
        </div>

        <Link to="/admin/users" className={linkClass("/admin/users")}>
          <span className="material-symbols-outlined mr-3">person</span>
          Người dùng
        </Link>

        <Link to="/admin/pets" className={linkClass("/admin/pets")}>
          <span className="material-symbols-outlined mr-3">pets</span>
          Thú cưng
        </Link>

        {/* --- NHÓM 3: VẬN HÀNH (Dịch vụ & Nhân sự) --- */}
        <div className="pt-4 pb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Dịch vụ & Vận hành
        </div>

        <Link
          to="/admin/appointments"
          className={linkClass("/admin/appointments")}
        >
          <span className="material-symbols-outlined mr-3">calendar_month</span>
          Lịch hẹn
        </Link>

        <Link to="/admin/services" className={linkClass("/admin/services")}>
          <span className="material-symbols-outlined mr-3">
            medical_services
          </span>
          Dịch vụ
        </Link>

        <Link to="/admin/employees" className={linkClass("/admin/employees")}>
          <span className="material-symbols-outlined mr-3">badge</span>
          Nhân Viên
        </Link>
      </nav>

      {/* Footer Sidebar */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="flex w-full items-center text-sm font-medium text-gray-600 hover:text-red-500 transition-colors"
        >
          <span className="material-symbols-outlined mr-3">logout</span>
          Đăng xuất
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
