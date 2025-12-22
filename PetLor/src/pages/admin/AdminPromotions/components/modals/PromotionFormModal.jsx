import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEscapeKey from "../../../../../hooks/useEscapeKey";

const PromotionFormModal = ({ isOpen, onClose, initialData, onSubmit }) => {
  const isEdit = !!initialData;

  const [formData, setFormData] = useState({
    maCode: "",
    moTa: "",
    loaiGiamGia: "SO_TIEN", // SO_TIEN hoặc PHAN_TRAM
    giaTriGiam: "",
    ngayBatDau: "",
    ngayKetThuc: "",
    soLuongGioiHan: "",
    donToiThieu: "",
    trangThai: true,
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Edit Mode
        setFormData({
          maCode: initialData.maCode,
          moTa: initialData.moTa,
          loaiGiamGia: initialData.loaiGiamGia,
          giaTriGiam: initialData.giaTriGiam,
          ngayBatDau: initialData.ngayBatDau.split("T")[0], // Lấy YYYY-MM-DD
          ngayKetThuc: initialData.ngayKetThuc.split("T")[0],
          soLuongGioiHan: initialData.soLuongGioiHan,
          donToiThieu: initialData.donToiThieu,
          trangThai: initialData.trangThai,
        });
      } else {
        // Create Mode
        setFormData({
          maCode: "",
          moTa: "",
          loaiGiamGia: "SO_TIEN",
          giaTriGiam: 0,
          ngayBatDau: new Date().toISOString().split("T")[0],
          ngayKetThuc: "",
          soLuongGioiHan: 100,
          donToiThieu: 0,
          trangThai: true,
        });
      }
    }
  }, [isOpen, initialData]);

  useEscapeKey(onClose, isOpen);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    // Validate cơ bản
    if (!formData.maCode || !formData.giaTriGiam || !formData.ngayKetThuc) {
      alert("Vui lòng điền các trường bắt buộc!");
      return;
    }

    // Format lại dữ liệu chuẩn bị gửi đi (thêm time vào date nếu cần)
    const submitData = {
      ...formData,
      giaTriGiam: parseFloat(formData.giaTriGiam),
      soLuongGioiHan: parseInt(formData.soLuongGioiHan),
      donToiThieu: parseFloat(formData.donToiThieu),
      // Thêm giờ mặc định nếu API yêu cầu datetime đầy đủ
      ngayBatDau: formData.ngayBatDau.includes("T")
        ? formData.ngayBatDau
        : `${formData.ngayBatDau}T00:00:00`,
      ngayKetThuc: formData.ngayKetThuc.includes("T")
        ? formData.ngayKetThuc
        : `${formData.ngayKetThuc}T23:59:59`,
    };
    onSubmit(submitData);
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
                    {isEdit ? "edit_note" : "add_circle"}
                  </span>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    {isEdit
                      ? `Cập nhật Mã: ${initialData.maCode}`
                      : "Tạo Mã Khuyến Mãi"}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    {isEdit
                      ? "Điều chỉnh thông tin ưu đãi"
                      : "Thiết lập chương trình khuyến mãi mới"}
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
                {/* Cột Trái */}
                <div className="space-y-6">
                  <div className="input-group">
                    <label className="form-label block text-sm font-medium mb-1">
                      Mã Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="maCode"
                      value={formData.maCode}
                      onChange={handleChange}
                      className="form-control w-full border border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary uppercase"
                      placeholder="VD: SALE50K"
                      disabled={isEdit} // Thường mã code không cho sửa
                    />
                  </div>
                  <div className="input-group">
                    <label className="form-label block text-sm font-medium mb-1">
                      Mô tả
                    </label>
                    <textarea
                      name="moTa"
                      value={formData.moTa}
                      onChange={handleChange}
                      className="form-control w-full border border-gray-300 rounded-lg p-2.5 h-24"
                      placeholder="Mô tả chi tiết..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="input-group">
                      <label className="form-label block text-sm font-medium mb-1">
                        Loại giảm
                      </label>
                      <select
                        name="loaiGiamGia"
                        value={formData.loaiGiamGia}
                        onChange={handleChange}
                        className="form-control w-full border border-gray-300 rounded-lg p-2.5"
                      >
                        <option value="SO_TIEN">Số tiền (VND)</option>
                        <option value="PHAN_TRAM">Phần trăm (%)</option>
                      </select>
                    </div>
                    <div className="input-group">
                      <label className="form-label block text-sm font-medium mb-1">
                        Giá trị giảm <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="giaTriGiam"
                        value={formData.giaTriGiam}
                        onChange={handleChange}
                        className="form-control w-full border border-gray-300 rounded-lg p-2.5"
                      />
                    </div>
                  </div>
                </div>

                {/* Cột Phải */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="input-group">
                      <label className="form-label block text-sm font-medium mb-1">
                        Ngày bắt đầu
                      </label>
                      <input
                        type="date"
                        name="ngayBatDau"
                        value={formData.ngayBatDau}
                        onChange={handleChange}
                        className="form-control w-full border border-gray-300 rounded-lg p-2.5"
                      />
                    </div>
                    <div className="input-group">
                      <label className="form-label block text-sm font-medium mb-1">
                        Ngày kết thúc <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="ngayKetThuc"
                        value={formData.ngayKetThuc}
                        onChange={handleChange}
                        className="form-control w-full border border-gray-300 rounded-lg p-2.5"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="input-group">
                      <label className="form-label block text-sm font-medium mb-1">
                        Số lượng giới hạn
                      </label>
                      <input
                        type="number"
                        name="soLuongGioiHan"
                        value={formData.soLuongGioiHan}
                        onChange={handleChange}
                        className="form-control w-full border border-gray-300 rounded-lg p-2.5"
                      />
                    </div>
                    <div className="input-group">
                      <label className="form-label block text-sm font-medium mb-1">
                        Đơn tối thiểu
                      </label>
                      <input
                        type="number"
                        name="donToiThieu"
                        value={formData.donToiThieu}
                        onChange={handleChange}
                        className="form-control w-full border border-gray-300 rounded-lg p-2.5"
                      />
                    </div>
                  </div>

                  <div className="input-group pt-4">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="trangThai"
                        checked={formData.trangThai}
                        onChange={handleChange}
                        className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        Kích hoạt chương trình này ngay lập tức
                      </span>
                    </label>
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
                {isEdit ? "Lưu thay đổi" : "Tạo khuyến mãi"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PromotionFormModal;
