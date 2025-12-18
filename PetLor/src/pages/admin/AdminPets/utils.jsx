export const calculateAge = (dateString) => {
  if (!dateString) return "Chưa rõ";
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age > 0 ? `${age} tuổi` : "Dưới 1 tuổi";
};

export const formatDate = (dateString) => {
  if (!dateString) return "---";
  return new Date(dateString).toLocaleDateString("vi-VN");
};

export const getImageUrl = (imagePath, fallbackText = "Pet") => {
  if (!imagePath) return `https://placehold.co/100x100?text=${fallbackText}`;
  if (imagePath.startsWith("http")) return imagePath;
  return `http://localhost:8080/uploads/${imagePath}`;
};
