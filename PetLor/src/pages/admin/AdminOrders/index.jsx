/**
 * @file index.jsx
 * @description Trang quản lý đơn hàng (Container).
 */
import React, { useEffect, useState } from "react";
// Đảm bảo đường dẫn import đúng (thêm một cấp ../)
import orderService from "../../../services/orderService";
import { toast } from "react-toastify";

// Components
import OrderStats from "./components/OrderStats";
import OrderFilters from "./components/OrderFilters";
import OrderTable from "./components/OrderTable";
import OrderDetailModal from "./components/modals/OrderDetailModal";
import OrderEditModal from "./components/modals/OrderEditModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const AdminOrders = () => {
  // --- State ---
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({ trangThai: "", diaChi: "" });
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [orderToDeleteId, setOrderToDeleteId] = useState(null);

  // Filters & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const ITEMS_PER_PAGE = 6;

  // --- Fetching ---
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const page = currentPage - 1;
      const params = {
        page,
        size: ITEMS_PER_PAGE,
        search: searchTerm,
        status: statusFilter,
        date: dateFilter,
      };
      if (!params.search) delete params.search;
      if (!params.status) delete params.status;
      if (!params.date) delete params.date;

      const response = await orderService.getAllOrders(params);
      const ordersList = Array.isArray(response)
        ? response
        : response?.content || [];

      const formattedData = ordersList.map((order) => ({
        ...order,
        donHangId: order.id || order.donHangId,
        userName:
          order.tenNguoiDung ||
          (order.user ? order.user.hoTen : order.hoTenNguoiNhan) ||
          "Khách vãng lai",
        userId: order.user ? order.user.id || order.user.userId : order.userId,
        tongTien: order.tongTien || 0,
        trangThai: order.trangThaiDonHang || order.trangThai || "Chờ xử lý",
        diaChi: order.diaChiGiaoHang || order.diaChi || "Tại cửa hàng",
      }));

      setOrders(formattedData);
      setTotalPages(response?.totalPages || (Array.isArray(response) ? 1 : 0));
      setTotalElements(
        response?.totalElements ||
          (Array.isArray(response) ? response.length : 0)
      );
    } catch (error) {
      console.error("Lỗi tải đơn hàng:", error);
      toast.error("Không thể tải danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, searchTerm, statusFilter, dateFilter]);

  // Handle ESC key and scroll lock
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
        setIsDetailModalOpen(false);
        setIsConfirmDeleteModalOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, []);

  useEffect(() => {
    const isAnyModalOpen =
      isModalOpen || isDetailModalOpen || isConfirmDeleteModalOpen;
    const contentArea = document.getElementById("admin-content-area");
    const header = document.querySelector("header");

    if (contentArea) {
      if (isAnyModalOpen) {
        const scrollbarWidth =
          contentArea.offsetWidth - contentArea.clientWidth;
        contentArea.style.overflow = "hidden";
        contentArea.style.paddingRight = `${scrollbarWidth}px`;
        if (header) header.style.paddingRight = `${scrollbarWidth}px`;
      } else {
        contentArea.style.overflow = "auto";
        contentArea.style.paddingRight = "";
        if (header) header.style.paddingRight = "";
      }
    }
    return () => {
      if (contentArea) {
        contentArea.style.overflow = "auto";
        contentArea.style.paddingRight = "";
      }
      if (header) header.style.paddingRight = "";
    };
  }, [isModalOpen, isDetailModalOpen, isConfirmDeleteModalOpen]);

  // --- Handlers ---
  const handleDeleteClick = (id) => {
    setOrderToDeleteId(id);
    setIsConfirmDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!orderToDeleteId) return;
    try {
      await orderService.deleteOrder(orderToDeleteId);
      toast.success("Đã xóa đơn hàng.");
      if (orders.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        fetchOrders();
      }
    } catch (error) {
      console.error("Lỗi xóa đơn hàng:", error);
      toast.error("Xóa thất bại.");
    } finally {
      setIsConfirmDeleteModalOpen(false);
      setOrderToDeleteId(null);
    }
  };

  const handleViewDetail = async (order) => {
    try {
      const response = await orderService.getOrderById(order.donHangId);
      setOrderItems(response?.chiTietDonHangs || []);
      setSelectedOrder({
        ...order,
        ...response,
        userName: response.tenNguoiDung || order.userName,
        trangThai: response.trangThaiDonHang || order.trangThai,
        diaChi: response.diaChiGiaoHang || order.diaChi,
      });
      setIsDetailModalOpen(true);
    } catch (error) {
      console.error("Lỗi tải chi tiết:", error);
      toast.error("Không thể tải chi tiết đơn hàng.");
    }
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setFormData({
      trangThai: order.trangThai,
      diaChi: order.diaChi,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!editingOrder) return;
    try {
      const payload = {
        diaChiGiaoHang: formData.diaChi,
        trangThaiDonHang: formData.trangThai,
      };
      await orderService.updateOrder(editingOrder.donHangId, payload);
      toast.success("Cập nhật đơn hàng thành công!");
      setIsModalOpen(false);
      fetchOrders();
    } catch (error) {
      console.error(error);
      toast.error("Cập nhật thất bại.");
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const indexOfFirstItem = (currentPage - 1) * ITEMS_PER_PAGE;

  return (
    <>
      <div className="flex flex-wrap justify-between gap-3">
        <p className="text-gray-900 text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
          Quản lý Đơn hàng
        </p>
      </div>

      <OrderStats orders={orders} totalElements={totalElements} />

      <OrderFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        setCurrentPage={setCurrentPage}
      />

      <OrderTable
        loading={loading}
        orders={orders}
        totalElements={totalElements}
        totalPages={totalPages}
        currentPage={currentPage}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        indexOfFirstItem={indexOfFirstItem}
        onPageChange={handlePageChange}
        onViewDetail={handleViewDetail}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <OrderDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        order={selectedOrder}
        orderItems={orderItems}
      />

      <OrderEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingOrder={editingOrder}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
      />

      <ConfirmDeleteModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default AdminOrders;
