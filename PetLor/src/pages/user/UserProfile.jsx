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

import AOS from "aos";
import "aos/dist/aos.css";

const UserProfile = () => {
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
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

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
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentUser={user}
        onUpdateSuccess={handleUpdateSuccess}
      />

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
  );
};

export default UserProfile;
