import React from "react";

// Helper: Tính tuổi từ ngày sinh
const calculateAge = (dateString) => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age > 0 ? `${age} tuổi` : "Dưới 1 tuổi";
};

// Helper: Format ngày sinh
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("vi-VN");
};

// Dữ liệu giả lập (Mock Data) dựa trên các cột trong ảnh
const petsData = [
  {
    thuCungId: 101,
    tenThuCung: "Milo",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMgAv8cPdj3o98SPqKRdhkiYrv8wAXuw9EMZND04kEzyfqL1-1eMLzhVMmqylMNHtvLKQj4hB18xtDVX2SAmkT4v6Yy2TbpkSjg1QjY_vCslb_WQ3Ur9dlLQz1DS_TmvJs_gY-_3lwEffVWmDpLZ9hvQsxzqPwM1XbCfOAWP8U1uTHnQmKFmPt4zmSBhTlx0XSzY1R2ybIyr_gQxUk0fFdKn5519LXWfryRK7tIUEO7P-uyXCE9KqPEQce9NMY4Kg_SZdZqAEoAoyW6", // Ảnh giả lập
    owner: { userId: 10, hoTen: "Nguyễn Văn A" }, // Mapping từ user_id
    chungLoai: "Chó",
    giongLoai: "Golden Retriever",
    ngaySinh: "2020-05-15",
    gioiTinh: "Đực",
    ghiChuSucKhoe: "Khỏe mạnh, đã tiêm phòng dại.",
  },
  {
    thuCungId: 102,
    tenThuCung: "Mimi",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMgAv8cPdj3o98SPqKRdhkiYrv8wAXuw9EMZND04kEzyfqL1-1eMLzhVMmqylMNHtvLKQj4hB18xtDVX2SAmkT4v6Yy2TbpkSjg1QjY_vCslb_WQ3Ur9dlLQz1DS_TmvJs_gY-_3lwEffVWmDpLZ9hvQsxzqPwM1XbCfOAWP8U1uTHnQmKFmPt4zmSBhTlx0XSzY1R2ybIyr_gQxUk0fFdKn5519LXWfryRK7tIUEO7P-uyXCE9KqPEQce9NMY4Kg_SZdZqAEoAoyW7",
    owner: { userId: 11, hoTen: "Trần Thị B" },
    chungLoai: "Mèo",
    giongLoai: "Anh Lông Ngắn",
    ngaySinh: "2022-08-20",
    gioiTinh: "Cái",
    ghiChuSucKhoe: "Đang điều trị nấm da nhẹ.",
  },
  {
    thuCungId: 103,
    tenThuCung: "Lu",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMgAv8cPdj3o98SPqKRdhkiYrv8wAXuw9EMZND04kEzyfqL1-1eMLzhVMmqylMNHtvLKQj4hB18xtDVX2SAmkT4v6Yy2TbpkSjg1QjY_vCslb_WQ3Ur9dlLQz1DS_TmvJs_gY-_3lwEffVWmDpLZ9hvQsxzqPwM1XbCfOAWP8U1uTHnQmKFmPt4zmSBhTlx0XSzY1R2ybIyr_gQxUk0fFdKn5519LXWfryRK7tIUEO7P-uyXCE9KqPEQce9NMY4Kg_SZdZqAEoAoyW8",
    owner: { userId: 13, hoTen: "Phạm Thị Khách" },
    chungLoai: "Chó",
    giongLoai: "Poodle",
    ngaySinh: "2023-01-10",
    gioiTinh: "Cái",
    ghiChuSucKhoe: "Cần theo dõi cân nặng.",
  },
  {
    thuCungId: 104,
    tenThuCung: "Rocky",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMgAv8cPdj3o98SPqKRdhkiYrv8wAXuw9EMZND04kEzyfqL1-1eMLzhVMmqylMNHtvLKQj4hB18xtDVX2SAmkT4v6Yy2TbpkSjg1QjY_vCslb_WQ3Ur9dlLQz1DS_TmvJs_gY-_3lwEffVWmDpLZ9hvQsxzqPwM1XbCfOAWP8U1uTHnQmKFmPt4zmSBhTlx0XSzY1R2ybIyr_gQxUk0fFdKn5519LXWfryRK7tIUEO7P-uyXCE9KqPEQce9NMY4Kg_SZdZqAEoAoyW9",
    owner: { userId: 10, hoTen: "Nguyễn Văn A" },
    chungLoai: "Chó",
    giongLoai: "Bulldog",
    ngaySinh: "2019-11-05",
    gioiTinh: "Đực",
    ghiChuSucKhoe: "Bị dị ứng với thịt gà.",
  },
  {
    thuCungId: 105,
    tenThuCung: "Kitty",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjClsZTm99bGatBKzSqsmKOA8HM5qeX-wJzr7gqNqhHv7kYOSMvSSq7gj6gVU1sNHeESSY4MsyQoNE5LLSXRyX6VEf7hxoSkTdzo3BL691MDyUYwKk9zCXUxTNdZf86ZzNZLQXbIjA5QuanM4NYwjs2Ndkl_jhF03UD3PzH0cFu_kVSFP-xsNsuK6l_nmjkJ2eICVcf0L8jqS_NF6SMWtS7U5MKAooqgwzYmzwTr15qHi4SxbrqptmJ4dNWbj4SMUUxCyRt60oO_Gz0",
    owner: { userId: 14, hoTen: "Hoàng Văn VIP" },
    chungLoai: "Mèo",
    giongLoai: "Mèo Ba Tư",
    ngaySinh: "2021-03-30",
    gioiTinh: "Cái",
    ghiChuSucKhoe: "Sức khỏe tốt.",
  },
];

