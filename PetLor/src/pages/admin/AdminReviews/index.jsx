import React, { useState, useEffect } from "react";
import reviewService from "../../../services/reviewService";
import { toast } from "react-toastify";

// Components
import ReviewStats from "./components/ReviewStats";
import ReviewFilters from "./components/ReviewFilters";
import ReviewTable from "./components/ReviewTable";
import ReviewDetailModal from "./components/modals/ReviewDetailModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const AdminReviews = () => {
  // State
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    avgRating: 0,
    pendingReply: 0,
    hiddenCount: 0,
  });

  // Modal State
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  // Selection
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviewToDeleteId, setReviewToDeleteId] = useState(null);

  // Filter & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("0"); // "0" = All
  const [typeFilter, setTypeFilter] = useState("ALL"); // ALL, PRODUCT, SERVICE
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const ITEMS_PER_PAGE = 20;

  // --- Fetch Data ---
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage - 1,
        size: ITEMS_PER_PAGE,
      };

      const response = await reviewService.getAllReviewsForAdmin(params);
      let content = response.content || [];

      // --- Client-side Filtering (Nếu API chưa hỗ trợ filter sâu) ---
      // 1. Search
      if (searchTerm) {
        const lowerTerm = searchTerm.toLowerCase();
        content = content.filter(
          (r) =>
            (r.nguoiDung?.hoTen || "").toLowerCase().includes(lowerTerm) ||
            (r.noiDung || "").toLowerCase().includes(lowerTerm)
        );
      }

      // 2. Rating
      if (ratingFilter !== "0") {
        content = content.filter((r) => r.soSao === parseInt(ratingFilter));
      }

      // 3. Type
      if (typeFilter === "PRODUCT") {
        content = content.filter((r) => r.sanPham !== null);
      } else if (typeFilter === "SERVICE") {
        content = content.filter((r) => r.dichVu !== null);
      }

      setReviews(content);
      setTotalPages(response.totalPages); // Lưu ý: Nếu client filter nhiều quá thì totalPages từ API sẽ không chính xác cho list đã filter. Ở đây tạm chấp nhận.
      setTotalElements(response.totalElements);

      // --- Calculate Stats ---
      // Lưu ý: Tính trên tập data hiện tại hoặc gọi API thống kê riêng
      calculateStats(content);
    } catch (error) {
      console.error("Fetch reviews error", error);
      toast.error("Không thể tải danh sách đánh giá");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    if (!data || data.length === 0) {
      setStats({ total: 0, avgRating: 0, pendingReply: 0, hiddenCount: 0 });
      return;
    }

    const total = data.length;
    const totalStars = data.reduce((acc, curr) => acc + curr.soSao, 0);
    const avgRating = (totalStars / total).toFixed(1);
    const pendingReply = data.filter((r) => !r.phanHoi).length;
    // Giả sử API trả về null là ẩn hoặc false là ẩn.
    // Trong JSON mẫu: trangThai = null hoặc true. Ta coi !trangThai là ẩn/chờ duyệt.
    const hiddenCount = data.filter((r) => !r.trangThai).length;

    setStats({
      total,
      avgRating,
      pendingReply,
      hiddenCount,
    });
  };

  useEffect(() => {
    fetchReviews();
  }, [currentPage, searchTerm, ratingFilter, typeFilter]);

  // --- Handlers ---
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  const handleToggleStatus = async (review) => {
    try {
      const newStatus = !review.trangThai;
      await reviewService.updateReviewStatus(review.danhGiaId, {
        trangThai: newStatus,
      });
      toast.success(`Đã ${newStatus ? "hiện" : "ẩn"} đánh giá thành công`);
      fetchReviews(); // Refresh list
    } catch (error) {
      toast.error("Cập nhật trạng thái thất bại");
    }
  };

  const handleReplyReview = async (reviewId, replyContent) => {
    try {
      await reviewService.replyToReview(reviewId, { phanHoi: replyContent });
      toast.success("Gửi phản hồi thành công!");
      setIsDetailModalOpen(false);
      fetchReviews();
    } catch (error) {
      toast.error("Gửi phản hồi thất bại");
    }
  };

  const handleDeleteClick = (id) => {
    setReviewToDeleteId(id);
    setIsConfirmDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!reviewToDeleteId) return;
    try {
      await reviewService.deleteReview(reviewToDeleteId);
      toast.success("Đã xóa đánh giá");
      fetchReviews();
    } catch (error) {
      toast.error("Xóa thất bại");
    } finally {
      setIsConfirmDeleteModalOpen(false);
      setReviewToDeleteId(null);
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-between gap-3">
        <p className="text-gray-900 text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
          Quản lý Đánh giá
        </p>
      </div>

      <ReviewStats
        total={stats.total}
        avgRating={stats.avgRating}
        pendingReply={stats.pendingReply}
        hiddenCount={stats.hiddenCount}
      />

      <ReviewFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        ratingFilter={ratingFilter}
        setRatingFilter={setRatingFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        setCurrentPage={setCurrentPage}
      />

      <ReviewTable
        loading={loading}
        reviews={reviews}
        totalElements={totalElements}
        totalPages={totalPages}
        currentPage={currentPage}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        indexOfFirstItem={(currentPage - 1) * ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
        onViewDetail={(item) => {
          setSelectedReview(item);
          setIsDetailModalOpen(true);
        }}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDeleteClick}
      />

      {/* Modals */}
      <ReviewDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        review={selectedReview}
        onReply={handleReplyReview}
      />

      <ConfirmDeleteModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Xóa đánh giá?"
        message="Hành động này không thể hoàn tác. Đánh giá này sẽ bị xóa vĩnh viễn khỏi hệ thống."
      />
    </>
  );
};

export default AdminReviews;
