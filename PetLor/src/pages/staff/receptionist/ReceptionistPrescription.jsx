import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import prescriptionService from "../../../services/prescriptionService";

const ReceptionistPrescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // State phân trang
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // --- STATE THANH TOÁN ---
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // --- CẤU HÌNH ĐƯỜNG DẪN ẢNH ---
  const IMAGE_BASE_URL = "http://localhost:8080/uploads/";

  // --- CẤU HÌNH NGÂN HÀNG ---
  const BANK_INFO = {
    BANK_ID: "MB",
    ACCOUNT_NO: "0972471680",
    TEMPLATE: "compact",
    ACCOUNT_NAME: "PHONG KHAM PETT",
  };

  const stats = [
    {
      label: "Tổng đơn thuốc",
      value: totalElements.toLocaleString(),
      icon: "description",
      iconColor: "text-[#2a9d90]",
      bgColor: "bg-[#2a9d90]/10",
    },
    {
      label: "Đơn chưa thanh toán",
      value: "...",
      icon: "pending_actions",
      iconColor: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      label: "Đơn đã hoàn thành",
      value: "...",
      icon: "task_alt",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
    },
  ];

  const fetchPrescriptions = async (page = 0) => {
    setLoading(true);
    try {
      const response = await prescriptionService.getAllPrescriptions({
        page: page,
        size: 10,
        sort: "ngayKe,desc",
      });

      if (response && response.content) {
        setPrescriptions(response.content);
        setTotalPages(response.totalPages);
        setTotalElements(response.totalElements);
        setCurrentPage(response.number);
      }
    } catch (error) {
      console.error("Lỗi tải danh sách đơn thuốc:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions(0);
  }, []);

  // --- XỬ LÝ THANH TOÁN ---
  const handleConfirmPayment = async () => {
    if (!selectedPayment) return;
    setIsProcessingPayment(true);
    try {
      await prescriptionService.createOrderFromPrescription(
        selectedPayment.donThuocId,
      );
      alert("Thanh toán thành công!");
      setSelectedPayment(null);
      fetchPrescriptions(currentPage); // Reload data
    } catch (error) {
      console.error("Lỗi thanh toán:", error);
      alert("Có lỗi xảy ra khi xác nhận thanh toán.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // --- HELPERS ---
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
        year: "numeric",
      }) +
      " " +
      date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
    );
  };

  const getInitials = (name) =>
    name ? name.substring(0, 2).toUpperCase() : "??";
  const getPetColor = (index) =>
    [
      "bg-orange-100 text-orange-600",
      "bg-blue-100 text-blue-600",
      "bg-purple-100 text-purple-600",
      "bg-pink-100 text-pink-600",
      "bg-teal-100 text-teal-600",
    ][index % 5];

  const getStatusInfo = (status) => {
    switch (status) {
      case "DA_THANH_TOAN":
        return { label: "Đã thanh toán", style: "bg-green-100 text-green-700" };
      case "CHO_THANH_TOAN":
        return {
          label: "Chờ thanh toán",
          style: "bg-orange-100 text-orange-700",
        };
      case "MOI_TAO":
        return { label: "Mới tạo", style: "bg-blue-100 text-blue-700" };
      default:
        return {
          label: status || "Không xác định",
          style: "bg-gray-100 text-gray-600",
        };
    }
  };

  const getQrUrl = (amount, content) => {
    const encodedContent = encodeURIComponent(content);
    const encodedName = encodeURIComponent(BANK_INFO.ACCOUNT_NAME);
    return `https://img.vietqr.io/image/${BANK_INFO.BANK_ID}-${BANK_INFO.ACCOUNT_NO}-${BANK_INFO.TEMPLATE}.png?amount=${amount}&addInfo=${encodedContent}&accountName=${encodedName}`;
  };

  return (
    <main className="w-full bg-[#fbfcfc] font-sans text-[#101918] min-h-screen p-8 lg:p-12 relative">
      <div className="max-w-[1600px] mx-auto space-y-10">
        {/* STATS */}
        <div className="flex flex-col gap-8">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        <section className="bg-white rounded-[40px] border border-[#e9f1f0] shadow-xl shadow-gray-200/50 overflow-hidden">
          <div className="p-8 border-b border-[#e9f1f0] flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-xl font-extrabold text-[#101918] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#2a9d90]">
                medication
              </span>{" "}
              Danh sách đơn thuốc
            </h3>
            <div className="flex gap-3">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#588d87]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="pl-12 pr-4 py-2.5 bg-[#f9fbfb] border border-[#e9f1f0] rounded-xl text-sm font-bold text-[#101918] focus:outline-none focus:border-[#2a9d90] w-[300px]"
                />
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-[#f9fbfb] hover:bg-[#e9f1f0] text-[#588d87] text-sm font-bold rounded-xl transition-colors">
                <span className="material-symbols-outlined text-[20px]">
                  filter_list
                </span>{" "}
                Bộ lọc
              </button>
              <Link to="/staff/receptionist/prescriptions/create">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-[#2a9d90] text-white text-sm font-bold rounded-xl hover:bg-[#2a9d90]/90 transition-colors shadow-lg shadow-[#2a9d90]/20">
                  <span className="material-symbols-outlined text-[20px]">
                    add
                  </span>{" "}
                  Tạo đơn mới
                </button>
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f9fbfb] border-b border-[#e9f1f0]">
                  <th className="px-8 py-6 text-xs font-black text-[#588d87] uppercase tracking-widest">
                    Mã đơn
                  </th>
                  <th className="px-8 py-6 text-xs font-black text-[#588d87] uppercase tracking-widest">
                    Thú cưng / Chủ nuôi
                  </th>
                  <th className="px-8 py-6 text-xs font-black text-[#588d87] uppercase tracking-widest">
                    Ngày kê đơn
                  </th>
                  <th className="px-8 py-6 text-xs font-black text-[#588d87] uppercase tracking-widest">
                    Bác sĩ phụ trách
                  </th>
                  <th className="px-8 py-6 text-xs font-black text-[#588d87] uppercase tracking-widest">
                    Tổng tiền
                  </th>
                  <th className="px-8 py-6 text-xs font-black text-[#588d87] uppercase tracking-widest">
                    Trạng thái
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
                      className="text-center py-10 text-gray-400 italic"
                    >
                      Đang tải dữ liệu...
                    </td>
                  </tr>
                ) : prescriptions.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-10 text-gray-400 italic"
                    >
                      Không có đơn thuốc nào.
                    </td>
                  </tr>
                ) : (
                  prescriptions.map((item, index) => {
                    const statusInfo = getStatusInfo(item.trangThai);
                    const isPaid = item.trangThai === "DA_THANH_TOAN";

                    return (
                      <tr
                        key={item.donThuocId}
                        className="hover:bg-[#f9fbfb] transition-colors group"
                      >
                        <td className="px-8 py-6">
                          <span className="text-sm font-bold text-[#2a9d90] bg-[#2a9d90]/10 px-3 py-1.5 rounded-lg">
                            #{item.donThuocId}
                          </span>
                        </td>

                        {/* Cột Thú cưng */}
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            {/* Avatar Thú cưng */}
                            {item.anhThuCung ? (
                              <img
                                src={`${IMAGE_BASE_URL}${item.anhThuCung}`}
                                alt={item.tenThuCung}
                                className="size-12 rounded-full object-cover border border-[#e9f1f0] shadow-sm"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.nextSibling.style.display = "flex";
                                }}
                              />
                            ) : null}
                            <div
                              className={`size-12 rounded-full flex items-center justify-center font-black text-xs shrink-0 shadow-sm ${getPetColor(index)}`}
                              style={{
                                display: item.anhThuCung ? "none" : "flex",
                              }}
                            >
                              {getInitials(item.tenThuCung)}
                            </div>

                            <div>
                              <p className="text-sm font-extrabold text-[#101918]">
                                {item.tenThuCung}
                              </p>
                              <p className="text-xs text-[#588d87] mt-0.5 font-medium">
                                Chủ: {item.tenKhachHang} ({item.sdtKhachHang})
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-8 py-6 text-sm font-bold text-[#588d87]">
                          {formatDate(item.ngayKe)}
                        </td>

                        {/* Cột Bác sĩ (Đã cập nhật hiển thị Avatar) */}
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            {item.anhBacSi ? (
                              <img
                                src={`${IMAGE_BASE_URL}${item.anhBacSi}`}
                                alt={item.tenBacSi}
                                className="size-9 rounded-full object-cover border border-[#e9f1f0] shadow-sm"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.nextSibling.style.display = "block";
                                }}
                              />
                            ) : null}
                            <span
                              className="material-symbols-outlined text-gray-400 bg-gray-100 rounded-full p-1.5"
                              style={{
                                display: item.anhBacSi ? "none" : "block",
                              }}
                            >
                              person
                            </span>

                            <span className="text-sm font-bold text-[#101918]">
                              {item.tenBacSi}
                            </span>
                          </div>
                        </td>

                        <td className="px-8 py-6 text-sm font-bold text-[#101918]">
                          {formatMoney(item.tongTienThuoc)}
                        </td>
                        <td className="px-8 py-6">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${statusInfo.style}`}
                          >
                            {statusInfo.label}
                          </span>
                        </td>

                        {/* Cột Thao tác */}
                        <td className="px-8 py-6">
                          <div className="flex items-center justify-end gap-2">
                            <button className="px-4 py-2 bg-[#f9fbfb] border border-[#e9f1f0] text-xs font-bold text-[#588d87] rounded-xl hover:bg-white hover:border-[#2a9d90] hover:text-[#2a9d90] transition-all shadow-sm whitespace-nowrap">
                              Xem chi tiết
                            </button>

                            {/* Nút Thanh toán (Chỉ hiện khi chưa trả) */}
                            {!isPaid && (
                              <button
                                onClick={() => setSelectedPayment(item)}
                                className="size-10 flex items-center justify-center text-[#2a9d90] bg-[#2a9d90]/5 hover:bg-[#2a9d90]/10 rounded-xl transition-colors"
                                title="Thanh toán"
                              >
                                <span className="material-symbols-outlined text-[20px]">
                                  payments
                                </span>
                              </button>
                            )}

                            {/* Nút In (Chỉ Active khi đã trả) */}
                            <button
                              disabled={!isPaid}
                              className={`size-10 flex items-center justify-center rounded-xl transition-colors ${isPaid ? "text-[#588d87] hover:bg-[#e9f1f0] cursor-pointer" : "text-gray-300 cursor-not-allowed bg-gray-50"}`}
                              title={
                                isPaid ? "In đơn thuốc" : "Cần thanh toán trước"
                              }
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                print
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

          {/* Pagination */}
          <div className="px-8 py-6 bg-[#f9fbfb] border-t border-[#e9f1f0] flex items-center justify-between">
            <p className="text-sm text-[#588d87] font-medium">
              Hiển thị{" "}
              <span className="font-bold text-[#101918]">
                {prescriptions.length}
              </span>{" "}
              trên{" "}
              <span className="font-bold text-[#101918]">{totalElements}</span>{" "}
              đơn thuốc
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => fetchPrescriptions(currentPage - 1)}
                disabled={currentPage === 0}
                className="size-10 rounded-xl border border-[#e9f1f0] bg-white text-[#588d87] hover:bg-gray-50 flex items-center justify-center disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[20px]">
                  chevron_left
                </span>
              </button>
              <button
                onClick={() => fetchPrescriptions(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className="size-10 rounded-xl border border-[#e9f1f0] bg-white text-[#588d87] hover:bg-gray-50 flex items-center justify-center disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[20px]">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* --- MODAL THANH TOÁN QR --- */}
      {selectedPayment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl relative flex flex-col overflow-hidden">
            <div className="p-6 pb-0 flex justify-between items-center">
              <h3 className="text-xl font-black text-[#101918] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2a9d90]">
                  qr_code_scanner
                </span>{" "}
                Quét mã thanh toán
              </h3>
              <button
                onClick={() => setSelectedPayment(null)}
                className="size-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <div className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="bg-white p-2 rounded-2xl border border-[#e9f1f0] shadow-lg">
                <img
                  src={getQrUrl(
                    selectedPayment.tongTienThuoc,
                    `TT DT ${selectedPayment.donThuocId}`,
                  )}
                  alt="VietQR"
                  className="w-64 h-64 object-contain rounded-xl"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Tổng thanh toán
                </p>
                <p className="text-3xl font-black text-[#2a9d90] mt-1">
                  {formatMoney(selectedPayment.tongTienThuoc)}
                </p>
                <p className="text-xs text-gray-400 mt-2 italic">
                  Nội dung: TT DT {selectedPayment.donThuocId}
                </p>
              </div>
            </div>
            <div className="p-6 pt-0 flex gap-3">
              <button
                onClick={() => setSelectedPayment(null)}
                className="flex-1 h-12 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-colors border border-transparent hover:border-[#e9f1f0]"
              >
                HỦY
              </button>
              <button
                onClick={handleConfirmPayment}
                disabled={isProcessingPayment}
                className="flex-1 h-12 bg-[#2a9d90] text-white rounded-2xl font-bold shadow-lg shadow-[#2a9d90]/20 hover:bg-[#2a9d90]/90 transition-all flex items-center justify-center gap-2"
              >
                {isProcessingPayment ? (
                  <span className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">
                      check_circle
                    </span>{" "}
                    ĐÃ THANH TOÁN
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ReceptionistPrescription;
