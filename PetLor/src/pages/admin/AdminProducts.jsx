import React from "react";

// Helper: Format tiền tệ (VND)
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

// Helper: Xác định trạng thái kho hàng
const getStockStatus = (quantity) => {
  if (quantity === 0)
    return {
      label: "Hết hàng",
      color: "bg-red-100 text-red-800 border-red-200",
    };
  if (quantity < 10)
    return {
      label: "Sắp hết",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };
  return {
    label: "Còn hàng",
    color: "bg-green-100 text-green-800 border-green-200",
  };
};

// Dữ liệu giả lập (Mock Data) mapping từ bảng san_pham
const productsData = [
  {
    sanPhamId: 1001,
    danhMucId: 1, // Giả sử 1 là Thức ăn
    categoryName: "Thức ăn", // Field giả lập để hiển thị
    tenSanPham: "Hạt Royal Canin cho chó con",
    moTaChiTiet:
      "Thức ăn dinh dưỡng dành riêng cho chó con dưới 12 tháng tuổi, hỗ trợ tiêu hóa.",
    gia: 185000,
    soLuongTonKho: 50,
    hinhAnhUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDjClsZTm99bGatBKzSqsmKOA8HM5qeX-wJzr7gqNqhHv7kYOSMvSSq7gj6gVU1sNHeESSY4MsyQoNE5LLSXRyX6VEf7hxoSkTdzo3BL691MDyUYwKk9zCXUxTNdZf86ZzNZLQXbIjA5QuanM4NYwjs2Ndkl_jhF03UD3PzH0cFu_kVSFP-xsNsuK6l_nmjkJ2eICVcf0L8jqS_NF6SMWtS7U5MKAooqgwzYmzwTr15qHi4SxbrqptmJ4dNWbj4SMUUxCyRt60oO_Gz1",
  },
  {
    sanPhamId: 1002,
    danhMucId: 2, // Giả sử 2 là Đồ chơi
    categoryName: "Đồ chơi",
    tenSanPham: "Bóng cao su đàn hồi",
    moTaChiTiet:
      "Bóng đồ chơi siêu bền, giúp thú cưng vận động và giảm stress.",
    gia: 45000,
    soLuongTonKho: 5, // Sắp hết
    hinhAnhUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDjClsZTm99bGatBKzSqsmKOA8HM5qeX-wJzr7gqNqhHv7kYOSMvSSq7gj6gVU1sNHeESSY4MsyQoNE5LLSXRyX6VEf7hxoSkTdzo3BL691MDyUYwKk9zCXUxTNdZf86ZzNZLQXbIjA5QuanM4NYwjs2Ndkl_jhF03UD3PzH0cFu_kVSFP-xsNsuK6l_nmjkJ2eICVcf0L8jqS_NF6SMWtS7U5MKAooqgwzYmzwTr15qHi4SxbrqptmJ4dNWbj4SMUUxCyRt60oO_Gz2",
  },
  {
    sanPhamId: 1003,
    danhMucId: 3, // Giả sử 3 là Phụ kiện
    categoryName: "Phụ kiện",
    tenSanPham: "Vòng cổ gắn chuông",
    moTaChiTiet: "Vòng cổ nhiều màu sắc, có chuông leng keng dễ thương.",
    gia: 25000,
    soLuongTonKho: 0, // Hết hàng
    hinhAnhUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDjClsZTm99bGatBKzSqsmKOA8HM5qeX-wJzr7gqNqhHv7kYOSMvSSq7gj6gVU1sNHeESSY4MsyQoNE5LLSXRyX6VEf7hxoSkTdzo3BL691MDyUYwKk9zCXUxTNdZf86ZzNZLQXbIjA5QuanM4NYwjs2Ndkl_jhF03UD3PzH0cFu_kVSFP-xsNsuK6l_nmjkJ2eICVcf0L8jqS_NF6SMWtS7U5MKAooqgwzYmzwTr15qHi4SxbrqptmJ4dNWbj4SMUUxCyRt60oO_Gz3",
  },
  {
    sanPhamId: 1004,
    danhMucId: 1,
    categoryName: "Thức ăn",
    tenSanPham: "Pate Whiskas vị cá biển",
    moTaChiTiet: "Pate tươi ngon, giàu Omega 3&6 giúp lông mèo bóng mượt.",
    gia: 15000,
    soLuongTonKho: 120,
    hinhAnhUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDjClsZTm99bGatBKzSqsmKOA8HM5qeX-wJzr7gqNqhHv7kYOSMvSSq7gj6gVU1sNHeESSY4MsyQoNE5LLSXRyX6VEf7hxoSkTdzo3BL691MDyUYwKk9zCXUxTNdZf86ZzNZLQXbIjA5QuanM4NYwjs2Ndkl_jhF03UD3PzH0cFu_kVSFP-xsNsuK6l_nmjkJ2eICVcf0L8jqS_NF6SMWtS7U5MKAooqgwzYmzwTr15qHi4SxbrqptmJ4dNWbj4SMUUxCyRt60oO_Gz4",
  },
  {
    sanPhamId: 1005,
    danhMucId: 4, // Chuồng/Nệm
    categoryName: "Chuồng & Nệm",
    tenSanPham: "Nệm tròn êm ái size L",
    moTaChiTiet: "Nệm bông cao cấp, vỏ tháo rời dễ dàng vệ sinh.",
    gia: 350000,
    soLuongTonKho: 15,
    hinhAnhUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDjClsZTm99bGatBKzSqsmKOA8HM5qeX-wJzr7gqNqhHv7kYOSMvSSq7gj6gVU1sNHeESSY4MsyQoNE5LLSXRyX6VEf7hxoSkTdzo3BL691MDyUYwKk9zCXUxTNdZf86ZzNZLQXbIjA5QuanM4NYwjs2Ndkl_jhF03UD3PzH0cFu_kVSFP-xsNsuK6l_nmjkJ2eICVcf0L8jqS_NF6SMWtS7U5MKAooqgwzYmzwTr15qHi4SxbrqptmJ4dNWbj4SMUUxCyRt60oO_Gz5",
  },
];

