import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import orderService from "../../../services/orderService";

// --- CUSTOM TOAST COMPONENTS (Giống AdminReviews) ---

// 1. Toast thông báo (Success/Error)
const CustomToast = ({ closeToast, title, message, type }) => {
  const isSuccess = type === "success";
  const icon = isSuccess ? "check_circle" : "error";
  const iconColor = isSuccess ? "text-[#2a9d90]" : "text-red-500";
  const titleColor = isSuccess ? "text-[#2a9d90]" : "text-red-600";
  const bgColor = isSuccess ? "bg-[#2a9d90]/5" : "bg-red-50";

  return (
    <div className="flex items-start gap-4 w-full">
      <div
        className={`shrink-0 size-10 rounded-full flex items-center justify-center ${bgColor}`}
      >
        <span className={`material-symbols-outlined text-[24px] ${iconColor}`}>
          {icon}
        </span>
      </div>
      <div className="flex-1 pt-1">
        <h4 className={`text-sm font-extrabold ${titleColor} mb-1`}>{title}</h4>
        <p className="text-xs font-bold text-[#101918]/80 leading-relaxed">
          {message}
        </p>
      </div>
      <button
        onClick={closeToast}
        className="text-gray-400 hover:text-gray-600 transition-colors pt-1"
      >
        <span className="material-symbols-outlined text-[20px]">close</span>
      </button>
    </div>
  );
};

// 2. Toast xác nhận (Confirm Action) - Style đồng bộ
const ToastConfirm = ({ message, onConfirm, closeToast }) => (
  <div className="flex flex-col w-full">
    <div className="flex items-start gap-4 mb-3">
      <div className="shrink-0 size-10 rounded-full flex items-center justify-center bg-[#2a9d90]/5">
        <span className="material-symbols-outlined text-[24px] text-[#2a9d90]">
          help
        </span>
      </div>
      <div className="flex-1 pt-1">
        <h4 className="text-sm font-extrabold text-[#2a9d90] mb-1">Xác nhận</h4>
        <p className="text-xs font-bold text-[#101918]/80 leading-relaxed">
          {message}
        </p>
      </div>
    </div>
    <div className="flex justify-end gap-2 pl-14">
      <button
        onClick={closeToast}
        className="px-3 py-1.5 text-xs font-bold text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Hủy bỏ
      </button>
      <button
        onClick={() => {
          onConfirm();
          closeToast();
        }}
        className="px-3 py-1.5 text-xs font-bold text-white bg-[#2a9d90] rounded-lg hover:bg-[#238b7e] transition-colors shadow-sm shadow-[#2a9d90]/20"
      >
        Đồng ý
      </button>
    </div>
  </div>
);

// --- HELPER FUNCTION ---
const showToast = (message, type = "success") => {
  toast(
    <CustomToast
      title={type === "success" ? "Thành công" : "Thất bại"}
      message={message}
      type={type}
    />,
    {
      type: type,
      icon: false,
      closeButton: false,
      style: {
        borderRadius: "16px",
        background: "white",
        boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.1)",
        padding: "16px",
        border: "1px solid #e9f1f0",
      },
    },
  );
};

// Helper riêng cho Confirm để áp dụng style giống CustomToast
const showConfirmToast = (message, onConfirm) => {
  toast(<ToastConfirm message={message} onConfirm={onConfirm} />, {
    autoClose: false,
    closeOnClick: false,
    draggable: false,
    closeButton: false,
    icon: false,
    position: "top-center",
    style: {
      borderRadius: "16px",
      background: "white",
      boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.15)", // Shadow đậm hơn chút để nổi bật
      padding: "16px",
      border: "1px solid #2a9d90",
      minWidth: "350px",
    },
  });
};

