import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

// Services
import categoryService from "../../../services/categoryService";

// Components
import CategoryStats from "./components/CategoryStats";
import CategoryTable from "./components/CategoryTable";
import CategoryFormModal from "./components/modals/CategoryFormModal";

// --- IMPORT MODAL DÙNG CHUNG ---
// Bạn hãy kiểm tra lại đường dẫn import này cho đúng với cấu trúc thư mục của bạn
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const AdminCategories = () => {
  const { type } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State cho Form (Thêm/Sửa)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // --- STATE CHO MODAL XÓA ---
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Config
  const config = {
    products: {
      title: "Danh mục Sản phẩm",
      apiType: "PRODUCT",
      placeholder: "Ví dụ: Thức ăn, Phụ kiện...",
    },
    services: {
      title: "Danh mục Dịch vụ",
      apiType: "SERVICE",
      placeholder: "Ví dụ: Spa, Khám bệnh...",
    },
    posts: {
      title: "Danh mục Bài viết",
      apiType: "POST",
      placeholder: "Ví dụ: Tin tức, Kiến thức...",
    },
  };

  const currentConfig = config[type] || config.products;

  // --- FETCH DATA ---
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await categoryService.getAll({
        type: currentConfig.apiType,
      });

      // Logic chuẩn hóa dữ liệu (như đã làm ở bước trước)
      let rawData = [];
      if (Array.isArray(response)) rawData = response;
      else if (response && Array.isArray(response.content))
        rawData = response.content;
      else if (response && Array.isArray(response.data))
        rawData = response.data;

      const normalizedData = rawData.map((item) => ({
        ...item,
        id: item.danhMucDvId || item.danhMucBvId || item.danhMucId || item.id,
        name: item.tenDanhMucDv || item.tenDanhMuc || item.name,
        description: item.moTa || item.description || "",
      }));

      setCategories(normalizedData);
    } catch (error) {
      console.error("Lỗi tải danh mục:", error);
      toast.error("Không thể tải danh sách danh mục!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    setEditingCategory(null);
    setIsFormModalOpen(false);
  }, [type]);

  // --- HANDLERS ---
  const handleCreate = () => {
    setEditingCategory(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsFormModalOpen(true);
  };

  // 1. Mở Modal Xóa
  const openDeleteModal = (id) => {
    setCategoryToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // 2. Xử lý khi bấm nút "Xóa" trong Modal
  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      await categoryService.delete(categoryToDelete, currentConfig.apiType);
      toast.success("Xóa thành công!");
      // Cập nhật state UI: Loại bỏ mục vừa xóa
      setCategories((prev) =>
        prev.filter((item) => item.id !== categoryToDelete),
      );
    } catch (error) {
      console.error("Lỗi xóa:", error);
      toast.error("Xóa thất bại! Có thể danh mục này đang chứa dữ liệu.");
    } finally {
      // Đóng modal và reset ID
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
    }
  };

  const handleSaveSuccess = () => {
    fetchCategories();
    setIsFormModalOpen(false);
    toast.success(
      editingCategory ? "Cập nhật thành công!" : "Thêm mới thành công!",
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">
          {currentConfig.title}
        </h1>
        <button
          onClick={handleCreate}
          className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          Thêm mới
        </button>
      </div>

      {/* Stats */}
      <CategoryStats
        total={categories.length}
        typeTitle={currentConfig.title}
      />

      {/* Table */}
      <CategoryTable
        data={categories}
        loading={loading}
        onEdit={handleEdit}
        onDelete={openDeleteModal} // Truyền hàm mở modal vào đây
      />

      {/* Modal Form (Thêm/Sửa) */}
      {isFormModalOpen && (
        <CategoryFormModal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          onSuccess={handleSaveSuccess}
          initialData={editingCategory}
          categoryType={currentConfig.apiType}
          placeholder={currentConfig.placeholder}
        />
      )}

      {/* --- MODAL XÁC NHẬN XÓA (DÙNG CHUNG) --- */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Xóa danh mục?"
        message="Bạn có chắc chắn muốn xóa danh mục này? Các sản phẩm/bài viết thuộc danh mục này có thể bị ảnh hưởng."
        confirmText="Xóa ngay"
        cancelText="Hủy bỏ"
      />
    </div>
  );
};

export default AdminCategories;
