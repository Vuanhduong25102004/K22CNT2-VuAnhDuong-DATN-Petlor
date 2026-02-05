import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const StaffRoute = () => {
  const token = localStorage.getItem("accessToken");
  const ALLOWED_ROLES = ["DOCTOR", "RECEPTIONIST", "SPA", "ADMIN"];

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = jwtDecode(token);

    const currentTime = Date.now() / 1000;
    if (user.exp && user.exp < currentTime) {
      localStorage.removeItem("accessToken");
      return <Navigate to="/login" replace />;
    }

    if (ALLOWED_ROLES.includes(user.role)) {
      return <Outlet />;
    } else {
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    localStorage.removeItem("accessToken");
    return <Navigate to="/login" replace />;
  }
};

export default StaffRoute;
