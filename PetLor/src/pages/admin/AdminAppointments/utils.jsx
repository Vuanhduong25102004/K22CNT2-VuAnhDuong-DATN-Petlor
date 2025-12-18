import React from "react";

export const APPOINTMENT_STATUSES = [
  "CHỜ XÁC NHẬN",
  "ĐÃ XÁC NHẬN",
  "ĐÃ HOÀN THÀNH",
  "ĐÃ HỦY",
];

export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getStatusBadge = (status) => {
  const styles = {
    "CHỜ XÁC NHẬN": "bg-yellow-100 text-yellow-800",
    "ĐÃ XÁC NHẬN": "bg-blue-100 text-blue-800",
    "ĐÃ HOÀN THÀNH": "bg-green-100 text-green-800",
    "ĐÃ HỦY": "bg-red-100 text-red-800",
    "ĐANG THỰC HIỆN": "bg-indigo-100 text-indigo-800",
  };
  const formattedStatus = status ? status.replace(/_/g, " ") : "KHÔNG RÕ";
  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        styles[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {formattedStatus}
    </span>
  );
};
