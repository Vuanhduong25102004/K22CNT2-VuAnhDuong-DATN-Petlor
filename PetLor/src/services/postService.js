import apiClient from './apiClient';

/**
 * Service for handling blog posts and post categories.
 */
const postService = {
  // --- Posts ---

  /**
   * Get all posts with optional query parameters.
   * @param {object} params - Optional query parameters (e.g., for pagination, filtering).
   * @returns {Promise<object>}
   */
  getAllPosts: (params) => apiClient.get('/bai-viet', { params }),

  /**
   * Get a single post by its ID.
   * @param {number|string} id - The ID of the post.
   * @returns {Promise<object>}
   */
  getPostById: (id) => apiClient.get(`/bai-viet/${id}`),

  /**
   * Get a single post by its slug.
   * @param {string} slug - The slug of the post.
   * @returns {Promise<object>}
   */
  getPostBySlug: (slug) => apiClient.get(`/bai-viet/slug/${slug}`),

  /**
   * Create a new post.
   * @param {object|FormData} data - The post data. Can be a JSON object or FormData.
   * @returns {Promise<object>}
   */
  createPost: (data) => {
    const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
    return apiClient.post('/bai-viet', data, { headers });
  },

  /**
   * Update an existing post.
   * @param {number|string} id - The ID of the post to update.
   * @param {object|FormData} data - The updated post data.
   * @returns {Promise<object>}
   */
  updatePost: (id, data) => {
    const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
    return apiClient.put(`/bai-viet/${id}`, data, { headers });
  },

  /**
   * Delete a post.
   * @param {number|string} id - The ID of the post to delete.
   * @returns {Promise<void>}
   */
  deletePost: (id) => apiClient.delete(`/bai-viet/${id}`),

  // --- Post Categories ---

  /**
   * Get all post categories.
   * @param {object} params - Optional query parameters.
   * @returns {Promise<object>}
   */
  getAllPostCategories: (params) => apiClient.get('/bai-viet/danh-muc', { params }),

  /**
   * Get a single post category by its ID.
   * @param {number|string} id - The ID of the category.
   * @returns {Promise<object>}
   */
  getPostCategoryById: (id) => apiClient.get(`/bai-viet/danh-muc/${id}`),

  /**
   * Create a new post category.
   * @param {{tenDanhMuc: string}} data - The category data.
   * @returns {Promise<object>}
   */
  createPostCategory: (data) => apiClient.post('/bai-viet/danh-muc', data),

  /**
   * Update an existing post category.
   * @param {number|string} id - The ID of the category to update.
   * @param {{tenDanhMuc: string}} data - The updated category data.
   * @returns {Promise<object>}
   */
  updatePostCategory: (id, data) => apiClient.put(`/bai-viet/danh-muc/${id}`, data),

  /**
   * Delete a post category.
   * @param {number|string} id - The ID of the category to delete.
   * @returns {Promise<void>}
   */
  deletePostCategory: (id) => apiClient.delete(`/bai-viet/danh-muc/${id}`),
};

export default postService;
