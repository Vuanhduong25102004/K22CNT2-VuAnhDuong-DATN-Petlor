import React from "react";
import useEscapeKey from "../../../../hooks/useEscapeKey";

const SkeletonRow = () => (
  <tr className="animate-pulse border-b border-gray-100 last:border-0">
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded w-8"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded w-32"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded w-48"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-8 bg-gray-200 rounded w-20 ml-auto"></div>
    </td>
  </tr>
);

const CategoryTable = ({
  loading,
  categories,
  onViewDetail,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden mt-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên Danh mục
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mô tả
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Hành động</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <SkeletonRow key={idx} />
              ))
            ) : categories.length > 0 ? (
              categories.map((cat, index) => (
                <tr
                  key={cat.danhMucId || index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    #{cat.danhMucId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cat.tenDanhMuc}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-[400px] truncate"
                    title={cat.moTa}
                  >
                    {cat.moTa || "Không có mô tả"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        title="Xem chi tiết"
                        className="text-gray-400 hover:text-green-600 transition-colors"
                        onClick={() => onViewDetail(cat)}
                      >
                        <span className="material-symbols-outlined text-base">
                          visibility
                        </span>
                      </button>
                      <button
                        title="Chỉnh sửa"
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                        onClick={() => onEdit(cat)}
                      >
                        <span className="material-symbols-outlined text-base">
                          edit_note
                        </span>
                      </button>
                      <button
                        title="Xóa"
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        onClick={() => onDelete(cat.danhMucId)}
                      >
                        <span className="material-symbols-outlined text-base">
                          cancel
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  Chưa có danh mục nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryTable;
