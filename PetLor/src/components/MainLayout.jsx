// File: src/components/MainLayout.js
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
  const location = useLocation();

  // Danh sách các đường dẫn muốn ẩn Footer
  const hideFooterPaths = ["/cart", "/checkout", "/booking"];

  // Kiểm tra: Nếu đường dẫn hiện tại BẮT ĐẦU bằng một trong các path trên
  // thì sẽ trả về true (ẩn footer)
  const isHideFooter = hideFooterPaths.some((path) =>
    location.pathname.startsWith(path),
  );

  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light font-display text-gray-800">
      <div className="layout-container flex h-full grow flex-col">
        {/* Header luôn luôn hiển thị */}
        <Header />

        <main className="flex-1">
          <Outlet />
        </main>

        {/* Chỉ hiện Footer nếu isHideFooter là false */}
        {!isHideFooter && <Footer />}
      </div>
    </div>
  );
};

export default MainLayout;
