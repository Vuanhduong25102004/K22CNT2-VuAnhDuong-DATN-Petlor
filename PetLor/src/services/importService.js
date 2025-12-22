import apiClient from './apiClient';

const importService = {
  // Lấy danh sách phiếu nhập
  getAllImports: (params) => apiClient.get('/phieu-nhap', { params }),

  getImportById: (id) => apiClient.get(`/phieu-nhap/${id}`),

  // Tạo phiếu nhập mới (Payload chứa cả thông tin NCC và List sản phẩm)
  createImport: (data) => apiClient.post('/phieu-nhap', data),

  // Thường phiếu nhập ít khi cho sửa/xóa để đảm bảo toàn vẹn dữ liệu kho,
  // nhưng nếu backend có hỗ trợ thì thêm vào:
  deleteImport: (id) => apiClient.delete(`/phieu-nhap/${id}`),
};

export default importService;