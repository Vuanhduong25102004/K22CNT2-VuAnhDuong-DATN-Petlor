import React, { useState, useEffect } from "react";
import DoctorSidebar from "./components/DoctorSidebar";
import bookingService from "../../services/bookingService";

const Doctor = () => {
  // State lưu dữ liệu từ API
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // State quản lý giao diện
  const [selectedId, setSelectedId] = useState(null);
  const [activeTab, setActiveTab] = useState("CHO_DUYET");

  // 1. Gọi API lấy danh sách lịch hẹn
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await bookingService.getDoctorAppointments();
        setAppointments(data);

        // Mặc định chọn lịch hẹn đầu tiên nếu có
        if (data.length > 0) {
          setSelectedId(data[0].lichHenId);
        }
      } catch (error) {
        console.error("Lỗi tải lịch hẹn bác sĩ:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  // Lấy thông tin bệnh nhân đang chọn
  const selectedPatient = appointments.find((p) => p.lichHenId === selectedId);

  // Helper styles cho danh sách
  const getCardStyles = (type, isSelected) => {
    let typeStyle = {};
    // Map từ API (Tiếng Việt/Anh) sang Style
    // Giả sử API trả về "Khẩn cấp", "Thường lệ", "Tái khám" (dựa theo JSON mẫu)
    // Hoặc nếu API trả về Enum (KHAN_CAP), bạn đổi case tương ứng
    const normalizedType = type ? type.toUpperCase() : "THUONG_LE";

    switch (true) {
      case normalizedType.includes("KHẨN") || normalizedType === "KHAN_CAP":
        typeStyle = {
          badge: "bg-[#ef5350]/10 text-[#ef5350]",
          label: "Khẩn cấp",
          border: isSelected
            ? "border-[#ef5350] ring-1 ring-[#ef5350]/20"
            : "border-primary/20",
          shadow: "shadow-lg shadow-[#ef5350]/5",
        };
        break;
      case normalizedType.includes("TÁI KHÁM") || normalizedType === "TAI_KHAM":
        typeStyle = {
          badge: "bg-amber-100 text-amber-700",
          label: "Tái khám",
          border: isSelected
            ? "border-amber-400 ring-1 ring-amber-400/20"
            : "border-gray-50 hover:border-primary/20",
          shadow: "hover:shadow-lg hover:shadow-primary/5",
        };
        break;
      default: // Thường lệ
        typeStyle = {
          badge: "bg-primary/10 text-primary",
          label: "Thường lệ",
          border: isSelected
            ? "border-primary ring-1 ring-primary/20"
            : "border-gray-50 hover:border-primary/20",
          shadow: "hover:shadow-lg hover:shadow-primary/5",
        };
    }
    return typeStyle;
  };

  // Helper format giờ (từ 2026-01-16T16:00:00 -> 16:00)
  const formatTime = (isoString) => {
    if (!isoString) return "--:--";
    const date = new Date(isoString);
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Helper format ngày (từ 2026-01-16T16:00:00 -> 16 thg 01, 2026)
  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Filter Logic
  // Tab 1: CHỜ DUYỆT -> trangThaiLichHen = "CHO_XAC_NHAN"
  // Tab 2: KHẨN CẤP -> loaiLichHen có chữ "Khẩn" (hoặc logic khác tùy bạn)
  // Tab 3: ĐÃ XONG -> trangThaiLichHen = "DA_HOAN_THANH" hoặc "DA_XAC_NHAN" (đang xử lý)
  const displayedList = appointments.filter((apt) => {
    if (activeTab === "CHO_DUYET")
      return apt.trangThaiLichHen === "CHO_XAC_NHAN";
    if (activeTab === "KHAN_CAP") return apt.loaiLichHen?.includes("Khẩn"); // Hoặc check field ưu tiên
    if (activeTab === "DA_XONG")
      return ["DA_XAC_NHAN", "DA_HOAN_THANH"].includes(apt.trangThaiLichHen);
    return true;
  });

  // Tính toán số lượng cho badge
  const countPending = appointments.filter(
    (a) => a.trangThaiLichHen === "CHO_XAC_NHAN"
  ).length;
  const countUrgent = appointments.filter((a) =>
    a.loaiLichHen?.includes("Khẩn")
  ).length;

  return (
    <div className="flex h-screen w-full bg-[#F9FAFB] font-sans text-[#1A1C1E] overflow-hidden">
      {/* --- CỘT 1: SIDEBAR --- */}
      <DoctorSidebar />

      {/* --- CỘT 2 & 3: MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="h-24 flex items-center justify-between px-10 bg-white border-b border-gray-50 shrink-0">
          <div>
            <h2 className="text-3xl font-extrabold text-[#0c1d1d] tracking-tight">
              Duyệt lịch hẹn
            </h2>
            <p className="text-sm font-medium text-gray-400 mt-0.5">
              Xin chào Bác sĩ, bạn có{" "}
              <span className="text-primary font-bold">
                {appointments.length} yêu cầu
              </span>{" "}
              cần xử lý.
            </p>
          </div>
          {/* ... (Search bar giữ nguyên) ... */}
        </header>

        {/* Content Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* --- CỘT 2: DANH SÁCH LỊCH HẸN (QUEUE) --- */}
          <section className="w-[450px] border-r border-gray-100 flex flex-col bg-[#F9FAFB] shrink-0">
            {/* Tabs */}
            <div className="flex bg-white px-8 pt-2 shrink-0">
              <button
                onClick={() => setActiveTab("CHO_DUYET")}
                className={`flex-1 py-5 text-[11px] font-extrabold tracking-widest border-b-3 transition-colors ${
                  activeTab === "CHO_DUYET"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                CHỜ DUYỆT ({countPending})
              </button>
              <button
                onClick={() => setActiveTab("KHAN_CAP")}
                className={`flex-1 py-5 text-[11px] font-bold tracking-widest border-b-3 transition-colors ${
                  activeTab === "KHAN_CAP"
                    ? "border-[#ef5350] text-[#ef5350]"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                KHẨN CẤP ({countUrgent})
              </button>
              <button
                onClick={() => setActiveTab("DA_XONG")}
                className={`flex-1 py-5 text-[11px] font-bold tracking-widest border-b-3 transition-colors ${
                  activeTab === "DA_XONG"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                ĐÃ XỬ LÝ
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
              {loading ? (
                <div className="text-center py-10 text-gray-400">
                  Đang tải dữ liệu...
                </div>
              ) : displayedList.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  Không có lịch hẹn nào.
                </div>
              ) : (
                displayedList.map((apt) => {
                  const isSelected = selectedId === apt.lichHenId;
                  const style = getCardStyles(apt.loaiLichHen, isSelected);

                  return (
                    <div
                      key={apt.lichHenId}
                      onClick={() => setSelectedId(apt.lichHenId)}
                      className={`bg-white p-6 rounded-3xl border transition-all cursor-pointer ${style.border} ${style.shadow}`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span
                          className={`px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-widest ${style.badge}`}
                        >
                          {apt.loaiLichHen || "Thường lệ"}
                        </span>
                        <span className="text-[12px] font-bold text-gray-400">
                          {formatTime(apt.thoiGianBatDau)}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-lg text-gray-900 mb-1">
                        {apt.tenThuCung}{" "}
                        <span className="text-sm font-normal text-gray-500">
                          (ID: {apt.thuCungId})
                        </span>
                      </h3>
                      <p className="text-sm text-gray-500 mb-5 leading-relaxed line-clamp-2">
                        {apt.tenDichVu}{" "}
                        {apt.ghiChuKhachHang && `• ${apt.ghiChuKhachHang}`}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-gray-300 text-lg">
                            person
                          </span>
                          <span className="text-xs font-semibold text-gray-500">
                            {apt.tenKhachHang}
                          </span>
                        </div>
                        <div className="px-3 py-1 bg-gray-50 rounded-lg text-[10px] font-bold text-gray-400 uppercase">
                          LH #{apt.lichHenId}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          {/* --- CỘT 3: CHI TIẾT BỆNH NHÂN --- */}
          <section className="flex-1 bg-white flex flex-col overflow-hidden min-w-0">
            {selectedPatient ? (
              <>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-12">
                  <div className="max-w-4xl mx-auto space-y-12">
                    {/* Header Info */}
                    <div className="flex items-center gap-10">
                      <div className="relative group shrink-0">
                        <div className="absolute -inset-4 bg-primary/10 rounded-[50px] rotate-6 group-hover:rotate-3 transition-transform"></div>
                        <div className="w-48 h-48 bg-white p-2 relative overflow-hidden border border-gray-100 shadow-xl z-10 rounded-[40px_12px_40px_12px]">
                          {/* Ảnh Placeholder vì API chưa trả về ảnh thú cưng */}
                          <img
                            alt="Pet profile"
                            className="w-full h-full object-cover rounded-[inherit]"
                            src={`https://ui-avatars.com/api/?name=${selectedPatient.tenThuCung}&background=random&size=200`}
                          />
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                                {selectedPatient.tenThuCung}
                              </h2>
                              {/* API chưa trả về Giống loài, tạm ẩn hoặc hardcode */}
                              {/* <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full">Chó/Mèo</span> */}
                            </div>
                            <div className="flex items-center gap-6 text-sm font-semibold text-gray-500">
                              <div className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-base">
                                  fingerprint
                                </span>{" "}
                                ID: {selectedPatient.thuCungId}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-base">
                                  event
                                </span>{" "}
                                {formatDate(selectedPatient.thoiGianBatDau)}
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 min-w-[200px]">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                              Thông tin chủ nuôi
                            </p>
                            <p className="text-base font-bold text-gray-900">
                              {selectedPatient.tenKhachHang}
                            </p>
                            <p className="text-sm font-medium text-primary mt-1">
                              {selectedPatient.soDienThoaiKhachHang}
                            </p>
                          </div>
                        </div>

                        <div className="mt-8 flex gap-3 flex-wrap">
                          {/* Hiển thị dịch vụ như Tag */}
                          <div className="px-4 py-2 border text-xs font-bold rounded-2xl bg-primary/5 border-primary/10 text-primary">
                            {selectedPatient.tenDichVu}
                          </div>
                          <div className="px-4 py-2 border text-xs font-bold rounded-2xl bg-gray-50 border-gray-100 text-gray-500">
                            {selectedPatient.loaiLichHen}
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr className="border-[#cdeaea]" />

                    {/* Note & Services */}
                    <div>
                      <h3 className="text-lg font-extrabold mb-4 flex items-center gap-2 text-gray-900">
                        <span className="material-symbols-outlined text-primary">
                          description
                        </span>
                        Chi tiết dịch vụ
                      </h3>
                      <div className="p-6 bg-[#F9FAFB] rounded-[20px] border border-gray-100/50">
                        <p className="text-sm text-gray-500 leading-relaxed">
                          <strong>Dịch vụ yêu cầu:</strong>{" "}
                          {selectedPatient.tenDichVu}
                          <br />
                          <strong>Giá dịch vụ:</strong>{" "}
                          {selectedPatient.giaDichVu?.toLocaleString()} VND
                          <br />
                          <strong>Ghi chú từ khách hàng:</strong>{" "}
                          {selectedPatient.ghiChuKhachHang ||
                            "Không có ghi chú."}
                        </p>
                      </div>
                    </div>

                    {/* Note Input */}
                    <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
                      <h3 className="text-lg font-extrabold mb-6 flex items-center gap-3 text-gray-900">
                        <span className="material-symbols-outlined text-primary">
                          edit_square
                        </span>
                        Ghi chú / Chẩn đoán của Bác sĩ
                      </h3>
                      <textarea
                        className="w-full bg-white border-none rounded-3xl p-6 text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-gray-300 shadow-sm outline-none resize-none"
                        placeholder="Viết chẩn đoán, thuốc kê đơn hoặc lưu ý quan trọng tại đây..."
                        rows="4"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="h-28 flex items-center justify-between px-12 bg-white border-t border-gray-50 shrink-0">
                  <div className="flex gap-4">
                    {/* Chỉ hiện nút Duyệt nếu trạng thái là CHỜ XÁC NHẬN */}
                    {selectedPatient.trangThaiLichHen === "CHO_XAC_NHAN" && (
                      <button className="px-10 h-14 bg-primary text-white rounded-full font-extrabold text-sm tracking-wide shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                        XÁC NHẬN LỊCH
                      </button>
                    )}
                    {/* Nếu đã xác nhận thì hiện nút Hoàn thành */}
                    {selectedPatient.trangThaiLichHen === "DA_XAC_NHAN" && (
                      <button className="px-10 h-14 bg-green-600 text-white rounded-full font-extrabold text-sm tracking-wide shadow-xl shadow-green-600/20 hover:scale-[1.02] active:scale-95 transition-all">
                        HOÀN THÀNH KHÁM
                      </button>
                    )}

                    <button className="px-8 h-14 border border-gray-200 text-gray-600 rounded-full font-bold text-sm hover:bg-gray-50 transition-all">
                      CẬP NHẬT GHI CHÚ
                    </button>
                  </div>
                  <button className="px-8 h-14 text-gray-400 hover:text-[#ef5350] rounded-full font-bold text-sm flex items-center gap-2 transition-all">
                    <span className="material-symbols-outlined">cancel</span>
                    HỦY LỊCH
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                <span className="material-symbols-outlined text-6xl mb-4 opacity-50">
                  calendar_view_day
                </span>
                <p>Chọn một lịch hẹn để xem chi tiết</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Doctor;
