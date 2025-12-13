import React from "react";

const AdminHeader = ({ user, title }) => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-gray-200 bg-white px-6 py-3 sticky top-0 z-10">
      <div className="flex items-center gap-8">
        <h2 className="text-gray-900 text-lg font-bold leading-tight tracking-[-0.015em]">
          {title || "Pet Lor Dashboard"}
        </h2>
      </div>
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <label className="flex flex-col min-w-40 !h-10 max-w-64">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
            <div className="text-gray-500 flex border-none bg-gray-100 items-center justify-center pl-4 rounded-l-lg border-r-0">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-0 border-none bg-gray-100 focus:border-none h-full placeholder:text-gray-500 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              placeholder="Tìm kiếm..."
            />
          </div>
        </label>
        {/* Notification Icon */}
        <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-gray-100 text-gray-900 gap-2 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-200 transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        {/* User Avatar Small */}
        <div className="flex items-center">
          <img
            alt="Admin Avatar"
            className="h-8 w-8 rounded-full object-cover border border-gray-200"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV6y4lZmkVlNnJEk9ogR8aoltDIevXs019Tfv0KxcR7zSA-RhRyYjWgMOVpi1GuHA7Dd7CQKaEsbiONx7LvKYFCcjIcPOttg58G0haDZbMLJDSw7vepI5qBJNPgSu_cFLW1AiEbByELRIthiyUHcwwfKPUbeZbFfrtrURSdetxxwdnXH9u0joRv0OKaOiZhyIwm6_O7AKsRtSUyBTJUVFG3ExVnXlL56UTnZgv7vL-haHmrt8zk9ZrYtgP99Xtq8EFnJqhheyVvhcI"
          />
          <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
            {user?.hoTen || "Admin"}
          </span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
