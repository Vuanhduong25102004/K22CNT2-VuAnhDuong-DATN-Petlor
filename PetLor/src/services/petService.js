import apiClient from './apiClient';

const petService = {
  // --- THÚ CƯNG ---
  getAllPets: () => apiClient.get('/thu-cung'),
  
  getPetById: (id) => apiClient.get(`/thu-cung/${id}`),
  
  createPet: (data) => apiClient.post('/thu-cung', data),
  
  updatePet: (id, data) => apiClient.put(`/thu-cung/${id}`, data),
  
  deletePet: (id) => apiClient.delete(`/thu-cung/${id}`),

  // --- DỊCH VỤ (SPA, KHÁM...) ---
  getAllServices: () => apiClient.get('/dich-vu'),
  
  getServiceById: (id) => apiClient.get(`/dich-vu/${id}`),
  
  createService: (data) => apiClient.post('/dich-vu', data),
  
  updateService: (id, data) => apiClient.put(`/dich-vu/${id}`, data),
  
  deleteService: (id) => apiClient.delete(`/dich-vu/${id}`),

  // --- LỊCH HẸN ---
  getAllAppointments: () => apiClient.get('/lich-hen'),
  
  getAppointmentById: (id) => apiClient.get(`/lich-hen/${id}`),
  
  createAppointment: (data) => apiClient.post('/lich-hen', data),
  
  updateAppointment: (id, data) => apiClient.put(`/lich-hen/${id}`, data),
  
  deleteAppointment: (id) => apiClient.delete(`/lich-hen/${id}`),
};

export default petService;
