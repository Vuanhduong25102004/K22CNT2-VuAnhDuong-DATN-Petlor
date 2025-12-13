import React from "react";

// Helper: Format tiền tệ
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

// Helper: Format ngày giờ
const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Helper: Style cho trạng thái đơn hàng
const getStatusBadge = (status) => {
  switch (status) {
    case "Hoàn thành":
      return "bg-green-100 text-green-800 border-green-200";
    case "Đang giao":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Chờ xử lý":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Đã hủy":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

// Dữ liệu giả lập (Mock Data) từ bảng don_hang
const ordersData = [
  {
    donHangId: 2001,
    userId: 10,
    userName: "Nguyễn Văn A", // Field giả lập từ bảng User
    ngayDatHang: "2025-12-12T09:30:00",
    tongTien: 1550000,
    trangThai: "Chờ xử lý",
    diaChi: "123 Đường ABC, Quận 1, TP. HCM",
  },
  {
    donHangId: 2002,
    userId: 11,
    userName: "Trần Thị B",
    ngayDatHang: "2025-12-11T14:15:00",
    tongTien: 450000,
    trangThai: "Đang giao",
    diaChi: "456 Lê Lợi, Quận Hải Châu, Đà Nẵng",
  },
  {
    donHangId: 2003,
    userId: 13,
    userName: "Phạm Thị Khách",
    ngayDatHang: "2025-12-10T10:00:00",
    tongTien: 2100000,
    trangThai: "Hoàn thành",
    diaChi: "789 Nguyễn Trãi, Thanh Xuân, Hà Nội",
  },
  {
    donHangId: 2004,
    userId: 10,
    userName: "Nguyễn Văn A",
    ngayDatHang: "2025-12-09T18:45:00",
    tongTien: 120000,
    trangThai: "Đã hủy",
    diaChi: "123 Đường ABC, Quận 1, TP. HCM",
  },
  {
    donHangId: 2005,
    userId: 14,
    userName: "Hoàng Văn VIP",
    ngayDatHang: "2025-12-08T08:20:00",
    tongTien: 3500000,
    trangThai: "Hoàn thành",
    diaChi: "Vinhome Central Park, Bình Thạnh, TP. HCM",
  },
];

// Dữ liệu thống kê
const stats = [
  {
    title: "Tổng đơn hàng (Tháng)",
    value: "1,245",
    icon: "receipt_long",
    color: "text-blue-600",
    bg: "bg-blue-100",
    border: "border-blue-600",
  },
  {
    title: "Doanh thu tạm tính",
    value: "850.500.000 ₫",
    icon: "payments",
    color: "text-green-600",
    bg: "bg-green-100",
    border: "border-green-500",
  },
  {
    title: "Đơn chờ xử lý",
    value: "15",
    icon: "pending_actions",
    color: "text-yellow-600",
    bg: "bg-yellow-100",
    border: "border-yellow-500",
  },
];

const AdminOrders = () => {
  return (
    <>
      {/* Page Heading */}
      <div className="flex flex-wrap justify-between gap-3">
        <p className="text-gray-900 text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
          Quản lý Đơn hàng
        </p>
      </div>

      {/* Stats Grid */}
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

      {/* Filters & Actions */}
      <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6">
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
                id="search"
                name="search"
                placeholder="Tìm mã đơn, tên khách..."
                type="text"
              />
            </div>
            {/* Select Status */}
            <div className="relative inline-block text-left">
              <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md h-10">
                <option value="">Tất cả trạng thái</option>
                <option value="pending">Chờ xử lý</option>
                <option value="shipping">Đang giao</option>
                <option value="completed">Hoàn thành</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>
            {/* Date Picker */}
            <div className="relative">
              <input
                className="block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md h-10"
                type="date"
              />
            </div>
          </div>
          {/* Buttons */}
          <div className="flex space-x-3">
            <button
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              type="button"
            >
              <span className="material-symbols-outlined text-sm mr-2">
                file_download
              </span>
              Xuất Excel
            </button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Mã Đơn
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Khách Hàng (User ID)
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ngày Đặt
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Địa Chỉ Giao Hàng
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tổng Tiền
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Trạng Thái
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Hành động</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ordersData.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  {/* Mã Đơn */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                    #DH{order.donHangId}
                  </td>

                  {/* Khách Hàng */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {order.userName}
                    </div>
                    <div className="text-xs text-gray-500">
                      ID: #{order.userId}
                    </div>
                  </td>

                  {/* Ngày Đặt */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDateTime(order.ngayDatHang)}
                  </td>

                  {/* Địa Chỉ (Cắt ngắn) */}
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-[200px] truncate"
                    title={order.diaChi}
                  >
                    {order.diaChi}
                  </td>

                  {/* Tổng Tiền */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    {formatCurrency(order.tongTien)}
                  </td>

                  {/* Trạng Thái */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadge(
                        order.trangThai
                      )}`}
                    >
                      {order.trangThai}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        title="Xem chi tiết"
                        className="text-gray-400 hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-base">
                          visibility
                        </span>
                      </button>
                      <button
                        title="Cập nhật trạng thái"
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        <span className="material-symbols-outlined text-base">
                          edit_note
                        </span>
                      </button>
                      <button
                        title="Hủy đơn"
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
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

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Hiển thị <span className="font-medium">1</span> đến{" "}
                <span className="font-medium">{ordersData.length}</span> trong
                số <span className="font-medium">1,245</span> kết quả
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <span className="material-symbols-outlined text-base">
                    chevron_left
                  </span>
                </a>
                <a
                  href="#"
                  aria-current="page"
                  className="z-10 bg-primary border-primary text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  1
                </a>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  2
                </a>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                >
                  3
                </a>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  10
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <span className="material-symbols-outlined text-base">
                    chevron_right
                  </span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrders;
