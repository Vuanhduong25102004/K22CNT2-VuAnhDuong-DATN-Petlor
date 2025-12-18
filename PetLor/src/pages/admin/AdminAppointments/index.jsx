/**
 * @file index.jsx
 * @description Trang quản lý lịch hẹn (Container).
 * Đã tối ưu hóa: Sử dụng AppointmentFormModal gộp.
 */
import React, { useState, useEffect } from "react";
import petService from "../../../services/petService";
import userService from "../../../services/userService";
import { toast } from "react-toastify";

// Components
import AppointmentStats from "./components/AppointmentStats";
import AppointmentFilters from "./components/AppointmentFilters";
import AppointmentTable from "./components/AppointmentTable";
import AppointmentDetailModal from "./components/modals/AppointmentDetailModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

// Import Modal Gộp
import AppointmentFormModal from "./components/modals/AppointmentFormModal";

const AdminAppointments = () => {
  // --- State ---
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false); // Modal gộp
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  // Data Selection
  const [selectedAppointment, setSelectedAppointment] = useState(null); // Cho Detail
  const [editingAppointment, setEditingAppointment] = useState(null); // Cho Form (null = Create)
  const [appointmentToDeleteId, setAppointmentToDeleteId] = useState(null);

  // Dropdown Data
  const [staffList, setStaffList] = useState([]);
  const [servicesList, setServicesList] = useState([]);

  // Stats
  const [statsData, setStatsData] = useState({
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
  const ITEMS_PER_PAGE = 6;

  // --- Fetching ---
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

  const fetchStats = async () => {
    try {
      const response = await petService.getAllAppointments({
        page: 0,
        size: 1000,
      });
      const allApts = response?.content || [];
      const todayStr = new Date().toISOString().slice(0, 10);

      setStatsData({
        today: allApts.filter(
          (a) => a.thoiGianBatDau && a.thoiGianBatDau.startsWith(todayStr)
        ).length,
        pending: allApts.filter(
          (a) =>
            a.trangThaiLichHen &&
            (a.trangThaiLichHen.includes("CHỜ") ||
              a.trangThaiLichHen.includes("PENDING"))
        ).length,
        confirmed: allApts.filter((a) => a.trangThaiLichHen === "ĐÃ XÁC NHẬN")
          .length,
        completedMonth: allApts.filter(
          (a) =>
            a.trangThaiLichHen &&
            a.trangThaiLichHen.includes("HOÀN THÀNH") &&
            new Date(a.thoiGianBatDau).getMonth() === new Date().getMonth()
        ).length,
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

      const response = await petService.getAllAppointments(params);
      setAppointments(response?.content || []);
      setTotalPages(response?.totalPages || 0);
      setTotalElements(response?.totalElements || 0);
    } catch (error) {
      console.error("Lỗi tải lịch hẹn:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    fetchAppointments();
  }, [currentPage, debouncedSearchTerm, statusFilter]);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setIsDetailModalOpen(false);
        setIsFormModalOpen(false);
        setIsConfirmDeleteModalOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, []);

  // --- Handlers ---

  // Xóa
  const handleDeleteClick = (id) => {
    setAppointmentToDeleteId(id);
    setIsConfirmDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!appointmentToDeleteId) return;
    try {
      await petService.deleteAppointment(appointmentToDeleteId);
      fetchAppointments();
      fetchStats();
      toast.success("Xóa lịch hẹn thành công!");
    } catch (error) {
      toast.error("Xóa thất bại!");
    } finally {
      setIsConfirmDeleteModalOpen(false);
      setAppointmentToDeleteId(null);
    }
  };

  // Chi tiết
  const handleViewDetail = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailModalOpen(true);
  };

  // Form Handlers
  const handleOpenCreateModal = () => {
    setEditingAppointment(null); // null = Create
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (appointment) => {
    setEditingAppointment(appointment); // object = Edit
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    // Validate cơ bản
    if (
      !formData.thoiGianBatDau ||
      !formData.dichVuId ||
      !formData.tenKhachHang
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin bắt buộc.");
      return;
    }

    try {
      if (editingAppointment) {
        // --- LOGIC UPDATE ---
        // Tùy vào API của bạn, có thể bạn chỉ muốn update trạng thái/nhân viên,
        // hoặc cho phép update toàn bộ. Ở đây mình gửi payload đầy đủ hoặc
        // payload rút gọn tùy theo requirement API cũ của bạn.
        // Dựa trên code cũ của bạn, update chỉ gửi `nhanVienId` và `trangThaiLichHen`.
        // Tuy nhiên, với form gộp, ta có thể gửi nhiều hơn nếu API hỗ trợ.
        // Ở đây mình sẽ ưu tiên gửi các trường quan trọng.

        const updatePayload = {
          nhanVienId: formData.nhanVienId
            ? parseInt(formData.nhanVienId)
            : null,
          trangThaiLichHen: formData.trangThaiLichHen,
          // Nếu API hỗ trợ update ngày giờ/dịch vụ thì thêm vào đây:
          // thoiGianBatDau: formData.thoiGianBatDau,
          // dichVuId: parseInt(formData.dichVuId),
        };

        await petService.updateAppointment(
          editingAppointment.lichHenId,
          updatePayload
        );
        toast.success("Cập nhật lịch hẹn thành công!");
      } else {
        // --- LOGIC CREATE ---
        const createPayload = {
          thoiGianBatDau: formData.thoiGianBatDau,
          dichVuId: parseInt(formData.dichVuId),
          nhanVienId: formData.nhanVienId
            ? parseInt(formData.nhanVienId)
            : null,
          tenKhachHang: formData.tenKhachHang,
          soDienThoaiKhachHang: formData.soDienThoaiKhachHang,
          tenThuCung: formData.tenThuCung,
          chungLoai: formData.chungLoai,
          giongLoai: formData.giongLoai,
          gioiTinh: formData.gioiTinh,
          ngaySinh: formData.ngaySinh,
          ghiChuKhachHang: formData.ghiChu,
        };

        // Lọc bỏ các trường rỗng/undefined
        const cleanPayload = Object.fromEntries(
          Object.entries(createPayload).filter(
            ([_, v]) => v != null && v !== ""
          )
        );

        await petService.createAppointment(cleanPayload);
        toast.success("Tạo lịch hẹn mới thành công!");
      }

      setIsFormModalOpen(false);
      fetchAppointments();
      fetchStats();
    } catch (error) {
      console.error("Lỗi thao tác:", error);
      const msg =
        error.response?.data?.message || error.message || "Thao tác thất bại.";
      toast.error(msg);
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-between gap-3">
        <p className="text-gray-900 text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
          Quản lý Lịch hẹn
        </p>
      </div>

      <AppointmentStats statsData={statsData} />

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
        setCurrentPage={setCurrentPage}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        onViewDetail={handleViewDetail}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteClick}
      />

      <AppointmentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        appointment={selectedAppointment}
      />

      {/* Modal Form Gộp */}
      <AppointmentFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        initialData={editingAppointment} // null để tạo mới, object để sửa
        servicesList={servicesList}
        staffList={staffList}
        onSubmit={handleFormSubmit}
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
