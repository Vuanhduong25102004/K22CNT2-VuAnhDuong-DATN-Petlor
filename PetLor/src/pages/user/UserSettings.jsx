import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import AOS from "aos";

const UserSettings = () => {
  const [user] = useOutletContext();
  const [notifications, setNotifications] = useState({
    orders: true,
    appointments: true,
  });
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const getAvatarUrl = (u) =>
    u?.anhDaiDien?.startsWith("http")
      ? u.anhDaiDien
      : `${API_URL}/uploads/${u?.anhDaiDien}`;

  return (
    <main className="flex-1 space-y-8 animate-fade-in pb-10">
      <div data-aos="fade-down">
        <h1 className="text-2xl font-bold text-gray-900">Cài đặt</h1>
        <p className="text-gray-500">Quản lý bảo mật và cấu hình ứng dụng.</p>
      </div>

      <section
        className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8"
        data-aos="fade-up"
      >
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="p-2 bg-[#2a9d8f]/10 rounded-xl text-[#2a9d8f]">
            <span className="material-symbols-outlined">manage_accounts</span>
          </div>
          <h2 className="text-xl font-bold">Thông tin tài khoản</h2>
        </div>
        <div className="flex items-center gap-6">
          <img
            className="size-24 rounded-full object-cover ring-4 ring-gray-50"
            src={getAvatarUrl(user)}
            alt="Profile"
          />
          <div>
            <h3 className="font-bold text-gray-900">Ảnh đại diện</h3>
            <p className="text-sm text-gray-500 mb-2">
              Định dạng JPG/PNG. Tối đa 5MB.
            </p>
            <button className="text-sm font-bold text-[#2a9d8f] hover:underline">
              Thay đổi ảnh
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Họ và tên</label>
            <input
              className="w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#2a9d8f]"
              type="text"
              defaultValue={user?.hoTen}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Email</label>
            <input
              className="w-full rounded-xl border-gray-200 bg-gray-200 px-4 py-2.5 outline-none cursor-not-allowed"
              type="text"
              value={user?.email}
              readOnly
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button className="bg-[#111827] text-white px-8 py-2.5 rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-all">
            Lưu thay đổi
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section
          className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-6"
          data-aos="fade-up"
        >
          <h2 className="font-bold text-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-500">
              notifications
            </span>{" "}
            Thông báo
          </h2>
          <div className="space-y-4">
            {["orders", "appointments"].map((key) => (
              <div key={key} className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-700">
                  {key === "orders" ? "Cập nhật đơn hàng" : "Nhắc nhở lịch hẹn"}
                </p>
                <button
                  onClick={() =>
                    setNotifications({
                      ...notifications,
                      [key]: !notifications[key],
                    })
                  }
                  className={`w-11 h-6 rounded-full transition-all relative ${
                    notifications[key] ? "bg-[#2a9d8f]" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`size-4 bg-white rounded-full absolute top-1 transition-all ${
                      notifications[key] ? "left-6" : "left-1"
                    }`}
                  ></div>
                </button>
              </div>
            ))}
          </div>
        </section>
        <section
          className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-6"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h2 className="font-bold text-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-500">
              lock
            </span>{" "}
            Bảo mật
          </h2>
          <button className="w-full py-2.5 rounded-xl border border-gray-200 font-bold text-sm text-gray-600 hover:bg-gray-50 transition-all">
            Đổi mật khẩu
          </button>
          <button className="w-full py-2.5 rounded-xl border border-gray-200 font-bold text-sm text-gray-600 hover:bg-gray-50 transition-all">
            Xác thực 2 bước (2FA)
          </button>
        </section>
      </div>
    </main>
  );
};

export default UserSettings;
