/**
 * @file index.jsx
 * @description Trang quản lý nhân viên (Container).
 * Đã tối ưu hóa: Gộp Create và Edit modal thành EmployeeFormModal.
 */
import React, { useEffect, useState } from "react";
// Đảm bảo đường dẫn import đúng (thêm một cấp ../ nếu cần tùy cấu trúc)
import userService from "../../../services/userService";
import { toast } from "react-toastify";

// Components
import EmployeeStats from "./components/EmployeeStats";
import EmployeeFilters from "./components/EmployeeFilters";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeDetailModal from "./components/modals/EmployeeDetailModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

// Import Modal FORM GỘP (Thay thế cho CreateModal và EditModal cũ)
import EmployeeFormModal from "./components/modals/EmployeeFormModal";

const AdminEmployees = () => {
  // --- 1. State Management ---
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals State
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false); // Modal dùng chung cho Thêm/Sửa
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  // Data State
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Cho Detail Modal
  const [editingEmployee, setEditingEmployee] = useState(null); // Cho Form Modal (null = Thêm mới)
  const [employeeToDeleteId, setEmployeeToDeleteId] = useState(null); // Cho Delete Modal

  // Pagination & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const ITEMS_PER_PAGE = 5;

  // --- 2. Data Fetching ---
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

      // Map dữ liệu cho phù hợp với UI
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

  // --- 3. Effects ---
  useEffect(() => {
    fetchEmployees();
  }, [currentPage, searchTerm, filterPosition]);

  // Xử lý phím ESC để đóng modal
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

  // --- 4. Handlers ---

  // Xóa nhân viên
  const handleDeleteClick = (id) => {
    setEmployeeToDeleteId(id);
    setIsConfirmDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!employeeToDeleteId) return;
    try {
      await userService.deleteStaff(employeeToDeleteId);
      toast.success("Xóa thành công!");

      // Logic lùi trang nếu xóa hết item ở trang cuối
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

  // Xem chi tiết
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

  // --- OPEN FORM HANDLERS ---

  // Mở form Thêm mới
  const handleOpenCreateModal = () => {
    setEditingEmployee(null); // Quan trọng: null báo hiệu là chế độ Thêm mới
    setIsFormModalOpen(true);
  };

  // Mở form Chỉnh sửa
  const handleOpenEditModal = (emp) => {
    setEditingEmployee(emp); // Quan trọng: có dữ liệu báo hiệu là chế độ Chỉnh sửa
    setIsFormModalOpen(true);
  };

  // --- SUBMIT FORM HANDLER (Dùng chung cho cả Thêm và Sửa) ---
  const handleFormSubmit = async (formData, avatarFile) => {
    const dataPayload = new FormData();

    try {
      if (editingEmployee) {
        // === LOGIC CẬP NHẬT (UPDATE) ===
        const updateData = {
          hoTen: formData.hoTen,
          chucVu: formData.chucVu,
          soDienThoai: formData.soDienThoai,
          email: formData.email,
          chuyenKhoa: formData.chuyenKhoa,
          kinhNghiem: formData.kinhNghiem,
          userId: editingEmployee.userId, // Cần ID user để map bên backend
        };

        // Nếu có nhập mật khẩu mới thì gửi lên, không thì thôi
        if (formData.password) {
          updateData.password = formData.password;
        }

        // Backend thường yêu cầu object JSON trong FormData với key cụ thể (ví dụ 'nhanVien')
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
        // === LOGIC THÊM MỚI (CREATE) ===

        // Validate mật khẩu bắt buộc khi tạo mới
        if (!formData.password) {
          toast.warning("Vui lòng nhập mật khẩu cho nhân viên mới.");
          return;
        }

        // Backend thường yêu cầu object JSON trong FormData với key cụ thể (ví dụ 'nguoiDung')
        dataPayload.append(
          "nguoiDung",
          new Blob([JSON.stringify(formData)], { type: "application/json" })
        );

        if (avatarFile) {
          dataPayload.append("anhDaiDien", avatarFile);
        }

        await userService.createUnifiedUser(dataPayload);
        toast.success("Tạo mới nhân viên thành công!");
      }

      // Các bước chung sau khi thành công
      setIsFormModalOpen(false);
      fetchEmployees();
    } catch (error) {
      console.error("Lỗi submit form:", error);
      const msg =
        error.response?.data?.message || error.message || "Thao tác thất bại.";
      toast.error(msg);
    }
  };

  // Phân trang
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // --- 5. Derived Data (Thống kê) ---
  const indexOfFirstItem = (currentPage - 1) * ITEMS_PER_PAGE;

  // Tính thống kê (đơn giản trên trang hiện tại, hoặc lấy từ API thống kê riêng)
  const countVets = employees.filter(
    (e) =>
      e.chucVu &&
      (e.chucVu.toLowerCase().includes("bác sĩ") ||
        e.chucVu.toLowerCase().includes("doctor"))
  ).length;

  const countGroomers = employees.filter(
    (e) =>
      e.chucVu &&
      (e.chucVu.toLowerCase().includes("spa") ||
        e.chucVu.toLowerCase().includes("grooming"))
  ).length;

  const stats = [
    {
      title: "Tổng nhân viên",
      value: totalElements,
      icon: "badge",
      color: "text-blue-600",
      bg: "bg-blue-100",
      border: "border-blue-600",
    },
    {
      title: "Bác sĩ thú y",
      value: countVets,
      icon: "medical_services",
      color: "text-green-600",
      bg: "bg-green-100",
      border: "border-green-500",
    },
    {
      title: "Bộ phận Spa/Grooming",
      value: countGroomers,
      icon: "content_cut",
      color: "text-pink-600",
      bg: "bg-pink-100",
      border: "border-pink-500",
    },
  ];

  // --- 6. Render ---
  return (
    <>
      <div className="flex flex-wrap justify-between gap-3">
        <p className="text-gray-900 text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
          Quản lý Nhân viên
        </p>
      </div>

      <EmployeeStats stats={stats} />

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

      {/* Modal Xem chi tiết */}
      <EmployeeDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        employee={selectedEmployee}
      />

      {/* Modal Form GỘP (Create & Edit) */}
      <EmployeeFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        initialData={editingEmployee} // Truyền null nếu tạo mới, object nếu sửa
        onSubmit={handleFormSubmit} // Hàm xử lý chung
      />

      {/* Modal Xác nhận xóa */}
      <ConfirmDeleteModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default AdminEmployees;
