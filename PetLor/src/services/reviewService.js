import apiClient from './apiClient';

/**
 * Service for handling product and service reviews.
 * API endpoints updated based on the new specification.
 */
const reviewService = {
  /**
   * --- For Customers ---
   */

  /**
   * Get all visible reviews for a specific product.
   * @param {number} productId - The ID of the product.
   * @param {object} params - Optional query parameters (e.g., for pagination, sorting).
   * @returns {Promise<object>}
   */
  getReviewsForProduct: (productId, params) => 
    apiClient.get(`/danh-gia/san-pham/${productId}`, { params }),

  /**
   * Get all visible reviews for a specific service.
   * @param {number} serviceId - The ID of the service.
   * @param {object} params - Optional query parameters.
   * @returns {Promise<object>}
   */
  getReviewsForService: (serviceId, params) => 
    apiClient.get(`/danh-gia/dich-vu/${serviceId}`, { params }),

  /**
   * Create a new review for a product or a service.
   * @param {object} reviewData - The review data. 
   *   - For product: { userId, sanPhamId, soSao, noiDung, hinhAnh }
   *   - For service: { userId, dichVuId, soSao, noiDung, hinhAnh }
   * @returns {Promise<object>}
   */
  createReview: (reviewData) => apiClient.post('/danh-gia', reviewData),

  /**
   * --- For Admin ---
   */

  /**
   * Get all reviews for the admin panel with filtering and pagination.
   * @param {object} params - Query parameters (page, size, status, etc.).
   * @returns {Promise<object>}
   */
  getAllReviewsForAdmin: (params) => apiClient.get('/danh-gia/admin', { params }),

  /**
   * Update the status (e.g., hide/show) of a review.
   * @param {number} reviewId - The ID of the review.
   * @param {{trangThai: boolean}} body - The request body containing the new status.
   * @returns {Promise<object>}
   */
  updateReviewStatus: (reviewId, body) => 
    apiClient.put(`/danh-gia/admin/${reviewId}/trang-thai`, body),

  /**
   * Add or update an admin's reply to a review.
   * @param {number} reviewId - The ID of the review.
   * @param {{phanHoi: string}} body - The request body containing the reply.
   * @returns {Promise<object>}
   */
  replyToReview: (reviewId, body) => 
    apiClient.put(`/danh-gia/admin/${reviewId}/phan-hoi`, body),

  /**
   * Delete a review.
   * @param {number} reviewId - The ID of the review to delete.
   * @returns {Promise<void>}
   */
  deleteReview: (reviewId) => apiClient.delete(`/danh-gia/admin/${reviewId}`),
};

export default reviewService;
