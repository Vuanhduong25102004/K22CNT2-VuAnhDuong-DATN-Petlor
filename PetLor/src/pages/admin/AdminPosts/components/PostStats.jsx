import React from "react";

const PostStats = ({ stats }) => {
  const data = [
    {
      title: "Tổng bài viết",
      value: stats.total,
      icon: "article",
      color: "text-blue-600",
      bg: "bg-blue-100",
      border: "border-blue-600",
    },
    {
      title: "Đang công khai",
      value: stats.published,
      icon: "public",
      color: "text-green-600",
      bg: "bg-green-100",
      border: "border-green-600",
    },
    {
      title: "Bản nháp",
      value: stats.draft,
      icon: "edit_document",
      color: "text-yellow-600",
      bg: "bg-yellow-100",
      border: "border-yellow-500",
    },
    {
      title: "Đã ẩn",
      value: stats.hidden,
      icon: "visibility_off",
      color: "text-red-600",
      bg: "bg-red-100",
      border: "border-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {data.map((item, index) => (
        <div
          key={index}
          className={`bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200 border-l-4 ${item.border}`}
        >
          <div className="p-6">
            <div className="flex items-center">
              <div className={`flex-shrink-0 ${item.bg} rounded-md p-3`}>
                <span
                  className={`material-symbols-outlined ${item.color} text-2xl`}
                >
                  {item.icon}
                </span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {item.title}
                </dt>
                <dd className="text-lg font-bold text-gray-900">
                  {item.value}
                </dd>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostStats;
