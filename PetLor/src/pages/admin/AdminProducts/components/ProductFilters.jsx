import React, { useState, useEffect } from "react";
import useEscapeKey from "../../../../hooks/useEscapeKey";

const ProductFilters = ({
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory,
  filterStock,
  setFilterStock,
  categories, // Dữ liệu này có thể có trường 'name' hoặc 'tenDanhMuc'
  setCurrentPage,
  onOpenAddModal,
  placeholder,
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || "");

  // ... (Giữ nguyên các useEffect cũ) ...
  useEffect(() => {
    setLocalSearchTerm(searchTerm || "");
  }, [searchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearchTerm !== searchTerm) {
        setSearchTerm(localSearchTerm);
        if (setCurrentPage) setCurrentPage(1);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [localSearchTerm, searchTerm, setSearchTerm, setCurrentPage]);

  return (
    <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6 mt-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
        <div className="flex-1 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          {/* Search Input (Giữ nguyên) */}
          <div className="relative rounded-md shadow-sm max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-gray-400">
                search
              </span>
            </div>
            <input
              className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md h-10"
              placeholder={placeholder || "Tìm tên SP, mã SP..."}
              type="text"
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
            />
          </div>

          {/* --- SỬA LẠI PHẦN LỌC DANH MỤC --- */}
          <div className="relative inline-block text-left">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md h-10"
              value={filterCategory}
              onChange={(e) => {
                setFilterCategory(e.target.value);
                if (setCurrentPage) setCurrentPage(1);
              }}
            >
              <option value="">Tất cả danh mục</option>
              {categories && categories.length > 0 ? (
                categories.map((cat) => {
                  // 1. Xử lý ID: Lấy id hoặc danhMucId
                  const catId = cat.id || cat.danhMucId || cat.danhMucDvId; // Thêm danhMucDvId phòng hờ

                  // 2. Xử lý Tên: Lấy name hoặc tenDanhMuc hoặc tenDanhMucDv
                  const catName =
                    cat.name ||
                    cat.tenDanhMuc ||
                    cat.tenDanhMucDv ||
                    "Không tên";

                  return (
                    <option key={catId} value={catId}>
                      {catName}
                    </option>
                  );
                })
              ) : (
                <option disabled>Đang tải danh mục...</option>
              )}
            </select>
          </div>

          {/* Lọc theo trạng thái kho (Giữ nguyên) */}
          <div className="relative inline-block text-left">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md h-10"
              value={filterStock}
              onChange={(e) => {
                setFilterStock(e.target.value);
                if (setCurrentPage) setCurrentPage(1);
              }}
            >
              <option value="">Tất cả trạng thái kho</option>
              <option value="instock">Còn hàng (&ge;10)</option>
              <option value="lowstock">Sắp hết (&lt;10)</option>
              <option value="outstock">Hết hàng (0)</option>
            </select>
          </div>
        </div>

        {/* Các nút hành động (Giữ nguyên) */}
        <div className="flex space-x-3">
          <button
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            type="button"
          >
            <span className="material-symbols-outlined text-sm mr-2">
              file_download
            </span>
            Xuất Excel
          </button>
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-green-600 focus:outline-none"
            type="button"
            onClick={onOpenAddModal}
          >
            <span className="material-symbols-outlined text-sm mr-2">add</span>
            Thêm Mới
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
