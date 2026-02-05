import apiClient from './apiClient';

const supplierService = {
  getAllSuppliers: (params) => apiClient.get('/nha-cung-cap', { params }),

  getSupplierById: (id) => apiClient.get(`/nha-cung-cap/${id}`),

  createSupplier: (data) => apiClient.post('/nha-cung-cap', data),

  updateSupplier: (id, data) => apiClient.put(`/nha-cung-cap/${id}`, data),

  deleteSupplier: (id) => apiClient.delete(`/nha-cung-cap/${id}`),
};

export default supplierService;