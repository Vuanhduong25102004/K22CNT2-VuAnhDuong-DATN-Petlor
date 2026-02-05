import apiClient from './apiClient';

const prescriptionService = {

  getAllPrescriptions: (params) => {
    return apiClient.get('/don-thuoc', { params });
  },

  getPrescriptionById: (id) => {
    return apiClient.get(`/don-thuoc/${id}`);
  },
  
  createOrderFromPrescription: (id) => {
    return apiClient.post(`/don-hang/tu-don-thuoc/${id}`);
  }
};

export default prescriptionService;