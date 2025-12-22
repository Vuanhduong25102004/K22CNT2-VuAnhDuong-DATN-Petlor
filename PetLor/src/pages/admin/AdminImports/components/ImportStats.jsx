import React from "react";
import useEscapeKey from "../../../../hooks/useEscapeKey";
import { formatCurrency } from "../../../../utils/formatters";

const ImportStats = ({ imports }) => {
  // Logic tính toán
  const totalImports = imports.length;
  const totalAmount = imports.reduce(
    (sum, item) => sum + (item.tongTien || 0),
    0
  );

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthAmount = imports.reduce((sum, item) => {
    const d = new Date(item.ngayNhap);
    if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
      return sum + (item.tongTien || 0);
    }
    return sum;
  }, 0);

  const stats = [
    {
      title: "Tổng Phiếu Nhập",
      value: totalImports,
      icon: "receipt_long",
      color: "text-blue-600",
      bg: "bg-blue-100",
      border: "border-blue-500",
    },
    {
      title: "Chi Phí (Tháng này)",
      value: formatCurrency(thisMonthAmount),
      icon: "calendar_today",
      color: "text-amber-600",
      bg: "bg-amber-100",
      border: "border-amber-500",
    },
    {
      title: "Tổng Chi Phí",
      value: formatCurrency(totalAmount),
      icon: "account_balance_wallet",
      color: "text-green-600",
      bg: "bg-green-100",
      border: "border-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200 border-l-4 ${stat.border} `}
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
                    <div className="text-lg font-bold text-gray-900 mt-1">
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

export default ImportStats;
