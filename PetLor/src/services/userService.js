import apiClient from "./apiClient";

const userService = {
  // --- NGƯỜI DÙNG (Giữ nguyên) ---
  getAllUsers: (params) => apiClient.get("/nguoi-dung", { params }),
  getUserById: (id) => apiClient.get(`/nguoi-dung/${id}`),
  getMe: () => apiClient.get("/nguoi-dung/me"),
  createUnifiedUser: (formData) => {
    return apiClient.post("/nguoi-dung/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  updateUser: (id, formData) => {
    return apiClient.put(`/nguoi-dung/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  updateMe: (data) => apiClient.put("/nguoi-dung/me", data, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  deleteUser: (id) => apiClient.delete(`/nguoi-dung/${id}`),

  // --- NHÂN VIÊN (CẬP NHẬT PHẦN NÀY) ---
  getAllStaff: (params) => apiClient.get("/nhan-vien", { params }),
  getStaffById: (id) => apiClient.get(`/nhan-vien/${id}`),

  // 1. Cập nhật Create Staff dùng multipart/form-data
  createStaff: (formData) => {
    return apiClient.post("/nhan-vien", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // 2. Cập nhật Update Staff dùng multipart/form-data
  updateStaff: (id, formData) => {
    return apiClient.put(`/nhan-vien/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  deleteStaff: (id) => apiClient.delete(`/nhan-vien/${id}`),
};

export default userService;