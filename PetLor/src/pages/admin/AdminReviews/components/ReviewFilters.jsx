import React from "react";

const ReviewFilters = ({
  searchTerm,
  setSearchTerm,
  ratingFilter,
  setRatingFilter,
  typeFilter, // 'ALL', 'PRODUCT', 'SERVICE'
  setTypeFilter,
  setCurrentPage,
}) => {
  return (
    <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6 mt-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4">
          {/* Search */}
          <div className="relative rounded-md shadow-sm max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-gray-400">
                search
              </span>
            </div>
            <input
              className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md h-10"
              placeholder="Tìm theo tên user, nội dung..."
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Filter Rating */}
          <div className="relative rounded-md shadow-sm max-w-xs">
            <select
              value={ratingFilter}
              onChange={(e) => {
                setRatingFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md h-10"
            >
              <option value="0">Tất cả số sao</option>
              <option value="5">5 Sao</option>
              <option value="4">4 Sao</option>
              <option value="3">3 Sao</option>
              <option value="2">2 Sao</option>
              <option value="1">1 Sao</option>
            </select>
          </div>

          {/* Filter Type */}
          <div className="relative rounded-md shadow-sm max-w-xs">
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md h-10"
            >
              <option value="ALL">Tất cả loại</option>
              <option value="PRODUCT">Sản phẩm</option>
              <option value="SERVICE">Dịch vụ</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewFilters;
