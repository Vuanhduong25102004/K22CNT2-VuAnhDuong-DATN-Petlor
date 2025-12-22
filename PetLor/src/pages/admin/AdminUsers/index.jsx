/**
 * @file index.jsx
 * @description Trang quản lý người dùng (Container) - Đã fix lỗi đếm Stats.
 */
import React, { useEffect, useState } from "react";
import useEscapeKey from "../../../hooks/useEscapeKey";
import userService from "../../../services/userService";
import { toast } from "react-toastify";

// Components
import UserStats from "./components/UserStats";
import UserFilters from "./components/UserFilters";
import UserTable from "./components/UserTable";
import UserDetailModal from "./components/modals/UserDetailModal";
import UserFormModal from "./components/modals/UserFormModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const AdminUsers = () => {
  // --- State Management ---
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- State Thống kê (Mới) ---
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStaff: 0,
  });

  // Modals
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  // Data Selection
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null); // null = Create
  const [userToDeleteId, setUserToDeleteId] = useState(null);

  // Filters & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const ITEMS_PER_PAGE = 5;

  // --- 1. Logic Fetch Stats (Fix lỗi đếm) ---
  // Gọi 1 lần lấy danh sách lớn (size=1000) để đếm thủ công phía Client
  const fetchStats = async () => {
    try {
      const params = {
        page: 0,
        size: 1000, // Lấy số lượng lớn để bao quát hết DB hiện tại
      };

      const response = await userService.getAllUsers(params);
      const allUsers = response?.content || [];

      // Định nghĩa các role thuộc nhóm Nhân viên/Chuyên gia
      // Dựa trên JSON của bạn, tôi thấy có ADMIN, SPA, DOCTOR
      const staffRoles = ["DOCTOR", "RECEPTIONIST", "STAFF", "SPA", "ADMIN"];

      let countUser = 0;
      let countStaff = 0;

      allUsers.forEach((user) => {
        // Chuẩn hóa role về chữ hoa để so sánh cho chính xác
        const currentRole = user.role ? user.role.toUpperCase() : "";

        if (currentRole === "USER") {
          countUser++;
        } else if (staffRoles.includes(currentRole)) {
          countStaff++;
        }
      });

      setStats({
        totalUsers: countUser,
        totalStaff: countStaff,
      });
    } catch (error) {
      console.error("Lỗi tính thống kê:", error);
      // Không toast lỗi ở đây để tránh spam thông báo nếu API fail ngầm
    }
  };

  // --- 2. Logic Fetch Table Data (Phân trang) ---
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const page = currentPage - 1;
      const params = {
        page,
        size: ITEMS_PER_PAGE,
        search: debouncedSearchTerm,
        role: filterRole,
      };
      if (!params.search) delete params.search;
      if (!params.role) delete params.role;

      const response = await userService.getAllUsers(params);
      setUsers(response?.content || []);
      setTotalPages(response?.totalPages || 0);
      setTotalElements(response?.totalElements || 0);
    } catch (error) {
      console.error("Lỗi tải danh sách người dùng:", error);
      toast.error("Không thể tải danh sách người dùng.");
    } finally {
      setLoading(false);
    }
  };

  // Debounce Search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Effect: Load Table khi filter đổi
  useEffect(() => {
    fetchUsers();
  }, [currentPage, debouncedSearchTerm, filterRole]);

  // Effect: Load Stats 1 lần khi vào trang
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
    setUserToDeleteId(id);
    setIsConfirmDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDeleteId) return;
    try {
      await userService.deleteUser(userToDeleteId);
      toast.success("Xóa người dùng thành công!");

      // Cập nhật lại cả Stats và Table
      fetchStats();
      if (users.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        fetchUsers();
      }
    } catch (error) {
      console.error("Lỗi xóa:", error);
      toast.error(
        "Xóa thất bại (người dùng có thể đang có dữ liệu liên quan)."
      );
    } finally {
      setIsConfirmDeleteModalOpen(false);
      setUserToDeleteId(null);
    }
  };

  const handleViewDetail = (user) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  };

  const handleOpenCreateModal = () => {
    setEditingUser(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (user) => {
    setEditingUser(user);
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = async (formData, avatarFile) => {
    const dataPayload = new FormData();

    // Validate cơ bản cho create
    if (
      !editingUser &&
      (!formData.hoTen || !formData.email || !formData.password)
    ) {
      toast.warning("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    try {
      if (editingUser) {
        // --- UPDATE ---
        const userData = {
          hoTen: formData.hoTen,
          email: formData.email,
          soDienThoai: formData.soDienThoai,
          diaChi: formData.diaChi,
          role: formData.role,
          chucVu: formData.chucVu,
          chuyenKhoa: formData.chuyenKhoa,
          kinhNghiem: formData.kinhNghiem,
        };
        if (formData.password) userData.password = formData.password;

        dataPayload.append(
          "nguoiDung",
          new Blob([JSON.stringify(userData)], { type: "application/json" })
        );
        if (avatarFile) dataPayload.append("anhDaiDien", avatarFile);

        await userService.updateUser(editingUser.userId, dataPayload);
        toast.success("Cập nhật thành công!");
      } else {
        // --- CREATE ---
        if (formData.role === "USER") {
          dataPayload.append(
            "nguoiDung",
            new Blob([JSON.stringify(formData)], { type: "application/json" })
          );
          if (avatarFile) {
            dataPayload.append("anhDaiDien", avatarFile);
          }
          await userService.createUnifiedUser(dataPayload);
          toast.success("Tạo mới khách hàng thành công!");
        } else {
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
      }

      setIsFormModalOpen(false);
      fetchUsers(); // Tải lại bảng
      fetchStats(); // Tải lại số liệu thống kê
    } catch (error) {
      console.error("Lỗi thao tác:", error);
      const msg = error.response?.data?.message || "Thao tác thất bại.";
      toast.error(msg);
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  const indexOfFirstItem = (currentPage - 1) * ITEMS_PER_PAGE;

  return (
    <>
      <div className="flex flex-wrap justify-between gap-3">
        <p className="text-gray-900 text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
          Quản lý Người dùng
        </p>
      </div>

      {/* Truyền Props xuống UserStats */}
      <UserStats totalUsers={stats.totalUsers} totalStaff={stats.totalStaff} />

      <UserFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterRole={filterRole}
        setFilterRole={setFilterRole}
        setCurrentPage={setCurrentPage}
        onOpenCreateModal={handleOpenCreateModal}
      />

      <UserTable
        loading={loading}
        users={users}
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

      {/* Modal Detail */}
      <UserDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseModals}
        user={selectedUser}
      />

      {/* Modal Form Gộp */}
      <UserFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseModals}
        initialData={editingUser}
        onSubmit={handleFormSubmit}
      />

      {/* Modal Confirm Delete */}
      <ConfirmDeleteModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={handleCloseModals}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default AdminUsers;
