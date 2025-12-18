export const ORDER_STATUSES = [
  "Chờ xử lý",
  "Đang giao",
  "Hoàn thành",
  "Đã hủy",
];

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export const formatDateTime = (dateString) => {
  if (!dateString) return "---";
  return new Date(dateString).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const getStatusBadge = (status) => {
  const normalizedStatus = status ? status.toLowerCase() : "";

  if (
    normalizedStatus.includes("hoàn thành") ||
    normalizedStatus.includes("completed")
  ) {
    return "bg-green-100 text-green-800 border-green-200";
  }
  if (
    normalizedStatus.includes("đang giao") ||
    normalizedStatus.includes("shipping")
  ) {
    return "bg-blue-100 text-blue-800 border-blue-200";
  }
  if (
    normalizedStatus.includes("đã hủy") ||
    normalizedStatus.includes("cancelled")
  ) {
    return "bg-red-100 text-red-800 border-red-200";
  }
  return "bg-yellow-100 text-yellow-800 border-yellow-200";
};
