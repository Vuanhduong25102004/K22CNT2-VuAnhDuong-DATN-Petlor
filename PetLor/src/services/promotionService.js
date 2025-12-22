import apiClient from './apiClient';

const promotionService = {
  getAllPromotions: (params) => apiClient.get('/khuyen-mai', { params }),

  getPromotionById: (id) => apiClient.get(`/khuyen-mai/${id}`),

  // Check mã giảm giá (Dùng cho trang Checkout của khách hàng)
  validateCoupon: (code, totalAmount) => 
    apiClient.post('/khuyen-mai/validate', { code, totalAmount }),

  createPromotion: (data) => apiClient.post('/khuyen-mai', data),

  updatePromotion: (id, data) => apiClient.put(`/khuyen-mai/${id}`, data),

  deletePromotion: (id) => apiClient.delete(`/khuyen-mai/${id}`),
};

export default promotionService;