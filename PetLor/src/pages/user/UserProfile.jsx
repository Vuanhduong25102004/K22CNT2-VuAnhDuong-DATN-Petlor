<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import petService from "../../services/petService";
import EditProfileModal from "./modals/EditProfileModal";
import { renderStatusBadge } from "../../utils/formatters"; // Sử dụng utility dùng chung của bạn
=======
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import userService from "../../services/userService";
import authService from "../../services/authService";
import petService from "../../services/petService";
import EditProfileModal from "./modals/EditProfileModal";
import PetFormModal from "./modals/PetFormModal";
import PetDetailModal from "./modals/PetDetailModal";
// Import Sidebar mới
import UserProfileSidebar from "./components/UserProfileSidebar"; // Đường dẫn tuỳ folder bạn đặt

>>>>>>> fb28d851564a6753a782d5ccb9a31d6e44cd4328
import AOS from "aos";

const UserProfile = () => {
<<<<<<< HEAD
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
=======
  const [user, setUser] = useState(null);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPetFormOpen, setIsPetFormOpen] = useState(false);
  const [selectedPetForEdit, setSelectedPetForEdit] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  // Dropdown states
  const [activeMenuId, setActiveMenuId] = useState(null);
  const menuRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  // --- API Functions ---
  const fetchMyPets = async () => {
    try {
      const response = await petService.getMyPets();
      setPets(Array.isArray(response) ? response : response.data || []);
    } catch (error) {
      console.error("Lỗi tải danh sách thú cưng:", error);
    }
  };

  const handleUpdateSuccess = async () => {
    try {
      const response = await userService.getMe();
      setUser(response);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const [userResponse, petsResponse] = await Promise.all([
        userService.getMe(),
        petService.getMyPets(),
      ]);
      setUser(userResponse);
      setPets(petsResponse);
    } catch (error) {
      console.error("Lỗi tải thông tin trang:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- Handlers ---
  const handleToggleMenu = (e, petId) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === petId ? null : petId);
  };

  const handleViewDetail = (pet) => {
    setSelectedPet(pet);
    setIsDetailModalOpen(true);
    setActiveMenuId(null);
  };

  const handleOpenAddPet = () => {
    setSelectedPetForEdit(null);
    setIsPetFormOpen(true);
  };

  const handleOpenEditPet = (pet) => {
    setSelectedPetForEdit(pet);
    setIsPetFormOpen(true);
    setActiveMenuId(null);
  };

  const handleDeletePet = async (petId) => {
    setActiveMenuId(null);
    if (window.confirm("Bạn có chắc chắn muốn xóa thú cưng này không?")) {
      try {
        await petService.deletePet(petId);
        alert("Đã xóa thú cưng thành công!");
        fetchMyPets();
      } catch (error) {
        console.error("Lỗi xóa thú cưng:", error);
        alert("Xóa thất bại. Vui lòng thử lại.");
      }
    }
  };

  // --- Effects ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null);
>>>>>>> fb28d851564a6753a782d5ccb9a31d6e44cd4328
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchData();
    AOS.refresh();
  }, []);

