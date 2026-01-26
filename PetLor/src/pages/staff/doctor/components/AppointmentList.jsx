import React from "react";

const AppointmentList = ({
  title = "Danh sách lịch hẹn",
  appointments = [],
  selectedId,
  onSelect,
  activeTab,
  onTabChange,
  loading,
  type = "DOCTOR",
}) => {
  const isSpa = type === "SPA";

  // --- CẤU HÌNH ĐƯỜNG DẪN ẢNH ---
  const IMAGE_BASE_URL = "http://localhost:8080/uploads/";

  // --- HELPERS ---
  const formatTime = (isoString) =>
    isoString
      ? new Date(isoString).toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "--:--";

  const getBadgeStyle = (type) => {
    const t = type?.toUpperCase() || "";
    if (t.includes("KHẨN") || t === "KHAN_CAP") {
      return "bg-[#ef5350]/10 text-[#ef5350]";
    }
    if (t.includes("TÁI") || t === "TAI_KHAM") {
      return "bg-amber-100 text-amber-700";
    }
    return "bg-[#007A7A]/10 text-[#007A7A]";
  };

  // --- SORT LOGIC ---
  const sortAppointments = (list) => {
    return list.sort((a, b) => {
      // Sắp xếp theo ID giảm dần (Mới nhất lên đầu)
      return b.lichHenId - a.lichHenId;
    });
  };

  // --- FILTER LOGIC ---
  const getFilteredList = () => {
    let filtered = [];
    if (activeTab === "CHO_DUYET") {
      filtered = appointments.filter(
        (apt) => apt.trangThaiLichHen === "CHO_XAC_NHAN",
      );
    } else if (activeTab === "DA_XAC_NHAN") {
      filtered = appointments.filter(
        (apt) => apt.trangThaiLichHen === "DA_XAC_NHAN",
      );
    } else if (activeTab === "KHAN_CAP") {
      filtered = appointments.filter((apt) =>
        apt.loaiLichHen?.includes("Khẩn"),
      );
    } else if (activeTab === "DA_XONG") {
      filtered = appointments.filter((apt) =>
        ["DA_HOAN_THANH", "DA_HUY"].includes(apt.trangThaiLichHen),
      );
    } else {
      filtered = appointments;
    }

    return sortAppointments(filtered);
  };

  const displayedList = getFilteredList();

  // --- COUNTS LOGIC ---
  const counts = {
    pending: appointments.filter((a) => a.trangThaiLichHen === "CHO_XAC_NHAN")
      .length,
    confirmed: appointments.filter((a) => a.trangThaiLichHen === "DA_XAC_NHAN")
      .length,
    urgent: appointments.filter((a) => a.loaiLichHen?.includes("Khẩn")).length,
    history: appointments.filter((a) =>
      ["DA_HOAN_THANH", "DA_HUY"].includes(a.trangThaiLichHen),
    ).length,
  };

  return (
    <section className="w-[600px] border-r border-gray-100 flex flex-col bg-[#F9FAFB] shrink-0 font-sans h-full">
      {/* TABS */}
      <div className="flex bg-white px-4 pt-2 shrink-0 border-b border-gray-100 overflow-x-auto no-scrollbar">
        <TabButton
          label="CHỜ DUYỆT"
          count={counts.pending}
          isActive={activeTab === "CHO_DUYET"}
          onClick={() => onTabChange("CHO_DUYET")}
        />
        <TabButton
          label="ĐÃ DUYỆT"
          count={counts.confirmed}
          isActive={activeTab === "DA_XAC_NHAN"}
          onClick={() => onTabChange("DA_XAC_NHAN")}
        />
        {!isSpa && (
          <TabButton
            label="KHẨN CẤP"
            count={counts.urgent}
            isActive={activeTab === "KHAN_CAP"}
            onClick={() => onTabChange("KHAN_CAP")}
          />
        )}
        <TabButton
          label="LỊCH SỬ"
          count={counts.history}
          isActive={activeTab === "DA_XONG"}
          onClick={() => onTabChange("DA_XONG")}
        />
      </div>

      {/* LIST ITEMS */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-4">
        {loading ? (
          <div className="text-center py-10 text-gray-400 text-sm">
            <span className="inline-block w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2"></span>
            Đang tải dữ liệu...
          </div>
        ) : displayedList.length === 0 ? (
          <div className="text-center py-10 text-gray-400 text-sm flex flex-col items-center gap-2">
            <span className="material-symbols-outlined text-4xl text-gray-300">
              inbox
            </span>
            <span>Không có lịch hẹn nào</span>
          </div>
        ) : (
          displayedList.map((apt) => {
            const isSelected = selectedId === apt.lichHenId;
            const containerClass = isSelected
              ? "bg-white p-6 rounded-3xl border border-[#007A7A] ring-1 ring-[#007A7A]/20 premium-shadow cursor-pointer transition-all group"
              : "bg-white p-6 rounded-3xl border border-gray-50 hover:border-[#007A7A]/20 hover:premium-shadow cursor-pointer transition-all group";

            return (
              <div
                key={apt.lichHenId}
                onClick={() => onSelect(apt.lichHenId)}
                className={containerClass}
              >
                <div className="flex justify-between items-start mb-4">
                  <span
                    className={`px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-widest ${getBadgeStyle(apt.loaiLichHen)}`}
                  >
                    {apt.loaiLichHen || "THƯỜNG LỆ"}
                  </span>
                  <span className="text-[12px] font-bold text-gray-400">
                    {formatTime(apt.thoiGianBatDau)}
                  </span>
                </div>

                <h3 className="font-extrabold text-lg text-gray-900 group-hover:text-[#007A7A] transition-colors mb-2">
                  {apt.tenThuCung}{" "}
                  {apt.giongLoai && (
                    <span className="font-medium text-gray-400 text-base ml-1">
                      ({apt.giongLoai})
                    </span>
                  )}
                </h3>

                <div className="mb-5">
                  <p className="text-sm font-bold text-gray-700 mb-1">
                    {apt.tenDichVu}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {apt.ghiChuKhachHang || "Không có ghi chú thêm."}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-2">
                  <div className="flex items-center gap-3">
                    {/* --- HIỂN THỊ ẢNH KHÁCH HÀNG (MỚI) --- */}
                    <div className="size-8 rounded-full overflow-hidden border border-gray-200 bg-gray-50 shrink-0 relative">
                      {apt.anhKhachHang ? (
                        <img
                          src={`${IMAGE_BASE_URL}${apt.anhKhachHang}`}
                          alt={apt.tenKhachHang}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none"; // Ẩn ảnh lỗi
                            e.target.nextSibling.style.display = "flex"; // Hiện icon fallback
                          }}
                        />
                      ) : null}

                      {/* Fallback Icon (Ẩn nếu có ảnh) */}
                      <div
                        className="w-full h-full flex items-center justify-center text-gray-300 absolute inset-0 bg-gray-50"
                        style={{ display: apt.anhKhachHang ? "none" : "flex" }}
                      >
                        <span className="material-symbols-outlined text-lg">
                          person
                        </span>
                      </div>
                    </div>
                    {/* ------------------------------------------ */}

                    <span className="text-xs font-semibold text-gray-500 truncate max-w-[150px]">
                      {apt.tenKhachHang}
                    </span>
                  </div>

                  <div className="px-3 py-1 bg-gray-50 rounded-lg text-[10px] font-bold text-gray-400 uppercase">
                    HS #{apt.lichHenId}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

const TabButton = ({ label, count, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-1 min-w-[80px] py-4 text-[10px] font-extrabold tracking-[0.1em] border-b-[3px] transition-colors ${
      isActive
        ? "border-[#007A7A] text-[#007A7A]"
        : "border-transparent text-gray-400 hover:text-gray-600"
    }`}
  >
    {label} {count !== undefined && count > 0 && `(${count})`}
  </button>
);

export default AppointmentList;
