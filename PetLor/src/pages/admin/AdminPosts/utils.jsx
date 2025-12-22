// --- 1. Hàm Format Ngày ---
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

// --- 2. Các logic trạng thái bài viết ---
export const POST_STATUS_MAP = {
  CONG_KHAI: "Công khai",
  NHAP: "Bản nháp",
  AN: "Đã ẩn",
};

export const POST_STATUSES = Object.keys(POST_STATUS_MAP);

export const getPostStatusBadge = (status) => {
  const safeStatus = status ? status.trim() : "DEFAULT";

  const statusMap = {
    CONG_KHAI: { text: "Công khai", styles: "bg-green-100 text-green-800" },
    NHAP: { text: "Bản nháp", styles: "bg-gray-100 text-gray-800" },
    AN: { text: "Đã ẩn", styles: "bg-red-100 text-red-800" },
    DEFAULT: { text: "N/A", styles: "bg-gray-100 text-gray-800" },
  };

  const info = statusMap[safeStatus] || statusMap.DEFAULT;

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${info.styles}`}
    >
      {info.text}
    </span>
  );
};

// --- 3. FormData Helper ---
export const createPostFormData = (postData, imageFile) => {
  const formData = new FormData();
  const postDataJson = JSON.stringify(postData);
  formData.append("data", postDataJson);
  if (imageFile) {
    formData.append("anhBia", imageFile);
  }
  return formData;
};

// --- 4. Xử lý Đường dẫn Ảnh (NEW) ---
export const API_BASE_URL = "http://localhost:8080"; // Đổi port nếu backend khác

export const getFullImageUrl = (imagePath) => {
  if (!imagePath) return null;

  // Nếu là ảnh online (http/https) hoặc blob (preview local)
  if (imagePath.startsWith("http") || imagePath.startsWith("blob:")) {
    return imagePath;
  }

  // Xử lý dấu gạch chéo
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;

  // Kiểm tra xem trong DB đã lưu chữ "/uploads" chưa
  if (cleanPath.startsWith("/uploads/")) {
    return `${API_BASE_URL}${cleanPath}`;
  }

  // Nếu chưa có thì thêm vào
  return `${API_BASE_URL}/uploads${cleanPath}`;
};
