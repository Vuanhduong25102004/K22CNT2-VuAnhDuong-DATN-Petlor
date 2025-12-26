import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import userService from "../../services/userService";
import petService from "../../services/petService";
import PetFormModal from "./modals/PetFormModal";
import PetDetailModal from "./modals/PetDetailModal";
import UserProfileSidebar from "./components/UserProfileSidebar"; // Import Sidebar dùng chung

import AOS from "aos";
import "aos/dist/aos.css";

const MyPets = () => {
  const [user, setUser] = useState(null);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // State tìm kiếm & lọc (Visual)
  const [searchTerm, setSearchTerm] = useState("");

  // Modal states
  const [isPetFormOpen, setIsPetFormOpen] = useState(false);
  const [selectedPetForEdit, setSelectedPetForEdit] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  // --- API Functions ---
  const fetchData = async () => {
    try {
      const [userResponse, petsResponse] = await Promise.all([
        userService.getMe(),
        petService.getMyPets(),
      ]);
      setUser(userResponse);
      setPets(
        Array.isArray(petsResponse) ? petsResponse : petsResponse.data || []
      );
    } catch (error) {
      console.error("Lỗi tải dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyPets = async () => {
    try {
      const response = await petService.getMyPets();
      setPets(Array.isArray(response) ? response : response.data || []);
    } catch (error) {
      console.error("Lỗi tải danh sách thú cưng:", error);
    }
  };

  // --- Handlers ---
  const handleViewDetail = (pet) => {
    setSelectedPet(pet);
    setIsDetailModalOpen(true);
  };

  const handleOpenAddPet = () => {
    setSelectedPetForEdit(null);
    setIsPetFormOpen(true);
  };

  // Logic lọc thú cưng theo từ khóa tìm kiếm
  const filteredPets = pets.filter(
    (pet) =>
      pet.tenThuCung?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.giongLoai?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Helpers ---
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
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 1) return "< 1";
    return age;
  };

  // --- Effects ---
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      AOS.init({ duration: 800, once: true, offset: 50 });
      AOS.refresh();
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
        <p className="text-[#10B981] font-bold animate-pulse">
          Đang tải dữ liệu...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#F9FAFB] font-sans text-[#1F2937] min-h-screen flex flex-col mt-16">
      <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col md:flex-row gap-8 py-8 px-4 sm:px-6 lg:px-8">
        {/* --- SIDEBAR DÙNG CHUNG --- */}
        <UserProfileSidebar user={user} />

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 min-w-0">
          {/* Header Section */}
          <div
            className="relative overflow-hidden bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-100 isolate"
            data-aos="fade-down"
          >
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-gradient-to-br from-[#10B981]/20 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl opacity-50 pointer-events-none"></div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
              <span className="material-symbols-outlined text-[10rem] select-none text-black">
                pets
              </span>
            </div>

            <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold tracking-wide ring-1 ring-emerald-100">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    Quản lý thú cưng
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                    Thú cưng <span className="text-[#10B981]">của tôi</span>
                  </h1>
                  <p className="mt-3 text-base md:text-lg text-gray-500 max-w-xl leading-relaxed">
                    Theo dõi sức khỏe, lịch tiêm phòng và quản lý hồ sơ spa cho
                    các bé cưng của bạn.
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={handleOpenAddPet}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#10B981] hover:bg-emerald-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-emerald-500/20 transition-all duration-200 transform hover:-translate-y-0.5 focus:ring-4 focus:ring-emerald-500/30"
                >
                  <span className="material-symbols-outlined text-xl">
                    add_circle
                  </span>
                  Thêm thú cưng
                </button>
              </div>
            </div>
          </div>

          {/* Search & Filter Section */}
          <div
            className="mb-8 flex flex-col sm:flex-row gap-4"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400">
                  search
                </span>
              </span>
              <input
                type="text"
                placeholder="Tìm kiếm theo tên hoặc giống loài..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-white text-[#1F2937] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent sm:text-sm shadow-sm transition-all"
              />
            </div>
            <div className="flex gap-2">
              <select className="block w-full pl-3 pr-10 py-2.5 text-base border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent sm:text-sm rounded-xl bg-white text-[#1F2937] shadow-sm cursor-pointer">
                <option>Tất cả trạng thái</option>
                <option>Khỏe mạnh</option>
                <option>Đang điều trị</option>
              </select>
            </div>
          </div>

          {/* Grid Thú Cưng */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {/* Render List Thú Cưng */}
            {filteredPets.map((pet) => (
              <div
                key={pet.thuCungId}
                onClick={() => handleViewDetail(pet)}
                className="bg-white rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col h-full cursor-pointer hover:border-[#10B981]/30 hover:-translate-y-1"
              >
                {/* Hình ảnh */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <div
                    className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                    style={{
                      backgroundImage: `url("${getPetAvatarUrl(pet)}")`,
                    }}
                  ></div>

                  {/* Badge Trạng thái (Giả lập) */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-md bg-green-100 text-green-700 text-xs font-semibold backdrop-blur-sm shadow-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      Khỏe mạnh
                    </span>
                  </div>
                </div>

                {/* Nội dung Card */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Tên & Giống */}
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-[#1F2937] group-hover:text-[#10B981] transition-colors line-clamp-1">
                        {pet.tenThuCung}
                      </h3>
                      <p className="text-sm text-[#6B7280] line-clamp-1">
                        {pet.giongLoai || "Chưa rõ giống"}
                      </p>
                    </div>
                    {/* Icon Giới tính */}
                    {pet.gioiTinh === "Đực" ? (
                      <span
                        className="material-symbols-outlined text-blue-500 text-xl"
                        title="Giống đực"
                      >
                        male
                      </span>
                    ) : (
                      <span
                        className="material-symbols-outlined text-pink-400 text-xl"
                        title="Giống cái"
                      >
                        female
                      </span>
                    )}
                  </div>

                  {/* Thông số: Tuổi & Cân nặng */}
                  <div className="flex items-center gap-3 mt-3 mb-5 text-sm text-[#6B7280]">
                    <div className="flex items-center gap-1.5 bg-[#F3F4F6] px-2.5 py-1.5 rounded-lg">
                      <span className="material-symbols-outlined text-base">
                        cake
                      </span>
                      {calculateAge(pet.ngaySinh)} Tuổi
                    </div>
                    {pet.canNang && (
                      <div className="flex items-center gap-1.5 bg-[#F3F4F6] px-2.5 py-1.5 rounded-lg">
                        <span className="material-symbols-outlined text-base">
                          monitor_weight
                        </span>
                        {pet.canNang} kg
                      </div>
                    )}
                  </div>

                  {/* Footer Card */}
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-xs text-[#6B7280] flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">
                        schedule
                      </span>
                      Cập nhật: Mới đây
                    </div>
                    <button className="text-sm font-medium text-[#10B981] hover:text-[#059669] flex items-center gap-1 transition-colors group-hover:translate-x-1 duration-300">
                      Chi tiết
                      <span className="material-symbols-outlined text-sm">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Card "Thêm Mới" (Luôn hiện ở cuối hoặc đầu) */}
            <div
              onClick={handleOpenAddPet}
              className="min-h-[300px] bg-[#F9FAFB] rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-6 cursor-pointer hover:border-[#10B981] hover:bg-white transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-gray-100">
                <span className="material-symbols-outlined text-3xl text-gray-400 group-hover:text-[#10B981]">
                  add
                </span>
              </div>
              <h3 className="font-semibold text-lg text-[#6B7280] group-hover:text-[#10B981] transition-colors">
                Thêm thú cưng mới
              </h3>
              <p className="text-sm text-center text-[#9CA3AF] mt-2 px-4 group-hover:text-[#6B7280]">
                Tạo hồ sơ mới để theo dõi sức khỏe và lịch trình.
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* --- MODALS (Giữ nguyên logic) --- */}
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

export default MyPets;
