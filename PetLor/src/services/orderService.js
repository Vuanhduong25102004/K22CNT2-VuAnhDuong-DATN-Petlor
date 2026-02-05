import apiClient from './apiClient';

const orderService = {

  getMyOrders: () => apiClient.get('/don-hang/me'),
  
  getMyOrderById: (id) => apiClient.get(`/don-hang/me/${id}`),

  cancelMyOrder: (id, data) => apiClient.put(`/don-hang/me/${id}/cancel`, data),

  getCancelReasons: () => apiClient.get('/don-hang/ly-do-huy'),

  getAllOrders: (params) => apiClient.get('/don-hang', { params }),
  
  getOrderById: (id) => apiClient.get(`/don-hang/${id}`),
  
  updateOrder: (id, data) => apiClient.put(`/don-hang/${id}`, data),
  
  deleteOrder: (id) => apiClient.delete(`/don-hang/${id}`),

  createOrder: (data, isGuest = false) => {
    const url = isGuest ? '/don-hang/guest' : '/don-hang';
    return apiClient.post(url, data);
  },

  getOrderDetail: (id) => apiClient.get(`/chi-tiet-don-hang/${id}`), 

  
  getCartMe: () => apiClient.get('/gio-hang/me'),

  addToCart: (data) => {
    return apiClient.post('/gio-hang/me/add', data);
  },

  updateCartItem: (sanPhamId, soLuong) => {
    return apiClient.put(`/gio-hang/me/update/${sanPhamId}`, { soLuong });
  },

  removeCartItem: (sanPhamId) => {
    return apiClient.delete(`/gio-hang/me/remove/${sanPhamId}`);
  },

  clearCart: () => {
    return apiClient.delete('/gio-hang/me/clear');
  }
};

export default orderService;