import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Dùng để chuyển trang khi logout
import userService from "../../../services/userService"; // Import service của bạn
import authService from "../../../services/authService"; // Import auth service để logout

const DoctorSidebar = () => {
  const navigate = useNavigate();

  // 1. State lưu thông tin bác sĩ
  const [user, setUser] = useState(null);

  // Cấu hình URL ảnh (Thay đổi port nếu backend của bạn khác 8080)
  const API_URL = "http://localhost:8080/uploads/";

  // 2. Gọi API lấy thông tin khi component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userService.getMe();
        setUser(data);
      } catch (error) {
        console.error("Lỗi tải thông tin bác sĩ:", error);
      }
    };
    fetchProfile();
  }, []);

  // 3. Hàm xử lý Logout
  const handleLogout = () => {
    authService.logout(); // Hàm xóa token trong localStorage
    navigate("/login");
  };

  // Helper lấy ảnh đại diện
  const getAvatarUrl = () => {
    if (user?.anhDaiDien) {
      // Nếu là link online (google, facebook) thì giữ nguyên, nếu là file upload thì thêm domain
      return user.anhDaiDien.startsWith("http")
        ? user.anhDaiDien
        : `${API_URL}${user.anhDaiDien}`;
    }
    // Ảnh mặc định nếu chưa có avatar
    return "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200";
  };

  // Helper hiển thị chức vụ/khoa (Map từ Role hoặc hardcode nếu chưa có field khoa)
  const getDisplayRole = () => {
    if (user?.role === "ADMIN") return "Quản trị viên";
    if (user?.role === "DOCTOR") return "Bác sĩ Thú Y";
    return "Nhân viên";
  };

  return (
    <aside className="w-72 flex flex-col border-r border-gray-100 bg-white h-full shrink-0">
      <div className="p-8 flex flex-col h-full">
        {/* Logo */}
        <div className="mb-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-white">pets</span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-primary">
            PetLor <span className="text-gray-400 font-light">Pro</span>
          </h1>
        </div>

        {/* Doctor Profile Card - DỮ LIỆU ĐỘNG */}
        <div className="mb-8 p-4 bg-gray-50 rounded-3xl flex items-center gap-3">
          <div className="size-12 rounded-2xl overflow-hidden bg-gray-200 border-2 border-white">
            <img
              alt="Doctor profile"
              className="w-full h-full object-cover"
              src={getAvatarUrl()}
            />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900 leading-tight">
              {user?.hoTen || "Đang tải..."}
            </h2>
            <p className="text-[11px] font-semibold text-primary/70 uppercase tracking-widest">
              {getDisplayRole()}
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-2 flex-grow">
          <a
            className="flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-500 hover:bg-gray-50 transition-all group"
            href="#"
          >
            <span className="material-symbols-outlined font-light">
              grid_view
            </span>
            <p className="text-sm font-semibold">Tổng quan</p>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-primary/5 text-primary transition-all"
            href="#"
          >
            <span className="material-symbols-outlined font-light">
              event_note
            </span>
            <p className="text-sm font-bold">Duyệt lịch hẹn</p>
            <span className="ml-auto bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
              12
            </span>
          </a>
          {/* Các menu khác giữ nguyên */}
          <a
            className="flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-500 hover:bg-gray-50 transition-all"
            href="#"
          >
            <span className="material-symbols-outlined font-light">pets</span>
            <p className="text-sm font-semibold">Bệnh nhân</p>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-500 hover:bg-gray-50 transition-all"
            href="#"
          >
            <span className="material-symbols-outlined font-light">
              analytics
            </span>
            <p className="text-sm font-semibold">Báo cáo</p>
          </a>

          {/* Mini Calendar */}
          <div className="mt-10 pt-6 border-t border-gray-100">
            <p className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
              Lịch trực tháng 10
            </p>
            <div className="px-2 py-4 bg-gray-50 rounded-3xl">
              <div className="grid grid-cols-7 gap-1 text-center">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <span key={i} className="text-[10px] text-gray-400 font-bold">
                    {d}
                  </span>
                ))}
                <span className="text-xs py-2 text-gray-300">11</span>
                <span className="text-xs py-2 text-gray-300">12</span>
                <span className="text-xs py-2 bg-primary text-white rounded-xl font-bold shadow-md shadow-primary/20">
                  13
                </span>
                {[14, 15, 16, 17].map((d) => (
                  <span key={d} className="text-xs py-2 text-gray-600">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full rounded-2xl h-12 text-gray-400 hover:text-red-500 transition-colors font-bold text-sm"
        >
          <span className="material-symbols-outlined text-xl">logout</span>
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};

export default DoctorSidebar;
