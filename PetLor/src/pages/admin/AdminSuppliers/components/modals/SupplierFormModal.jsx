import React, { useState, useEffect } from "react";
import useEscapeKey from "../../../../../hooks/useEscapeKey";
import { motion, AnimatePresence } from "framer-motion";

const SupplierFormModal = ({ isOpen, onClose, initialData, onSubmit }) => {
  const isEdit = !!initialData;

  const [formData, setFormData] = useState({
    tenNcc: "",
    soDienThoai: "",
    email: "",
    diaChi: "",
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          tenNcc: initialData.tenNcc || "",
          soDienThoai: initialData.soDienThoai || "",
          email: initialData.email || "",
          diaChi: initialData.diaChi || "",
        });
      } else {
        setFormData({
          tenNcc: "",
          soDienThoai: "",
          email: "",
          diaChi: "",
        });
      }
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.tenNcc || !formData.soDienThoai) {
      alert("Vui lòng nhập Tên NCC và Số điện thoại.");
      return;
    }
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
            // Sử dụng max-w-2xl cho form supplier vì nó đơn giản hơn import
            className="w-full max-w-2xl bg-white rounded-2xl shadow-modal flex flex-col max-h-[95vh] relative overflow-hidden font-body mx-auto my-8"
          >
            {/* Header (Giống ImportFormModal) */}
            <div className="px-10 py-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-20">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-[#1980e6]">
                  <span className="material-symbols-outlined text-primary">
                    {isEdit ? "edit_square" : "store"}
                  </span>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    {isEdit ? "Cập nhật Nhà Cung Cấp" : "Thêm Nhà Cung Cấp Mới"}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1 font-light">
                    Quản lý thông tin đối tác
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-all"
              >
                <span className="material-symbols-outlined font-light">
                  close
                </span>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 p-8 md:p-10 bg-white overflow-y-auto">
              <div className="space-y-6">
                {/* Tên NCC */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-[#1980e6] text-xl">
                      badge
                    </span>
                    <h3 className="text-md font-semibold text-gray-900">
                      Thông tin chung
                    </h3>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên Nhà cung cấp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="tenNcc"
                      value={formData.tenNcc}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1980e6] focus:ring-1 focus:ring-[#1980e6]"
                      placeholder="Nhập tên nhà cung cấp..."
                    />
                  </div>
                </div>

                <div className="border-t border-gray-100 my-4"></div>

                {/* Liên hệ */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-orange-500 text-xl">
                      contact_mail
                    </span>
                    <h3 className="text-md font-semibold text-gray-900">
                      Thông tin liên hệ
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số điện thoại <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="soDienThoai"
                        value={formData.soDienThoai}
                        onChange={handleChange}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1980e6] focus:ring-1 focus:ring-[#1980e6]"
                        placeholder="09xx..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1980e6] focus:ring-1 focus:ring-[#1980e6]"
                        placeholder="example@mail.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Địa chỉ
                    </label>
                    <textarea
                      name="diaChi"
                      value={formData.diaChi}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg h-24 focus:outline-none focus:border-[#1980e6] focus:ring-1 focus:ring-[#1980e6]"
                      placeholder="Địa chỉ chi tiết..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-10 py-6 bg-white border-t border-gray-100 flex justify-end gap-4 sticky bottom-0 z-20">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSubmit}
                className="px-8 py-2.5 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary-hover shadow-lg flex items-center gap-2 transition-all hover:-translate-y-0.5"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isEdit ? "save" : "check"}
                </span>
                {isEdit ? "Lưu thay đổi" : "Thêm mới"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SupplierFormModal;
