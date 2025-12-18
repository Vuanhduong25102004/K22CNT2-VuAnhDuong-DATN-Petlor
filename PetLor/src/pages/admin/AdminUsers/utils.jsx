import React from "react";

export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const getRoleBadge = (role) => {
  const styles = {
    ADMIN: "bg-purple-100 text-purple-800",
    STAFF: "bg-blue-100 text-blue-800",
    DOCTOR: "bg-cyan-100 text-cyan-800",
    SPA: "bg-pink-100 text-pink-800",
    USER: "bg-green-100 text-green-800",
  };
  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        styles[role] || "bg-gray-100 text-gray-800"
      }`}
    >
      {role}
    </span>
  );
};
