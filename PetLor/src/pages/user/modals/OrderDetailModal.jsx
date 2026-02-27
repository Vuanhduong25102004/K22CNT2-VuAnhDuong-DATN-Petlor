import { useEffect } from "react";
import {
  getOrderStatusConfig,
  formatCurrency,
  formatJustDate,
} from "../../../utils/formatters";

const OrderDetailModal = ({ isOpen, onClose, detail, loading }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const ui = detail ? getOrderStatusConfig(detail.trangThai) : {};
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-white rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl"
        data-aos="zoom-in"
        data-aos-duration="400"
      >
        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="material-icons-outlined text-[#10B981]">
              receipt_long
            </span>
            Chi tiết đơn hàng
          </h3>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition-all"
          >
            <span className="material-icons">close</span>
          </button>
        </div>

        <div className="p-4 md:p-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center py-10">
              <div className="w-10 h-10 border-4 border-[#10B981] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500 font-bold">Đang tải đơn hàng...</p>
            </div>
          ) : (
            detail && (
              <div className="space-y-6 md:space-y-8">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Mã đơn hàng
                    </p>
                    <p className="text-lg font-black text-gray-900">
                      #ORD-{detail.donHangId}
                    </p>
                  </div>
                  <div className="flex flex-col items-start sm:items-end">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Trạng thái
                    </p>
                    <div
                      className={`flex items-center gap-2 px-4 py-1.5 rounded-xl border ${ui.bgColor} ${ui.borderColor} ${ui.textColor} font-bold text-sm`}
                    >
                      {detail.trangThai}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-[#10B981] uppercase flex items-center gap-2">
                      <span className="material-icons text-sm">
                        local_shipping
                      </span>{" "}
                      Thông tin nhận hàng
                    </p>
                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        {detail.tenNguoiDung}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {detail.diaChiGiaoHang}
                      </p>
                      <p className="text-sm text-gray-600">
                        SĐT: {detail.soDienThoaiNhan}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-[#10B981] uppercase flex items-center gap-2">
                      <span className="material-icons text-sm">payments</span>{" "}
                      Thanh toán
                    </p>
                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        Phương thức: {detail.phuongThucThanhToan}
                      </p>
                      <p className="text-sm text-gray-600 italic">
                        Đặt ngày: {formatJustDate(detail.ngayDatHang)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Sản phẩm đã đặt ({detail.chiTietDonHangs?.length})
                  </p>
                  <div className="divide-y divide-gray-100">
                    {detail.chiTietDonHangs?.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 py-4 items-center"
                      >
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0">
                          {/* SỬA TẠI ĐÂY: Sử dụng fallback giữa hinhAnh và hinhAnhUrl */}
                          <img
                            src={`${API_URL}/uploads/${item.hinhAnh || item.hinhAnhUrl}`}
                            className="w-full h-full object-cover"
                            alt={item.tenSanPham}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://via.placeholder.com/150?text=No+Image";
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-gray-900 truncate">
                            {item.tenSanPham}
                          </h4>
                          <p className="text-xs text-gray-500">
                            Số lượng: x{item.soLuong}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-gray-900">
                            {formatCurrency(item.donGia)}
                          </p>
                          <p className="text-[10px] text-gray-400">
                            Thành tiền:{" "}
                            {formatCurrency(item.donGia * item.soLuong)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-3xl p-6 space-y-3 border border-gray-100 shadow-sm">
                  <div className="flex justify-between text-sm text-gray-500 font-medium">
                    <span>Tổng tiền hàng:</span>
                    <span>{formatCurrency(detail.tongTienHang)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-emerald-600">
                    <span>Giảm giá khuyến mãi:</span>
                    <span>-{formatCurrency(detail.soSienGiam || 0)}</span>
                  </div>
                  <div className="h-[1px] bg-gray-200 my-2"></div>
                  <div className="flex justify-between items-end">
                    <span className="font-extrabold text-gray-900">
                      Tổng thanh toán:
                    </span>
                    <span className="text-2xl font-black text-[#10B981]">
                      {formatCurrency(detail.tongThanhToan)}
                    </span>
                  </div>
                </div>

                {detail.trangThai === "Đã hủy" && (
                  <div className="p-4 bg-red-50 rounded-2xl border border-red-100 flex items-start gap-3">
                    <span className="material-icons text-red-500 mt-0.5">
                      error_outline
                    </span>
                    <div>
                      <p className="text-[10px] text-red-400 font-bold uppercase mb-1">
                        Lý do hủy đơn
                      </p>
                      <p className="text-sm text-red-600 font-bold leading-relaxed">
                        {detail.lyDoHuy || "Khách hàng yêu cầu hủy"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>

        <div className="p-6 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-10 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
