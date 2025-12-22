import React from "react";

// Format ngày tháng
export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Tính toán trạng thái dựa trên ngày tái chủng
export const getVaccinationStatus = (reVaccinationDate) => {
  if (!reVaccinationDate)
    return { label: "Không xác định", style: "bg-gray-100 text-gray-600" };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const reDate = new Date(reVaccinationDate);
  reDate.setHours(0, 0, 0, 0);

  // Tính khoảng cách ngày
  const diffTime = reDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      label: `Quá hạn ${Math.abs(diffDays)} ngày`,
      style: "bg-red-100 text-red-700 border border-red-200",
    };
  } else if (diffDays <= 7) {
    return {
      label: `Sắp đến hạn (${diffDays} ngày)`,
      style: "bg-amber-100 text-amber-700 border border-amber-200",
    };
  } else {
    return {
      label: "Chưa đến hạn",
      style: "bg-green-100 text-green-700 border border-green-200",
    };
  }
};

export const renderStatusBadge = (reVaccinationDate) => {
  const status = getVaccinationStatus(reVaccinationDate);
  return (
    <span
      className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${status.style}`}
    >
      {status.label}
    </span>
  );
};