<<<<<<< HEAD
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
=======
  useEffect(() => {
    if (!loading) {
      const aosInit = setTimeout(() => {
        AOS.init({ duration: 800, once: true, offset: 50 });
        AOS.refresh();
      }, 100);
      return () => clearTimeout(aosInit);
    }
  }, [loading]);

  // --- Helpers ---
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

  const getPetAvatarUrl = (pet) => {
    if (pet?.hinhAnh) {
      return pet.hinhAnh.startsWith("http")
        ? pet.hinhAnh
        : `${API_URL}/uploads/${pet.hinhAnh}`;
    }
    return `https://placehold.co/150/E7F3E7/4C9A4C?text=${
      pet?.tenThuCung ? pet.tenThuCung.charAt(0) : "P"
    }`;
  };

  const calculateAge = (birthDateString) => {
    if (!birthDateString) return "?";
    const birthDate = new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    if (age < 1) return "Dưới 1";
    return age;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb]">
        <p className="text-[#2a9d8f] font-bold animate-pulse">
          Đang tải thông tin...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#f9fafb] font-display text-[#1f2937] min-h-screen flex flex-col mt-16">
      <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col md:flex-row gap-8 py-8 px-4 sm:px-6 lg:px-8">
        {/* --- REUSABLE SIDEBAR --- */}
        <UserProfileSidebar user={user} />

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 min-w-0 space-y-8">
          {/* 1. THÔNG TIN CÁ NHÂN */}
          <section
            className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100"
            data-aos="fade-up"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-[#111827] flex items-center gap-2">
                <span className="material-symbols-outlined text-gray-400">
                  id_card
                </span>
                Thông tin cá nhân
              </h3>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="text-sm font-bold text-[#2a9d8f] hover:text-[#21867a] transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                Chỉnh sửa
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-6">
                <div className="relative group cursor-pointer">
                  <div
                    className="size-24 rounded-2xl bg-cover bg-center shadow-inner"
                    style={{ backgroundImage: `url("${getAvatarUrl(user)}")` }}
                  ></div>
                  <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <span className="material-symbols-outlined">
                      camera_alt
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400 uppercase font-semibold">
                    Họ và tên
                  </p>
                  <p className="text-lg font-bold text-[#111827]">
                    {user?.hoTen}
                  </p>
                  <p className="text-sm text-gray-500">
                    Thành viên từ{" "}
                    {user?.ngayTao
                      ? new Date(user.ngayTao).getFullYear()
                      : "..."}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold mb-1">
                      Email
                    </p>
                    <p
                      className="text-sm font-medium text-[#111827] truncate"
                      title={user?.email}
                    >
                      {user?.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold mb-1">
                      Số điện thoại
                    </p>
                    <p className="text-sm font-medium text-[#111827]">
                      {user?.soDienThoai || "Chưa cập nhật"}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-400 uppercase font-semibold mb-1">
                      Địa chỉ
                    </p>
                    <p className="text-sm font-medium text-[#111827]">
                      {user?.diaChi || "Chưa cập nhật"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. THÚ CƯNG CỦA TÔI */}
          <section data-aos="fade-up" data-aos-delay="100">
            <div className="flex justify-between items-center mb-4 px-1">
              <h3 className="text-xl font-bold text-[#111827]">
                Thú cưng của tôi
              </h3>
              <button
                onClick={handleOpenAddPet}
                className="flex items-center gap-2 bg-[#111827] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1f2937] transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">
                  add
                </span>
                Thêm mới
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Pet List */}
              {pets.map((pet) => (
                <div
                  key={pet.thuCungId}
                  className="group bg-white rounded-2xl p-4 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-[#2a9d8f]/30 transition-all hover:-translate-y-1 cursor-pointer relative"
                  style={{ zIndex: activeMenuId === pet.thuCungId ? 50 : 0 }}
                >
                  {/* Pet Image Container */}
                  <div
                    className="aspect-[4/3] rounded-xl bg-cover bg-center mb-4 relative overflow-hidden"
                    style={{
                      backgroundImage: `url("${getPetAvatarUrl(pet)}")`,
                    }}
                    onClick={() => handleViewDetail(pet)}
                  ></div>

                  {/* Pet Info & Menu */}
                  <div className="flex justify-between items-start">
                    <div
                      onClick={() => handleViewDetail(pet)}
                      className="flex-1"
                    >
                      <h4 className="text-lg font-bold text-[#111827]">
                        {pet.tenThuCung}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {pet.giongLoai || "Chưa rõ giống"}
                      </p>
                    </div>

                    {/* Dropdown Button */}
                    <div className="relative">
                      <button
                        onClick={(e) => handleToggleMenu(e, pet.thuCungId)}
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-[#111827] transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          more_vert
                        </span>
                      </button>

                      {/* Dropdown Menu Content */}
                      {activeMenuId === pet.thuCungId && (
                        <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl shadow-xl border border-gray-100 z-50 animate-fade-in origin-top-right overflow-hidden">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewDetail(pet);
                            }}
                            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 hover:text-[#2a9d8f] transition-colors font-medium"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              visibility
                            </span>
                            Xem
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenEditPet(pet);
                            }}
                            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 hover:text-blue-600 transition-colors border-t border-gray-50 font-medium"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              edit
                            </span>
                            Sửa
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePet(pet.thuCungId);
                            }}
                            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors border-t border-gray-50 font-medium"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              delete
                            </span>
                            Xóa
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div
                    className="flex gap-2 mt-4 flex-wrap"
                    onClick={() => handleViewDetail(pet)}
                  >
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-lg">
                      {calculateAge(pet.ngaySinh)} tuổi
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                        pet.gioiTinh === "Đực"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-pink-50 text-pink-600"
                      }`}
                    >
                      {pet.gioiTinh}
                    </span>
                    {pet.canNang && (
                      <span className="px-2 py-1 bg-orange-50 text-orange-600 text-xs font-semibold rounded-lg">
                        {pet.canNang}kg
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* Add New Pet Card (Placeholder) */}
              <div
                onClick={handleOpenAddPet}
                className="border-2 border-dashed border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2 hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer group min-h-[250px]"
              >
                <div className="size-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                  <span className="material-symbols-outlined text-gray-400">
                    add
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-500 group-hover:text-gray-700">
                  Đăng ký thú cưng mới
                </p>
              </div>
            </div>
          </section>

          {/* 3. LỊCH HẸN & ĐƠN HÀNG (Grid 2 cột) */}
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {/* Lịch hẹn */}
            <section className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-[#111827] flex items-center gap-2">
                  <span className="material-symbols-outlined text-gray-400">
                    calendar_clock
                  </span>
                  Lịch hẹn gần đây
                </h3>
                <Link
                  to="/history"
                  className="text-sm font-semibold text-gray-400 hover:text-[#2a9d8f] transition-colors"
                >
                  Xem tất cả
                </Link>
              </div>
              <div className="space-y-4 flex-1">
                {/* Mock Item 1 */}
                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="flex-shrink-0 size-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-xs flex-col leading-none">
                    <span>15</span>
                    <span className="uppercase text-[10px] mt-0.5">OCT</span>
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-bold text-[#111827] group-hover:text-[#2a9d8f] transition-colors">
                      Tiêm phòng định kỳ
                    </p>
                    <p className="text-xs text-gray-500">Bé Lu • 10:00 AM</p>
                  </div>
                  <span className="px-2 py-1 rounded-md bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wide">
                    Confirmed
                  </span>
                </div>
              </div>
            </section>

            {/* Đơn hàng */}
            <section className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-[#111827] flex items-center gap-2">
                  <span className="material-symbols-outlined text-gray-400">
                    shopping_bag
                  </span>
                  Đơn hàng gần đây
                </h3>
                <Link
                  to="/"
                  className="text-sm font-semibold text-gray-400 hover:text-[#2a9d8f] transition-colors"
                >
                  Xem tất cả
                </Link>
              </div>
              <div className="space-y-4 flex-1">
                {/* Mock Order 1 */}
                <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="flex-shrink-0 size-12 bg-gray-50 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-gray-400">
                      package_2
                    </span>
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-bold text-[#111827] group-hover:text-[#2a9d8f] transition-colors">
                      Thức ăn hạt Royal Canin
                    </p>
                    <p className="text-xs text-gray-500">
                      x2 gói 1.5kg • #ORD-23901
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#111827]">520.000đ</p>
                    <span className="text-[10px] text-green-600 font-bold">
                      Giao thành công
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* 4. BẢO MẬT */}
          <section
            className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
              <div className="flex gap-4 items-center">
                <div className="size-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">shield</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#111827]">
                    Bảo mật tài khoản
                  </h3>
                  <p className="text-sm text-gray-500 max-w-lg">
                    Tăng cường bảo mật bằng cách cập nhật mật khẩu định kỳ và
                    kích hoạt xác thực hai lớp.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors">
                  Đổi mật khẩu
                </button>
                <button className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-[#111827] text-white font-bold text-sm hover:bg-[#1f2937] transition-colors shadow-sm">
                  Thiết lập 2FA
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* --- MODALS --- */}
>>>>>>> fb28d851564a6753a782d5ccb9a31d6e44cd4328
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentUser={user}
      />
<<<<<<< HEAD
    </main>
=======

      <PetFormModal
        isOpen={isPetFormOpen}
        onClose={() => setIsPetFormOpen(false)}
        initialData={selectedPetForEdit}
        onSuccess={fetchMyPets}
      />

      <PetDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        pet={selectedPet}
      />
    </div>
>>>>>>> fb28d851564a6753a782d5ccb9a31d6e44cd4328
  );
};

export default UserProfile;
