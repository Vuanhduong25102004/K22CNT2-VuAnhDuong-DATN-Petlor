import React from "react";

// --- CẤU HÌNH ĐƯỜNG DẪN ẢNH ---
const IMAGE_BASE_URL = "http://localhost:8080/uploads";

export const getImageUrl = (imageName) => {
  if (!imageName) return null;
  // Nếu ảnh đã là link online (ví dụ Google, Facebook) thì giữ nguyên
  if (imageName.startsWith("http")) return imageName;
  // Ghép tên file với đường dẫn gốc
  return `${IMAGE_BASE_URL}/${imageName}`;
};

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

export const renderStars = (count) => {
  return (
    <div className="flex items-center text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className="material-symbols-outlined text-[18px] fill-current"
        >
          {i < count ? "star" : "star_border"}
        </span>
      ))}
    </div>
  );
};

export const getReviewTargetInfo = (review) => {
  if (review.sanPham) {
    return {
      type: "Sản phẩm",
      name: review.sanPham.tenSanPham,
      image: getImageUrl(review.sanPham.hinhAnh), // Xử lý luôn ảnh sản phẩm
      badgeColor: "bg-blue-100 text-blue-800",
    };
  } else if (review.dichVu) {
    return {
      type: "Dịch vụ",
      name: review.dichVu.tenDichVu,
      image: getImageUrl(review.dichVu.hinhAnh), // Xử lý luôn ảnh dịch vụ
      badgeColor: "bg-purple-100 text-purple-800",
    };
  }
  return {
    type: "Khác",
    name: "Không xác định",
    image: null,
    badgeColor: "bg-gray-100 text-gray-800",
  };
};
