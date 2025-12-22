import React from "react";
import useEscapeKey from "../../../hooks/useEscapeKey";

export const API_STATUS_MAP = {
  CHO_XAC_NHAN: "Chờ xác nhận",
  DA_XAC_NHAN: "Đã xác nhận",
  DA_HOAN_THANH: "Hoàn thành",
  DA_HUY: "Đã hủy",
};

export const APPOINTMENT_STATUSES = Object.keys(API_STATUS_MAP);

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
  // 1. Xử lý an toàn: Nếu status null/undefined -> Default
  // 2. Trim: Xóa khoảng trắng thừa nếu có ("DA_HOAN_THANH " -> "DA_HOAN_THANH")
  const safeStatus = status ? status.trim() : "DEFAULT";

  const statusMap = {
    CHO_XAC_NHAN: {
      text: "Chờ xác nhận",
      styles: "bg-amber-100 text-amber-800",
    },
    DA_XAC_NHAN: {
      text: "Đã xác nhận",
      styles: "bg-cyan-100 text-cyan-800",
    },
    DA_HOAN_THANH: {
      text: "Hoàn thành",
      styles: "bg-green-100 text-green-800",
    },
    DA_HUY: {
      text: "Đã hủy",
      styles: "bg-rose-100 text-rose-800",
    },
    DEFAULT: {
      text: "Không rõ", // Hoặc hiển thị chính mã status để debug: text: status || "N/A"
      styles: "bg-gray-100 text-gray-800",
    },
  };

  const statusInfo = statusMap[safeStatus] || statusMap.DEFAULT;

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusInfo.styles}`}
    >
      {statusInfo.text}
    </span>
  );
};

export const formatAppointmentTime = (startTime, endTime) => {
  if (!startTime) return "N/A";

  const startDate = new Date(startTime);
  const datePart = startDate.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const startTimePart = startDate.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (!endTime) {
    return `${datePart}, ${startTimePart}`;
  }

  const endDate = new Date(endTime);
  const endTimePart = endDate.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${datePart}, ${startTimePart} - ${endTimePart}`;
};
