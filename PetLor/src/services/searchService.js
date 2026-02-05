import apiClient from "./apiClient";

const searchService = {

  searchProducts: (keyword, categoryId) => {
    return apiClient.get("/san-pham", { 
      params: { keyword, categoryId } 
    });
  },

  searchServices: (keyword, categoryId) => {
    return apiClient.get("/dich-vu", { 
      params: { keyword, categoryId } 
    });
  },

  searchProductCategories: (keyword) => {
    return apiClient.get("/danh-muc-san-pham", { params: { keyword } });
  },
  
  searchServiceCategories: (keyword) => {
    return apiClient.get("/danh-muc-dich-vu", { params: { keyword } });
  },

    searchPosts: (keyword, categoryId) => {
    return apiClient.get("/bai-viet", { 
      params: { 
        keyword: keyword, 
        categoryId: categoryId 
      } 
    });
  },

  searchPostCategories: (keyword) => {
    return apiClient.get("/bai-viet/danh-muc", { params: { keyword } });
  },

  searchUsers: (keyword) => {
    return apiClient.get("/nguoi-dung", { params: { keyword } });
  },
  searchStaff: (keyword) => {
    return apiClient.get("/nhan-vien", { params: { keyword } });
  },
  searchOrders: (keyword) => {
    return apiClient.get("/don-hang", { params: { keyword } });
  },
  searchAppointments: (keyword) => {
    return apiClient.get("/lich-hen", { params: { keyword } });
  },
  searchVaccinationRecords: (keyword) => {
    return apiClient.get("/so-tiem-chung", { params: { keyword } });
  },
  searchPets: (keyword) => {
    return apiClient.get("/thu-cung", { params: { keyword } });
  },
  searchSuppliers: (keyword) => {
    return apiClient.get("/nha-cung-cap", { params: { keyword } });
  },
  searchImportNotes: (keyword) => {
    return apiClient.get("/phieu-nhap", { params: { keyword } });
  },
  searchPromotions: (keyword) => {
    return apiClient.get("/khuyen-mai", { params: { keyword } });
  },
};

export default searchService;