import React from "react";

// Helper: Format ngày tháng từ chuỗi ISO
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Helper: Chọn màu badge cho Role
const getRoleStyle = (role) => {
  switch (role) {
    case "ADMIN":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "STAFF":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default: // USER
      return "bg-green-100 text-green-800 border-green-200";
  }
};

// Dữ liệu giả lập (Mock Data) theo cấu trúc bạn yêu cầu
const usersData = [
  {
    userId: 7,
    hoTen: "Vu Anh Duong",
    email: "vuanhduong251020042@gmail.com",
    soDienThoai: null,
    diaChi: null,
    ngayTao: "2025-10-31T09:47:14",
    role: "ADMIN",
  },
  {
    userId: 10,
    hoTen: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    soDienThoai: "0912345678",
    diaChi: "123 Đường ABC, Quận 1, TP. HCM",
    ngayTao: "2025-12-12T09:01:15",
    role: "USER",
  },
  {
    userId: 11,
    hoTen: "Trần Thị Admin",
    email: "admin@petcare.com",
    soDienThoai: "0909999888",
    diaChi: "Tòa nhà Bitexco, Quận 1",
    ngayTao: "2025-10-01T08:30:00",
    role: "ADMIN",
  },
  {
    userId: 12,
    hoTen: "Lê Văn Staff",
    email: "staff.le@petcare.com",
    soDienThoai: "0987654321",
    diaChi: "456 Lê Lợi, Đà Nẵng",
    ngayTao: "2025-11-15T14:20:00",
    role: "STAFF",
  },
  {
    userId: 13,
    hoTen: "Phạm Thị Khách",
    email: "phamthi@gmail.com",
    soDienThoai: "0911223344",
    diaChi: "789 Nguyễn Trãi, Hà Nội",
    ngayTao: "2025-12-01T10:05:45",
    role: "USER",
  },
];

// Dữ liệu thống kê (Giữ nguyên hoặc chỉnh sửa tùy logic backend)
const stats = [
  {
    title: "Tổng người dùng",
    value: "1,204",
    icon: "group",
    color: "text-blue-600",
    bg: "bg-blue-100",
    border: "border-blue-600",
  },
  {
    title: "Người dùng mới (Tháng)",
    value: "+48",
    icon: "person_add",
    color: "text-green-600",
    bg: "bg-green-100",
    border: "border-green-500",
  },
  {
    title: "Nhân viên & Admin",
    value: "15",
    icon: "manage_accounts",
    color: "text-purple-600",
    bg: "bg-purple-100",
    border: "border-purple-500",
  },
];

const AdminUsers = () => {
  return (
    <>
      {/* Page Heading */}
      <div className="flex flex-wrap justify-between gap-3">
        <p className="text-gray-900 text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
          Quản lý Người dùng
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
                placeholder="Tìm tên, email, sđt..."
                type="text"
              />
            </div>
            {/* Select Role */}
            <div className="relative inline-block text-left">
              <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md h-10">
                <option value="">Tất cả vai trò</option>
                <option value="USER">User (Khách hàng)</option>
                <option value="STAFF">Staff (Nhân viên)</option>
                <option value="ADMIN">Admin (Quản trị)</option>
              </select>
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
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              type="button"
            >
              <span className="material-symbols-outlined text-sm mr-2">
                person_add
              </span>
              Thêm User
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
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Họ và Tên
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Thông tin liên hệ
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Địa chỉ
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Vai trò (Role)
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ngày tạo
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Hành động</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usersData.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  {/* ID */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    #{user.userId}
                  </td>

                  {/* Họ Tên + Avatar giả lập */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        {/* Tạo avatar placeholder từ tên */}
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                          {user.hoTen.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.hoTen}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Liên hệ (Email & SĐT) */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className="text-xs text-gray-500">
                      {user.soDienThoai}
                    </div>
                  </td>

                  {/* Địa chỉ (Truncate nếu dài) */}
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-[200px] truncate"
                    title={user.diaChi}
                  >
                    {user.diaChi}
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full border ${getRoleStyle(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Ngày tạo */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(user.ngayTao)}
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
                        title="Chỉnh sửa"
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        <span className="material-symbols-outlined text-base">
                          edit
                        </span>
                      </button>
                      <button
                        title="Xóa/Khóa"
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <span className="material-symbols-outlined text-base">
                          delete
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
                <span className="font-medium">{usersData.length}</span> trong số{" "}
                <span className="font-medium">1,204</span> kết quả
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

export default AdminUsers;
