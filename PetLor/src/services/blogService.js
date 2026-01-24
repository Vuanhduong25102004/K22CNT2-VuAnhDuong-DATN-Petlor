import apiClient from "./apiClient";

const blogService = {
  // Lấy danh sách (đã có)
  getPublicPosts: () => {
    return apiClient.get("/bai-viet/cong-khai");
  },

  getPostBySlug: (slug) => {
    return apiClient.get(`/bai-viet/slug/${slug}`); 
  },
  
  getRelatedPosts: () => {
    return apiClient.get("/bai-viet/cong-khai"); 
  },

  getAllCategories: () => {
    return apiClient.get("/bai-viet/danh-muc"); 
  },
};

export default blogService;