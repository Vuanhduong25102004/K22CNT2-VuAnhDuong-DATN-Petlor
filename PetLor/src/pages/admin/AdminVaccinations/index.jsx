import React, { useState, useEffect } from "react";
import userService from "../../../services/userService";
import vaccinationService from "../../../services/vaccinationService";
import { toast } from "react-toastify";

// Components
import VaccinationStats from "./components/VaccinationStats";
import VaccinationFilters from "./components/VaccinationFilters";
import VaccinationTable from "./components/VaccinationTable";
import VaccinationDetailModal from "./components/modals/VaccinationDetailModal";
import VaccinationFormModal from "./components/modals/VaccinationFormModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const AdminVaccinations = () => {
  // State
  const [vaccinations, setVaccinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [staffList, setStaffList] = useState([]);

  // Stats State
  const [stats, setStats] = useState({
    total: 0,
    todayCount: 0,
    upcomingRewarn: 0,
    overdue: 0,
  });

  // Modal State
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  // Selected Data
  const [selectedVaccination, setSelectedVaccination] = useState(null);
  const [editingVaccination, setEditingVaccination] = useState(null);
  const [vaccinationToDeleteId, setVaccinationToDeleteId] = useState(null);

  // Filters & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const ITEMS_PER_PAGE = 20;

  // --- Fetch Data Logic ---
  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Vaccinations
      const params = {
        page: currentPage - 1,
        size: ITEMS_PER_PAGE,
      };

      const response = await vaccinationService.getAllVaccinationRecords(params);
      let content = response.content || [];

      // 2. Client-side Filtering (nếu API chưa hỗ trợ filter sâu)
      if (searchTerm) {
        const lowerTerm = searchTerm.toLowerCase();
        content = content.filter(
          (v) =>
            v.tenThuCung.toLowerCase().includes(lowerTerm) ||
            v.tenVacXin.toLowerCase().includes(lowerTerm)
        );
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (filterType === "OVERDUE") {
        content = content.filter((v) => {
          if (!v.ngayTaiChung) return false;
          const d = new Date(v.ngayTaiChung);
          d.setHours(0, 0, 0, 0);
          return d < today;
        });
      } else if (filterType === "UPCOMING") {
        // Sắp đến hạn trong 7 ngày
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        content = content.filter((v) => {
          if (!v.ngayTaiChung) return false;
          const d = new Date(v.ngayTaiChung);
          d.setHours(0, 0, 0, 0);
          return d >= today && d <= nextWeek;
        });
      }

      setVaccinations(content);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);

      // 3. Tính Stats (Tạm tính trên data response nếu không có API count riêng)
      // Lưu ý: Thực tế nên gọi API lấy tất cả hoặc endpoint dashboard riêng
      calculateStats(content);
    } catch (error) {
      console.error("Error fetching data", error);
      toast.error("Lỗi tải dữ liệu tiêm chủng");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    let todayCount = 0;
    let overdue = 0;
    let upcoming = 0;

    data.forEach((v) => {
      // Count today actions
      if (
        v.ngayTiem &&
        new Date(v.ngayTiem).toDateString() === today.toDateString()
      ) {
        todayCount++;
      }
      // Count revaccination status
      if (v.ngayTaiChung) {
        const reDate = new Date(v.ngayTaiChung);
        reDate.setHours(0, 0, 0, 0);
        if (reDate < today) overdue++;
        else if (reDate <= nextWeek) upcoming++;
      }
    });

    setStats({
      total: data.length, // Hoặc lấy từ totalElements nếu pagination đúng
      todayCount,
      overdue,
      upcomingRewarn: upcoming,
    });
  };

  // Load Staff for dropdown
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await userService.getAllStaff({ size: 100 });
        setStaffList(res.content || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchStaff();
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentPage, searchTerm, filterType]);

  // --- Handlers ---
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  const handleDeleteClick = (id) => {
    setVaccinationToDeleteId(id);
    setIsConfirmDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!vaccinationToDeleteId) return;
    try {
      await vaccinationService.deleteVaccinationRecord(vaccinationToDeleteId);
      toast.success("Đã xóa hồ sơ thành công");
      fetchData();
    } catch (error) {
      toast.error("Xóa thất bại");
    } finally {
      setIsConfirmDeleteModalOpen(false);
      setVaccinationToDeleteId(null);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingVaccination) {
        await vaccinationService.updateVaccinationRecord(
          editingVaccination.tiemChungId,
          formData
        );
        toast.success("Cập nhật hồ sơ thành công!");
      } else {
        await vaccinationService.createVaccinationRecord(formData);
        toast.success("Tạo hồ sơ tiêm mới thành công!");
      }
      setIsFormModalOpen(false);
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-between gap-3">
        <p className="text-gray-900 text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
          Quản lý Tiêm chủng
        </p>
      </div>

      <VaccinationStats
        total={stats.total}
        todayCount={stats.todayCount}
        upcomingRewarn={stats.upcomingRewarn}
        overdue={stats.overdue}
      />

      <VaccinationFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
        setCurrentPage={setCurrentPage}
        onOpenAddModal={() => {
          setEditingVaccination(null);
          setIsFormModalOpen(true);
        }}
      />

      <VaccinationTable
        loading={loading}
        vaccinations={vaccinations}
        totalElements={totalElements}
        totalPages={totalPages}
        currentPage={currentPage}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        indexOfFirstItem={(currentPage - 1) * ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
        onViewDetail={(item) => {
          setSelectedVaccination(item);
          setIsDetailModalOpen(true);
        }}
        onEdit={(item) => {
          setEditingVaccination(item);
          setIsFormModalOpen(true);
        }}
        onDelete={handleDeleteClick}
      />

      {/* Modals */}
      <VaccinationDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        data={selectedVaccination}
      />

      <VaccinationFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        initialData={editingVaccination}
        staffList={staffList}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDeleteModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Xóa hồ sơ tiêm chủng?"
        message="Bạn có chắc chắn muốn xóa hồ sơ này? Hành động này sẽ ảnh hưởng đến lịch sử y tế của thú cưng."
      />
    </>
  );
};

export default AdminVaccinations;
