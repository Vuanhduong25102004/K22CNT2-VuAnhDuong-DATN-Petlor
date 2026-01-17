/**
 * @file index.jsx
 * @description Trang quản lý lịch hẹn (Container) - Updated to work with Smart Modal
 */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

// Services
import petService from "../../../services/petService";
import userService from "../../../services/userService";
import bookingService from "../../../services/bookingService";

// Components
import AppointmentStats from "./components/AppointmentStats";
import AppointmentFilters from "./components/AppointmentFilters";
import AppointmentTable from "./components/AppointmentTable";
import AppointmentDetailModal from "./components/modals/AppointmentDetailModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import AppointmentFormModal from "./components/modals/AppointmentFormModal"; // Import Modal Mới của bạn

const AdminAppointments = () => {
  // --- State ---
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  // Data Selection
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [appointmentToDeleteId, setAppointmentToDeleteId] = useState(null);

  // Dropdown Data
  const [staffList, setStaffList] = useState([]);
  const [servicesList, setServicesList] = useState([]);

  // Stats
  const [stats, setStats] = useState({
    today: 0,
    pending: 0,
    confirmed: 0,
    completedMonth: 0,
  });

  // Filters & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const ITEMS_PER_PAGE = 5;

  // --- 1. Fetch Logic (Giữ nguyên logic cũ của bạn) ---

  const fetchStats = async () => {
    try {
      const response = await bookingService.getAllAppointments({
        page: 0,
        size: 1000,
      });
      const allApts = response?.content || [];
      const now = new Date();
      const todayStr = now.toISOString().slice(0, 10);
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      let countToday = 0;
      let countPending = 0;
      let countConfirmed = 0;
      let countCompletedMonth = 0;

      allApts.forEach((apt) => {
        if (apt.thoiGianBatDau && apt.thoiGianBatDau.startsWith(todayStr))
          countToday++;
        if (apt.trangThaiLichHen === "CHO_XAC_NHAN") countPending++;
        else if (apt.trangThaiLichHen === "DA_XAC_NHAN") countConfirmed++;

        if (apt.trangThaiLichHen === "DA_HOAN_THANH" && apt.thoiGianBatDau) {
          const aptDate = new Date(apt.thoiGianBatDau);
          if (
            aptDate.getMonth() === currentMonth &&
            aptDate.getFullYear() === currentYear
          ) {
            countCompletedMonth++;
          }
        }
      });

      setStats({
        today: countToday,
        pending: countPending,
        confirmed: countConfirmed,
        completedMonth: countCompletedMonth,
      });
    } catch (error) {
      console.error("Lỗi tải thống kê:", error);
    }
  };

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const page = currentPage - 1;
      const params = {
        page,
        size: ITEMS_PER_PAGE,
        search: debouncedSearchTerm,
        status: statusFilter,
      };
      if (!params.search) delete params.search;
      if (!params.status) delete params.status;

      const response = await bookingService.getAllAppointments(params);
      setAppointments(response?.content || []);
      setTotalPages(response?.totalPages || 0);
      setTotalElements(response?.totalElements || 0);
    } catch (error) {
      console.error("Lỗi tải lịch hẹn:", error);
      toast.error("Không thể tải danh sách lịch hẹn");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [staffRes, servicesRes] = await Promise.all([
          userService.getAllStaff({ page: 0, size: 100 }),
          petService.getAllServices(),
        ]);
        setStaffList(staffRes?.content || []);
        setServicesList(
          Array.isArray(servicesRes) ? servicesRes : servicesRes?.content || []
        );
      } catch (error) {
        console.error("Lỗi tải dữ liệu ban đầu:", error);
      }
    };
    fetchInitialData();
    fetchStats();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    fetchAppointments();
  }, [currentPage, debouncedSearchTerm, statusFilter]);

  // --- Handlers ---

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  const handleDeleteClick = (id) => {
    setAppointmentToDeleteId(id);
    setIsConfirmDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!appointmentToDeleteId) return;
    try {
      await bookingService.deleteAppointment(appointmentToDeleteId);
      toast.success("Xóa lịch hẹn thành công!");
      fetchAppointments();
      fetchStats();
    } catch (error) {
      toast.error("Xóa thất bại!");
    } finally {
      setIsConfirmDeleteModalOpen(false);
      setAppointmentToDeleteId(null);
    }
  };

  const handleViewDetail = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailModalOpen(true);
  };

  const handleOpenCreateModal = () => {
    setEditingAppointment(null); // null = Chế độ tạo mới
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (appointment) => {
    // Truyền nguyên object appointment vào.
    // Modal mới có useEffect thông minh để tự bóc tách dữ liệu (nested objects)
    // Lưu ý: Đảm bảo mapping đúng tên trường trạng thái nếu cần
    const appointmentForForm = {
      ...appointment,
      trangThai: appointment.trangThaiLichHen, // Mapping lại tên nếu backend trả về khác tên form
    };
    setEditingAppointment(appointmentForForm);
    setIsFormModalOpen(true);
  };

  // --- 2. HÀM SUBMIT MỚI (GỌN HƠN) ---
  const handleFormSubmit = async (formData) => {
    try {
      if (editingAppointment) {
        // === UPDATE ===
        await bookingService.updateAppointment(
          editingAppointment.lichHenId,
          formData
        );
        toast.success("Cập nhật lịch hẹn thành công!");
      } else {
        // === CREATE ===
        await bookingService.createAppointment(formData);
        toast.success("Tạo lịch hẹn mới thành công!");
      }

      // Refresh lại dữ liệu
      setIsFormModalOpen(false);
      fetchAppointments();
      fetchStats();
    } catch (error) {
      console.error("Lỗi thao tác:", error);
      // Hiển thị lỗi chi tiết từ backend nếu có
      const message =
        error.response?.data?.message || error.message || "Thao tác thất bại.";
      toast.error(message);
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-between gap-3">
        <p className="text-gray-900 text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
          Quản lý Lịch hẹn
        </p>
      </div>

      <AppointmentStats
        today={stats.today}
        pending={stats.pending}
        confirmed={stats.confirmed}
        completedMonth={stats.completedMonth}
      />

      <AppointmentFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        setCurrentPage={setCurrentPage}
        onOpenAddModal={handleOpenCreateModal}
      />

      <AppointmentTable
        loading={loading}
        appointments={appointments}
        totalElements={totalElements}
        totalPages={totalPages}
        currentPage={currentPage}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
        indexOfFirstItem={(currentPage - 1) * ITEMS_PER_PAGE}
        onViewDetail={handleViewDetail}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteClick}
      />

      {/* Modals */}
      <AppointmentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        appointment={selectedAppointment}
      />

      {/* --- MODAL FORM MỚI --- */}
      <AppointmentFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        initialData={editingAppointment} // Truyền dữ liệu sửa (hoặc null)
        servicesList={servicesList} // Danh sách dịch vụ
        staffList={staffList} // Danh sách nhân viên
        onSubmit={handleFormSubmit} // Hàm xử lý API
      />

      <ConfirmDeleteModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default AdminAppointments;
