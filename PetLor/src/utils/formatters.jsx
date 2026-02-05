import React from "react";

export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null || amount === "") return "0 ₫";
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(num)) return "0 ₫";

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(num);
};

export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";

  return date.toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatJustDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatDateTimeForInput = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  const pad = (num) => num.toString().padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const formatAppointmentTime = (startTime, endTime) => {
  if (!startTime) return "N/A";
  const startDate = new Date(startTime);
  const datePart = formatJustDate(startTime);
  const startTimePart = startDate.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (!endTime) return `${datePart}, ${startTimePart}`;

  const endDate = new Date(endTime);
  const endTimePart = endDate.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${datePart} | ${startTimePart} - ${endTimePart}`;
};

export const renderStatusBadge = (status) => {
  const statusConfig = {
    DA_HOAN_THANH: {
      text: "Đã hoàn thành",
      class: "bg-green-50 text-green-700 border-green-100",
    },
    CHO_XAC_NHAN: {
      text: "Chờ xác nhận",
      class: "bg-yellow-50 text-yellow-700 border-yellow-100",
    },
    DA_XAC_NHAN: {
      text: "Đã xác nhận",
      class: "bg-blue-50 text-blue-700 border-blue-100",
    },
    DA_HUY: {
      text: "Đã hủy",
      class: "bg-red-50 text-red-700 border-red-100",
    },
  };

  const config = statusConfig[status] || {
    text: status,
    class: "bg-gray-50 text-gray-700 border-gray-100",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-[10px] font-bold border whitespace-nowrap ${config.class}`}
    >
      {config.text.toUpperCase()}
    </span>
  );
};

export const renderOrderStatusBadge = (status) => {
  const { bgColor, textColor, borderColor, label, topBarColor } =
    getOrderStatusConfig(status);

  let dotColor = "bg-gray-500";
  if (topBarColor.includes("bg-orange")) dotColor = "bg-orange-500";
  else if (topBarColor.includes("bg-blue")) dotColor = "bg-blue-500";
  else if (topBarColor.includes("bg-purple")) dotColor = "bg-purple-500";
  else if (topBarColor.includes("bg-green")) dotColor = "bg-green-500";
  else if (topBarColor.includes("bg-red")) dotColor = "bg-red-500";

  return (
    <div
      className={`flex items-center gap-2 ${bgColor} px-4 py-2 rounded-xl border ${borderColor}`}
    >
      <div
        className={`h-2 w-2 rounded-full ${dotColor} ${
          status !== "Đã giao" && status !== "Đã hủy" ? "animate-pulse" : ""
        }`}
      ></div>
      <span
        className={`text-sm font-bold ${textColor} uppercase tracking-wide`}
      >
        {label}
      </span>
    </div>
  );
};

export const getOrderStatusConfig = (status) => {
  const normalizedStatus = status ? status.toLowerCase() : "";

  switch (normalizedStatus) {
    case "chờ xử lý":
    case "cho_xu_ly":
      return {
        icon: "hourglass_empty",
        bgColor: "bg-orange-50",
        textColor: "text-orange-600",
        borderColor: "border-orange-100",
        topBarColor: "bg-orange-500",
        label: "Đang xử lý",
        step: 1,
        percent: 0,
      };

    case "đã xác nhận":
    case "da_xac_nhan":
      return {
        icon: "thumb_up",
        bgColor: "bg-blue-50",
        textColor: "text-blue-600",
        borderColor: "border-blue-100",
        topBarColor: "bg-blue-500",
        label: "Đã xác nhận",
        step: 2,
        percent: 0.25,
      };

    case "đang giao":
    case "dang_giao":
      return {
        icon: "local_shipping",
        bgColor: "bg-purple-50",
        textColor: "text-purple-600",
        borderColor: "border-purple-100",
        topBarColor: "bg-purple-500",
        label: "Vận chuyển",
        step: 4,
        percent: 0.75,
      };

    case "đã giao":
    case "da_giao":
    case "hoàn thành":
    case "da_thanh_toan":
      return {
        icon: "check_circle",
        bgColor: "bg-green-50",
        textColor: "text-green-600",
        borderColor: "border-green-100",
        topBarColor: "bg-green-500",
        label: "Thành công",
        step: 5,
        percent: 1,
      };

    case "đã hủy":
    case "da_huy":
      return {
        icon: "cancel",
        bgColor: "bg-red-50",
        textColor: "text-red-600",
        borderColor: "border-red-100",
        topBarColor: "bg-red-500",
        label: "Đã hủy",
        step: 0,
        percent: 0,
      };

    default:
      return {
        icon: "help_outline",
        bgColor: "bg-gray-50",
        textColor: "text-gray-500",
        borderColor: "border-gray-200",
        topBarColor: "bg-gray-400",
        label: status || "Không rõ",
        step: 0,
        percent: 0,
      };
  }
};

