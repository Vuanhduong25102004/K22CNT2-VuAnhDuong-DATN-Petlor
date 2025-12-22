import apiClient from './apiClient';

const supplierService = {
  // Lấy danh sách NCC (có phân trang & tìm kiếm)
  getAllSuppliers: (params) => apiClient.get('/nha-cung-cap', { params }),

  getSupplierById: (id) => apiClient.get(`/nha-cung-cap/${id}`),

  createSupplier: (data) => apiClient.post('/nha-cung-cap', data),

  updateSupplier: (id, data) => apiClient.put(`/nha-cung-cap/${id}`, data),

  deleteSupplier: (id) => apiClient.delete(`/nha-cung-cap/${id}`),
};

export default supplierService;