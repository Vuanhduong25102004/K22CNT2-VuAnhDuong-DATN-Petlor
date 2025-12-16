import apiClient from './apiClient';

const userService = {
  // --- NGƯỜI DÙNG (KHÁCH HÀNG) ---
  getAllUsers: () => apiClient.get('/nguoi-dung'),
  
  getUserById: (id) => apiClient.get(`/nguoi-dung/${id}`),
  
  createUser: (data) => apiClient.post('/nguoi-dung', data),

  createUnifiedUser: (data) => {
    const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
    return apiClient.post('/nguoi-dung/create-unified', data, { headers });
  },
  
  updateUser: (id, data) => {
    const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
    return apiClient.put(`/nguoi-dung/${id}`, data, { headers });
  },
  
  deleteUser: (id) => apiClient.delete(`/nguoi-dung/${id}`),

  // --- NHÂN VIÊN (ADMIN/STAFF) ---
  getAllStaff: () => apiClient.get('/nhan-vien'),

  getStaffById: (id) => apiClient.get(`/nhan-vien/${id}`),

  createStaff: (data) => apiClient.post('/nhan-vien', data),

  updateStaff: (id, data) => {
    const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
    return apiClient.put(`/nhan-vien/${id}`, data, { headers });
  },

  deleteStaff: (id) => apiClient.delete(`/nhan-vien/${id}`),
};

export default userService;