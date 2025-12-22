/**
 * @file index.jsx
 * @description Trang quản lý nhân viên (Container) - Đã fix lỗi đếm Stats.
 */
import React, { useEffect, useState } from "react";
import useEscapeKey from "../../../hooks/useEscapeKey";
import userService from "../../../services/userService";
import { toast } from "react-toastify";

// Components
import EmployeeStats from "./components/EmployeeStats";
import EmployeeFilters from "./components/EmployeeFilters";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeDetailModal from "./components/modals/EmployeeDetailModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import EmployeeFormModal from "./components/modals/EmployeeFormModal";

const AdminEmployees = () => {
  // --- 1. State Management ---
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // State Thống kê (Mới)
  const [stats, setStats] = useState({
    totalStaff: 0,
    countVets: 0,
    countSpa: 0,
  });

  // Modals State
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  // Data State
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [employeeToDeleteId, setEmployeeToDeleteId] = useState(null);

  // Pagination & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const ITEMS_PER_PAGE = 5;

  // --- 2. Logic Fetch Stats (MỚI) ---
  const fetchStats = async () => {
    try {
      // Tải danh sách lớn (1000 item) để đếm
      const response = await userService.getAllStaff({
        page: 0,
        size: 1000,
      });
      const allStaff = response?.content ?? [];

      let vets = 0;
      let spa = 0;

      allStaff.forEach((e) => {
        // Kiểm tra dựa trên Chức vụ (chucVu) hoặc Role
        const title = e.chucVu ? e.chucVu.toLowerCase() : "";
        const role = e.role ? e.role.toLowerCase() : "";

        // Logic đếm Bác sĩ
        if (
          title.includes("bác sĩ") ||
          title.includes("doctor") ||
          role === "doctor"
        ) {
          vets++;
        }

        // Logic đếm Spa
        if (
          title.includes("spa") ||
          title.includes("grooming") ||
          role === "spa"
        ) {
          spa++;
        }
      });

      setStats({
        totalStaff: response?.totalElements || allStaff.length,
        countVets: vets,
        countSpa: spa,
      });
    } catch (error) {
      console.error("Lỗi tính thống kê nhân viên:", error);
    }
  };

  // --- 3. Data Fetching (Table) ---
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const page = currentPage - 1;
      const params = {
        page,
        size: ITEMS_PER_PAGE,
        search: searchTerm,
        position: filterPosition,
      };
      if (!params.search) delete params.search;
      if (!params.position) delete params.position;

      const response = await userService.getAllStaff(params);
      const employeesData = response?.content ?? [];

      const formattedData = employeesData.map((emp) => ({
        ...emp,
        nhanVienId: emp.nhanVienId,
        hoTen: emp.hoTen || "Chưa có tên",
        email: emp.email || "---",
        soDienThoai: emp.soDienThoai || "---",
        chucVu: emp.chucVu || "Nhân viên",
        img: emp.anhDaiDien
          ? `http://localhost:8080/uploads/${emp.anhDaiDien}`
          : "https://placehold.co/100x100?text=Staff",
      }));

      setEmployees(formattedData);
      setTotalPages(response?.totalPages || 0);
      setTotalElements(response?.totalElements || 0);
    } catch (error) {
      console.error("Lỗi tải danh sách nhân viên:", error);
      toast.error("Không thể tải dữ liệu nhân viên.");
    } finally {
      setLoading(false);
    }
  };

  // --- Effects ---
  useEffect(() => {
    fetchEmployees();
  }, [currentPage, searchTerm, filterPosition]);

  // Load Stats 1 lần
  useEffect(() => {
    fetchStats();
  }, []);

  const handleCloseModals = () => {
    setIsDetailModalOpen(false);
    setIsFormModalOpen(false);
    setIsConfirmDeleteModalOpen(false);
  };

  useEscapeKey(
    handleCloseModals,
    isDetailModalOpen || isFormModalOpen || isConfirmDeleteModalOpen
  );

  // --- Handlers ---

  const handleDeleteClick = (id) => {
    setEmployeeToDeleteId(id);
    setIsConfirmDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!employeeToDeleteId) return;
    try {
      await userService.deleteStaff(employeeToDeleteId);
      toast.success("Xóa thành công!");

      fetchStats(); // Cập nhật lại thống kê sau khi xóa

      if (employees.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        fetchEmployees();
      }
    } catch (error) {
      console.error(error);
      toast.error("Xóa thất bại! Có thể nhân viên đang có dữ liệu liên quan.");
    } finally {
      setIsConfirmDeleteModalOpen(false);
      setEmployeeToDeleteId(null);
    }
  };

  const handleViewDetail = async (id) => {
    try {
      const data = await userService.getStaffById(id);
      setSelectedEmployee(data);
      setIsDetailModalOpen(true);
    } catch (error) {
      console.error("Lỗi tải chi tiết nhân viên:", error);
      toast.error("Không thể tải chi tiết nhân viên.");
    }
  };

  const handleOpenCreateModal = () => {
    setEditingEmployee(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (emp) => {
    setEditingEmployee(emp);
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = async (formData, avatarFile) => {
    const dataPayload = new FormData();

    try {
      if (editingEmployee) {
        // UPDATE
        const updateData = {
          hoTen: formData.hoTen,
          chucVu: formData.chucVu,
          soDienThoai: formData.soDienThoai,
          email: formData.email,
          chuyenKhoa: formData.chuyenKhoa,
          kinhNghiem: formData.kinhNghiem,
          role: formData.role,
          userId: editingEmployee.userId,
        };
        if (formData.password) {
          updateData.password = formData.password;
        }

        dataPayload.append(
          "nhanVien",
          new Blob([JSON.stringify(updateData)], { type: "application/json" })
        );
        if (avatarFile) {
          dataPayload.append("anhDaiDien", avatarFile);
        }

        await userService.updateStaff(editingEmployee.nhanVienId, dataPayload);
        toast.success("Cập nhật nhân viên thành công!");
      } else {
        // CREATE
        if (!formData.password) {
          toast.warning("Vui lòng nhập mật khẩu cho nhân viên mới.");
          return;
        }
        dataPayload.append(
          "nhanVien",
          new Blob([JSON.stringify(formData)], { type: "application/json" })
        );
        if (avatarFile) {
          dataPayload.append("anhDaiDien", avatarFile);
        }

        await userService.createStaff(dataPayload);
        toast.success("Tạo mới nhân viên thành công!");
      }

      setIsFormModalOpen(false);
      fetchEmployees();
      fetchStats(); // Cập nhật lại thống kê sau khi thêm/sửa
    } catch (error) {
      console.error("Lỗi submit form:", error);
      const msg =
        error.response?.data?.message || error.message || "Thao tác thất bại.";
      toast.error(msg);
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
          Quản lý Nhân viên
        </p>
      </div>

      {/* Truyền Props xuống component con */}
      <EmployeeStats
        totalStaff={stats.totalStaff}
        countVets={stats.countVets}
        countSpa={stats.countSpa}
      />

      <EmployeeFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterPosition={filterPosition}
        setFilterPosition={setFilterPosition}
        setCurrentPage={setCurrentPage}
        onOpenCreateModal={handleOpenCreateModal}
      />

      <EmployeeTable
        loading={loading}
        employees={employees}
        totalElements={totalElements}
        totalPages={totalPages}
        currentPage={currentPage}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        indexOfFirstItem={indexOfFirstItem}
        onPageChange={handlePageChange}
        onViewDetail={handleViewDetail}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteClick}
      />

      {/* Modals giữ nguyên */}
      <EmployeeDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseModals}
        employee={selectedEmployee}
      />

      <EmployeeFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseModals}
        initialData={editingEmployee}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDeleteModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={handleCloseModals}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default AdminEmployees;
