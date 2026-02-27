import apiClient from "./apiClient";

const adminService = {
  getDashboardData: () => apiClient.get("/admin/dashboard"),
};

export default adminService;