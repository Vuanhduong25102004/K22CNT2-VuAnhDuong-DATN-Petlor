import React, { useState, useEffect } from "react";
import promotionService from "../../../services/promotionService";
import { toast } from "react-toastify";

// Components
import PromotionStats from "./components/PromotionStats";
import PromotionFilters from "./components/PromotionFilters";
import PromotionTable from "./components/PromotionTable";
import PromotionDetailModal from "./components/modals/PromotionDetailModal";
import PromotionFormModal from "./components/modals/PromotionFormModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const AdminPromotions = () => {
  // State
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Stats State
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    expired: 0,
    upcoming: 0,
  });

  // Modal State
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  // Selected Data
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [editingPromotion, setEditingPromotion] = useState(null);
  const [promotionToDeleteId, setPromotionToDeleteId] = useState(null);

  // Filters & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // "" | "true" | "false"
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const ITEMS_PER_PAGE = 20;

  // --- Fetch Data Logic ---
  const fetchPromotions = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage - 1,
        size: ITEMS_PER_PAGE,
        // API của bạn có hỗ trợ search/filter params không?
        // Nếu không, logic filter search phải xử lý ở frontend hoặc update API.
        // Giả sử API hỗ trợ q và active:
        // q: searchTerm,
        // active: statusFilter
      };

      const response = await promotionService.getAllPromotions(params);

      // Xử lý filter Client-side nếu API chưa hỗ trợ search
      let content = response.content || [];

      // Filter logic (Tạm thời client-side để demo)
      if (searchTerm) {
        content = content.filter(
          (p) =>
            p.maCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.moTa?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (statusFilter !== "") {
        const isActive = statusFilter === "true";
        content = content.filter((p) => p.trangThai === isActive);
      }

      setPromotions(content);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);

      // Tính toán Stats (Dựa trên data hiện có hoặc gọi API riêng)
      calculateStats(content); // Lưu ý: thực tế nên gọi API count riêng
    } catch (error) {
      console.error("Failed to fetch promotions", error);
      toast.error("Không thể tải danh sách khuyến mãi");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const now = new Date();
    let active = 0,
      expired = 0,
      upcoming = 0;

    data.forEach((p) => {
      const start = new Date(p.ngayBatDau);
      const end = new Date(p.ngayKetThuc);

      if (!p.trangThai) {
        expired++; // Coi như ẩn/hết hạn
      } else if (now > end) {
        expired++;
      } else if (now < start) {
        upcoming++;
      } else {
        active++;
      }
    });

    setStats({
      total: data.length,
      active,
      expired,
      upcoming,
    });
  };

  useEffect(() => {
    fetchPromotions();
  }, [currentPage, searchTerm, statusFilter]);

  // --- Handlers ---
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  const handleDeleteClick = (id) => {
    setPromotionToDeleteId(id);
    setIsConfirmDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!promotionToDeleteId) return;
    try {
      await promotionService.deletePromotion(promotionToDeleteId);
      toast.success("Đã xóa khuyến mãi");
      fetchPromotions();
    } catch (error) {
      toast.error("Xóa thất bại");
    } finally {
      setIsConfirmDeleteModalOpen(false);
      setPromotionToDeleteId(null);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingPromotion) {
        await promotionService.updatePromotion(
          editingPromotion.khuyenMaiId,
          formData
        );
        toast.success("Cập nhật thành công!");
      } else {
        await promotionService.createPromotion(formData);
        toast.success("Tạo mới thành công!");
      }
      setIsFormModalOpen(false);
      fetchPromotions();
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-between gap-3">
        <p className="text-gray-900 text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
          Quản lý Khuyến Mãi
        </p>
      </div>

      <PromotionStats
        total={stats.total}
        active={stats.active}
        expired={stats.expired}
        upcoming={stats.upcoming}
      />

      <PromotionFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        setCurrentPage={setCurrentPage}
        onOpenAddModal={() => {
          setEditingPromotion(null);
          setIsFormModalOpen(true);
        }}
      />

      <PromotionTable
        loading={loading}
        promotions={promotions}
        totalElements={totalElements}
        totalPages={totalPages}
        currentPage={currentPage}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        indexOfFirstItem={(currentPage - 1) * ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
        onViewDetail={(item) => {
          setSelectedPromotion(item);
          setIsDetailModalOpen(true);
        }}
        onEdit={(item) => {
          setEditingPromotion(item);
          setIsFormModalOpen(true);
        }}
        onDelete={handleDeleteClick}
      />

      {/* Modals */}
      <PromotionDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        promotion={selectedPromotion}
      />

      <PromotionFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        initialData={editingPromotion}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDeleteModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Xóa mã khuyến mãi?"
        message="Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa mã này không?"
      />
    </>
  );
};

export default AdminPromotions;
