/**
 * @file index.jsx
 * @description Trang quản lý danh mục (Container).
 */
import React, { useEffect, useState, useLayoutEffect } from "react";
import useEscapeKey from "../../../hooks/useEscapeKey";
// Đảm bảo đường dẫn này đúng với dự án của bạn (thêm một cấp ../ so với file gốc)
import productService from "../../../services/productService";
import { toast } from "react-toastify";

// Components
import CategoryStats from "./components/CategoryStats";
import CategoryTable from "./components/CategoryTable";
import CategoryDetailModal from "./components/modals/CategoryDetailModal";
import CategoryFormModal from "./components/modals/CategoryFormModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const AdminCategories = () => {
  // 1. State lưu dữ liệu và trạng thái tải
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // State cho Modal thêm mới/chỉnh sửa
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ tenDanhMuc: "", moTa: "" });
  const [editingId, setEditingId] = useState(null);

  // State cho Modal xem chi tiết
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // State cho Modal xác nhận xóa
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [categoryToDeleteId, setCategoryToDeleteId] = useState(null);

  // 2. Hàm gọi API lấy danh sách danh mục
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await productService.getAllCategories();
      const formattedData = Array.isArray(response)
        ? response.map((cat) => ({
            ...cat,
            danhMucId: cat.id || cat.danhMucId,
            soLuongSanPham:
              cat.soLuongSanPham || (cat.sanPhams ? cat.sanPhams.length : 0),
          }))
        : [];

      setCategories(formattedData);
    } catch (error) {
      console.error("Lỗi khi tải danh mục:", error);
      toast.error("Không thể tải danh sách danh mục!");
    } finally {
      setLoading(false);
    }
  };

  // 3. Effects
  useEffect(() => {
    fetchCategories();
  }, []);

  useLayoutEffect(() => {
    const isAnyModalOpen =
      isModalOpen || isDetailModalOpen || isConfirmDeleteModalOpen;
    const contentArea = document.getElementById("admin-content-area");

    if (contentArea) {
      if (isAnyModalOpen) {
        contentArea.style.overflow = "hidden";
      } else {
        contentArea.style.overflow = "auto";
      }
    }
    return () => {
      if (contentArea) contentArea.style.overflow = "auto";
    };
  }, [isModalOpen, isDetailModalOpen, isConfirmDeleteModalOpen]);

  // 4. Handlers
  const handleSave = async () => {
    if (!newCategory.tenDanhMuc.trim()) {
      toast.warning("Vui lòng nhập tên danh mục!");
      return;
    }

    setLoading(true);
    try {
      if (editingId) {
        await productService.updateCategory(editingId, newCategory);
        toast.success("Cập nhật danh mục thành công!");
      } else {
        await productService.createCategory(newCategory);
        toast.success("Thêm danh mục thành công!");
      }
      handleCloseModals();
      await fetchCategories();
    } catch (error) {
      console.error("Lỗi lưu danh mục:", error);
      toast.error("Thao tác thất bại! Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setCategoryToDeleteId(id);
    setIsConfirmDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!categoryToDeleteId) return;
    try {
      await productService.deleteCategory(categoryToDeleteId);
      setCategories((prev) =>
        prev.filter((cat) => cat.danhMucId !== categoryToDeleteId)
      );
      toast.success("Xóa danh mục thành công!");
    } catch (error) {
      console.error("Lỗi xóa danh mục:", error);
      toast.error("Xóa thất bại! Có thể danh mục này đang chứa sản phẩm.");
    } finally {
      setIsConfirmDeleteModalOpen(false);
      setCategoryToDeleteId(null);
    }
  };

  const handleOpenAddModal = () => {
    setEditingId(null);
    setNewCategory({ tenDanhMuc: "", moTa: "" });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (category) => {
    setEditingId(category.danhMucId);
    setNewCategory({
      tenDanhMuc: category.tenDanhMuc,
      moTa: category.moTa || "",
    });
    setIsModalOpen(true);
  };

  const handleViewDetail = (category) => {
    setSelectedCategory(category);
    setIsDetailModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsModalOpen(false);
    setIsDetailModalOpen(false);
    setIsConfirmDeleteModalOpen(false);
    setEditingId(null);
    setSelectedCategory(null);
    setNewCategory({ tenDanhMuc: "", moTa: "" });
    setCategoryToDeleteId(null);
  };

  useEscapeKey(
    handleCloseModals,
    isModalOpen || isDetailModalOpen || isConfirmDeleteModalOpen
  );
  // 5. Render
  return (
    <>
      {/* Tiêu đề trang */}
      <div className="flex flex-wrap justify-between gap-3">
        <p className="text-gray-900 text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
          Quản lý Danh mục
        </p>
      </div>

      {/* Thống kê */}
      <CategoryStats categories={categories} />

      {/* Nút Thêm mới */}
      <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6 mt-6">
        <div className="flex justify-end">
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-green-600 focus:outline-none"
            onClick={handleOpenAddModal}
          >
            <span className="material-symbols-outlined text-sm mr-2">add</span>{" "}
            Thêm Danh mục
          </button>
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <CategoryTable
        loading={loading}
        categories={categories}
        onViewDetail={handleViewDetail}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteClick}
      />

      {/* Modals */}
      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModals}
        formData={newCategory}
        setFormData={setNewCategory}
        isEditing={!!editingId}
        onSave={handleSave}
      />

      <CategoryDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseModals}
        category={selectedCategory}
      />

      <ConfirmDeleteModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={handleCloseModals}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default AdminCategories;
