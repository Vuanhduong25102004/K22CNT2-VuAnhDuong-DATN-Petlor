import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEscapeKey from "../../../../../hooks/useEscapeKey";

const VaccinationFormModal = ({
  isOpen,
  onClose,
  initialData,
  staffList,
  onSubmit,
}) => {
  const isEdit = !!initialData;

  const [formData, setFormData] = useState({
    thuCungId: "", // Trong thực tế, đây nên là Dropdown chọn Pet hoặc nhập ID Pet
    tenThuCung: "", // Dùng để hiển thị hoặc nhập nếu backend tự map
    tenVacXin: "",
    ngayTiem: "",
    ngayTaiChung: "",
    nhanVienId: "",
    ghiChu: "",
    lichHenId: "", // Optional
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          thuCungId: initialData.thuCungId || "",
          tenThuCung: initialData.tenThuCung || "",
          tenVacXin: initialData.tenVacXin || "",
          ngayTiem: initialData.ngayTiem
            ? initialData.ngayTiem.split("T")[0]
            : "",
          ngayTaiChung: initialData.ngayTaiChung
            ? initialData.ngayTaiChung.split("T")[0]
            : "",
          nhanVienId: initialData.nhanVienId || "",
          ghiChu: initialData.ghiChu || "",
          lichHenId: initialData.lichHenId || "",
        });
      } else {
        // Default Create
        const today = new Date().toISOString().split("T")[0];
        setFormData({
          thuCungId: "",
          tenThuCung: "",
          tenVacXin: "",
          ngayTiem: today,
          ngayTaiChung: "", // Để trống để user tự tính hoặc nhập
          nhanVienId: "", // Có thể set default user đang login
          ghiChu: "",
          lichHenId: "",
        });
      }
    }
  }, [isOpen, initialData]);

  useEscapeKey(onClose, isOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.tenThuCung || !formData.tenVacXin || !formData.ngayTiem) {
      alert("Vui lòng điền các thông tin bắt buộc!");
      return;
    }
    // Logic gửi đi
    onSubmit(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-hidden"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="w-full max-w-4xl bg-white rounded-2xl shadow-modal flex flex-col max-h-[95vh] font-body mx-auto my-8"
          >
            {/* Header */}
            <div className="px-10 py-6 border-b border-gray-100 flex justify-between items-center bg-white rounded-t-2xl">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">
                    {isEdit ? "edit_note" : "vaccines"}
                  </span>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    {isEdit
                      ? `Cập nhật Hồ sơ Tiêm #${initialData.tiemChungId}`
                      : "Ghi Hồ sơ Tiêm chủng mới"}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Ghi lại thông tin tiêm phòng và lịch tái chủng
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all"
              >
                <span className="material-symbols-outlined text-gray-500">
                  close
                </span>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 p-8 overflow-y-auto bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Cột Trái: Thông tin Thú cưng & Vắc xin */}
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                    <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">
                        pets
                      </span>{" "}
                      Thú cưng
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="input-group">
                        <label className="text-xs font-medium text-gray-600 block mb-1">
                          ID Thú cưng
                        </label>
                        <input
                          type="number"
                          name="thuCungId"
                          value={formData.thuCungId}
                          onChange={handleChange}
                          className="form-control w-full border border-gray-300 rounded-md p-2 text-sm"
                          placeholder="Nhập ID"
                        />
                      </div>
                      <div className="input-group">
                        <label className="text-xs font-medium text-gray-600 block mb-1">
                          Tên Thú cưng <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="tenThuCung"
                          value={formData.tenThuCung}
                          onChange={handleChange}
                          className="form-control w-full border border-gray-300 rounded-md p-2 text-sm"
                          placeholder="Tên bé"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="form-label block text-sm font-medium mb-1">
                      Tên Vắc xin <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="tenVacXin"
                      value={formData.tenVacXin}
                      onChange={handleChange}
                      className="form-control w-full border border-gray-300 rounded-lg p-2.5"
                      placeholder="VD: Vắc xin 4 bệnh (Mèo)"
                    />
                  </div>
                  <div className="input-group">
                    <label className="form-label block text-sm font-medium mb-1">
                      Bác sĩ thực hiện
                    </label>
                    <select
                      name="nhanVienId"
                      value={formData.nhanVienId}
                      onChange={handleChange}
                      className="form-control w-full border border-gray-300 rounded-lg p-2.5"
                    >
                      <option value="">-- Chọn bác sĩ --</option>
                      {staffList &&
                        staffList.map((staff) => (
                          <option
                            key={staff.nhanVienId}
                            value={staff.nhanVienId}
                          >
                            {staff.hoTen}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {/* Cột Phải: Thời gian & Ghi chú */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="input-group">
                      <label className="form-label block text-sm font-medium mb-1">
                        Ngày tiêm <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="ngayTiem"
                        value={formData.ngayTiem}
                        onChange={handleChange}
                        className="form-control w-full border border-gray-300 rounded-lg p-2.5"
                      />
                    </div>
                    <div className="input-group">
                      <label className="form-label block text-sm font-medium mb-1">
                        Ngày tái chủng
                      </label>
                      <input
                        type="date"
                        name="ngayTaiChung"
                        value={formData.ngayTaiChung}
                        onChange={handleChange}
                        className="form-control w-full border border-gray-300 rounded-lg p-2.5 focus:ring-amber-500 focus:border-amber-500"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Để trống nếu không cần
                      </p>
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="form-label block text-sm font-medium mb-1">
                      Mã Lịch hẹn (nếu có)
                    </label>
                    <input
                      type="number"
                      name="lichHenId"
                      value={formData.lichHenId}
                      onChange={handleChange}
                      className="form-control w-full border border-gray-300 rounded-lg p-2.5"
                      placeholder="Nhập ID lịch hẹn"
                    />
                  </div>

                  <div className="input-group">
                    <label className="form-label block text-sm font-medium mb-1">
                      Ghi chú / Phản ứng
                    </label>
                    <textarea
                      name="ghiChu"
                      value={formData.ghiChu}
                      onChange={handleChange}
                      className="form-control w-full border border-gray-300 rounded-lg p-2.5 h-24"
                      placeholder="Ghi chú sức khỏe sau tiêm..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-10 py-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-4 rounded-b-2xl">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-white border border-transparent hover:border-gray-200 transition-all"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSubmit}
                className="px-8 py-2.5 rounded-lg text-sm font-medium text-white bg-primary hover:bg-green-600 shadow-lg flex items-center gap-2 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">
                  save
                </span>
                Lưu hồ sơ
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VaccinationFormModal;
