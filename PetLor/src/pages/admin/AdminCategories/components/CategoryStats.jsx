import React from "react";

const CategoryStats = ({ categories }) => {
  // Tính toán dữ liệu thống kê
  const maxProductCat =
    categories.length > 0
      ? categories.reduce((prev, current) =>
          prev.soLuongSanPham > current.soLuongSanPham ? prev : current
        )
      : { tenDanhMuc: "N/A", soLuongSanPham: 0 };

  const stats = [
    {
      title: "Tổng danh mục",
      value: categories.length,
      icon: "category",
      color: "text-purple-600",
      bg: "bg-purple-100",
      border: "border-purple-600",
    },
    {
      title: "Nhiều SP nhất",
      value: `${maxProductCat.tenDanhMuc} (${maxProductCat.soLuongSanPham})`,
      icon: "trending_up",
      color: "text-green-600",
      bg: "bg-green-100",
      border: "border-green-500",
    },
    {
      title: "Đang hoạt động",
      value: categories.length,
      icon: "check_circle",
      color: "text-blue-600",
      bg: "bg-blue-100",
      border: "border-blue-600",
    },
  ];

  return (
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
  );
};

export default CategoryStats;
