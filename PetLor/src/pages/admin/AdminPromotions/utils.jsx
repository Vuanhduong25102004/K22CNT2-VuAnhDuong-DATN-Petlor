import React from "react";

// Format tiền tệ VND
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

// Format ngày tháng
export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Hiển thị Badge trạng thái (Dựa trên field boolean: trangThai & ngày hết hạn)
export const getStatusBadge = (isActive, endDate) => {
  const now = new Date();
  const end = new Date(endDate);
  const isExpired = end < now;

  if (!isActive) {
    return (
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
        Đang ẩn
      </span>
    );
  }

  if (isExpired) {
    return (
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
        Hết hạn
      </span>
    );
  }

  return (
    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
      Đang hoạt động
    </span>
  );
};

// Hiển thị loại giảm giá (Icon hoặc Text)
export const getDiscountTypeLabel = (type) => {
  if (type === "PHAN_TRAM") return "Phần trăm (%)";
  if (type === "SO_TIEN") return "Số tiền (VND)";
  return type;
};
