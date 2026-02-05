import apiClient from "./apiClient";


const getEndpointByType = (type) => {
  switch (type) {
    case "SERVICE":
      return "/danh-muc-dich-vu"; 
      
    case "POST":
      return "/bai-viet/danh-muc";
      
    case "PRODUCT":
    default:
      return "/danh-muc-san-pham"; 
  }
};

const categoryService = {

  getAll: (params) => {
    const { type, ...otherParams } = params || {};
    const endpoint = getEndpointByType(type);
    return apiClient.get(endpoint, { params: otherParams });
  },


  getById: (id, type) => {
    const endpoint = getEndpointByType(type);
    return apiClient.get(`${endpoint}/${id}`);
  },


  create: (data) => {
    const endpoint = getEndpointByType(data.type);
    return apiClient.post(endpoint, data);
  },


  update: (id, data) => {
    const endpoint = getEndpointByType(data.type);
    return apiClient.put(`${endpoint}/${id}`, data);
  },


  delete: (id, type) => {
    const endpoint = getEndpointByType(type);
    return apiClient.delete(`${endpoint}/${id}`);
  },
};

export default categoryService;