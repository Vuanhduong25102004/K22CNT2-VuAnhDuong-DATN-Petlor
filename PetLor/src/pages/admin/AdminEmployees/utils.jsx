export const getPositionBadge = (position) => {
  const pos = position ? position.toLowerCase() : "";

  if (pos.includes("bác sĩ") || pos.includes("doctor"))
    return "bg-green-100 text-green-800 border-green-200";
  if (
    pos.includes("làm đẹp") ||
    pos.includes("groomer") ||
    pos.includes("grooming") ||
    pos.includes("spa") ||
    pos.includes("cắt tỉa") ||
    pos.includes("chăm sóc")
  )
    return "bg-pink-100 text-pink-800 border-pink-200";
  if (pos.includes("huấn luyện") || pos.includes("trainer"))
    return "bg-orange-100 text-orange-800 border-orange-200";
  if (pos.includes("quản lý") || pos.includes("manager"))
    return "bg-purple-100 text-purple-800 border-purple-200";
  if (pos.includes("lễ tân") || pos.includes("receptionist"))
    return "bg-blue-100 text-blue-800 border-blue-200";
  return "bg-gray-100 text-gray-800 border-gray-200";
};
