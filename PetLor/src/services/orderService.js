import apiClient from './apiClient';

const orderService = {
  // --- ĐƠN HÀNG ---
  getAllOrders: () => apiClient.get('/don-hang'),
  
  getOrderById: (id) => apiClient.get(`/don-hang/${id}`),
  
  createOrder: (data) => apiClient.post('/don-hang', data),
  
  updateOrder: (id, data) => apiClient.put(`/don-hang/${id}`, data), // Thường dùng để cập nhật trạng thái đơn
  
  deleteOrder: (id) => apiClient.delete(`/don-hang/${id}`),

  // --- CHI TIẾT ĐƠN HÀNG ---
  // API lấy chi tiết theo ID hóa đơn (tùy backend bạn viết, giả sử getById của order đã bao gồm chi tiết)
  getOrderDetail: (id) => apiClient.get(`/chi-tiet-don-hang/${id}`), 

  // --- GIỎ HÀNG ---
  getCartByUser: (userId) => apiClient.get(`/gio-hang/user/${userId}`),
  
  addToCart: (data) => apiClient.post('/gio-hang', data),
  
  updateCartItem: (uid, pid, data) => apiClient.put(`/gio-hang/update/${uid}/${pid}`, data),
  
  removeFromCart: (uid, pid) => apiClient.delete(`/gio-hang/remove/${uid}/${pid}`),
};

export default orderService;