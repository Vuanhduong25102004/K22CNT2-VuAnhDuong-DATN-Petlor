import apiClient from './apiClient';

const bookingService = {
  
  createBookingUser: (data) => {
    return apiClient.post('/lich-hen', data);
  },

  createBookingGuest: (data) => {
    return apiClient.post('/lich-hen/guest', data);
  },

  
  getAllAppointments: (params) => apiClient.get('/lich-hen', { params }),
  
  getAppointmentById: (id) => apiClient.get(`/lich-hen/${id}`),
  
  updateAppointment: (id, data) => apiClient.put(`/lich-hen/${id}`, data),
  
  deleteAppointment: (id) => apiClient.delete(`/lich-hen/${id}`),

  
  getMyAppointments: () => apiClient.get('/lich-hen/me'),
  
  getMyAppointmentById: (id) => apiClient.get(`/lich-hen/me/${id}`),

  cancelMyAppointment: (id, data) => apiClient.put(`/lich-hen/me/${id}/cancel`, data),

  
  getCancelReasons: () => apiClient.get('/lich-hen/ly-do-huy'),

  getDoctorAppointments: () => apiClient.get('/lich-hen/doctor/me'),

  confirmDoctorAppointment: (id) => apiClient.put(`/lich-hen/doctor/${id}/confirm`),
  
  completeDoctorAppointment: (id, data) => {
  return apiClient.put(`/lich-hen/doctor/${id}/complete`, data);
  },

  getTodayAppointments: () => {
    return apiClient.get('/lich-hen/today');
  },

  createReceptionistBooking: (data) => {
    return apiClient.post('/lich-hen/receptionist', data);
  },
  
};

export default bookingService;