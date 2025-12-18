import React from "react";
import { formatCurrency } from "../utils";

const OrderStats = ({ orders, totalElements }) => {
  // Tính toán thống kê dựa trên orders hiện tại (trang hiện tại)
  // Lưu ý: Logic này giữ nguyên từ code gốc, chỉ tính trên trang hiện tại.
  const revenue = orders
    .filter(
      (o) =>
        !o.trangThai.toLowerCase().includes("hủy") &&
        !o.trangThai.toLowerCase().includes("cancelled")
    )
    .reduce((sum, o) => sum + o.tongTien, 0);

  const pendingOrders = orders.filter((o) =>
    o.trangThai.toLowerCase().includes("chờ")
  ).length;

  const stats = [
    {
      title: "Tổng đơn hàng",
      value: totalElements,
      icon: "receipt_long",
      color: "text-blue-600",
      bg: "bg-blue-100",
      border: "border-blue-600",
    },
    {
      title: "Doanh thu thực tế",
      value: formatCurrency(revenue),
      icon: "payments",
      color: "text-green-600",
      bg: "bg-green-100",
      border: "border-green-500",
    },
    {
      title: "Đơn chờ xử lý",
      value: pendingOrders,
      icon: "pending_actions",
      color: "text-yellow-600",
      bg: "bg-yellow-100",
      border: "border-yellow-500",
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

export default OrderStats;
