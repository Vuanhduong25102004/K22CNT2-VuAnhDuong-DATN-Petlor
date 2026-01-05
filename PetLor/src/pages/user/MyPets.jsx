import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import petService from "../../services/petService";
import PetFormModal from "./modals/PetFormModal";
import PetDetailModal from "./modals/PetDetailModal";
import AOS from "aos";

const MyPets = () => {
  const [user] = useOutletContext();
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPet, setSelectedPet] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const fetchPets = async () => {
    const res = await petService.getMyPets();
    setPets(res.data || res);
  };

  useEffect(() => {
    fetchPets();
    AOS.init({ duration: 800 });
  }, []);

  const filteredPets = pets.filter(
    (p) =>
      p.tenThuCung?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.giongLoai?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* --- HEADER CŨ (GIỮ NGUYÊN) --- */}
      <div
        className="bg-white rounded-3xl p-8 shadow-sm relative overflow-hidden group border border-gray-100 isolate"
        data-aos="fade-down"
      >
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#10B981]/10 to-transparent"></div>
        <span className="material-symbols-outlined absolute -right-6 -bottom-8 text-9xl text-[#10B981]/5 rotate-12 select-none">
          pets
        </span>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Thú cưng <span className="text-[#10B981]">của tôi</span>
            </h1>
            <p className="text-gray-500 mt-2 max-w-xl">
              Quản lý hồ sơ sức khỏe và lịch trình chăm sóc cho các bé.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedPet(null);
              setIsFormOpen(true);
            }}
            className="bg-[#10B981] text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-emerald-600 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined">add_circle</span> Thêm
            thú cưng
          </button>
        </div>
      </div>

      {/* --- TÌM KIẾM & BỘ LỌC --- */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4" data-aos="fade-up">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-icons-outlined text-gray-400">
              search
            </span>
          </span>
          <input
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-2xl leading-5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] sm:text-sm shadow-sm"
            placeholder="Tìm kiếm theo tên hoặc giống loài..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select className="block w-full pl-3 pr-10 py-2.5 text-base border-gray-200 focus:outline-none focus:ring-[#10B981] focus:border-[#10B981] sm:text-sm rounded-xl bg-white text-gray-700">
            <option>Tất cả trạng thái</option>
            <option>Khỏe mạnh</option>
            <option>Đang điều trị</option>
            <option>Sắp có lịch hẹn</option>
          </select>
        </div>
      </div>

      {/* --- DANH SÁCH CARD THÚ CƯNG --- */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        data-aos="fade-up"
      >
        {filteredPets.map((pet) => (
          <div
            key={pet.thuCungId}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full cursor-pointer"
            onClick={() => {
              setSelectedPet(pet);
              setIsDetailOpen(true);
            }}
          >
            {/* Ảnh thú cưng */}
            <div className="relative h-48 overflow-hidden bg-gray-50">
              <img
                alt={pet.tenThuCung}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                src={
                  pet.hinhAnh?.startsWith("http")
                    ? pet.hinhAnh
                    : `${API_URL}/uploads/${pet.hinhAnh}`
                }
              />
              <div className="absolute top-3 right-3">
                <span className="px-2.5 py-1 rounded-md bg-green-100 text-green-700 text-xs font-semibold backdrop-blur-sm shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Khỏe mạnh
                </span>
              </div>
            </div>

            {/* Thông tin chi tiết */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg group-hover:text-[#10B981] transition-colors">
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

              <div className="flex items-center gap-4 mt-3 mb-5 text-sm">
                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-xl text-gray-600">
                  <span className="material-icons-outlined text-base">
                    cake
                  </span>
                  {pet.tuoi || 0} Tuổi
                </div>
                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-xl text-gray-600">
                  <span className="material-icons-outlined text-base">
                    monitor_weight
                  </span>
                  {pet.canNang || 0} kg
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="text-xs text-gray-400 flex items-center gap-1">
                  <span className="material-icons-outlined text-sm">
                    schedule
                  </span>
                  Hồ sơ trực tuyến
                </div>
                <div className="text-sm font-bold text-[#10B981] flex items-center gap-1 transition-colors">
                  Chi tiết
                  <span className="material-icons-outlined text-sm">
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Nút thêm nhanh bé mới (Dấu cộng) */}
        <div
          onClick={() => {
            setSelectedPet(null);
            setIsFormOpen(true);
          }}
          className="min-h-[300px] bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-6 cursor-pointer hover:border-[#10B981] hover:bg-white transition-all group"
        >
          <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl text-gray-300 group-hover:text-[#10B981]">
              add
            </span>
          </div>
          <h3 className="font-bold text-lg text-gray-400 group-hover:text-[#10B981] transition-colors">
            Thêm bé mới
          </h3>
          <p className="text-sm text-center text-gray-400 mt-2 px-4">
            Tạo hồ sơ mới để theo dõi sức khỏe và lịch trình.
          </p>
        </div>
      </div>

      {/* --- CÁC MODAL --- */}
      <PetFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialData={selectedPet}
        onSuccess={fetchPets}
      />
      <PetDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        pet={selectedPet}
      />
    </div>
  );
};

export default MyPets;
