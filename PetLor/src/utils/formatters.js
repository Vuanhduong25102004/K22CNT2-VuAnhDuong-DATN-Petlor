/**
 * @file src/utils/formatters.js
 * @description Các hàm định dạng dữ liệu (Tiền tệ, Ngày tháng)
 */

/**
 * 1. Định dạng tiền tệ VNĐ
 * @param {number|string} amount - Số tiền (VD: 50000 hoặc "50000")
 * @returns {string} - Chuỗi định dạng (VD: "50.000 đ")
 */
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null || amount === "") return "0 đ";
  
  // Chuyển về number nếu đầu vào là string
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  
  if (isNaN(num)) return "0 đ";

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(num);
};

/**
 * 2. Định dạng ngày giờ đầy đủ
 * @param {string} dateString - Chuỗi ISO date (VD: "2025-12-21T10:30:00")
 * @returns {string} - (VD: "10:30 21/12/2025")
 */
export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  
  // Kiểm tra ngày hợp lệ
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
 * 3. Chỉ lấy ngày tháng năm (không lấy giờ)
 * @param {string} dateString 
 * @returns {string} - (VD: "21/12/2025")
 */
export const formatJustDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) return "";

  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
};

/**
 * 4. Định dạng thời gian cho input type="datetime-local"
 * (Dùng khi Edit form để hiển thị đúng giá trị cũ)
 * @param {string} dateString 
 * @returns {string} - (VD: "2025-12-21T10:30")
 */
export const formatDateTimeForInput = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) return "";

  // Tạo chuỗi YYYY-MM-DDThh:mm thủ công để tránh lệch múi giờ
  const pad = (num) => num.toString().padStart(2, '0');
  
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

/**
 * 5. Định dạng hiển thị khoảng thời gian (VD: Lịch hẹn)
 * @param {string} startTime 
 * @param {string} endTime 
 * @returns {string}
 */
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

  return `${datePart} | ${startTimePart} - ${endTimePart}`;
};