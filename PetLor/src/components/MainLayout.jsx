import React from "react";
import { Outlet, useLocation } from "react-router-dom"; // 1. Thêm useLocation
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
  const location = useLocation();

  const hideFooterPaths = ["/cart", "/checkout", "/booking"];

  const showFooter = !hideFooterPaths.includes(location.pathname);

  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light font-display text-gray-800">
      <div className="layout-container flex h-full grow flex-col">
        <Header />

        <main className="flex-1">
          <Outlet />
        </main>

        {showFooter && <Footer />}
      </div>
    </div>
  );
};

export default MainLayout;
