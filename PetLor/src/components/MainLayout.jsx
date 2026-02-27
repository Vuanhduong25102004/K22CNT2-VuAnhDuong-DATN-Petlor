import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { jwtDecode } from "jwt-decode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useWebSocket from "../hooks/useWebSocket";

const MainLayout = () => {
  const location = useLocation();
  const [wsUser, setWsUser] = useState(null);

  const hideFooterPaths = ["/cart", "/checkout", "/booking"];

  const isHideFooter = hideFooterPaths.some((path) =>
    location.pathname.startsWith(path),
  );

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setWsUser({ token: token, role: decodedToken.role || "USER" });
      } catch (error) {
        console.error("Token không hợp lệ:", error);
        setWsUser(null);
      }
    } else {
      setWsUser(null);
    }
  }, [location.pathname]);

  useWebSocket(wsUser);

  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light font-display text-gray-800">
      <ToastContainer position="top-right" autoClose={5000} />

      <div className="layout-container flex h-full grow flex-col">
        <Header />

        <main className="flex-1">
          <Outlet />
        </main>

        {!isHideFooter && <Footer />}
      </div>
    </div>
  );
};

export default MainLayout;
