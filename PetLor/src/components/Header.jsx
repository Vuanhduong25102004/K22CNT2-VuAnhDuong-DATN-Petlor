import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import authService from "../services/authService";
import userService from "../services/userService";
import { useCart } from "../context/CartContext";

const Header = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartData } = useCart();

  const isActive = (path) => {
    return location.pathname === path
      ? "text-primary font-bold"
      : "text-slate-600 hover:text-primary";
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const response = await userService.getMe();
          setUser(response);
        } catch (error) {
          authService.logout();
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    fetchUser();
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate("/");
  };

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
  const iconButtonClass =
    "w-10 h-10 flex items-center justify-center rounded-full transition-colors hover:bg-slate-100 text-slate-600";
  const cartItemCount = cartData?.items?.length || 0;

  const navLinks = [
    { path: "/", label: "Trang chủ" },
    { path: "/services", label: "Dịch vụ" },
    { path: "/products", label: "Sản phẩm" },
    { path: "/aboutus", label: "Về chúng tôi" },
    { path: "/blog", label: "Bài viết" },
    { path: "/profilepage", label: "Thông tin cá nhân" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/50 backdrop-blur-md shadow-sm"
          : "bg-white shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined">pets</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">
              PetLor
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                className={`${isActive(link.path)} transition-colors`}
                to={link.path}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/cart" className={`relative ${iconButtonClass}`}>
            <span className="material-symbols-outlined">shopping_cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                {cartItemCount > 99 ? "99+" : cartItemCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3 ml-2">
              <Link
                to="/profile"
                className="flex items-center gap-2 p-1 pl-2 pr-1 hover:bg-slate-100 rounded-full transition-all border border-transparent hover:border-slate-200"
              >
                <span className="text-sm font-semibold text-slate-700 hidden sm:block max-w-[100px] truncate">
                  {user.hoTen?.split(" ").pop()}
                </span>
                <img
                  src={
                    user.anhDaiDien
                      ? `${API_URL}/uploads/${user.anhDaiDien}`
                      : `https://ui-avatars.com/api/?name=${user.hoTen}&background=random`
                  }
                  alt={user.hoTen}
                  className="w-8 h-8 rounded-full object-cover border border-white shadow-sm"
                />
              </Link>

              <button
                onClick={handleLogout}
                className="w-10 h-10 flex items-center justify-center rounded-full transition-colors text-slate-400 hover:text-red-600 hover:bg-red-50"
                title="Đăng xuất"
              >
                <span className="material-symbols-outlined text-[20px]">
                  logout
                </span>
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-4 ml-2">
              <Link
                to="/login"
                className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
              >
                Đăng nhập
              </Link>
              <Link to="/booking">
                <button className="bg-primary text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  Đặt lịch ngay
                </button>
              </Link>
            </div>
          )}

          {user && (
            <Link to="/booking" className="hidden lg:block">
              <button className="ml-2 bg-primary text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                Đặt lịch ngay
              </button>
            </Link>
          )}

          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white shadow-inner ${
          isMenuOpen
            ? "max-h-screen border-t border-slate-100"
            : "max-h-0 border-t-0"
        }`}
      >
        <nav className="flex flex-col p-4 gap-4 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              className={`${isActive(link.path)} py-2 transition-colors`}
              to={link.path}
            >
              {link.label}
            </Link>
          ))}
          {!user && (
            <div className="flex flex-col gap-3 pt-2 border-t border-slate-50">
              <Link
                to="/login"
                className="text-center py-3 text-slate-600 font-semibold border border-slate-200 rounded-full"
              >
                Đăng nhập
              </Link>
              <Link
                to="/booking"
                className="text-center py-3 bg-primary text-white font-semibold rounded-full shadow-sm"
              >
                Đặt lịch ngay
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
