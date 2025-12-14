import React, { useEffect, useState } from "react";
import petService from "../../services/petService"; // Dùng chung service với Pet

// Helper: Format ngày giờ
const formatDateTime = (dateString) => {
  if (!dateString) return "---";
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
  const s = status ? status.toLowerCase() : "";
  if (s.includes("xác nhận") || s.includes("confirmed"))
    return "bg-blue-100 text-blue-800 border-blue-200";
  if (s.includes("hoàn thành") || s.includes("completed"))
    return "bg-green-100 text-green-800 border-green-200";
  if (s.includes("hủy") || s.includes("cancelled"))
    return "bg-red-100 text-red-800 border-red-200";
  // Mặc định: Chờ xác nhận / Pending
  return "bg-yellow-100 text-yellow-800 border-yellow-200";
};

const AdminAppointments = () => {
  // 1. State
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // 2. Fetch Data
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await petService.getAllAppointments();

      // Map dữ liệu từ API
      const formattedData = Array.isArray(response)
        ? response.map((app) => ({
            ...app,
            lichHenId: app.id || app.lichHenId,
            // Map tên Khách hàng
            khachHang: app.user
              ? app.user.hoTen || app.user.tenNguoiDung
              : app.tenKhachHang || "Khách vãng lai",
            // Map tên Thú cưng
            thuCung: app.thuCung ? app.thuCung.tenThuCung : "---",
            // Map tên Dịch vụ
            dichVu: app.dichVu ? app.dichVu.tenDichVu : "---",
            // Map tên Nhân viên (Bác sĩ/KTV)
            nhanVien: app.nhanVien
              ? app.nhanVien.hoTen || app.nhanVien.tenNhanVien
              : "Chưa phân công",

            thoiGianBatDau: app.thoiGianBatDau,
            thoiGianKetThuc: app.thoiGianKetThuc,
            trangThai: app.trangThai || "Chờ xác nhận",
            ghiChu: app.ghiChu || "",
          }))
        : [];

      // Sắp xếp: Lịch mới nhất lên đầu
      formattedData.sort(
        (a, b) => new Date(b.thoiGianBatDau) - new Date(a.thoiGianBatDau)
      );

      setAppointments(formattedData);
    } catch (error) {
      console.error("Lỗi tải lịch hẹn:", error);
      alert("Không thể tải danh sách lịch hẹn.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // 3. Actions
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy/xóa lịch hẹn này?")) return;
    try {
      await petService.deleteAppointment(id);
      setAppointments((prev) => prev.filter((a) => a.lichHenId !== id));
      alert("Đã xóa lịch hẹn.");
    } catch (error) {
      alert("Xóa thất bại.");
    }
  };

  const handleUpdateStatus = async (app) => {
    const newStatus = prompt(
      "Cập nhật trạng thái (Chờ xác nhận, Đã xác nhận, Hoàn thành, Đã hủy):",
      app.trangThai
    );
    if (newStatus && newStatus !== app.trangThai) {
      try {
        await petService.updateAppointment(app.lichHenId, {
          ...app,
          trangThai: newStatus,
        });
        setAppointments((prev) =>
          prev.map((a) =>
            a.lichHenId === app.lichHenId ? { ...a, trangThai: newStatus } : a
          )
        );
        alert("Cập nhật thành công!");
      } catch (error) {
        console.error(error);
        alert("Cập nhật thất bại.");
      }
    }
  };

  // 4. Filter Logic
  const filteredApps = appointments.filter((app) => {
    const matchSearch =
      (app.khachHang &&
        app.khachHang.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (app.thuCung &&
        app.thuCung.toLowerCase().includes(searchTerm.toLowerCase()));

    // Lọc theo ngày bắt đầu (So sánh chuỗi ngày YYYY-MM-DD)
    const matchDate = filterDate
      ? app.thoiGianBatDau.startsWith(filterDate)
      : true;

    return matchSearch && matchDate;
  });

  // 5. Stats
  // Lịch hôm nay: So sánh ngày hiện tại với ngày bắt đầu của lịch
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayCount = appointments.filter(
    (a) => a.thoiGianBatDau && a.thoiGianBatDau.startsWith(todayStr)
  ).length;

  const pendingCount = appointments.filter(
    (a) =>
      a.trangThai.toLowerCase().includes("chờ") ||
      a.trangThai.toLowerCase().includes("pending")
  ).length;

  const completedMonthCount = appointments.filter(
    (a) =>
      (a.trangThai.toLowerCase().includes("hoàn thành") ||
        a.trangThai.toLowerCase().includes("completed")) &&
      new Date(a.thoiGianBatDau).getMonth() === new Date().getMonth() // Trong tháng này
  ).length;

  const stats = [
    {
      title: "Lịch hẹn hôm nay",
      value: todayCount,
      icon: "today",
      color: "text-blue-600",
      bg: "bg-blue-100",
      border: "border-blue-600",
    },
    {
      title: "Đang chờ xác nhận",
      value: pendingCount,
      icon: "pending_actions",
      color: "text-yellow-600",
      bg: "bg-yellow-100",
      border: "border-yellow-500",
    },
    {
      title: "Đã hoàn thành (Tháng)",
      value: completedMonthCount,
      icon: "event_available",
      color: "text-green-600",
      bg: "bg-green-100",
      border: "border-green-500",
    },
  ];

  if (loading)
    return <div className="p-10 text-center">Đang tải lịch hẹn...</div>;

  return (
    <>
      {/* Page Heading */}
      <div className="flex flex-wrap justify-between gap-3">
        <p className="text-gray-900 text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
          Quản lý Lịch hẹn
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
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

      {/* Filters & Actions */}
      <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6 mt-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
          <div className="flex-1 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            {/* Search */}
            <div className="relative rounded-md shadow-sm max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400">
                  search
                </span>
              </div>
              <input
                className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md h-10"
                placeholder="Tìm tên khách, thú cưng..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* Date Filter */}
            <div className="relative">
              <input
                className="block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md h-10"
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>
          </div>
          {/* Buttons */}
          <div className="flex space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
              <span className="material-symbols-outlined text-sm mr-2">
                calendar_month
              </span>{" "}
              Lịch biểu
            </button>
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-green-600 focus:outline-none"
              onClick={() => alert("Chức năng tạo lịch hẹn")}
            >
              <span className="material-symbols-outlined text-sm mr-2">
                add
              </span>{" "}
              Tạo Lịch hẹn
            </button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thông tin Khách & Pet
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
              {filteredApps.length > 0 ? (
                filteredApps.map((app, index) => (
                  <tr
                    key={app.lichHenId || index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* ID */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      #{app.lichHenId}
                    </td>

                    {/* Thông tin Khách */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {app.khachHang}
                      </div>
                      <div className="text-xs text-gray-500">
                        Pet:{" "}
                        <span className="font-semibold">{app.thuCung}</span>
                      </div>
                    </td>

                    {/* Dịch vụ & NV */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{app.dichVu}</div>
                      <div className="text-xs text-gray-500">
                        Phụ trách: {app.nhanVien}
                      </div>
                    </td>

                    {/* Thời gian */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>
                        Bắt đầu:{" "}
                        <span className="text-gray-900">
                          {formatDateTime(app.thoiGianBatDau)}
                        </span>
                      </div>
                      {/* <div>Kết thúc: {formatDateTime(app.thoiGianKetThuc)}</div> */}
                    </td>

                    {/* Trạng thái */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadge(
                          app.trangThai
                        )}`}
                      >
                        {app.trangThai}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          className="text-gray-400 hover:text-blue-500 transition-colors"
                          title="Cập nhật trạng thái"
                          onClick={() => handleUpdateStatus(app)}
                        >
                          <span classna="material-symbols-outlined text-base">
                            edit_note
                          </span>
                        </button>
                        <button
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          title="Hủy lịch"
                          onClick={() => handleDelete(app.lichHenId)}
                        >
                          <span className="material-symbols-outlined text-base">
                            cancel
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Không tìm thấy lịch hẹn nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Info */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <p className="text-sm text-gray-700">
            Tổng cộng: {filteredApps.length} lịch hẹn
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminAppointments;
