import React, { useEffect, useState } from "react";
import userService from "../../services/userservice"; // Sử dụng service đã có

// Helper: Chọn màu badge cho Chức vụ
const getPositionBadge = (position) => {
  // Chuẩn hóa chuỗi để so sánh
  const pos = position ? position.toLowerCase() : "";

  if (pos.includes("bác sĩ") || pos.includes("doctor"))
    return "bg-green-100 text-green-800 border-green-200";
  if (pos.includes("làm đẹp") || pos.includes("groomer"))
    return "bg-pink-100 text-pink-800 border-pink-200";
  if (pos.includes("huấn luyện") || pos.includes("trainer"))
    return "bg-orange-100 text-orange-800 border-orange-200";
  if (pos.includes("quản lý") || pos.includes("manager"))
    return "bg-purple-100 text-purple-800 border-purple-200";

  return "bg-gray-100 text-gray-800 border-gray-200";
};

const AdminEmployees = () => {
  // 1. State
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPosition, setFilterPosition] = useState("");

  // 2. Fetch Data
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await userService.getAllStaff();

      // Map dữ liệu từ API
      const formattedData = Array.isArray(response)
        ? response.map((emp) => ({
            ...emp,
            nhanVienId: emp.id || emp.nhanVienId || emp.maNhanVien,
            hoTen: emp.hoTen || emp.tenNhanVien,
            email: emp.email || "---",
            soDienThoai: emp.soDienThoai || "---",
            chucVu: emp.chucVu || emp.vaiTro || "Nhân viên",
            chuyenKhoa: emp.chuyenKhoa || "---",
            kinhNghiem: emp.kinhNghiem || "---",
            // Ảnh đại diện
            img: emp.hinhAnhUrl || "https://placehold.co/100x100?text=Staff",
          }))
        : [];

      setEmployees(formattedData);
    } catch (error) {
      console.error("Lỗi tải danh sách nhân viên:", error);
      alert("Không thể tải dữ liệu nhân viên.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // 3. Actions
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa hồ sơ nhân viên này?"))
      return;
    try {
      await userService.deleteStaff(id);
      setEmployees((prev) => prev.filter((e) => e.nhanVienId !== id));
      alert("Xóa thành công!");
    } catch (error) {
      console.error(error);
      alert(
        "Xóa thất bại! Có thể nhân viên đang phụ trách lịch hẹn hoặc đơn hàng."
      );
    }
  };

  // 4. Filter Logic
  const filteredEmployees = employees.filter((emp) => {
    // Tìm kiếm: Tên, Email hoặc SĐT
    const matchSearch =
      emp.hoTen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.soDienThoai.includes(searchTerm);

    // Lọc theo chức vụ
    const matchPosition = filterPosition ? emp.chucVu === filterPosition : true;

    return matchSearch && matchPosition;
  });

  // 5. Stats Calculation
  const totalStaff = employees.length;
  // Đếm số lượng bác sĩ (tìm theo từ khóa 'Bác sĩ' hoặc 'Doctor')
  const countVets = employees.filter(
    (e) =>
      e.chucVu && (e.chucVu.includes("Bác sĩ") || e.chucVu.includes("Doctor"))
  ).length;
  // Đếm số lượng Groomer
  const countGroomers = employees.filter(
    (e) =>
      e.chucVu && (e.chucVu.includes("Groomer") || e.chucVu.includes("Spa"))
  ).length;

  const stats = [
    {
      title: "Tổng nhân viên",
      value: totalStaff,
      icon: "badge",
      color: "text-blue-600",
      bg: "bg-blue-100",
      border: "border-blue-600",
    },
    {
      title: "Bác sĩ thú y",
      value: countVets,
      icon: "medical_services",
      color: "text-green-600",
      bg: "bg-green-100",
      border: "border-green-500",
    },
    {
      title: "Bộ phận Spa/Grooming",
      value: countGroomers,
      icon: "content_cut",
      color: "text-pink-600",
      bg: "bg-pink-100",
      border: "border-pink-500",
    },
  ];

  if (loading)
    return (
      <div className="p-10 text-center">Đang tải danh sách nhân viên...</div>
    );

  return (
    <>
      {/* Page Heading */}
      <div className="flex flex-wrap justify-between gap-3">
        <p className="text-gray-900 text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
          Quản lý Nhân viên
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
                placeholder="Tìm tên, email, sđt..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* Select Position */}
            <div className="relative inline-block text-left">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md h-10"
                value={filterPosition}
                onChange={(e) => setFilterPosition(e.target.value)}
              >
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
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              type="button"
            >
              <span className="material-symbols-outlined text-sm mr-2">
                file_download
              </span>
              Xuất Excel
            </button>
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-green-600 focus:outline-none"
              type="button"
              onClick={() => alert("Chức năng thêm mới")}
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
      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nhân Viên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Liên Hệ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chức Vụ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chuyên Khoa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kinh Nghiệm
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Hành động</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp, index) => (
                  <tr
                    key={emp.nhanVienId || index}
                    className="hover:bg-gray-50 transition-colors"
                  >
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
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/40?text=NV";
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {emp.hoTen}
                          </div>
                          <div className="text-xs text-gray-500">
                            {emp.email}
                          </div>
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
                          className="text-gray-400 hover:text-primary transition-colors"
                          title="Xem chi tiết"
                          onClick={() => alert(`Xem chi tiết NV: ${emp.hoTen}`)}
                        >
                          <span className="material-symbols-outlined text-base">
                            visibility
                          </span>
                        </button>
                        <button
                          className="text-gray-400 hover:text-blue-500 transition-colors"
                          title="Chỉnh sửa"
                          onClick={() =>
                            alert(`Sửa thông tin NV: ${emp.hoTen}`)
                          }
                        >
                          <span className="material-symbols-outlined text-base">
                            edit_note
                          </span>
                        </button>
                        <button
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          title="Xóa"
                          onClick={() => handleDelete(emp.nhanVienId)}
                        >
                          <span className="material-symbols-outlined text-base">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Không tìm thấy nhân viên nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <p className="text-sm text-gray-700">
            Tổng cộng: {filteredEmployees.length} nhân viên
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminEmployees;