export const getStatusBadge = (status) => {
  switch (status) {
    case "DA_XAC_NHAN":
      return { label: "Đã xác nhận", color: "bg-blue-50 text-blue-700" };
    case "DA_HOAN_THANH":
      return { label: "Hoàn thành", color: "bg-green-50 text-green-700" };
    case "DA_HUY":
      return { label: "Đã hủy", color: "bg-red-50 text-red-700" };
    case "CHO_XAC_NHAN":
    default:
      return { label: "Chờ xác nhận", color: "bg-yellow-50 text-yellow-700" };
  }
};

export const formatTimeForSchedule = (isoString) => {
  if (!isoString) return { time: "--:--", period: "--" };
  const date = new Date(isoString);
  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const parts = timeStr.split(" ");
  if (parts.length >= 2) {
    return { time: parts[0], period: parts[1] };
  }
  return { time: timeStr, period: "" };
};

export const getAppointmentTypeBadge = (type) => {
  const normalizedType = type ? type.toUpperCase() : "";
  switch (normalizedType) {
    case "KHAN_CAP":
    case "KHẨN CẤP":
    case "KHẨN CẤP (CẤP CỨU)":
      return {
        label: "Khẩn cấp",
        color: "bg-red-50 text-red-700 border border-red-200",
      };
    case "THUONG_LE":
    case "THƯỜNG LỆ":
      return {
        label: "Thường lệ",
        color: "bg-blue-50 text-blue-700 border border-blue-200",
      };
    case "TAI_KHAM":
    case "TÁI KHÁM":
      return {
        label: "Tái khám",
        color: "bg-amber-50 text-amber-700 border border-amber-200",
      };
    case "TU_VAN":
    case "TƯ VẤN":
      return {
        label: "Tư vấn",
        color: "bg-purple-50 text-purple-700 border border-purple-200",
      };
    case "TIEM_PHONG":
    case "TIÊM PHÒNG":
      return {
        label: "Tiêm phòng",
        color: "bg-teal-50 text-teal-700 border border-teal-200",
      };
    case "PHAU_THUAT":
    case "PHẪU THUẬT":
      return {
        label: "Phẫu thuật",
        color: "bg-rose-50 text-rose-700 border border-rose-200",
      };
    default:
      return {
        label: type || "Khác",
        color: "bg-gray-50 text-gray-700 border border-gray-200",
      };
  }
};

export const renderAppointmentTypeBadge = (type) => {
  const { label, color } = getAppointmentTypeBadge(type);
  return (
    <span
      className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider whitespace-nowrap ${color}`}
    >
      {label}
    </span>
  );
};

export const renderReceptionistStatusBadge = (status) => {
  const statusConfig = {
    DA_HOAN_THANH: {
      text: "Hoàn thành",
      style: "bg-green-50 text-green-600 border-green-100",
    },
    CHO_XAC_NHAN: {
      text: "Chờ xác nhận",
      style: "bg-blue-50 text-blue-500 border-blue-100",
    },
    DA_XAC_NHAN: {
      text: "Sắp tới",
      style: "bg-orange-50 text-orange-500 border-orange-100",
    },
    DA_HUY: {
      text: "Đã hủy",
      style: "bg-red-50 text-red-500 border-red-100",
    },
  };

  const config = statusConfig[status] || {
    text: status,
    style: "bg-gray-50 text-gray-500 border-gray-100",
  };

  return (
    <span
      className={`px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider border ${config.style}`}
    >
      {config.text}
    </span>
  );
};
