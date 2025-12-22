import React from "react";
import useEscapeKey from "../../../../hooks/useEscapeKey";
import { Link } from "react-router-dom";

const UpcomingAppointments = ({ appointments }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-900 text-lg font-bold leading-tight tracking-[-0.015em]">
          Lịch hẹn sắp tới
        </h2>
        <Link
          to="/admin/appointments"
          className="text-sm font-medium text-primary hover:underline"
        >
          Xem lịch
        </Link>
      </div>
      <div className="space-y-4">
        {appointments.map((app) => (
          <div
            key={app.id}
            className="flex items-start gap-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="w-12 text-center flex-shrink-0">
              <p className="font-bold text-lg text-gray-900">{app.time}</p>
              <p className="text-xs text-gray-500">{app.period}</p>
            </div>
            <div
              className={`border-l-2 pl-4 ${
                app.type === "primary" ? "border-primary" : "border-yellow-400"
              }`}
            >
              <p className="font-semibold text-sm text-gray-800">{app.title}</p>
              <p className="text-xs text-gray-500">
                Khách hàng: {app.customer}
              </p>
              <p className="text-xs text-gray-500">Nhân viên: {app.staff}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingAppointments;
