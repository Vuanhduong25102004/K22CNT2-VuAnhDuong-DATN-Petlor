import React, { useState, useEffect } from "react";
import petService from "../../../services/petService";

const PetFormModal = ({ isOpen, onClose, onSuccess, initialData }) => {
  // Xác định chế độ: Nếu có initialData => Edit Mode
  const isEditMode = !!initialData;
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const initialFormState = {
    tenThuCung: "",
    loai: "Chó",
    giong: "",
    gioiTinh: "Đực",
    ngaySinh: "",
    canNang: "", // Thêm trường cân nặng cho đầy đủ
    ghiChu: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // --- 1. Fill dữ liệu khi mở Modal ---
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // --- EDIT MODE: Map dữ liệu từ backend vào state form ---
        setFormData({
          tenThuCung: initialData.tenThuCung || "",
          loai: initialData.chungLoai || "Chó",
          giong: initialData.giongLoai || "",
          gioiTinh: initialData.gioiTinh || "Đực",
          ngaySinh: initialData.ngaySinh || "",
          canNang: initialData.canNang || "",
          ghiChu: initialData.ghiChuSucKhoe || "",
        });

        // Xử lý ảnh preview từ backend
        if (initialData.hinhAnh) {
          const imgUrl = initialData.hinhAnh.startsWith("http")
            ? initialData.hinhAnh
            : `${API_URL}/uploads/${initialData.hinhAnh}`;
          setPreviewUrl(imgUrl);
        } else {
          setPreviewUrl("");
        }
      } else {
        // --- CREATE MODE: Reset form ---
        setFormData(initialFormState);
        setPreviewUrl("");
      }
      setAvatarFile(null); // Reset file upload mới
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // --- 2. Xử lý Submit (Create hoặc Update) ---
  const handleSubmit = async () => {
    if (!formData.tenThuCung) {
      alert("Vui lòng nhập tên thú cưng!");
      return;
    }

    setLoading(true);
    try {
      const dataToSend = new FormData();

      // Chuẩn bị JSON object
      const petInfo = {
        tenThuCung: formData.tenThuCung,
        chungLoai: formData.loai,
        giongLoai: formData.giong,
        ngaySinh: formData.ngaySinh || null,
        gioiTinh: formData.gioiTinh,
        canNang: formData.canNang ? Number(formData.canNang) : null,
        ghiChuSucKhoe: formData.ghiChu,
      };

      // Đóng gói JSON
      dataToSend.append(
        "thuCung",
        new Blob([JSON.stringify(petInfo)], { type: "application/json" })
      );

      // Đóng gói File (nếu có chọn ảnh mới)
      if (avatarFile) {
        dataToSend.append("hinhAnh", avatarFile);
      }

      // Gọi API tương ứng
      if (isEditMode) {
        // Gọi API cập nhật
        await petService.updateMyPet(initialData.thuCungId, dataToSend);
        alert("Cập nhật thú cưng thành công!");
      } else {
        // Gọi API tạo mới
        await petService.createMyPet(dataToSend);
        alert("Thêm thú cưng thành công!");
      }

      onSuccess(); // Load lại danh sách ở cha
      onClose(); // Đóng modal
    } catch (error) {
      console.error("Lỗi thao tác thú cưng:", error);
      alert("Thao tác thất bại. Vui lòng kiểm tra lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden transition-visibility duration-500 ${
        isOpen ? "visible" : "invisible delay-500"
      }`}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      ></div>

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10 pointer-events-none">
        <div
          className={`pointer-events-auto w-screen max-w-md transform transition-transform duration-500 ease-in-out flex flex-col h-full bg-white shadow-2xl ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header Dynamic Title */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
            <div>
              <h3 className="text-xl font-bold text-[#0d1b0d] leading-tight">
                {isEditMode ? "Cập nhật thú cưng" : "Thêm thú cưng"}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {isEditMode
                  ? "Chỉnh sửa thông tin hồ sơ"
                  : "Tạo hồ sơ mới cho người bạn nhỏ"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100 cursor-pointer focus:outline-none"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white custom-scrollbar">
            {/* Upload Ảnh */}
            <div className="flex flex-col items-center justify-center gap-3 pb-2">
              <div className="relative group">
                <div
                  className="w-28 h-28 rounded-full bg-gray-100 border-4 border-white shadow-md bg-cover bg-center flex items-center justify-center overflow-hidden"
                  style={
                    previewUrl ? { backgroundImage: `url(${previewUrl})` } : {}
                  }
                >
                  {!previewUrl && (
                    <span className="material-symbols-outlined text-4xl text-gray-300">
                      pets
                    </span>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-[#0fd60f] transition-all border-2 border-white hover:scale-105">
                  <span className="material-symbols-outlined text-[18px] block text-[#0d1b0d]">
                    {isEditMode ? "edit" : "add_a_photo"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500 font-medium">
                Ảnh đại diện thú cưng
              </p>
            </div>

            {/* Tên thú cưng */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase text-gray-500">
                Tên thú cưng <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 text-[#0d1b0d] outline-none font-medium"
                name="tenThuCung"
                value={formData.tenThuCung}
                onChange={handleChange}
                placeholder="Ví dụ: Lu, Miu..."
                type="text"
              />
            </div>

            {/* Loài & Giống */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase text-gray-500">
                  Chủng loại
                </label>
                <div className="relative">
                  <select
                    className="appearance-none w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm focus:bg-white focus:border-primary outline-none font-medium"
                    name="loai"
                    value={formData.loai}
                    onChange={handleChange}
                  >
                    <option value="Chó">Chó</option>
                    <option value="Mèo">Mèo</option>
                    <option value="Chim">Chim</option>
                    <option value="Khác">Khác</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                    <span className="material-symbols-outlined text-[20px]">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase text-gray-500">
                  Giống loài
                </label>
                <input
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm focus:bg-white focus:border-primary outline-none font-medium"
                  name="giong"
                  value={formData.giong}
                  onChange={handleChange}
                  placeholder="VD: Golden..."
                  type="text"
                />
              </div>
            </div>

            {/* Giới tính */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase text-gray-500">
                Giới tính
              </label>
              <div className="flex gap-3">
                {/* Lựa chọn: Đực */}
                <label className="flex-1 cursor-pointer group">
                  <input
                    className="sr-only"
                    name="gioiTinh"
                    type="radio"
                    value="Đực"
                    checked={formData.gioiTinh === "Đực"}
                    onChange={handleChange}
                  />
                  <div
                    className={`rounded-xl border py-2.5 flex items-center justify-center gap-2 text-sm font-medium transition-all shadow-sm
          ${
            formData.gioiTinh === "Đực"
              ? "border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500" // Style khi ĐƯỢC chọn
              : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50" // Style khi KHÔNG chọn
          }
        `}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      male
                    </span>
                    Đực
                  </div>
                </label>

                {/* Lựa chọn: Cái */}
                <label className="flex-1 cursor-pointer group">
                  <input
                    className="sr-only"
                    name="gioiTinh"
                    type="radio"
                    value="Cái"
                    checked={formData.gioiTinh === "Cái"}
                    onChange={handleChange}
                  />
                  <div
                    className={`rounded-xl border py-2.5 flex items-center justify-center gap-2 text-sm font-medium transition-all shadow-sm
                      ${
                        formData.gioiTinh === "Cái"
                          ? "border-pink-500 bg-pink-50 text-pink-700 ring-1 ring-pink-500"
                          : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                      }
                    `}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      female
                    </span>
                    Cái
                  </div>
                </label>
              </div>
            </div>

            {/* Ngày sinh & Cân nặng */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase text-gray-500">
                  Ngày sinh
                </label>
                <input
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm focus:bg-white focus:border-primary outline-none font-medium"
                  name="ngaySinh"
                  value={formData.ngaySinh}
                  onChange={handleChange}
                  type="date"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase text-gray-500">
                  Cân nặng (Kg)
                </label>
                <input
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm focus:bg-white focus:border-primary outline-none font-medium"
                  name="canNang"
                  value={formData.canNang}
                  onChange={handleChange}
                  type="number"
                  step="0.1"
                  placeholder="0.0"
                />
              </div>
            </div>

            {/* Ghi chú */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase text-gray-500">
                Ghi chú sức khỏe
              </label>
              <textarea
                className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm focus:bg-white focus:border-primary outline-none font-medium resize-none"
                name="ghiChu"
                value={formData.ghiChu}
                onChange={handleChange}
                placeholder="Tiền sử bệnh, dị ứng..."
                rows="3"
              ></textarea>
            </div>
          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50/50 shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer"
                type="button"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-[#0d1b0d] shadow-lg shadow-green-500/20 hover:bg-[#0fd60f] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                type="button"
              >
                {loading && (
                  <span className="material-symbols-outlined animate-spin text-sm">
                    progress_activity
                  </span>
                )}
                {loading
                  ? "Đang lưu..."
                  : isEditMode
                  ? "Lưu thay đổi"
                  : "Thêm thú cưng"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetFormModal;
