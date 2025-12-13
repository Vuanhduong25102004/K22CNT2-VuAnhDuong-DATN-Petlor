import React from "react";

// Helper: Chọn màu badge cho Chức vụ
const getPositionBadge = (position) => {
  switch (position) {
    case "Bác sĩ thú y":
      return "bg-green-100 text-green-800 border-green-200";
    case "Groomer": // Cắt tỉa lông
      return "bg-pink-100 text-pink-800 border-pink-200";
    case "Huấn luyện viên":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "Quản lý":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

// Dữ liệu giả lập (Mock Data) từ bảng nhan_vien
const employeesData = [
  {
    nhanVienId: 501,
    hoTen: "Dr. Nguyễn Văn A",
    chucVu: "Bác sĩ thú y",
    soDienThoai: "0912345678",
    email: "dr.nguyenvana@petcare.com",
    userId: 101, // Liên kết tài khoản hệ thống
    chuyenKhoa: "Nội khoa, Phẫu thuật",
    kinhNghiem: "5 năm kinh nghiệm tại bệnh viện thú y SG.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjClsZTm99bGatBKzSqsmKOA8HM5qeX-wJzr7gqNqhHv7kYOSMvSSq7gj6gVU1sNHeESSY4MsyQoNE5LLSXRyX6VEf7hxoSkTdzo3BL691MDyUYwKk9zCXUxTNdZf86ZzNZLQXbIjA5QuanM4NYwjs2Ndkl_jhF03UD3PzH0cFu_kVSFP-xsNsuK6l_nmjkJ2eICVcf0L8jqS_NF6SMWtS7U5MKAooqgwzYmzwTr15qHi4SxbrqptmJ4dNWbj4SMUUxCyRt60oO_Gz6",
  },
  {
    nhanVienId: 502,
    hoTen: "Trần Thị B",
    chucVu: "Groomer",
    soDienThoai: "0987654321",
    email: "b.groomer@petcare.com",
    userId: 102,
    chuyenKhoa: "Cắt tỉa tạo kiểu, Spa",
    kinhNghiem: "Chứng chỉ Grooming quốc tế Level B.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjClsZTm99bGatBKzSqsmKOA8HM5qeX-wJzr7gqNqhHv7kYOSMvSSq7gj6gVU1sNHeESSY4MsyQoNE5LLSXRyX6VEf7hxoSkTdzo3BL691MDyUYwKk9zCXUxTNdZf86ZzNZLQXbIjA5QuanM4NYwjs2Ndkl_jhF03UD3PzH0cFu_kVSFP-xsNsuK6l_nmjkJ2eICVcf0L8jqS_NF6SMWtS7U5MKAooqgwzYmzwTr15qHi4SxbrqptmJ4dNWbj4SMUUxCyRt60oO_Gz7",
  },
  {
    nhanVienId: 503,
    hoTen: "Lê Văn C",
    chucVu: "Huấn luyện viên",
    soDienThoai: "0909090909",
    email: "c.trainer@petcare.com",
    userId: 103,
    chuyenKhoa: "Chỉnh sửa hành vi",
    kinhNghiem: "3 năm huấn luyện chó nghiệp vụ.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjClsZTm99bGatBKzSqsmKOA8HM5qeX-wJzr7gqNqhHv7kYOSMvSSq7gj6gVU1sNHeESSY4MsyQoNE5LLSXRyX6VEf7hxoSkTdzo3BL691MDyUYwKk9zCXUxTNdZf86ZzNZLQXbIjA5QuanM4NYwjs2Ndkl_jhF03UD3PzH0cFu_kVSFP-xsNsuK6l_nmjkJ2eICVcf0L8jqS_NF6SMWtS7U5MKAooqgwzYmzwTr15qHi4SxbrqptmJ4dNWbj4SMUUxCyRt60oO_Gz8",
  },
  {
    nhanVienId: 504,
    hoTen: "Phạm Thị D",
    chucVu: "Quản lý",
    soDienThoai: "0918181818",
    email: "manager.d@petcare.com",
    userId: 104,
    chuyenKhoa: "Quản lý vận hành",
    kinhNghiem: "7 năm quản lý chuỗi cửa hàng thú cưng.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjClsZTm99bGatBKzSqsmKOA8HM5qeX-wJzr7gqNqhHv7kYOSMvSSq7gj6gVU1sNHeESSY4MsyQoNE5LLSXRyX6VEf7hxoSkTdzo3BL691MDyUYwKk9zCXUxTNdZf86ZzNZLQXbIjA5QuanM4NYwjs2Ndkl_jhF03UD3PzH0cFu_kVSFP-xsNsuK6l_nmjkJ2eICVcf0L8jqS_NF6SMWtS7U5MKAooqgwzYmzwTr15qHi4SxbrqptmJ4dNWbj4SMUUxCyRt60oO_Gz9",
  },
  {
    nhanVienId: 505,
    hoTen: "Hoàng Văn E",
    chucVu: "Bác sĩ thú y",
    soDienThoai: "0922334455",
    email: "dr.hoang@petcare.com",
    userId: 105,
    chuyenKhoa: "Da liễu, Ký sinh trùng",
    kinhNghiem: "Thạc sĩ thú y ĐH Nông Lâm.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZzjj5EKgBhc03wWYUZG_JhbM0m5T8oo_9x2wow9jppRoMVPsUFXdNLkWgD5O-8w9cL3WzWNSZiBBTt-XiCl2Jzhp_QdZlUErVflczznwbPJhmXzeNln1giYzkGsUv9ZijCfG6w2skVAAXJ9GWP67BWJtTfAUpoYQcqVzrgnhcV8tWQEQQx7deLfOw0SdpCWf9gcAiYVnYxCt9b0sz3MlKUWYfCD1nULtih7zZQH0ETZyuU6kLgt-7o8I6QnDTn5OnE2_q1iFLNmft0",
  },
];

// Dữ liệu thống kê
const stats = [
  {
    title: "Tổng nhân viên",
    value: "24",
    icon: "badge",
    color: "text-blue-600",
    bg: "bg-blue-100",
    border: "border-blue-600",
  },
  {
    title: "Bác sĩ thú y",
    value: "8",
    icon: "medical_services",
    color: "text-green-600",
    bg: "bg-green-100",
    border: "border-green-500",
  },
  {
    title: "Bộ phận Spa/Grooming",
    value: "10",
    icon: "content_cut",
    color: "text-pink-600",
    bg: "bg-pink-100",
    border: "border-pink-500",
  },
];

const AdminEmployees = () => {
  return (
    <>
      {/* Page Heading */}
      <div className="flex flex-wrap justify-between gap-3">
        <p className="text-gray-900 text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
          Quản lý Nhân viên
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
            {/* Select Position */}
            <div className="relative inline-block text-left">
              <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md h-10">
                <option value="">Tất cả chức vụ</option>
                <option value="Bác sĩ thú y">Bác sĩ thú y</option>
                <option value="Groomer">Groomer (Spa)</option>
                <option value="Huấn luyện viên">Huấn luyện viên</option>
                <option value="Quản lý">Quản lý</option>
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
              Thêm Nhân viên
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
                  Nhân Viên
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Liên Hệ
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Chức Vụ
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Chuyên Khoa
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Kinh Nghiệm
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Hành động</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employeesData.map((emp, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  {/* ID */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    #{emp.nhanVienId}
                  </td>

                  {/* Nhân Viên (Avatar + Tên + Email) */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full object-cover border border-gray-200"
                          src={emp.img}
                          alt={emp.hoTen}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {emp.hoTen}
                        </div>
                        <div className="text-xs text-gray-500">{emp.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Liên Hệ (SĐT) */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {emp.soDienThoai}
                  </td>

                  {/* Chức Vụ (Badge) */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full border ${getPositionBadge(
                        emp.chucVu
                      )}`}
                    >
                      {emp.chucVu}
                    </span>
                  </td>

                  {/* Chuyên Khoa */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {emp.chuyenKhoa}
                  </td>

                  {/* Kinh Nghiệm (Truncate) */}
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-[200px] truncate"
                    title={emp.kinhNghiem}
                  >
                    {emp.kinhNghiem}
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
                        title="Xóa"
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
                <span className="font-medium">{employeesData.length}</span>{" "}
                trong số <span className="font-medium">24</span> kết quả
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

export default AdminEmployees;
