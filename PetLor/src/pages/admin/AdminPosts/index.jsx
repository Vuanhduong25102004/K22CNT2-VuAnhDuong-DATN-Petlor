/**
 * @file index.jsx
 * @description Trang quản lý Bài viết
 */
import React, { useState, useEffect } from "react";
import postService from "../../../services/postService";
import { toast } from "react-toastify";

// Components
import PostStats from "./components/PostStats";
import PostFilters from "./components/PostFilters";
import PostTable from "./components/PostTable";
import PostFormModal from "./components/modals/PostFormModal";
import PostDetailModal from "./components/modals/PostDetailModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal"; // Tái sử dụng từ module khác

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  // Selection
  const [selectedPost, setSelectedPost] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [postToDeleteId, setPostToDeleteId] = useState(null);

  // Dropdown Data
  const [categories, setCategories] = useState([]);

  // Filters & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const ITEMS_PER_PAGE = 10;

  // Stats State
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    hidden: 0,
  });

  // --- 1. Fetch Logic ---
  const fetchStats = async () => {
    try {
      // Lấy danh sách lớn để tính thống kê (Client-side counting)
      const response = await postService.getAllPosts({ page: 0, size: 1000 });
      const allPosts = response?.content || [];

      let countPublished = 0;
      let countDraft = 0;
      let countHidden = 0;

      allPosts.forEach((p) => {
        if (p.trangThai === "CONG_KHAI") countPublished++;
        else if (p.trangThai === "NHAP") countDraft++;
        else if (p.trangThai === "AN") countHidden++;
      });

      setStats({
        total: allPosts.length,
        published: countPublished,
        draft: countDraft,
        hidden: countHidden,
      });
    } catch (error) {
      console.error("Lỗi tải thống kê:", error);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage - 1,
        size: ITEMS_PER_PAGE,
        search: debouncedSearchTerm,
        status: statusFilter,
      };
      // Clean params
      if (!params.search) delete params.search;
      if (!params.status) delete params.status;

      const response = await postService.getAllPosts(params);
      setPosts(response?.content || []);
      setTotalPages(response?.totalPages || 0);
      setTotalElements(response?.totalElements || 0);
    } catch (error) {
      console.error("Lỗi tải bài viết:", error);
      toast.error("Không thể tải danh sách bài viết");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await postService.getAllPostCategories();
      // Xử lý tùy theo cấu trúc trả về của API categories (Array trực tiếp hay Object phân trang)
      const cats = Array.isArray(res) ? res : res?.content || [];
      setCategories(cats);
    } catch (error) {
      console.error("Lỗi tải danh mục:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchStats();
  }, []);

  // Debounce Search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch Table Data
  useEffect(() => {
    fetchPosts();
  }, [currentPage, debouncedSearchTerm, statusFilter]);

  // --- Handlers ---
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  const handleDeleteClick = (id) => {
    setPostToDeleteId(id);
    setIsConfirmDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!postToDeleteId) return;
    try {
      await postService.deletePost(postToDeleteId);
      toast.success("Xóa bài viết thành công!");
      fetchPosts();
      fetchStats();
    } catch (error) {
      toast.error("Xóa thất bại!");
    } finally {
      setIsConfirmDeleteModalOpen(false);
      setPostToDeleteId(null);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingPost(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (post) => {
    setEditingPost(post);
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingPost) {
        // UPDATE
        await postService.updatePost(editingPost.baiVietId, formData);
        toast.success("Cập nhật bài viết thành công!");
      } else {
        // CREATE
        await postService.createPost(formData);
        toast.success("Tạo bài viết mới thành công!");
      }
      setIsFormModalOpen(false);
      fetchPosts();
      fetchStats();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Thao tác thất bại.");
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-between gap-3">
        <p className="text-gray-900 text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
          Quản lý Tin tức
        </p>
      </div>

      <PostStats stats={stats} />

      <PostFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        setCurrentPage={setCurrentPage}
        onOpenAddModal={handleOpenCreateModal}
      />

      <PostTable
        loading={loading}
        posts={posts}
        totalElements={totalElements}
        totalPages={totalPages}
        currentPage={currentPage}
        indexOfFirstItem={(currentPage - 1) * ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
        onViewDetail={(post) => {
          setSelectedPost(post);
          setIsDetailModalOpen(true);
        }}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteClick}
      />

      {/* Modals */}
      <PostDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        post={selectedPost}
      />
      <PostFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        initialData={editingPost}
        categories={categories}
        onSubmit={handleFormSubmit}
      />
      <ConfirmDeleteModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default AdminPosts;
