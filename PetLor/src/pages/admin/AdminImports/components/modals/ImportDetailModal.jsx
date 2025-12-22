import React from "react";
import useEscapeKey from "../../../../../hooks/useEscapeKey";
import { motion, AnimatePresence } from "framer-motion";
import { formatCurrency, formatDate } from "../../../../../utils/formatters";

const ImportDetailModal = ({ isOpen, onClose, importData }) => {
  if (!importData) return null;

  // Lấy danh sách chi tiết (Support cả 2 trường hợp tên biến)
  const detailList =
    importData.chiTietList || importData.chiTietPhieuNhapList || [];

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
            className="w-full max-w-5xl bg-white rounded-2xl shadow-modal flex flex-col max-h-[90vh] relative overflow-hidden font-body mx-auto my-8"
          >
            {/* Header */}
            <div className="px-10 py-6 border-b border-border-light/50 flex justify-between items-center bg-white sticky top-0 z-20">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-surface border border-border-light flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">
                    description
                  </span>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-text-heading font-display">
                    Chi tiết Phiếu nhập #{importData.phieuNhapId}
                  </h1>
                  <p className="text-sm text-text-body/70 mt-1 font-light">
                    Xem thông tin và danh sách sản phẩm nhập kho
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
              <div className="space-y-10 max-w-4xl mx-auto">
                {/* Section 1: Thông tin chung */}
                <div className="pb-8 border-b border-border-light">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-primary font-light text-2xl">
                      info
                    </span>
                    <h2 className="text-lg font-semibold text-text-heading">
                      Thông tin Phiếu
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    <div className="input-group">
                      <label className="text-sm font-medium text-text-heading mb-1 block">
                        Nhà cung cấp
                      </label>
                      <div className="p-3 bg-surface rounded-lg border border-border-light text-text-heading font-medium">
                        {importData.tenNhaCungCap || importData.tenNcc}
                      </div>
                    </div>
                    <div className="input-group">
                      <label className="text-sm font-medium text-text-heading mb-1 block">
                        Người thực hiện
                      </label>
                      <div className="p-3 bg-surface rounded-lg border border-border-light text-text-body">
                        {importData.tenNhanVien || "Admin"}
                      </div>
                    </div>
                    <div className="input-group">
                      <label className="text-sm font-medium text-text-heading mb-1 block">
                        Ngày nhập
                      </label>
                      <div className="p-3 bg-surface rounded-lg border border-border-light text-text-body">
                        {formatDate(importData.ngayNhap)}
                      </div>
                    </div>
                    <div className="input-group">
                      <label className="text-sm font-medium text-text-heading mb-1 block">
                        Tổng giá trị
                      </label>
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200 text-green-700 font-bold text-lg">
                        {formatCurrency(importData.tongTien)}
                      </div>
                    </div>
                    <div className="input-group md:col-span-2">
                      <label className="text-sm font-medium text-text-heading mb-1 block">
                        Ghi chú
                      </label>
                      <div className="p-3 bg-surface rounded-lg border border-border-light text-text-body italic">
                        {importData.ghiChu || "Không có ghi chú"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Danh sách sản phẩm */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-orange-400 font-light text-2xl">
                        inventory_2
                      </span>
                      <h2 className="text-lg font-semibold text-text-heading">
                        Danh sách Sản phẩm ({detailList.length})
                      </h2>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-border-light overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                      <thead className="bg-surface border-b border-border-light text-xs font-semibold text-text-body uppercase tracking-wider">
                        <tr>
                          <th className="p-4">Sản phẩm</th>
                          <th className="p-4 text-center">Số lượng</th>
                          <th className="p-4 text-right">Giá nhập</th>
                          <th className="p-4 text-right">Thành tiền</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {detailList.length > 0 ? (
                          detailList.map((item, index) => (
                            <tr
                              key={index}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="p-4 text-sm font-medium text-text-heading">
                                {item.tenSanPham}
                              </td>
                              <td className="p-4 text-sm text-center text-text-body">
                                {item.soLuong}
                              </td>
                              <td className="p-4 text-sm text-right text-text-body">
                                {formatCurrency(item.giaNhap)}
                              </td>
                              <td className="p-4 text-sm text-right font-bold text-primary">
                                {formatCurrency(item.soLuong * item.giaNhap)}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="4"
                              className="p-8 text-center text-gray-400"
                            >
                              Không tìm thấy chi tiết sản phẩm.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-10 py-6 bg-white border-t border-border-light/50 flex justify-end sticky bottom-0 z-20">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg text-sm font-medium text-text-body hover:bg-surface border border-transparent hover:border-border-light transition-colors"
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

export default ImportDetailModal;
