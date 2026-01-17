import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import AdminRoute from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";
import DoctorRoute from "./DoctorRoute";

// Pages
import HomePage from "../pages/HomePage";
import ServicesPage from "../pages/ServicesPage";
import AboutUsPage from "../pages/AboutUsPage";
import BlogPage from "../pages/BlogPage";
import ContactPage from "../pages/ContactPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProductsPage from "../pages/ProductsPage";

// Admin pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminLayout from "../pages/admin/components/AdminLayout";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminPets from "../pages/admin/AdminPets";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminEmployees from "../pages/admin/AdminEmployees";
import AdminServices from "../pages/admin/AdminServices";
import AdminCategories from "../pages/admin/AdminCategories";
import AdminAppointments from "../pages/admin/AdminAppointments";
import AdminImports from "../pages/admin/AdminImports";
import AdminSuppliers from "../pages/admin/AdminSuppliers";
import AdminPromotions from "../pages/admin/AdminPromotions";
import AdminVaccinations from "../pages/admin/AdminVaccinations";
import AdminReviews from "../pages/admin/AdminReviews";
import AdminPosts from "../pages/admin/AdminPosts";

// User pages
import UserLayout from "../pages/user/components/UserLayout";
import UserProfile from "../pages/user/UserProfile";
import MyPets from "../pages/user/MyPets";
import MyAppointments from "../pages/user/MyAppointments";
import MyOrders from "../pages/user/MyOrders";
import UserSettings from "../pages/user/UserSettings";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import ServiceDetailPage from "../pages/ServiceDetailPage";
import Checkout from "../pages/Checkout";
import Booking from "../pages/Booking";

// Doctor pages
import Doctor from "../pages/doctor/Doctor";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes & User Protected Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:id" element={<ServiceDetailPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/booking" element={<Booking />} />

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<UserLayout />}>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/my-pets" element={<MyPets />} />
            <Route path="/my-appointments" element={<MyAppointments />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/settings" element={<UserSettings />} />
          </Route>
        </Route>
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="pets" element={<AdminPets />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="employees" element={<AdminEmployees />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="imports" element={<AdminImports />} />
          <Route path="suppliers" element={<AdminSuppliers />} />
          <Route path="promotions" element={<AdminPromotions />} />
          <Route path="vaccinations" element={<AdminVaccinations />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="posts" element={<AdminPosts />} />
        </Route>
      </Route>
      <Route element={<DoctorRoute />}>
        <Route path="/doctor" element={<Doctor />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
