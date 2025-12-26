import React from "react";
import useEscapeKey from "../../../../../hooks/useEscapeKey"; // Giả sử hook này vẫn ở đây
import { motion, AnimatePresence } from "framer-motion";
import {
  calculateAge,
  formatDate,
  getImageUrl,
} from "../../../components/utils";

const PetDetailModal = ({ isOpen, onClose, pet }) => {
  // Đóng modal khi nhấn ESC
  useEscapeKey(onClose);

  return (
    <AnimatePresence>
      {isOpen && pet && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-hidden"
          onClick={onClose} // Click ra ngoài để đóng
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-3xl bg-white rounded-2xl shadow-modal flex flex-col max-h-[95vh] relative overflow-hidden font-body mx-auto my-8"
            onClick={(e) => e.stopPropagation()} // Ngăn click xuyên qua modal
          >
            {/* --- Header (Giống PetFormModal) --- */}
            <div className="px-10 py-6 border-b border-border-light/50 flex justify-between items-center bg-white sticky top-0 z-20 backdrop-blur-sm bg-white/95">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-surface border border-border-light flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">
                    visibility
                  </span>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-text-heading tracking-tight font-display">
                    Chi tiết Thú cưng #{pet.thuCungId}
                  </h1>
                  <p className="text-sm text-text-body/70 mt-1 font-light">
                    Xem thông tin chi tiết hồ sơ
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center text-secondary hover:text-text-heading hover:bg-surface transition-all duration-300"
              >
                <span className="material-symbols-outlined font-light">
                  close
                </span>
              </button>
            </div>

            {/* --- Body (Padding & Layout giống PetFormModal) --- */}
            <div className="flex-1 p-8 md:p-10 bg-white overflow-y-auto">
              <div className="space-y-8">
                {/* Ảnh đại diện & Tên (Căn giữa) */}
                <div className="flex flex-col items-center justify-center mb-6">
                  <div className="relative">
                    <img
                      src={getImageUrl(pet.img)} // Dùng hàm getImageUrl từ utils
                      alt={pet.tenThuCung}
                      className="h-32 w-32 rounded-full object-cover border-4 border-gray-100 shadow-sm"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/150?text=Pet";
                      }}
                    />
                    <span className="absolute bottom-1 right-1 bg-white p-1.5 rounded-full shadow-md border border-gray-100">
                      {pet.chungLoai === "Mèo"
                        ? "🐱"
                        : pet.chungLoai === "Chó"
                        ? "🐶"
                        : "🐾"}
                    </span>
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-text-heading">
                    {pet.tenThuCung}
                  </h2>
                </div>

                {/* Grid Thông tin chi tiết */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Cột 1: Thông tin cơ bản */}
                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-medium text-text-heading mb-2">
                        Chủ sở hữu
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-border-light text-text-body">
                        {pet.tenChu || pet.ownerName || "---"}
                        <span className="text-xs text-gray-400 ml-1 block mt-0.5">
                          SĐT: {pet.soDienThoaiChuSoHuu || "---"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-heading mb-2">
                        Chủng loại
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-border-light text-text-body">
                        {pet.chungLoai}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-heading mb-2">
                        Ngày sinh / Tuổi
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-border-light text-text-body">
                        {formatDate(pet.ngaySinh)}
                        <span className="ml-2 text-primary font-medium bg-primary/10 px-2 py-0.5 rounded text-xs">
                          {calculateAge(pet.ngaySinh)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Cột 2: Thông tin chi tiết */}
                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-medium text-text-heading mb-2">
                        Giống loài
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-border-light text-text-body">
                        {pet.giongLoai || "Chưa cập nhật"}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-heading mb-2">
                        Giới tính
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-border-light text-text-body flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            pet.gioiTinh === "Đực"
                              ? "bg-blue-500"
                              : pet.gioiTinh === "Cái"
                              ? "bg-pink-500"
                              : "bg-gray-400"
                          }`}
                        ></span>
                        {pet.gioiTinh}
                      </div>
                    </div>

                    {/* --- CÂN NẶNG (MỚI) --- */}
                    <div>
                      <label className="block text-sm font-medium text-text-heading mb-2">
                        Cân nặng
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-border-light text-text-body font-semibold text-gray-700">
                        {pet.canNang ? `${pet.canNang} kg` : "---"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ghi chú (Full width) */}
                <div>
                  <label className="block text-sm font-medium text-text-heading mb-2">
                    Ghi chú sức khỏe
                  </label>
                  <div className="p-4 bg-gray-50 rounded-lg border border-border-light text-text-body min-h-[80px] whitespace-pre-line leading-relaxed italic text-gray-600">
                    {pet.ghiChuSucKhoe || "Không có ghi chú nào."}
                  </div>
                </div>
              </div>
            </div>

            {/* --- Footer (Giống PetFormModal) --- */}
            <div className="px-10 py-6 bg-white border-t border-border-light/50 flex justify-end gap-4 sticky bottom-0 z-20">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg text-sm font-medium text-text-body hover:bg-surface hover:text-text-heading transition-colors border border-transparent hover:border-border-light bg-gray-100"
              >
                Đóng
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PetDetailModal;