// Dữ liệu thống kê
const stats = [
  {
    title: "Tổng thú cưng",
    value: "1,530",
    icon: "pets",
    color: "text-blue-600",
    bg: "bg-blue-100",
    border: "border-blue-600",
  },
  {
    title: "Chó",
    value: "850",
    icon: "sound_detection_dog_barking", // Material icon cho chó (hoặc dùng icon khác)
    color: "text-orange-600",
    bg: "bg-orange-100",
    border: "border-orange-500",
  },
  {
    title: "Mèo",
    value: "680",
    icon: "cruelty_free", // Material icon thay thế cho mèo
    color: "text-pink-600",
    bg: "bg-pink-100",
    border: "border-pink-500",
  },
];

const AdminPets = () => {
  return (
    <>
      {/* Page Heading */}
      <div className="flex flex-wrap justify-between gap-3">
        <p className="text-gray-900 text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
          Quản lý Thú cưng
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
                placeholder="Tìm tên thú cưng, chủ nuôi..."
                type="text"
              />
            </div>
            {/* Select Species */}
            <div className="relative inline-block text-left">
              <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md h-10">
                <option value="">Tất cả chủng loại</option>
                <option value="Chó">Chó</option>
                <option value="Mèo">Mèo</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
            {/* Select Gender */}
            <div className="relative inline-block text-left">
              <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md h-10">
                <option value="">Tất cả giới tính</option>
                <option value="Đực">Đực</option>
                <option value="Cái">Cái</option>
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
                add
              </span>
              Thêm Thú cưng
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
                  Thú Cưng
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Chủ Nuôi (User ID)
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Loài / Giống
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Giới Tính
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tuổi / Ngày sinh
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ghi chú sức khỏe
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Hành động</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {petsData.map((pet, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  {/* ID */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    #{pet.thuCungId}
                  </td>

                  {/* Tên Thú Cưng + Avatar */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={pet.img}
                          alt={pet.tenThuCung}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {pet.tenThuCung}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Chủ Nuôi (mapping user_id) */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {pet.owner.hoTen}
                    </div>
                    <div className="text-xs text-gray-500">
                      ID: #{pet.owner.userId}
                    </div>
                  </td>

                  {/* Loài / Giống */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{pet.chungLoai}</div>
                    <div className="text-xs text-gray-500">{pet.giongLoai}</div>
                  </td>

                  {/* Giới Tính */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        pet.gioiTinh === "Đực"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-pink-100 text-pink-800"
                      }`}
                    >
                      {pet.gioiTinh}
                    </span>
                  </td>

                  {/* Tuổi / Ngày sinh */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {calculateAge(pet.ngaySinh)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDate(pet.ngaySinh)}
                    </div>
                  </td>

                  {/* Ghi chú sức khỏe (Truncate) */}
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-[200px] truncate"
                    title={pet.ghiChuSucKhoe}
                  >
                    {pet.ghiChuSucKhoe}
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
                <span className="font-medium">{petsData.length}</span> trong số{" "}
                <span className="font-medium">1,530</span> kết quả
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

export default AdminPets;
