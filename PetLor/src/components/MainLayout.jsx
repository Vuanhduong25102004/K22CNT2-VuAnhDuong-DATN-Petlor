import React from 'react';
import { Outlet } from 'react-router-dom'; // 1. Import Outlet
import Header from './Header';
import Footer from './Footer';

// 2. Bỏ destructuring { children } vì ta không dùng nó theo cách này
const MainLayout = () => { 
  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light font-display text-gray-800">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        
        {/* Nội dung thay đổi giữa các trang sẽ nằm ở đây */}
        <main className="flex-1">
          {/* 3. Thay {children} bằng <Outlet /> */}
          <Outlet /> 
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;