const ReceptionistOrders = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 4,
    totalPages: 1,
    totalElements: 0,
  });
  const [sortConfig, setSortConfig] = useState({
    key: "ngayDatHang",
    direction: "desc",
  });

  // State Bulk Action
  const [selectedIds, setSelectedIds] = useState([]);
  const [isBulkUpdating, setIsBulkUpdating] = useState(false);

  const IMAGE_BASE_URL = "http://localhost:8080/uploads/";

  // --- LOGIC CHECK TRẠNG THÁI ---
  const isOrderSelectable = (status) => {
    const terminalStates = [
      "Đã giao",
      "DA_GIAO",
      "Đã hủy",
      "DA_HUY",
      "DA_THANH_TOAN",
    ];
    return !terminalStates.includes(status);
  };

  // --- FETCH DATA ---
  const fetchOrders = async (page = 0) => {
    setLoading(true);
    try {
      const response = await orderService.getAllOrders({
        page: page,
        size: pagination.size,
        sort: `${sortConfig.key},${sortConfig.direction}`,
      });

      const data = response.data || response;

      if (data) {
        setOrders(data.content || []);
        setPagination({
          page: data.number || 0,
          size: data.size || 10,
          totalPages: data.totalPages || 0,
          totalElements: data.totalElements || 0,
        });
        setSelectedIds([]);
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách đơn hàng:", error);
      setOrders([]);
      showToast("Không thể tải danh sách đơn hàng", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(0);
  }, [sortConfig]);

  // --- HANDLERS ---
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const selectableIds = orders
        .filter((o) => isOrderSelectable(o.trangThai))
        .map((o) => o.donHangId);
      setSelectedIds(selectableIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkUpdate = (targetStatus) => {
    if (selectedIds.length === 0) return;

    const executeBulkUpdate = async () => {
      setIsBulkUpdating(true);
      try {
        await Promise.all(
          selectedIds.map((id) =>
            orderService.updateOrder(id, { trangThai: targetStatus }),
          ),
        );
        showToast("Cập nhật thành công!", "success");
        fetchOrders(pagination.page);
      } catch (error) {
        showToast("Có lỗi xảy ra khi cập nhật hàng loạt.", "error");
      } finally {
        setIsBulkUpdating(false);
      }
    };

    showConfirmToast(
      `Xác nhận chuyển ${selectedIds.length} đơn hàng sang trạng thái "${targetStatus}"?`,
      executeBulkUpdate,
    );
  };

  const handleQuickUpdate = (id, nextStatus) => {
    const executeQuickUpdate = async () => {
      try {
        await orderService.updateOrder(id, { trangThai: nextStatus });
        showToast(`Cập nhật đơn hàng #${id} thành công!`, "success");
        fetchOrders(pagination.page);
      } catch (error) {
        showToast("Lỗi cập nhật trạng thái", "error");
      }
    };

    showConfirmToast(`Chuyển trạng thái đơn #${id}?`, executeQuickUpdate);
  };

  // --- HELPERS (Formatting) ---
  const formatMoney = (amount) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return (
      date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
      }) +
      " " +
      date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
    );
  };

  const getPetInitials = (name) =>
    name ? name.substring(0, 2).toUpperCase() : "??";
  const getPetColor = (index) =>
    [
      "bg-orange-100 text-orange-600",
      "bg-blue-100 text-blue-600",
      "bg-purple-100 text-purple-600",
    ][index % 3];

  const getStatusInfo = (status) => {
    switch (status) {
      case "Đã giao":
      case "DA_GIAO":
      case "DA_THANH_TOAN":
        return {
          label: "Đã giao",
          style: "bg-green-100 text-green-700",
          next: null,
        };
      case "Chờ xử lý":
      case "CHO_XU_LY":
        return {
          label: "Chờ xử lý",
          style: "bg-orange-100 text-orange-700",
          next: "DA_XAC_NHAN",
          nextLabel: "Xác nhận",
        };
      case "Đã xác nhận":
      case "DA_XAC_NHAN":
        return {
          label: "Đã xác nhận",
          style: "bg-blue-100 text-blue-700",
          next: "DANG_GIAO",
          nextLabel: "Giao hàng",
        };
      case "Đang giao":
      case "DANG_GIAO":
        return {
          label: "Đang giao",
          style: "bg-purple-100 text-purple-700",
          next: "DA_GIAO",
          nextLabel: "Hoàn tất",
        };
      case "Đã hủy":
      case "DA_HUY":
        return {
          label: "Đã hủy",
          style: "bg-red-100 text-red-700",
          next: null,
        };
      default:
        return {
          label: status || "Khác",
          style: "bg-gray-100 text-gray-600",
          next: null,
        };
    }
  };

  const handleSort = (key) => {
    setSortConfig((current) => {
      if (current.key === key) {
        return {
          ...current,
          direction: current.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "desc" };
    });
  };

  const renderSortIcon = (colKey) => {
    if (sortConfig.key !== colKey)
      return (
        <span className="material-symbols-outlined text-[16px] text-gray-300">
          unfold_more
        </span>
      );
    return sortConfig.direction === "asc" ? (
      <span className="material-symbols-outlined text-[16px] text-[#2a9d90]">
        arrow_upward
      </span>
    ) : (
      <span className="material-symbols-outlined text-[16px] text-[#2a9d90]">
        arrow_downward
      </span>
    );
  };

  const selectableCount = orders.filter((o) =>
    isOrderSelectable(o.trangThai),
  ).length;

  // Stats
  const stats = [
    {
      label: "Tổng đơn hàng",
      value: pagination.totalElements.toLocaleString(),
      icon: "analytics",
      iconColor: "text-[#2a9d90]",
      bgColor: "bg-[#2a9d90]/10",
    },
    {
      label: "Đang chờ xử lý",
      value: "...",
      icon: "pending_actions",
      iconColor: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      label: "Đã hoàn thành",
      value: "...",
      icon: "check_circle",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      label: "Đã hủy",
      value: "...",
      icon: "cancel",
      iconColor: "text-red-500",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <main className="w-full bg-[#fbfcfc] font-sans text-[#101918] min-h-screen p-8 lg:p-12 relative">
      {/* TOAST CONTAINER CONFIG - GIỐNG ADMIN REVIEWS */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        toastClassName={() =>
          "relative flex p-0 min-h-10 rounded-2xl justify-between overflow-hidden cursor-pointer"
        }
        bodyClassName={() => "flex text-sm font-white font-med block p-3"}
      />

      <div className="max-w-[1600px] mx-auto space-y-10">
        <div className="flex flex-col gap-8">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-[32px] border border-[#e9f1f0] shadow-xl shadow-gray-200/50 flex items-center gap-6 transition-transform hover:-translate-y-1 duration-300"
              >
                <div
                  className={`size-16 rounded-2xl flex items-center justify-center shrink-0 ${item.bgColor}`}
                >
                  <span
                    className={`material-symbols-outlined text-[32px] ${item.iconColor}`}
                  >
                    {item.icon}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#588d87] uppercase tracking-widest mb-1">
                    {item.label}
                  </p>
                  <h3 className="text-4xl font-extrabold text-[#101918]">
                    {item.value}
                  </h3>
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* TABLE */}
        <section className="bg-white rounded-[40px] border border-[#e9f1f0] shadow-xl shadow-gray-200/50 overflow-hidden relative">
          {/* BULK ACTION BAR */}
          {selectedIds.length > 0 && (
            <div className="absolute top-0 left-0 w-full h-[88px] bg-[#2a9d90] z-10 flex items-center justify-between px-8 animate-in slide-in-from-top-2 duration-200">
              <div className="flex items-center gap-4">
                <span className="text-white font-bold text-lg">
                  {selectedIds.length} đơn hàng đã chọn
                </span>
                <button
                  onClick={() => setSelectedIds([])}
                  className="text-white/80 hover:text-white text-sm font-medium underline"
                >
                  Bỏ chọn
                </button>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleBulkUpdate("DA_XAC_NHAN")}
                  className="bg-white text-[#2a9d90] px-4 py-2 rounded-xl font-bold text-sm shadow-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">
                    check_circle
                  </span>{" "}
                  Xác nhận
                </button>
                <button
                  onClick={() => handleBulkUpdate("DANG_GIAO")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-sm hover:bg-blue-600 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">
                    local_shipping
                  </span>{" "}
                  Giao hàng
                </button>
                <button
                  onClick={() => handleBulkUpdate("DA_GIAO")}
                  className="bg-green-500 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-sm hover:bg-green-600 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">
                    task_alt
                  </span>{" "}
                  Hoàn tất
                </button>
                <button
                  onClick={() => handleBulkUpdate("DA_HUY")}
                  className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-sm hover:bg-red-600 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">
                    cancel
                  </span>{" "}
                  Hủy đơn
                </button>
              </div>
            </div>
          )}

          {/* HEADER FILTER */}
          <div className="p-8 border-b border-[#e9f1f0] flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-xl font-extrabold text-[#101918] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#2a9d90]">
                inventory_2
              </span>
              Danh sách đơn hàng
            </h3>
            <div className="flex gap-3">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#588d87]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Tìm đơn hàng..."
                  className="pl-12 pr-4 py-2.5 bg-[#f9fbfb] border border-[#e9f1f0] rounded-xl text-sm font-bold text-[#101918] focus:outline-none focus:border-[#2a9d90] w-[300px]"
                />
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-[#f9fbfb] hover:bg-[#e9f1f0] text-[#588d87] text-sm font-bold rounded-xl transition-colors">
                <span className="material-symbols-outlined text-[20px]">
                  filter_list
                </span>{" "}
                Bộ lọc
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-[#2a9d90] text-white text-sm font-bold rounded-xl hover:bg-[#2a9d90]/90 transition-colors shadow-lg shadow-[#2a9d90]/20">
                <span className="material-symbols-outlined text-[20px]">
                  add
                </span>{" "}
                Tạo đơn hàng
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f9fbfb] border-b border-[#e9f1f0]">
                  <th className="px-8 py-6 w-16">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        selectableCount > 0 &&
                        selectedIds.length === selectableCount
                      }
                      disabled={selectableCount === 0}
                      className="size-5 rounded border-gray-300 text-[#2a9d90] focus:ring-[#2a9d90] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </th>
                  <th className="px-2 py-6 text-xs font-black text-[#588d87] uppercase tracking-widest">
                    Mã đơn
                  </th>
                  <th className="px-8 py-6 text-xs font-black text-[#588d87] uppercase tracking-widest">
                    Khách hàng & Thông tin
                  </th>
                  <th
                    className="px-8 py-6 text-xs font-black text-[#588d87] uppercase tracking-widest cursor-pointer hover:bg-gray-100 transition-colors select-none"
                    onClick={() => handleSort("ngayDatHang")}
                  >
                    <div className="flex items-center gap-1">
                      Ngày đặt {renderSortIcon("ngayDatHang")}
                    </div>
                  </th>
                  <th className="px-8 py-6 text-xs font-black text-[#588d87] uppercase tracking-widest">
                    Tổng tiền
                  </th>
                  <th
                    className="px-8 py-6 text-xs font-black text-[#588d87] uppercase tracking-widest cursor-pointer hover:bg-gray-100 transition-colors select-none"
                    onClick={() => handleSort("trangThai")}
                  >
                    <div className="flex items-center gap-1">
                      Trạng thái {renderSortIcon("trangThai")}
                    </div>
                  </th>
                  <th className="px-8 py-6 text-xs font-black text-[#588d87] uppercase tracking-widest text-right">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e9f1f0]">
                {loading ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-10 text-gray-400 font-medium"
                    >
                      Đang tải dữ liệu...
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-10 text-gray-400 font-medium"
                    >
                      Không tìm thấy đơn hàng nào.
                    </td>
                  </tr>
                ) : (
                  orders.map((order, index) => {
                    const statusInfo = getStatusInfo(order.trangThai);
                    const firstProduct = order.chiTietDonHangs?.[0];
                    const productName = firstProduct
                      ? firstProduct.tenSanPham
                      : "Đơn hàng";
                    const productCount = order.chiTietDonHangs?.length || 0;
                    const isSelectable = isOrderSelectable(order.trangThai);

                    return (
                      <tr
                        key={order.donHangId}
                        className={`hover:bg-[#f9fbfb] transition-colors group ${
                          selectedIds.includes(order.donHangId)
                            ? "bg-[#2a9d90]/5"
                            : ""
                        }`}
                      >
                        <td className="px-8 py-6">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(order.donHangId)}
                            onChange={() => handleSelectOne(order.donHangId)}
                            disabled={!isSelectable}
                            className={`size-5 rounded border-gray-300 text-[#2a9d90] focus:ring-[#2a9d90] ${
                              isSelectable
                                ? "cursor-pointer"
                                : "cursor-not-allowed opacity-30 bg-gray-100"
                            }`}
                          />
                        </td>

                        <td className="px-2 py-6">
                          <span
                            className={`text-sm font-bold px-3 py-1.5 rounded-lg ${
                              isSelectable
                                ? "text-[#2a9d90] bg-[#2a9d90]/10"
                                : "text-gray-400 bg-gray-100"
                            }`}
                          >
                            #{order.donHangId}
                          </span>
                        </td>

                        <td className="px-8 py-6">
                          <div
                            className={`flex items-center gap-4 ${
                              !isSelectable ? "opacity-60" : ""
                            }`}
                          >
                            {order.anhNguoiNhan ? (
                              <img
                                src={`${IMAGE_BASE_URL}${order.anhNguoiNhan}`}
                                alt={order.tenNguoiNhan}
                                className="size-12 rounded-full object-cover border border-[#e9f1f0] shadow-sm"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.nextSibling.style.display = "flex";
                                }}
                              />
                            ) : null}
                            <div
                              className={`size-12 rounded-full flex items-center justify-center font-black text-xs shrink-0 shadow-sm ${getPetColor(
                                index,
                              )}`}
                              style={{
                                display: order.anhNguoiNhan ? "none" : "flex",
                              }}
                            >
                              {getPetInitials(order.tenNguoiNhan)}
                            </div>
                            <div>
                              <p className="text-sm font-extrabold text-[#101918]">
                                {order.tenNguoiNhan}
                              </p>
                              <p className="text-xs text-[#588d87] mt-0.5 font-medium">
                                {productName}{" "}
                                {productCount > 1 &&
                                  `(+${productCount - 1} món)`}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td
                          className={`px-8 py-6 ${
                            !isSelectable ? "opacity-60" : ""
                          }`}
                        >
                          <span className="text-sm font-bold text-[#588d87]">
                            {formatDate(order.ngayDatHang)}
                          </span>
                        </td>
                        <td
                          className={`px-8 py-6 ${
                            !isSelectable ? "opacity-60" : ""
                          }`}
                        >
                          <span className="text-sm font-extrabold text-[#101918]">
                            {formatMoney(order.tongThanhToan)}
                          </span>
                        </td>

                        <td className="px-8 py-6">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${statusInfo.style}`}
                          >
                            {statusInfo.label}
                          </span>
                        </td>

                        <td className="px-8 py-6">
                          <div className="flex items-center justify-end gap-2">
                            {statusInfo.next && (
                              <button
                                onClick={() =>
                                  handleQuickUpdate(
                                    order.donHangId,
                                    statusInfo.next,
                                  )
                                }
                                className="px-3 py-2 bg-[#2a9d90] text-white text-xs font-bold rounded-xl hover:bg-[#258a7e] shadow-md shadow-[#2a9d90]/20 flex items-center gap-1 transition-all hover:-translate-y-0.5"
                                title={`Chuyển sang ${statusInfo.nextLabel}`}
                              >
                                <span className="material-symbols-outlined text-[16px]">
                                  fast_forward
                                </span>
                                {statusInfo.nextLabel}
                              </button>
                            )}
                            <button
                              onClick={() =>
                                navigate(
                                  `/staff/receptionist/orders/${order.donHangId}`,
                                )
                              }
                              className="size-10 flex items-center justify-center text-[#588d87] bg-[#f9fbfb] border border-[#e9f1f0] rounded-xl hover:bg-white hover:border-[#2a9d90] hover:text-[#2a9d90] transition-colors"
                              title="Xem chi tiết"
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                visibility
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="px-8 py-6 bg-[#f9fbfb] border-t border-[#e9f1f0] flex items-center justify-between">
            <p className="text-sm text-[#588d87] font-medium">
              Hiển thị{" "}
              <span className="font-bold text-[#101918]">{orders.length}</span>{" "}
              trên{" "}
              <span className="font-bold text-[#101918]">
                {pagination.totalElements}
              </span>{" "}
              đơn hàng
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => fetchOrders(pagination.page - 1)}
                disabled={pagination.page === 0}
                className="size-10 rounded-xl border border-[#e9f1f0] bg-white text-[#588d87] flex items-center justify-center disabled:opacity-50 hover:bg-gray-50 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">
                  chevron_left
                </span>
              </button>

              {pagination.totalPages > 0 &&
                Array.from({ length: pagination.totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => fetchOrders(index)}
                    className={`size-10 rounded-xl font-bold transition-all ${
                      pagination.page === index
                        ? "bg-[#2a9d90] text-white shadow-lg shadow-[#2a9d90]/20"
                        : "border border-[#e9f1f0] bg-white text-[#588d87] hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

              <button
                onClick={() => fetchOrders(pagination.page + 1)}
                disabled={
                  pagination.page === pagination.totalPages - 1 ||
                  pagination.totalPages === 0
                }
                className="size-10 rounded-xl border border-[#e9f1f0] bg-white text-[#588d87] hover:bg-gray-50 flex items-center justify-center disabled:opacity-50 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ReceptionistOrders;
