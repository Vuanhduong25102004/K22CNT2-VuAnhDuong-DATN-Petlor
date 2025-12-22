import React from "react";
import useEscapeKey from "../../../../../hooks/useEscapeKey";
import { motion, AnimatePresence } from "framer-motion";

const CategoryFormModal = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  isEditing,
  onSave,
}) => {
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
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-3xl bg-white rounded-2xl shadow-modal flex flex-col max-h-[95vh] relative overflow-hidden font-body mx-auto my-8"
          >
            {/* Header */}
            <div className="px-10 py-6 border-b border-border-light/50 flex justify-between items-center bg-white sticky top-0 z-20 backdrop-blur-sm bg-white/95">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-surface border border-border-light flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">
                    {isEditing ? "edit_note" : "add_circle"}
                  </span>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-text-heading tracking-tight font-display">
                    {isEditing ? "Cập nhật Danh mục" : "Thêm Danh Mục Mới"}
                  </h1>
                  <p className="text-sm text-text-body/70 mt-1 font-light">
                    {isEditing
                      ? "Chỉnh sửa thông tin danh mục"
                      : "Điền thông tin danh mục mới"}
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

            {/* Body */}
            <div className="flex-1 p-8 md:p-10 bg-white overflow-y-auto">
              <div className="space-y-8">
                <div className="input-group">
                  <label className="form-label block text-sm font-medium text-text-heading mb-2">
                    Tên danh mục <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={formData.tenDanhMuc}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tenDanhMuc: e.target.value,
                      })
                    }
                    placeholder="Ví dụ: Thức ăn cho mèo"
                  />
                </div>
                <div className="input-group">
                  <label className="form-label block text-sm font-medium text-text-heading mb-2">
                    Mô tả
                  </label>
                  <textarea
                    className="form-control w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows="4"
                    value={formData.moTa}
                    onChange={(e) =>
                      setFormData({ ...formData, moTa: e.target.value })
                    }
                    placeholder="Mô tả chi tiết..."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-10 py-6 bg-white border-t border-border-light/50 flex justify-end gap-4 sticky bottom-0 z-20">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg text-sm font-medium text-text-body hover:bg-surface hover:text-text-heading transition-colors border border-transparent hover:border-border-light"
              >
                Hủy bỏ
              </button>
              <button
                onClick={onSave}
                className="px-8 py-2.5 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary-hover shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 tracking-wide"
              >
                <span className="material-symbols-outlined text-[18px]">
                  save
                </span>
                {isEditing ? "Lưu thay đổi" : "Tạo danh mục"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CategoryFormModal;
