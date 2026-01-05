import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import petService from "../../services/petService";
import { renderStatusBadge } from "../../utils/formatters";
import AOS from "aos";

const MyAppointments = () => {
  const [user] = useOutletContext();
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("Sắp tới");
  const [loading, setLoading] = useState(true);

  const statusMap = {
    "Sắp tới": "DA_XAC_NHAN",
    "Chờ xác nhận": "CHO_XAC_NHAN",
    "Đã hoàn thành": "DA_HOAN_THANH",
    "Đã hủy": "DA_HUY",
  };

  const fetchData = async () => {
    setLoading(true);
    const res = await petService.getMyAppointments();
    setAppointments(res.data || res);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    AOS.init({ duration: 800 });
  }, []);

  // ... các phần khác giữ nguyên ...

  const handleCancel = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn hủy lịch hẹn này?")) {
      try {
        // Thay đổi ở đây:
        await petService.cancelMyAppointment(id);

        // Thông báo thành công nếu muốn
        alert("Hủy lịch hẹn thành công!");

        // Load lại dữ liệu
        fetchData();
      } catch (error) {
        console.error("Lỗi khi hủy hẹn:", error);
        alert("Không thể hủy lịch hẹn. Vui lòng thử lại sau.");
      }
    }
  };

  // ... các phần render bên dưới giữ nguyên ...

  const filtered = appointments.filter(
    (a) => a.trangThaiLichHen === statusMap[activeTab]
  );

  return (
    <main className="flex-1 space-y-6 animate-fade-in">
      <div
        className="bg-white rounded-3xl p-8 shadow-sm relative overflow-hidden border border-gray-100 isolate"
        data-aos="fade-down"
      >
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#2a9d8f]/10 to-transparent opacity-60"></div>
        <span className="material-symbols-outlined absolute -right-6 -bottom-8 text-9xl text-[#2a9d8f]/5 rotate-12 select-none">
          calendar_month
        </span>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-extrabold text-gray-900">
                Quản lý <span className="text-[#10B981]">lịch hẹn</span>
              </h1>
            </div>
            <p className="text-gray-500 text-lg">
              Theo dõi hành trình chăm sóc sức khỏe cho thú cưng.
            </p>
          </div>
          <button className="bg-[#10B981] text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-emerald-600 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined">add</span> Đặt lịch mới
          </button>
        </div>
      </div>

      <div
        className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100 inline-flex flex-wrap gap-1"
        data-aos="fade-up"
      >
        {Object.keys(statusMap).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-2xl text-sm font-bold transition whitespace-nowrap ${
              activeTab === tab
                ? "bg-[#2a9d8f] text-white shadow-md"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4" data-aos="fade-up">
        {filtered.map((item) => (
          <div
            key={item.lichHenId}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-center hover:shadow-md transition-all"
          >
            <div className="flex-shrink-0 flex flex-col items-center justify-center bg-blue-50 text-blue-600 w-20 h-20 rounded-2xl border border-blue-100 font-bold">
              <span className="text-[10px] uppercase opacity-70">
                Tháng {new Date(item.thoiGianBatDau).getMonth() + 1}
              </span>
              <span className="text-2xl">
                {new Date(item.thoiGianBatDau).getDate()}
              </span>
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex justify-between gap-4 mb-2">
                <h3 className="font-bold text-lg truncate">{item.tenDichVu}</h3>
                {renderStatusBadge(item.trangThaiLichHen)}
              </div>
              <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">
                  person
                </span>{" "}
                {item.tenNhanVien || "Đang xử lý"}
              </p>
              <p className="text-sm font-medium text-gray-700">
                Thú cưng: {item.tenThuCung || "N/A"}
              </p>
            </div>
            <div className="flex md:flex-col gap-2 w-full md:w-32 flex-shrink-0">
              <button className="flex-1 px-4 py-2 rounded-xl text-sm font-bold bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-600 hover:text-white transition-all whitespace-nowrap shadow-sm">
                Chi tiết
              </button>
              {(item.trangThaiLichHen === "CHO_XAC_NHAN" ||
                item.trangThaiLichHen === "DA_XAC_NHAN") && (
                <button
                  onClick={() => handleCancel(item.lichHenId)}
                  className="flex-1 px-4 py-2 rounded-xl text-sm font-bold border border-red-100 text-red-500 hover:bg-red-50 transition-all whitespace-nowrap"
                >
                  Hủy hẹn
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MyAppointments;
