import apiClient from './apiClient';

const orderService = {
  // --- ĐƠN HÀNG ---
  // SỬA: Thêm params để có thể truyền { page: 0, size: 1000 }
  getAllOrders: (params) => apiClient.get('/don-hang', { params }),
  
  getOrderById: (id) => apiClient.get(`/don-hang/${id}`),
  
  createOrder: (data) => apiClient.post('/don-hang', data),
  
  updateOrder: (id, data) => apiClient.put(`/don-hang/${id}`, data),
  
  deleteOrder: (id) => apiClient.delete(`/don-hang/${id}`),

  // --- CHI TIẾT ĐƠN HÀNG ---
  getOrderDetail: (id) => apiClient.get(`/chi-tiet-don-hang/${id}`), 

  // --- GIỎ HÀNG ---
  getCartByUser: (userId) => apiClient.get(`/gio-hang/user/${userId}`),
  
  addToCart: (data) => apiClient.post('/gio-hang', data),
  
  updateCartItem: (uid, pid, data) => apiClient.put(`/gio-hang/update/${uid}/${pid}`, data),
  
  removeFromCart: (uid, pid) => apiClient.delete(`/gio-hang/remove/${uid}/${pid}`),
};

export default orderService;