/**
 * @file index.jsx
 * @description Trang quản lý thú cưng (Container) - Đã fix lỗi Stats.
 */
import React, { useEffect, useState } from "react";
import useEscapeKey from "../../../hooks/useEscapeKey";
import petService from "../../../services/petService";
import { toast } from "react-toastify";

// Components
import PetStats from "./components/PetStats";
import PetFilters from "./components/PetFilters";
import PetTable from "./components/PetTable";
import PetDetailModal from "./components/modals/PetDetailModal";
import PetFormModal from "./components/modals/PetFormModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const AdminPets = () => {
  // --- 1. State Management ---
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- State Thống kê (Mới) ---
  const [stats, setStats] = useState({
    totalPets: 0,
    countDogs: 0,
    countCats: 0,
  });

  // Filters & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecies, setFilterSpecies] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const ITEMS_PER_PAGE = 5;

  // Modals
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  // Data Selection
  const [selectedPet, setSelectedPet] = useState(null);
  const [editingPet, setEditingPet] = useState(null);
  const [petToDeleteId, setPetToDeleteId] = useState(null);

  // --- 2. Logic Fetch Stats (Mới) ---
  const fetchStats = async () => {
    try {
      // Gọi 1 lần lấy danh sách lớn (size=1000) để đếm
      const params = { page: 0, size: 1000 };
      const response = await petService.getAllPets(params);
      const allPets = response?.content || [];

      let dogs = 0;
      let cats = 0;

      allPets.forEach((pet) => {
        const species = pet.chungLoai ? pet.chungLoai.toLowerCase().trim() : "";
        // Logic đếm dựa trên chuỗi "chó" hoặc "dog"
        if (species === "chó" || species.includes("dog")) {
          dogs++;
        }
        // Logic đếm dựa trên chuỗi "mèo" hoặc "cat"
        else if (species === "mèo" || species.includes("cat")) {
          cats++;
        }
      });

      setStats({
        totalPets: allPets.length, // Hoặc response.totalElements nếu muốn chuẩn xác hơn
        countDogs: dogs,
        countCats: cats,
      });
    } catch (error) {
      console.error("Lỗi tính thống kê thú cưng:", error);
    }
  };

  // --- 3. Data Fetching (Table) ---
  const fetchPets = async () => {
    setLoading(true);
    try {
      let petsData = [];
      let totalP = 0;
      let totalE = 0;

      const term = searchTerm ? searchTerm.trim() : "";

      if (term) {
        // Logic Search (Giữ nguyên của bạn)
        const data = await petService.searchGlobal(term);
        const allSearchResults = data.thuCungs || [];

        totalE = allSearchResults.length;
        totalP = Math.ceil(totalE / ITEMS_PER_PAGE);

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        petsData = allSearchResults.slice(
          startIndex,
          startIndex + ITEMS_PER_PAGE
        );
      } else {
        // Logic Filter & Pagination (Giữ nguyên)
        const page = currentPage - 1;
        const params = {
          page,
          size: ITEMS_PER_PAGE,
          species: filterSpecies,
          gender: filterGender,
        };
        if (!params.species) delete params.species;
        if (!params.gender) delete params.gender;

        const response = await petService.getAllPets(params);
        petsData = response?.content || [];
        totalP = response?.totalPages || 0;
        totalE = response?.totalElements || 0;
      }

      // Map Data
      const formattedData = petsData.map((pet) => ({
        ...pet,
        thuCungId: pet.thuCungId,
        ownerName: pet.tenChu || "Chưa rõ",
        ownerId: pet.userId,
        img: pet.hinhAnh
          ? `http://localhost:8080/uploads/${pet.hinhAnh}`
          : "https://placehold.co/100x100?text=Pet",
        tenThuCung: pet.tenThuCung || "Chưa đặt tên",
        chungLoai: pet.chungLoai || "Khác",
        giongLoai: pet.giongLoai || "---",
        ngaySinh: pet.ngaySinh,
        gioiTinh: pet.gioiTinh || "Chưa rõ",
        ghiChuSucKhoe: pet.ghiChuSucKhoe || "Bình thường",
      }));

      setPets(formattedData);
      setTotalPages(totalP);
      setTotalElements(totalE);
    } catch (error) {
      console.error("Lỗi tải danh sách thú cưng:", error);
      toast.error("Không thể tải dữ liệu thú cưng.");
    } finally {
      setLoading(false);
    }
  };

  // Effect: Load Stats 1 lần khi vào trang
  useEffect(() => {
    fetchStats();
  }, []);

  // Effect: Load Table khi filter đổi
  useEffect(() => {
    fetchPets();
  }, [currentPage, searchTerm, filterSpecies, filterGender]);

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
    setPetToDeleteId(id);
    setIsConfirmDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!petToDeleteId) return;
    try {
      await petService.deletePet(petToDeleteId);
      toast.success("Xóa thành công!");

      // Cập nhật lại Stats và Table
      fetchStats();
      if (pets.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        fetchPets();
      }
    } catch (error) {
      console.error("Lỗi xóa:", error);
      toast.error("Xóa thất bại! Có thể thú cưng đang có lịch hẹn.");
    } finally {
      setIsConfirmDeleteModalOpen(false);
      setPetToDeleteId(null);
    }
  };

  const handleViewDetail = (pet) => {
    setSelectedPet(pet);
    setIsDetailModalOpen(true);
  };

  const handleOpenCreateModal = () => {
    setEditingPet(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (pet) => {
    setEditingPet(pet);
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = async (submissionData) => {
    try {
      if (editingPet) {
        await petService.updatePet(editingPet.thuCungId, submissionData);
        toast.success("Cập nhật thành công!");
      } else {
        await petService.createPet(submissionData);
        toast.success("Thêm mới thành công!");
      }
      setIsFormModalOpen(false);
      fetchPets();
      fetchStats();
    } catch (error) {
      console.error("Lỗi thao tác:", error);
      toast.error("Thao tác thất bại. Vui lòng kiểm tra lại server.");
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
          Quản lý Thú cưng
        </p>
      </div>

      {/* Truyền Props xuống component con */}
      <PetStats
        totalPets={stats.totalPets}
        countDogs={stats.countDogs}
        countCats={stats.countCats}
      />

      <PetFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterSpecies={filterSpecies}
        setFilterSpecies={setFilterSpecies}
        filterGender={filterGender}
        setFilterGender={setFilterGender}
        setCurrentPage={setCurrentPage}
        onOpenCreateModal={handleOpenCreateModal}
      />

      <PetTable
        loading={loading}
        pets={pets}
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
      <PetDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseModals}
        pet={selectedPet}
      />

      <PetFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseModals}
        initialData={editingPet}
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

export default AdminPets;
