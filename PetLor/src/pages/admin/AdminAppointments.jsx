import React from "react";

// Helper: Format ngày giờ
const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Helper: Badge trạng thái
const getStatusBadge = (status) => {
  switch (status) {
    case "Đã xác nhận":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Hoàn thành":
      return "bg-green-100 text-green-800 border-green-200";
    case "Đã hủy":
      return "bg-red-100 text-red-800 border-red-200";
    case "Chờ xác nhận":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

// Dữ liệu giả lập từ bảng lich_hen
const appointmentsData = [
  {
    lichHenId: 301,
    khachHang: "Nguyễn Văn A", // từ user_id
    thuCung: "Milo (Chó)", // từ thu_cung_id
    dichVu: "Grooming", // từ dich_vu_id
    nhanVien: "Trần Thị B", // từ nhan_vien_id
    thoiGianBatDau: "2025-12-20T09:00:00",
    thoiGianKetThuc: "2025-12-20T10:00:00",
    trangThai: "Đã xác nhận",
    ghiChu: "Bé hơi sợ nước.",
  },
  {
    lichHenId: 302,
    khachHang: "Lê Văn C",
    thuCung: "Miu (Mèo)",
    dichVu: "Khám bệnh",
    nhanVien: "Dr. Nguyễn Văn A",
    thoiGianBatDau: "2025-12-20T14:00:00",
    thoiGianKetThuc: "2025-12-20T14:30:00",
    trangThai: "Chờ xác nhận",
    ghiChu: "Khám da liễu.",
  },
  {
    lichHenId: 303,
    khachHang: "Hoàng Thị D",
    thuCung: "Lu (Chó)",
    dichVu: "Tiêm phòng",
    nhanVien: "Dr. Hoang Van E",
    thoiGianBatDau: "2025-12-19T10:00:00",
    thoiGianKetThuc: "2025-12-19T10:15:00",
    trangThai: "Hoàn thành",
    ghiChu: "",
  },
];

// Stats
const stats = [
  {
    title: "Lịch hẹn hôm nay",
    value: "8",
    icon: "today",
    color: "text-blue-600",
    bg: "bg-blue-100",
    border: "border-blue-600",
  },
  {
    title: "Đang chờ xác nhận",
    value: "3",
    icon: "pending_actions",
    color: "text-yellow-600",
    bg: "bg-yellow-100",
    border: "border-yellow-500",
  },
  {
    title: "Đã hoàn thành (Tháng)",
    value: "120",
    icon: "event_available",
    color: "text-green-600",
    bg: "bg-green-100",
    border: "border-green-500",
  },
];

const AdminAppointments = () => {
  return (
    <>
      <div className="flex flex-wrap justify-between gap-3">
        <p className="text-gray-900 text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
          Quản lý Lịch hẹn
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200 border-l-4 ${stat.border}`}
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className={`flex-shrink-0 ${stat.bg} rounded-md p-3`}>
                  <span
                    className={`material-symbols-outlined ${stat.color} text-2xl`}
                  >
                    {stat.icon}
                  </span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.title}
                    </dt>
                    <dd>
                      <div className="text-lg font-bold text-gray-900">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
          <div className="flex-1 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="relative rounded-md shadow-sm max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400">
                  search
                </span>
              </div>
              <input
                className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md h-10"
                placeholder="Tìm lịch hẹn..."
                type="text"
              />
            </div>
            <div className="relative">
              <input
                className="block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md h-10"
                type="date"
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
              <span className="material-symbols-outlined text-sm mr-2">
                calendar_month
              </span>{" "}
              Lịch biểu
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-green-600 focus:outline-none">
              <span className="material-symbols-outlined text-sm mr-2">
                add
              </span>{" "}
              Tạo Lịch hẹn
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thông tin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dịch vụ & Nhân viên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thời gian
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Hành động</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointmentsData.map((app, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    #{app.lichHenId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {app.khachHang}
                    </div>
                    <div className="text-xs text-gray-500">
                      Pet: {app.thuCung}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{app.dichVu}</div>
                    <div className="text-xs text-gray-500">
                      NV: {app.nhanVien}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>Bắt đầu: {formatDateTime(app.thoiGianBatDau)}</div>
                    <div>Kết thúc: {formatDateTime(app.thoiGianKetThuc)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadge(
                        app.trangThai
                      )}`}
                    >
                      {app.trangThai}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-gray-400 hover:text-blue-500 transition-colors">
                        <span className="material-symbols-outlined text-base">
                          edit
                        </span>
                      </button>
                      <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined text-base">
                          cancel
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminAppointments;
