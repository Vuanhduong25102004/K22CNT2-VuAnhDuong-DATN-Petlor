import apiClient from './apiClient';

const petService = {
  // --- THÚ CƯNG ---
  getAllPets: () => apiClient.get('/thu-cung'),
  
  getPetById: (id) => apiClient.get(`/thu-cung/${id}`),
  
  createPet: (data) => {
    const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
    return apiClient.post('/thu-cung', data, { headers });
  },
  
  updatePet: (id, data) => {
    const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
    return apiClient.put(`/thu-cung/${id}`, data, { headers });
  },
  
  deletePet: (id) => apiClient.delete(`/thu-cung/${id}`),

  // --- DỊCH VỤ (SPA, KHÁM...) ---
  getAllServices: () => apiClient.get('/dich-vu'),
  
  getServiceById: (id) => apiClient.get(`/dich-vu/${id}`),
  
  createService: (data) => {
    const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
    return apiClient.post('/dich-vu', data, { headers });
  },
  
  updateService: (id, data) => {
    const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
    return apiClient.put(`/dich-vu/${id}`, data, { headers });
  },
  
  deleteService: (id) => apiClient.delete(`/dich-vu/${id}`),

  // --- LỊCH HẸN ---
  getAllAppointments: () => apiClient.get('/lich-hen'),
  
  getAppointmentById: (id) => apiClient.get(`/lich-hen/${id}`),
  
  createAppointment: (data) => apiClient.post('/lich-hen', data),
  
  updateAppointment: (id, data) => apiClient.put(`/lich-hen/${id}`, data),
  
  deleteAppointment: (id) => apiClient.delete(`/lich-hen/${id}`),
};

export default petService;
