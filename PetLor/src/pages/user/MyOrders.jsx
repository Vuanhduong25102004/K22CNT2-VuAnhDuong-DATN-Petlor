import React, { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";
import orderService from "../../services/orderService";
import {
  formatCurrency,
  formatJustDate,
  getOrderStatusConfig,
} from "../../utils/formatters";
import AOS from "aos";

const MyOrders = () => {
  const [user] = useOutletContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Tất cả");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const tabs = ["Tất cả", "Chờ xử lý", "Đang giao", "Đã giao", "Đã hủy"];

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await orderService.getMyOrders();
      const data = res.data || res;
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    AOS.init({ duration: 800 });
  }, []);

  // Lọc đơn hàng theo Tab
  const filteredOrders = orders.filter((order) => {
    if (activeTab === "Tất cả") return true;
    return order.trangThai === activeTab;
  });

  return (
    <main className="flex-1 space-y-6 animate-fade-in pb-20">
      {/* --- PHẦN HEADER --- */}
      <div
        className="bg-white rounded-3xl p-8 shadow-sm relative overflow-hidden border border-gray-100 isolate"
        data-aos="fade-down"
      >
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#10B981]/10 to-transparent"></div>
        <span className="material-symbols-outlined absolute -right-6 -bottom-8 text-9xl text-[#10B981]/5 rotate-12 select-none">
          receipt_long
        </span>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Lịch sử <span className="text-[#10B981]">đơn hàng</span>
            </h1>
            <p className="text-gray-500 text-lg">
              Theo dõi hành trình đơn hàng của bạn.
            </p>
          </div>
          <Link
            to="/products"
            className="bg-[#10B981] text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-emerald-600 transition-all flex items-center gap-2"
          >
            <span className="material-icons-outlined">shopping_bag</span> Tiếp
            tục mua sắm
          </Link>
        </div>
      </div>

      {/* --- PHẦN TABS --- */}
      <div
        className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100 inline-flex flex-wrap gap-1"
        data-aos="fade-up"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-2xl text-sm font-bold transition-all duration-300 ${
              activeTab === tab
                ? "bg-[#2a9d8f] text-white shadow-md"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* --- DANH SÁCH ĐƠN HÀNG --- */}
      <div className="space-y-8" data-aos="fade-up">
        {loading ? (
          <div className="flex flex-col items-center py-20 text-gray-400">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#10B981] mb-4"></div>
            <p className="font-medium">Đang tải đơn hàng...</p>
          </div>
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
            const ui = getOrderStatusConfig(order.trangThai);
            const firstItem = order.chiTietDonHangs?.[0];
            const totalQuantity =
              order.chiTietDonHangs?.reduce(
                (sum, item) => sum + item.soLuong,
                0
              ) || 0;

            return (
              <div
                key={order.donHangId}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 group"
              >
                {/* Thanh màu trên cùng (Khắc phục lỗi Tailwind động) */}
                <div className={`h-1.5 w-full ${ui.topBarColor}`}></div>

                <div className="p-6">
                  {/* ID & Status Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-12 w-12 rounded-2xl flex items-center justify-center border ${ui.bgColor} ${ui.textColor} ${ui.borderColor}`}
                      >
                        <span className="material-icons-outlined">
                          {ui.icon}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">
                          Đặt ngày {formatJustDate(order.ngayDatHang)}
                        </p>
                        <h3 className="text-xl font-bold text-gray-900">
                          #ORD-{order.donHangId}
                        </h3>
                      </div>
                    </div>

                    {/* Badge Trạng Thái */}
                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${ui.bgColor} ${ui.borderColor}`}
                    >
                      <div
                        className={`h-2 w-2 rounded-full ${ui.topBarColor} ${
                          order.trangThai !== "Đã giao" &&
                          order.trangThai !== "Đã hủy"
                            ? "animate-pulse"
                            : ""
                        }`}
                      ></div>
                      <span
                        className={`text-sm font-bold uppercase tracking-wide ${ui.textColor}`}
                      >
                        {order.trangThai}
                      </span>
                    </div>
                  </div>

                  {/* Thanh Tiến Trình (Animation mượt mà) */}
                  {order.trangThai !== "Đã hủy" && (
                    <div className="hidden sm:flex items-center justify-between relative mb-12 px-10">
                      <div className="absolute left-0 top-4 w-full h-1.5 bg-gray-100 rounded-full"></div>
                      <div
                        className="absolute left-0 top-4 h-1.5 bg-gradient-to-r from-[#10B981] to-[#2a9d8f] rounded-full transition-transform duration-[1500ms] ease-out origin-left z-0"
                        style={{
                          width: "100%",
                          transform: `scaleX(${ui.percent})`,
                        }}
                      ></div>

                      <StepItem
                        icon="check"
                        label="Đã đặt"
                        active={ui.step >= 1}
                      />
                      <StepItem
                        icon="thumb_up"
                        label="Xác nhận"
                        active={ui.step >= 2}
                      />
                      <StepItem
                        icon="inventory_2"
                        label="Xử lý"
                        active={ui.step >= 3}
                        current={ui.step === 3}
                      />
                      <StepItem
                        icon="local_shipping"
                        label="Vận chuyển"
                        active={ui.step >= 4}
                        current={ui.step === 4}
                      />
                      <StepItem
                        icon="home"
                        label="Thành công"
                        active={ui.step >= 5}
                        current={ui.step === 5}
                      />
                    </div>
                  )}

                  {/* Box Tóm Tắt Sản Phẩm */}
                  <div className="bg-gray-50 rounded-2xl p-5 mb-6 flex flex-col md:flex-row gap-6 border border-gray-100">
                    <div className="flex-grow flex items-center gap-4">
                      <div className="h-20 w-20 rounded-xl bg-white border border-gray-200 overflow-hidden flex-shrink-0">
                        {firstItem?.hinhAnhUrl ? (
                          <img
                            src={`${API_URL}/uploads/${firstItem.hinhAnhUrl}`}
                            className="w-full h-full object-cover"
                            alt="product"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <span className="material-icons-outlined text-3xl">
                              shopping_bag
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-gray-900 text-lg truncate">
                          {firstItem?.tenSanPham || "Kiện hàng PetCare"}...
                        </h4>
                        <p className="text-sm text-gray-500">
                          {totalQuantity} sản phẩm • Thanh toán{" "}
                          {order.phuongThucThanhToan}
                        </p>
                        <p className="text-xs text-gray-400 mt-2 italic truncate max-w-xs md:max-w-md">
                          {order.chiTietDonHangs
                            ?.map((i) => i.tenSanPham)
                            .join(", ")}
                        </p>
                      </div>
                    </div>
                    <div className="md:border-l md:pl-8 flex flex-col justify-center md:items-end">
                      <span className="text-xs text-gray-400 font-bold uppercase mb-1">
                        Tổng tiền
                      </span>
                      <span className="text-2xl font-black text-[#2a9d8f]">
                        {formatCurrency(order.tongThanhToan)}
                      </span>
                    </div>
                  </div>

                  {/* Nút Hành Động */}
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 text-sm bg-blue-50 px-4 py-2 rounded-lg text-blue-700 font-medium">
                      <span className="material-icons-outlined text-base">
                        schedule
                      </span>
                      Dự kiến nhận hàng sau 2-3 ngày.
                    </div>
                    <div className="flex gap-3 w-full sm:w-auto">
                      {order.trangThai === "Chờ xử lý" && (
                        <button className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-bold border border-red-100 text-red-500 hover:bg-red-50 transition">
                          Hủy đơn
                        </button>
                      )}
                      <Link
                        to={`/orders/${order.donHangId}`}
                        className="flex-1 sm:flex-none px-8 py-2.5 rounded-xl text-sm font-bold bg-gray-900 text-white hover:bg-gray-800 shadow-lg text-center transition transform hover:-translate-y-0.5"
                      >
                        Chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <span className="material-icons-outlined text-6xl text-gray-200 mb-4">
              shopping_basket
            </span>
            <p className="text-gray-400 font-medium">
              Không tìm thấy đơn hàng nào trong danh sách này.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

/**
 * Component hỗ trợ render từng nấc của Stepper
 */
const StepItem = ({ icon, label, active, current }) => (
  <div className="flex flex-col items-center gap-2 relative z-10">
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center ring-4 ring-white transition-all duration-700 ${
        current
          ? "bg-yellow-400 text-white shadow-[0_0_15px_rgba(250,204,21,0.5)] scale-110"
          : active
          ? "bg-[#2a9d8f] text-white"
          : "bg-white text-gray-300 border border-gray-100"
      }`}
    >
      <span className="material-icons-outlined text-sm">{icon}</span>
    </div>
    <span
      className={`text-[10px] font-bold uppercase tracking-tighter transition-colors ${
        active ? "text-[#2a9d8f]" : "text-gray-400"
      }`}
    >
      {label}
    </span>
  </div>
);

export default MyOrders;
