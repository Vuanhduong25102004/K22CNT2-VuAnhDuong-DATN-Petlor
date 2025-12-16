import apiClient from './apiClient';

const productService = {
  // --- SẢN PHẨM ---
  getAllProducts: () => apiClient.get('/san-pham'),
  
  getProductById: (id) => apiClient.get(`/san-pham/${id}`),
  
  createProduct: (data) => {
    const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
    return apiClient.post('/san-pham', data, { headers });
  },
  
  updateProduct: (id, data) => {
    const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
    return apiClient.put(`/san-pham/${id}`, data, { headers });
  },
  
  deleteProduct: (id) => apiClient.delete(`/san-pham/${id}`),

  // --- DANH MỤC ---
  getAllCategories: () => apiClient.get('/danh-muc-san-pham'),

  getCategoryById: (id) => apiClient.get(`/danh-muc-san-pham/${id}`),

  createCategory: (data) => apiClient.post('/danh-muc-san-pham', data),

  updateCategory: (id, data) => apiClient.put(`/danh-muc-san-pham/${id}`, data),

  deleteCategory: (id) => apiClient.delete(`/danh-muc-san-pham/${id}`),
};

export default productService;