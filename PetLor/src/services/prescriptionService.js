import apiClient from './apiClient';

const prescriptionService = {
  // Lấy danh sách đơn thuốc (có phân trang & tìm kiếm)
  getAllPrescriptions: (params) => {
    return apiClient.get('/don-thuoc', { params });
  },

  // Lấy chi tiết đơn thuốc
  getPrescriptionById: (id) => {
    return apiClient.get(`/don-thuoc/${id}`);
  },
  
  createOrderFromPrescription: (id) => {
    return apiClient.post(`/don-hang/tu-don-thuoc/${id}`);
  }
};

export default prescriptionService;