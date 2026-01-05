import React, { useState, useEffect } from "react";
import useEscapeKey from "../../../../../hooks/useEscapeKey";
import { motion, AnimatePresence } from "framer-motion";

const UserFormModal = ({
  isOpen,
  onClose,
  initialData, // null = Create, object = Edit
  onSubmit,
}) => {
  const isEdit = !!initialData;
  const [creationType, setCreationType] = useState("USER"); // 'USER' | 'EMPLOYEE'

  const defaultFormState = {
    hoTen: "",
    email: "",
    password: "", // Bắt buộc khi tạo mới
    soDienThoai: "",
    diaChi: "",
    role: "USER",
    chucVu: "",
    chuyenKhoa: "",
    kinhNghiem: "",
  };

  // State form
  const [formData, setFormData] = useState(defaultFormState);

  const [avatarFile, setAvatarFile] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState("");

  // Reset form khi mở modal
  useEffect(() => {
    if (isOpen) {
      // Hợp nhất dữ liệu mặc định với dữ liệu ban đầu (nếu có)
      const newFormData = { ...defaultFormState, ...(initialData || {}) };
      newFormData.password = ""; // Luôn xóa mật khẩu khi mở modal
      setFormData(newFormData);

      // Cập nhật ảnh đại diện và loại tài khoản
      setPreviewAvatar(
        initialData?.anhDaiDien
          ? `http://localhost:8080/uploads/${initialData.anhDaiDien}`
          : ""
      );
      setCreationType(
        initialData?.role && initialData.role !== "USER" ? "EMPLOYEE" : "USER"
      );

      // Reset file đã chọn
      setAvatarFile(null);
    }
  }, [isOpen, initialData]);

  // Handle Tab Switch (Create Mode Only)
  const handleTypeChange = (type) => {
    setCreationType(type);
    setFormData((prev) => ({
      ...prev,
      role: type === "USER" ? "USER" : "STAFF", // Reset role mặc định khi chuyển tab
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setPreviewAvatar(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    // 1. Chuẩn bị dữ liệu thô
    let submitData = { ...formData };

    // Logic xóa mật khẩu nếu để trống khi chỉnh sửa
    if (isEdit) {
      if (!submitData.password || submitData.password.trim() === "") {
        delete submitData.password;
      }
    }

    // Logic xóa các trường chuyên môn nếu là USER (Create mode)
    if (!isEdit && creationType === "USER") {
      submitData.role = "USER";
      delete submitData.chucVu;
      delete submitData.chuyenKhoa;
      delete submitData.kinhNghiem;
    }

    // 2. CHỈ GỬI DỮ LIỆU THÔ lên cho file cha xử lý
    // Không tạo FormData ở đây nữa
    onSubmit(submitData, avatarFile);
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
            className="w-full max-w-4xl bg-white rounded-2xl shadow-modal flex flex-col max-h-[95vh] relative overflow-hidden mx-auto my-8"
          >
            {/* Header */}
            <div className="px-10 py-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-20">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">
                    {isEdit ? "manage_accounts" : "person_add"}
                  </span>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    {isEdit
                      ? `Cập nhật Người dùng #${initialData.userId}`
                      : "Thêm mới Tài khoản"}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    {isEdit
                      ? "Chỉnh sửa thông tin chi tiết"
                      : "Tạo tài khoản khách hàng hoặc nhân viên"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 p-10 bg-white overflow-y-auto">
              <div className="max-w-3xl mx-auto space-y-8">
                {/* Switcher (Chỉ hiện khi Create) */}
                {!isEdit && (
                  <div className="flex bg-gray-100 p-1 rounded-lg w-full max-w-md mx-auto">
                    <button
                      className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                        creationType === "USER"
                          ? "bg-white text-primary shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => handleTypeChange("USER")}
                    >
                      Khách hàng
                    </button>
                    <button
                      className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                        creationType === "EMPLOYEE"
                          ? "bg-white text-primary shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => handleTypeChange("EMPLOYEE")}
                    >
                      Nhân viên
                    </button>
                  </div>
                )}

                {/* Avatar Upload */}
                <div className="flex justify-center">
                  <div className="relative group">
                    <img
                      src={
                        previewAvatar || "https://placehold.co/100x100?text=+"
                      }
                      alt="Avatar Preview"
                      className="w-24 h-24 rounded-full object-cover border-4 border-gray-50 shadow-sm"
                    />
                    <label className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50 text-primary">
                      <span className="material-symbols-outlined text-sm">
                        upload
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>

                {/* Common Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="input-group">
                    <label className="form-label">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="hoTen"
                      value={formData.hoTen}
                      onChange={handleChange}
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div className="input-group">
                    <label className="form-label">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                    />
                  </div>
                  <div className="input-group">
                    <label className="form-label">
                      Mật khẩu{" "}
                      {isEdit ? (
                        "(Bỏ trống nếu không đổi)"
                      ) : (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••"
                    />
                  </div>
                  <div className="input-group">
                    <label className="form-label">Số điện thoại</label>
                    <input
                      className="form-control"
                      name="soDienThoai"
                      value={formData.soDienThoai}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group md:col-span-2">
                    <label className="form-label">Địa chỉ</label>
                    <input
                      className="form-control"
                      name="diaChi"
                      value={formData.diaChi}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Employee Specific Fields */}
                  {creationType === "EMPLOYEE" && (
                    <div className="md:col-span-2 bg-gray-50 p-6 rounded-xl border border-gray-200 mt-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2 text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                        Thông tin chuyên môn
                      </div>
                      <div className="input-group">
                        <label className="form-label">Vai trò hệ thống</label>
                        <select
                          className="form-control"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                        >
                          <option value="STAFF">Nhân viên</option>
                          <option value="DOCTOR">Bác sĩ</option>
                          <option value="SPA">Spa</option>
                          <option value="ADMIN">Quản trị</option>
                        </select>
                      </div>
                      <div className="input-group">
                        <label className="form-label">Chức vụ</label>
                        <input
                          className="form-control"
                          name="chucVu"
                          value={formData.chucVu}
                          onChange={handleChange}
                          placeholder="VD: Trưởng phòng"
                        />
                      </div>
                      <div className="input-group">
                        <label className="form-label">Chuyên khoa</label>
                        <input
                          className="form-control"
                          name="chuyenKhoa"
                          value={formData.chuyenKhoa}
                          onChange={handleChange}
                          placeholder="VD: Nội khoa"
                        />
                      </div>
                      <div className="input-group">
                        <label className="form-label">Kinh nghiệm</label>
                        <input
                          className="form-control"
                          name="kinhNghiem"
                          value={formData.kinhNghiem}
                          onChange={handleChange}
                          placeholder="VD: 5 năm"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-10 py-6 border-t border-gray-100 flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSubmit}
                className="px-8 py-2.5 rounded-lg text-sm font-medium text-white bg-primary hover:bg-green-600 shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isEdit ? "save" : "check"}
                </span>
                {isEdit ? "Lưu thay đổi" : "Tạo tài khoản"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserFormModal;
