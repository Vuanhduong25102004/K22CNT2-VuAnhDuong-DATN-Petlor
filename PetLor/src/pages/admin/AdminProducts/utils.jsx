export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export const getStockStatus = (quantity) => {
  if (quantity <= 0)
    return {
      label: "Hết hàng",
      color: "bg-red-100 text-red-800 border-red-200",
    };
  if (quantity < 10)
    return {
      label: "Sắp hết",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };
  return {
    label: "Còn hàng",
    color: "bg-green-100 text-green-800 border-green-200",
  };
};

export const getImageUrl = (imagePath, fallbackText = "Product") => {
  if (!imagePath) return `https://placehold.co/100x100?text=${fallbackText}`;
  if (imagePath.startsWith("http")) return imagePath;
  return `http://localhost:8080/uploads/${imagePath}`;
};
