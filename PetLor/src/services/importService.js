import apiClient from './apiClient';

const importService = {
  getAllImports: (params) => apiClient.get('/phieu-nhap', { params }),

  getImportById: (id) => apiClient.get(`/phieu-nhap/${id}`),

  createImport: (data) => apiClient.post('/phieu-nhap', data),


  deleteImport: (id) => apiClient.delete(`/phieu-nhap/${id}`),
};

export default importService;