// Dữ liệu thống kê
const stats = [
  {
    title: "Tổng sản phẩm",
    value: "450",
    icon: "inventory_2",
    color: "text-blue-600",
    bg: "bg-blue-100",
    border: "border-blue-600",
  },
  {
    title: "Sắp hết hàng (<10)",
    value: "12",
    icon: "production_quantity_limits",
    color: "text-orange-600",
    bg: "bg-orange-100",
    border: "border-orange-500",
  },
  {
    title: "Giá trị tồn kho",
    value: "125.000.000 ₫",
    icon: "monetization_on",
    color: "text-green-600",
    bg: "bg-green-100",
    border: "border-green-500",
  },
];

const AdminProducts = () => {
  return (
    <>
      {/* Page Heading */}
      <div className="flex flex-wrap justify-between gap-3">
        <p className="text-gray-900 text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
          Quản lý Sản phẩm
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
                placeholder="Tìm tên sản phẩm, mã SP..."
                type="text"
              />
            </div>
            {/* Select Category */}
            <div className="relative inline-block text-left">
              <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md h-10">
                <option value="">Tất cả danh mục</option>
                <option value="1">Thức ăn</option>
                <option value="2">Đồ chơi</option>
                <option value="3">Phụ kiện</option>
                <option value="4">Chuồng & Nệm</option>
              </select>
            </div>
            {/* Select Stock Status */}
            <div className="relative inline-block text-left">
              <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md h-10">
                <option value="">Tất cả trạng thái kho</option>
                <option value="instock">Còn hàng</option>
                <option value="lowstock">Sắp hết</option>
                <option value="outstock">Hết hàng</option>
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
              Thêm Sản phẩm
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
                  Thông tin Sản phẩm
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Giá bán
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tồn kho
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Mô tả
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Hành động</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productsData.map((product, index) => {
                const stockStatus = getStockStatus(product.soLuongTonKho);
                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* ID */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      #{product.sanPhamId}
                    </td>

                    {/* Sản phẩm (Ảnh + Tên + Danh mục) */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-md object-cover border border-gray-200"
                            src={product.hinhAnhUrl}
                            alt={product.tenSanPham}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.tenSanPham}
                          </div>
                          <div className="text-xs text-gray-500">
                            Danh mục: {product.categoryName}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Giá */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      {formatCurrency(product.gia)}
                    </td>

                    {/* Tồn kho (Có badge màu) */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-900 font-medium">
                          {product.soLuongTonKho}
                        </span>
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full border ${stockStatus.color}`}
                        >
                          {stockStatus.label}
                        </span>
                      </div>
                    </td>

                    {/* Mô tả (Truncate) */}
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-[250px] truncate"
                      title={product.moTaChiTiet}
                    >
                      {product.moTaChiTiet}
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
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Hiển thị <span className="font-medium">1</span> đến{" "}
                <span className="font-medium">{productsData.length}</span> trong
                số <span className="font-medium">450</span> kết quả
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

export default AdminProducts;
