import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        // Giải mã token để lấy thông tin user (logic tương tự AdminRoute)
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        const decodedUser = JSON.parse(jsonPayload);

        // Kiểm tra hết hạn token
        if (decodedUser.exp && decodedUser.exp < Date.now() / 1000) {
          authService.logout();
          setUser(null);
        } else {
          setUser(decodedUser);
        }
      } catch (error) {
        authService.logout();
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate("/login");
  };

  const getLastName = (fullName) => {
    if (!fullName) return "";
    const parts = fullName.trim().split(/\s+/);
    return parts[parts.length - 1];
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Nếu cuộn xuống quá 50px thì đổi màu
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? " backdrop-blur-md shadow-sm  border-gray-200" // Khi cuộn: nền trắng mờ, có bóng
          : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4 text-gray-900">
            <div className="flex items-center justify-center size-10 rounded-xl bg-primary/20 text-primary">
              <span className="material-symbols-outlined text-[28px]">
                pets
              </span>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">
              PetLor
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-9">
            <a
              className="text-sm font-medium leading-normal hover:text-primary transition-colors"
              href="/"
            >
              Trang chủ
            </a>
            <a
              className="text-sm font-medium leading-normal hover:text-primary transition-colors"
              href="/services"
            >
              Dịch vụ
            </a>
            <a
              className="text-sm font-medium leading-normal hover:text-primary transition-colors"
              href="/products"
            >
              Sản phẩm
            </a>
            <a
              className="text-sm font-medium leading-normal hover:text-primary transition-colors"
              href="/aboutus"
            >
              Về chúng tôi
            </a>
            <a
              className="text-sm font-medium leading-normal hover:text-primary transition-colors"
              href="/blog"
            >
              Blog
            </a>
            <a
              className="text-sm font-medium leading-normal hover:text-primary transition-colors"
              href="/contact"
            >
              Liên hệ
            </a>
          </div>
          <div className="hidden md:flex items-center gap-9">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium leading-normal text-gray-900">
                  Xin chào, {getLastName(user.hoTen)}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium leading-normal hover:text-primary transition-colors cursor-pointer"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <Link
                className="text-sm font-medium leading-normal hover:text-primary transition-colors"
                to="/login"
              >
                Đăng nhập
              </Link>
            )}
            <button className="hidden md:flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-[#111813] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-opacity">
              <span className="truncate">Đặt lịch ngay</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
