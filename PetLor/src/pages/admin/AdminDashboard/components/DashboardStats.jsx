import React from "react";
import useEscapeKey from "../../../../hooks/useEscapeKey";

const DashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-white border border-gray-200 shadow-sm"
        >
          <p className="text-gray-700 text-base font-medium leading-normal">
            {stat.title}
          </p>
          <p className="text-gray-900 tracking-light text-2xl font-bold leading-tight">
            {stat.value}
          </p>
          <p
            className={`text-sm font-medium leading-normal ${
              stat.isPositive ? "text-green-600" : "text-gray-500"
            }`}
          >
            {stat.change}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
