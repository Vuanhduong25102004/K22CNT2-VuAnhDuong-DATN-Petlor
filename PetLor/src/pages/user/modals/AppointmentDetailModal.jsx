import React from "react";
import {
  renderStatusBadge,
  formatJustDate,
  formatCurrency,
} from "../../../utils/formatters";

const AppointmentDetailModal = ({ isOpen, onClose, detail, loading }) => {
  if (!isOpen) return null;

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl"
        data-aos="zoom-in"
        data-aos-duration="400"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="material-icons-outlined text-[#2a9d8f]">
              payments
            </span>
            Chi tiết lịch hẹn
          </h3>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all"
          >
            <span className="material-icons">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center py-10">
              <div className="w-10 h-10 border-4 border-[#10B981] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500 font-bold">Đang tải thông tin...</p>
            </div>
          ) : (
            detail && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-lg">
                    Mã lịch: #{detail.lichHenId}
                  </span>
                  {renderStatusBadge(detail.trangThaiLichHen)}
                </div>

                {/* Dịch vụ & Nhân viên */}
                <div className="bg-emerald-50/50 rounded-3xl p-6 space-y-4 border border-emerald-100/50">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#2a9d8f]">
                      <span className="material-symbols-outlined text-3xl">
                        content_cut
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] text-[#2a9d8f] font-bold uppercase tracking-wider">
                        Dịch vụ thực hiện
                      </p>
                      <p className="text-xl font-black text-gray-900 leading-tight">
                        {detail.tenDichVu}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Thời gian & Tổng tiền (Hai cột) */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                    <p className="text-[10px] text-blue-400 font-bold uppercase mb-1 flex items-center gap-1">
                      <span className="material-icons text-xs">schedule</span>{" "}
                      Giờ hẹn
                    </p>
                    <p className="text-sm font-black text-blue-700">
                      {formatTime(detail.thoiGianBatDau)} -{" "}
                      {formatTime(detail.thoiGianKetThuc)}
                    </p>
                    <p className="text-[10px] text-blue-400 font-medium mt-1 italic">
                      {formatJustDate(detail.thoiGianBatDau)}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100">
                    <p className="text-[10px] text-orange-500 font-bold uppercase mb-1 flex items-center gap-1">
                      <span className="material-icons text-xs">
                        monetization_on
                      </span>{" "}
                      Tổng thanh toán
                    </p>
                    {/* Giả định trường giá là giaDichVu, nếu backend trả về tên khác bạn hãy đổi ở đây */}
                    <p className="text-lg font-black text-orange-700">
                      {formatCurrency(detail.giaDichVu || 0)}
                    </p>
                    <p className="text-[10px] text-orange-400 font-medium mt-1 italic">
                      Giá đã bao gồm VAT
                    </p>
                  </div>
                </div>

                {/* Thông tin thêm */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">
                      Thú cưng
                    </p>
                    <p className="font-bold text-gray-800">
                      {detail.tenThuCung || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">
                      Nhân viên phụ trách
                    </p>
                    <p className="font-bold text-gray-800">
                      {detail.tenNhanVien || "Chưa xác định"}
                    </p>
                  </div>
                </div>

                {/* Ghi chú */}
                <div className="space-y-2">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">
                    Ghi chú từ bạn
                  </p>
                  <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-2xl border border-gray-100 italic">
                    {detail.ghiChuKhachHang
                      ? `"${detail.ghiChuKhachHang}"`
                      : "Không có ghi chú."}
                  </p>
                </div>
              </div>
            )
          )}
        </div>

        <div className="p-6 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-10 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailModal;
