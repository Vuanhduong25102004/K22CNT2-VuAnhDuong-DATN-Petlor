import apiClient from './apiClient';

const vaccinationService = {
  // --- SỔ TIÊM CHỦNG ---
  getAllVaccinationRecords: (params) => apiClient.get('/so-tiem-chung', { params }),
  
  getVaccinationRecordById: (id) => apiClient.get(`/so-tiem-chung/${id}`),
  
  createVaccinationRecord: (data) => apiClient.post('/so-tiem-chung', data),
  
  updateVaccinationRecord: (id, data) => apiClient.put(`/so-tiem-chung/${id}`, data),
  
  deleteVaccinationRecord: (id) => apiClient.delete(`/so-tiem-chung/${id}`),

  // --- LỊCH SỬ TIÊM PHÒNG CỦA THÚ CƯNG ---
  getVaccinationHistoryForPet: (petId, params) => apiClient.get(`/so-tiem-chung/thu-cung/${petId}`, { params }),

  addVaccinationToRecord: (recordId, vaccinationData) => apiClient.post(`/so-tiem-chung/${recordId}/tiem-phong`, vaccinationData),

  updateVaccinationInRecord: (recordId, vaccinationId, vaccinationData) => apiClient.put(`/so-tiem-chung/${recordId}/tiem-phong/${vaccinationId}`, vaccinationData),

  deleteVaccinationFromRecord: (recordId, vaccinationId) => apiClient.delete(`/so-tiem-chung/${recordId}/tiem-phong/${vaccinationId}`),
};

export default vaccinationService;
