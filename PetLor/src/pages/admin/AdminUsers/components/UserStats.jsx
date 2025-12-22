import React from "react";
import useEscapeKey from "../../../../hooks/useEscapeKey";

// Component này chỉ nhận dữ liệu để hiển thị (Dumb Component)
// Logic tính toán đã nằm ở file cha (index.jsx)
const UserStats = ({ totalUsers = 0, totalStaff = 0 }) => {
  // Tính tổng toàn hệ thống = Khách hàng + Nhân viên
  const totalSystem = totalUsers + totalStaff;

  const stats = [
    {
      title: "Tổng người dùng (Hệ thống)",
      value: totalSystem,
      icon: "group",
      color: "text-blue-600",
      bg: "bg-blue-100",
      border: "border-blue-600",
    },
    {
      title: "Tổng khách hàng",
      value: totalUsers,
      icon: "person",
      color: "text-green-600",
      bg: "bg-green-100",
      border: "border-green-500",
    },
    {
      title: "Nhân viên & Chuyên gia",
      value: totalStaff,
      icon: "manage_accounts",
      color: "text-purple-600",
      bg: "bg-purple-100",
      border: "border-purple-500",
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

export default UserStats;
