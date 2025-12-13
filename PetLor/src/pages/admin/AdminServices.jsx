import React from "react";

// Helper: Format tiền tệ
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

// Dữ liệu giả lập từ bảng dich_vu
const servicesData = [
  {
    dichVuId: 1,
    tenDichVu: "Cắt tỉa lông (Grooming)",
    moTa: "Cắt tỉa, chải lông, tạo kiểu cho thú cưng.",
    giaDichVu: 350000,
    thoiLuong: 60, // phút
  },
  {
    dichVuId: 2,
    tenDichVu: "Tắm & Vệ sinh",
    moTa: "Tắm gội, vệ sinh tai, cắt móng.",
    giaDichVu: 150000,
    thoiLuong: 45,
  },
  {
    dichVuId: 3,
    tenDichVu: "Khám sức khỏe tổng quát",
    moTa: "Kiểm tra tim mạch, hô hấp, cân nặng, nhiệt độ.",
    giaDichVu: 200000,
    thoiLuong: 30,
  },
  {
    dichVuId: 4,
    tenDichVu: "Tiêm phòng dại",
    moTa: "Tiêm vắc-xin phòng bệnh dại định kỳ.",
    giaDichVu: 120000,
    thoiLuong: 15,
  },
  {
    dichVuId: 5,
    tenDichVu: "Khách sạn thú cưng (1 ngày)",
    moTa: "Trông giữ thú cưng 24h, bao gồm ăn uống.",
    giaDichVu: 500000,
    thoiLuong: 1440, // 24 giờ
  },
];

const stats = [
  {
    title: "Tổng dịch vụ",
    value: "12",
    icon: "medical_services",
    color: "text-blue-600",
    bg: "bg-blue-100",
    border: "border-blue-600",
  },
  {
    title: "Dịch vụ phổ biến nhất",
    value: "Grooming",
    icon: "star",
    color: "text-yellow-600",
    bg: "bg-yellow-100",
    border: "border-yellow-500",
  },
  {
    title: "Doanh thu dịch vụ (Tháng)",
    value: "45.000.000 ₫",
    icon: "payments",
    color: "text-green-600",
    bg: "bg-green-100",
    border: "border-green-500",
  },
];

const AdminServices = () => {
  return (
    <>
      <div className="flex flex-wrap justify-between gap-3">
        <p className="text-gray-900 text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
          Quản lý Dịch vụ
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
                placeholder="Tìm dịch vụ..."
                type="text"
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-green-600 focus:outline-none"
              type="button"
            >
              <span className="material-symbols-outlined text-sm mr-2">
                add
              </span>{" "}
              Thêm Dịch vụ
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
                  Tên Dịch Vụ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mô tả
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thời lượng (Phút)
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Hành động</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {servicesData.map((service, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    #{service.dichVuId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {service.tenDichVu}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-[300px] truncate"
                    title={service.moTa}
                  >
                    {service.moTa}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    {formatCurrency(service.giaDichVu)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.thoiLuong} phút
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

export default AdminServices;
