/**
 * @file src/utils/formatters.js
 * @description Các hàm định dạng dữ liệu (Tiền tệ, Ngày tháng, Badge)
 */

/**
 * 1. Định dạng tiền tệ VNĐ
 * @param {number|string} amount - Số tiền
 * @returns {string} - "50.000 ₫"
 */
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null || amount === "") return "0 ₫";
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(num)) return "0 ₫";

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(num);
};

/**
 * 2. Định dạng ngày giờ đầy đủ
 * @param {string} dateString - "2025-12-21T10:30:00"
 * @returns {string} - "10:30 21/12/2025"
 */
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

/**
 * 3. Chỉ lấy ngày tháng năm
 * @returns {string} - "21/12/2025"
 */
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

/**
 * 4. Định dạng cho input type="datetime-local" (Cần thiết cho Edit Form)
 * @returns {string} - "2025-12-21T10:30"
 */
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

/**
 * 5. Định dạng hiển thị khoảng thời gian lịch hẹn
 * @returns {string} - "21/12/2025 | 10:30 - 11:30"
 */
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

/**
 * 6. Render Badge trạng thái Lịch hẹn
 * @param {string} status - "DA_HOAN_THANH", "CHO_XAC_NHAN"...
 */
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
  const { color } = getOrderStatusConfig(status);

  return (
    <div
      className={`flex items-center gap-2 bg-${color}-50 px-4 py-2 rounded-xl border border-${color}-100`}
    >
      <div
        className={`h-2 w-2 rounded-full bg-${color}-500 ${
          status !== "Đã giao" && status !== "Đã hủy" ? "animate-pulse" : ""
        }`}
      ></div>
      <span
        className={`text-sm font-bold text-${color}-700 uppercase tracking-wide`}
      >
        {status}
      </span>
    </div>
  );
};

export const getOrderStatusConfig = (status) => {
  const configs = {
    "Chờ xử lý": {
      topBarColor: "bg-yellow-400", // Khai báo đầy đủ tên class
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
      borderColor: "border-yellow-100",
      step: 3,
      percent: 0.5,
      label: "Đang xử lý",
      icon: "inventory_2",
    },
    "Đang giao": {
      topBarColor: "bg-blue-400", // Khai báo đầy đủ tên class
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-100",
      step: 4,
      percent: 0.75,
      label: "Vận chuyển",
      icon: "local_shipping",
    },
    "Đã giao": {
      topBarColor: "bg-emerald-400", // Khai báo đầy đủ tên class
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
      borderColor: "border-emerald-100",
      step: 5,
      percent: 1,
      label: "Thành công",
      icon: "home",
    },
    "Đã hủy": {
      topBarColor: "bg-red-400", // Khai báo đầy đủ tên class
      bgColor: "bg-red-50",
      textColor: "text-red-600",
      borderColor: "border-red-100",
      step: 0,
      percent: 0,
      label: "Đã hủy",
      icon: "close",
    },
  };

  return (
    configs[status] || {
      topBarColor: "bg-gray-400",
      bgColor: "bg-gray-50",
      textColor: "text-gray-600",
      borderColor: "border-gray-100",
      step: 1,
      percent: 0.2,
      label: status,
      icon: "help_outline",
    }
  );
};
