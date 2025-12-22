import React, { useState, useEffect } from "react";
import useEscapeKey from "../../../../../hooks/useEscapeKey";
import { motion, AnimatePresence } from "framer-motion";

const EmployeeFormModal = ({
  isOpen,
  onClose,
  initialData, // Dữ liệu để sửa (nếu có)
  onSubmit, // Hàm xử lý khi bấm Lưu (Parent sẽ truyền vào)
}) => {
  // Xác định chế độ đang là Edit hay Create
  const isEdit = !!initialData;

  // State form
  const [formData, setFormData] = useState({
    hoTen: "",
    email: "",
    password: "", // Password chỉ bắt buộc khi tạo mới
    soDienThoai: "",
    chucVu: "",
    chuyenKhoa: "",
    kinhNghiem: "",
    role: "STAFF",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState("");

  // Effect: Reset hoặc điền dữ liệu khi modal mở/đóng hoặc initialData thay đổi
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Chế độ Edit: Điền dữ liệu cũ
        setFormData({
          hoTen: initialData.hoTen || "",
          email: initialData.email || "",
          password: "", // Không điền password cũ vì lý do bảo mật
          soDienThoai: initialData.soDienThoai || "",
          chucVu: initialData.chucVu || "",
          chuyenKhoa: initialData.chuyenKhoa || "",
          kinhNghiem: initialData.kinhNghiem || "",
          role: initialData.role || "STAFF",
        });
        // Xử lý ảnh preview từ URL server nếu có
        setPreviewAvatar(
          initialData.img || initialData.anhDaiDien
            ? initialData.img ||
                `http://localhost:8080/uploads/${initialData.anhDaiDien}`
            : ""
        );
      } else {
        // Chế độ Create: Reset form trắng
        setFormData({
          hoTen: "",
          email: "",
          password: "",
          soDienThoai: "",
          chucVu: "",
          chuyenKhoa: "",
          kinhNghiem: "",
          role: "STAFF",
        });
        setPreviewAvatar("");
      }
      setAvatarFile(null);
    }
  }, [isOpen, initialData]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý chọn ảnh
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setPreviewAvatar(URL.createObjectURL(file));
    }
  };

  // Xử lý submit
  const handleSubmit = () => {
    // Gọi hàm onSubmit từ Parent, truyền data và file
    onSubmit(formData, avatarFile);
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
            className="w-full max-w-3xl bg-white rounded-2xl shadow-modal flex flex-col max-h-[95vh] relative overflow-hidden font-body mx-auto my-8"
          >
            {/* Header: Thay đổi tiêu đề dựa trên isEdit */}
            <div className="px-10 py-6 border-b border-border-light/50 flex justify-between items-center bg-white sticky top-0 z-20">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-surface border border-border-light flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">
                    {isEdit ? "edit_note" : "person_add"}
                  </span>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-text-heading">
                    {isEdit
                      ? `Cập nhật Nhân viên #${initialData.nhanVienId}`
                      : "Thêm mới Nhân viên"}
                  </h1>
                  <p className="text-sm text-text-body/70 mt-1 font-light">
                    {isEdit
                      ? "Cập nhật thông tin hồ sơ"
                      : "Tạo tài khoản và hồ sơ mới"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center text-secondary hover:bg-surface transition-all"
              >
                <span className="material-symbols-outlined font-light">
                  close
                </span>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 p-8 md:p-10 bg-white overflow-y-auto">
              <div className="space-y-8">
                {/* Form Inputs - Dùng chung */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="input-group">
                    <label className="form-label">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="hoTen"
                      className="form-control"
                      value={formData.hoTen}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group">
                    <label className="form-label">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Password: Chỉ hiển thị hoặc bắt buộc khi tạo mới. Khi Edit có thể để trống nếu không đổi pass */}
                  <div className="input-group">
                    <label className="form-label">
                      Mật khẩu{" "}
                      {isEdit ? (
                        "(Để trống nếu không đổi)"
                      ) : (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group">
                    <label className="form-label">Số điện thoại</label>
                    <input
                      type="text"
                      name="soDienThoai"
                      className="form-control"
                      value={formData.soDienThoai}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group">
                    <label className="form-label">Chức vụ</label>
                    <input
                      type="text"
                      name="chucVu"
                      className="form-control"
                      value={formData.chucVu}
                      onChange={handleChange}
                      placeholder="VD: Bác sĩ thú y"
                    />
                  </div>

                  {/* Chỉ hiển thị Role khi tạo mới hoặc nếu logic cho phép sửa Role */}
                  <div className="input-group">
                    <label className="form-label">Vai trò</label>
                    <select
                      name="role"
                      className="form-control"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="STAFF">Nhân viên (STAFF)</option>
                      <option value="DOCTOR">Bác sĩ (DOCTOR)</option>
                      <option value="SPA">Spa (SPA)</option>
                      <option value="ADMIN">Quản trị (ADMIN)</option>
                    </select>
                  </div>

                  <div className="input-group md:col-span-2">
                    <label className="form-label">Ảnh đại diện</label>
                    <div className="mt-2 flex items-center space-x-4">
                      <img
                        src={
                          previewAvatar ||
                          "https://placehold.co/128x128?text=Avatar"
                        }
                        alt="Avatar"
                        className="h-16 w-16 rounded-full object-cover"
                      />
                      <input
                        type="file"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>

                  <div className="input-group md:col-span-2">
                    <label className="form-label">
                      Chuyên khoa / Kinh nghiệm
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="chuyenKhoa"
                        placeholder="Chuyên khoa"
                        className="form-control"
                        value={formData.chuyenKhoa}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="kinhNghiem"
                        placeholder="Kinh nghiệm"
                        className="form-control"
                        value={formData.kinhNghiem}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-10 py-6 bg-white border-t border-border-light/50 flex justify-end gap-4 sticky bottom-0 z-20">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg text-sm font-medium text-text-body hover:bg-surface border border-transparent hover:border-border-light"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSubmit}
                className="px-8 py-2.5 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary-hover shadow-lg flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isEdit ? "save" : "check"}
                </span>
                {isEdit ? "Lưu thay đổi" : "Tạo Nhân viên"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmployeeFormModal;
