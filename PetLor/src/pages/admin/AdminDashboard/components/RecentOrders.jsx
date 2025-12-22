import React from "react";
import useEscapeKey from "../../../../hooks/useEscapeKey";
import { Link } from "react-router-dom";

const RecentOrders = ({ orders }) => {
  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-900 text-lg font-bold leading-tight tracking-[-0.015em]">
          Đơn hàng gần đây
        </h2>
        <Link
          to="/admin/orders"
          className="text-sm font-medium text-primary hover:underline"
        >
          Xem tất cả
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3 font-semibold">ID Đơn</th>
              <th className="px-6 py-3 font-semibold">Khách hàng</th>
              <th className="px-6 py-3 font-semibold">Ngày</th>
              <th className="px-6 py-3 font-semibold">Tổng tiền</th>
              <th className="px-6 py-3 font-semibold">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4 font-medium">{order.total}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${order.statusColor}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
