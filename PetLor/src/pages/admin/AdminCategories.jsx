import React from "react";

// Dữ liệu giả lập từ bảng danh_muc_san_pham
const categoriesData = [
  {
    danhMucId: 1,
    tenDanhMuc: "Thức ăn",
    moTa: "Các loại hạt, pate, thức ăn ướt cho chó mèo.",
    soLuongSanPham: 150, // Giả lập count(*) từ bảng sản phẩm
  },
  {
    danhMucId: 2,
    tenDanhMuc: "Đồ chơi",
    moTa: "Bóng, cần câu mèo, xương gặm.",
    soLuongSanPham: 45,
  },
  {
    danhMucId: 3,
    tenDanhMuc: "Phụ kiện",
    moTa: "Vòng cổ, dây dắt, quần áo, bát ăn.",
    soLuongSanPham: 80,
  },
  {
    danhMucId: 4,
    tenDanhMuc: "Chuồng & Nệm",
    moTa: "Chuồng inox, lồng vận chuyển, nệm êm.",
    soLuongSanPham: 20,
  },
  {
    danhMucId: 5,
    tenDanhMuc: "Vệ sinh & Chăm sóc",
    moTa: "Cát vệ sinh, sữa tắm, lược chải lông.",
    soLuongSanPham: 60,
  },
];

const stats = [
  {
    title: "Tổng danh mục",
    value: "5",
    icon: "category",
    color: "text-purple-600",
    bg: "bg-purple-100",
    border: "border-purple-600",
  },
  {
    title: "Danh mục nhiều SP nhất",
    value: "Thức ăn",
    icon: "trending_up",
    color: "text-green-600",
    bg: "bg-green-100",
    border: "border-green-500",
  },
  {
    title: "Đang hoạt động",
    value: "5",
    icon: "check_circle",
    color: "text-blue-600",
    bg: "bg-blue-100",
    border: "border-blue-600",
  },
];

const AdminCategories = () => {
  return (
    <>
      <div className="flex flex-wrap justify-between gap-3">
        <p className="text-gray-900 text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
          Quản lý Danh mục
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
        <div className="flex justify-end">
          <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-green-600 focus:outline-none">
            <span className="material-symbols-outlined text-sm mr-2">add</span>{" "}
            Thêm Danh mục
          </button>
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
                  Tên Danh mục
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mô tả
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số lượng SP
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Hành động</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categoriesData.map((cat, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    #{cat.danhMucId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cat.tenDanhMuc}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-[400px] truncate"
                    title={cat.moTa}
                  >
                    {cat.moTa}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cat.soLuongSanPham}
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
      </div>
    </>
  );
};

export default AdminCategories;
