import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import petService from "../../services/petService";
import EditProfileModal from "./modals/EditProfileModal";
import { renderStatusBadge } from "../../utils/formatters"; // Sử dụng utility dùng chung của bạn
import AOS from "aos";

const UserProfile = () => {
  const [user] = useOutletContext();
  const [pets, setPets] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [petRes, appRes] = await Promise.all([
          petService.getMyPets(),
          petService.getMyAppointments(),
        ]);
        setPets(petRes.data || petRes);
        setAppointments(appRes.data || appRes);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchData();
    AOS.refresh();
  }, []);

  const getAvatarUrl = (u) =>
    u?.anhDaiDien?.startsWith("http")
      ? u.anhDaiDien
      : `${API_URL}/uploads/${u?.anhDaiDien}`;

  return (
    <main className="flex-1 min-w-0 pb-20 lg:pb-0 animate-fade-in">
      {/* --- PHẦN 1: THÔNG TIN CÁ NHÂN --- */}
      <section
        className="bg-white rounded-3xl shadow-sm p-8 mb-8 border border-gray-100"
        data-aos="fade-up"
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2">
            <span className="material-icons-outlined text-gray-400">badge</span>
            <h2 className="text-lg font-bold text-gray-900">
              Thông tin cá nhân
            </h2>
          </div>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="text-sm font-bold text-[#10B981] hover:bg-emerald-50 px-4 py-2 rounded-xl transition-all border border-gray-100"
          >
            Chỉnh sửa
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
          <div
            className="size-28 rounded-3xl bg-gray-100 overflow-hidden flex-shrink-0 bg-cover bg-center shadow-inner ring-4 ring-gray-50"
            style={{
              backgroundImage: user?.anhDaiDien
                ? `url("${getAvatarUrl(user)}")`
                : "none",
            }}
          >
            {!user?.anhDaiDien && (
              <span className="material-icons-round text-gray-400 text-6xl">
                person
              </span>
            )}
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 w-full">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                Họ và tên
              </label>
              <p className="text-lg font-bold text-gray-900">
                {user?.hoTen || "N/A"}
              </p>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                Email
              </label>
              <p className="text-lg font-medium text-gray-900">{user?.email}</p>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                Số điện thoại
              </label>
              <p className="text-lg font-medium text-gray-900">
                {user?.soDienThoai || "Chưa cập nhật"}
              </p>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                Địa chỉ
              </label>
              <p className="text-lg font-medium text-gray-900">
                {user?.diaChi || "Chưa cập nhật"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PHẦN 2: THÚ CƯNG (CUỘN NGANG 3 BÉ) --- */}
      <section className="mb-8" data-aos="fade-up" data-aos-delay="100">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="material-icons-outlined text-[#10B981]">pets</span>
          Thú cưng của tôi ({pets.length})
        </h2>

        <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide snap-x snap-mandatory scroll-smooth custom-scrollbar">
          {pets.length > 0 ? (
            pets.map((pet) => (
              <div
                key={pet.thuCungId}
                className="flex-shrink-0 snap-start w-[85%] md:w-[calc((100%-48px)/3)] bg-white rounded-3xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="aspect-[4/3] mb-4 rounded-2xl overflow-hidden bg-gray-50">
                  <img
                    alt={pet.tenThuCung}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={
                      pet.hinhAnh?.startsWith("http")
                        ? pet.hinhAnh
                        : `${API_URL}/uploads/${pet.hinhAnh}`
                    }
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#10B981] transition-colors">
                      {pet.tenThuCung}
                    </h3>
                    <p className="text-sm text-gray-500">{pet.giongLoai}</p>
                  </div>
                  <span
                    className={`material-icons text-xl ${
                      pet.gioiTinh === "Đực" ? "text-blue-500" : "text-pink-400"
                    }`}
                  >
                    {pet.gioiTinh === "Đực" ? "male" : "female"}
                  </span>
                </div>
                <div className="mt-4 flex gap-2">
                  <span className="px-3 py-1 rounded-xl text-xs font-bold bg-gray-50 text-gray-600">
                    {pet.tuoi} tuổi
                  </span>
                  <span className="px-3 py-1 rounded-xl text-xs font-bold bg-gray-50 text-gray-600">
                    {pet.canNang} kg
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full py-12 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
              <p className="text-gray-400 font-medium">
                Danh sách thú cưng trống.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* --- PHẦN 3: LỊCH HẸN & ĐƠN HÀNG --- */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {/* Cột trái: Lịch hẹn gần đây */}
        <section className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className="material-icons-outlined text-[#10B981] ">
                event_note
              </span>
              <h3 className="text-lg font-bold text-gray-900">
                Lịch hẹn gần đây
              </h3>
            </div>
            <button className="text-sm text-[#10B981] font-bold">
              Xem tất cả
            </button>
          </div>

          <div className="space-y-6">
            {appointments.length > 0 ? (
              appointments.slice(0, 3).map((app) => {
                const date = new Date(app.thoiGianBatDau);
                return (
                  <div key={app.lichHenId} className="flex gap-4 items-center">
                    <div className="flex-shrink-0 w-14 h-14 bg-emerald-50 rounded-2xl flex flex-col items-center justify-center text-[#10B981] border border-emerald-100">
                      <span className="text-[10px] font-bold uppercase opacity-80">
                        T{date.getMonth() + 1}
                      </span>
                      <span className="text-xl font-black leading-none">
                        {date.getDate()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h4 className="text-sm font-bold text-gray-900 truncate">
                          {app.tenDichVu}
                        </h4>
                        <div className="flex-shrink-0 scale-90 origin-right">
                          {renderStatusBadge(app.trangThaiLichHen)}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">
                        {app.tenThuCung} •{" "}
                        {date.toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-400 text-center py-6">
                Không có lịch hẹn nào.
              </p>
            )}
          </div>
        </section>

        {/* Cột phải: Đơn hàng gần đây (Giữ nguyên giao diện cũ) */}
        <section className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className="material-icons-outlined text-[#10B981]">
                shopping_bag
              </span>
              <h3 className="text-lg font-bold text-gray-900">
                Đơn hàng gần đây
              </h3>
            </div>
            <button className="text-sm text-gray-500 hover:text-[#10B981] transition-colors">
              Xem tất cả
            </button>
          </div>

          <div className="space-y-6">
            {/* Đơn hàng mẫu 1 */}
            <div className="flex gap-4 items-center">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                <span className="material-icons-outlined text-gray-400 text-xl">
                  inventory_2
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-gray-900 truncate">
                  Thức ăn hạt Royal Canin
                </h4>
                <p className="text-xs text-gray-500 truncate">
                  x2 gói 1.5kg • #ORD-23901
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-gray-900">520.000đ</p>
                <p className="text-[10px] text-green-600 font-bold">
                  Giao thành công
                </p>
              </div>
            </div>

            {/* Đơn hàng mẫu 2 */}
            <div className="flex gap-4 items-center">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                <span className="material-icons-outlined text-gray-400 text-xl">
                  inventory_2
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-gray-900 truncate">
                  Cát vệ sinh cho mèo
                </h4>
                <p className="text-xs text-gray-500 truncate">
                  x1 bao 10L • #ORD-23888
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-gray-900">150.000đ</p>
                <p className="text-[10px] text-green-600 font-bold">
                  Giao thành công
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Bảo mật */}
      <section
        className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-6"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
          <span className="material-icons-outlined text-red-500 text-2xl">
            shield
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">Bảo mật tài khoản</h3>
          <p className="text-sm text-gray-500 mt-1">
            Tăng cường bảo mật bằng cách cập nhật mật khẩu định kỳ và xác thực
            hai lớp.
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-4 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
            Đổi mật khẩu
          </button>
          <button className="flex-1 sm:flex-none px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors">
            Thiết lập 2FA
          </button>
        </div>
      </section>
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentUser={user}
      />
    </main>
  );
};

export default UserProfile;
