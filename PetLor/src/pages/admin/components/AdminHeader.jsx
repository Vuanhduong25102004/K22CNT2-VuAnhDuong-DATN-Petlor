import React, { useState, useEffect } from "react";
import axios from "axios";
import authService from "../../../services/authService";

const AdminHeader = ({ user, title }) => {
  const [avatarUrl, setAvatarUrl] = useState(
    "https://placehold.co/40x40?text=A"
  );

  useEffect(() => {
    // Create a revocable object URL
    let objectUrl = null;

    const fetchAvatar = async () => {
      if (user?.anhDaiDien) {
        try {
          // Use axios directly to call the correct non-API endpoint for images
          const imageUrl = `http://localhost:8080/uploads/${user.anhDaiDien}`;
          const response = await axios.get(imageUrl, {
            headers: authService.getAuthHeader(), // Add auth token
            responseType: "blob",
          });
          objectUrl = URL.createObjectURL(response.data);
          setAvatarUrl(objectUrl);
        } catch (error) {
          console.error("Không thể tải ảnh đại diện:", error);
          setAvatarUrl("https://placehold.co/40x40?text=A");
        }
      } else {
        // Reset to placeholder if user has no avatar
        setAvatarUrl("https://placehold.co/40x40?text=A");
      }
    };

    fetchAvatar();

    // Cleanup function to revoke the object URL to prevent memory leaks
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [user]);

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
            src={avatarUrl}
            onError={(e) => {
              e.target.onerror = null; // prevent infinite loop
              e.target.src = "https://placehold.co/40x40?text=A";
            }}
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
