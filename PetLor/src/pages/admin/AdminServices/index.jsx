/**
 * @file index.jsx
 * @description Trang quản lý Dịch vụ (Container) - Đã cập nhật Stats Logic.
 */
import React, { useEffect, useState } from "react";
import productService from "../../../services/productService";
import { toast } from "react-toastify";

// Components
import ServiceStats from "./components/ServiceStats";
import ServiceFilters from "./components/ServiceFilters";
import ServiceTable from "./components/ServiceTable";
import ServiceDetailModal from "./components/modals/ServiceDetailModal";
import ServiceFormModal from "./components/modals/ServiceFormModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const AdminServices = () => {
  // --- 1. State Management ---
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serviceCategories, setServiceCategories] = useState([]);

  // State Thống kê (Mới)
  const [stats, setStats] = useState({
    totalServices: 0,
    maxPriceName: "---",
    avgPrice: 0,
  });

  // Modals
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  // Data selection
  const [selectedService, setSelectedService] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [serviceToDeleteId, setServiceToDeleteId] = useState(null);

  // Filters & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const ITEMS_PER_PAGE = 5;

  // --- 2. Logic Fetch Stats (MỚI) ---
  const fetchStats = async () => {
    try {
      // Tải danh sách lớn để tính toán chính xác
      const response = await productService.getAllServices({
        page: 0,
        size: 1000,
      });
      const allServices = response?.content || [];

      let maxName = "---";
      let average = 0;

      if (allServices.length > 0) {
        // 1. Tìm dịch vụ giá cao nhất
        const maxService = allServices.reduce((prev, current) =>
          (prev.giaDichVu || 0) > (current.giaDichVu || 0) ? prev : current
        );
        maxName = maxService.tenDichVu || "---";

        // 2. Tính giá trung bình
        const totalValue = allServices.reduce(
          (sum, svc) => sum + (svc.giaDichVu || 0),
          0
        );
        average = totalValue / allServices.length;
      }

      setStats({
        totalServices: response?.totalElements || allServices.length,
        maxPriceName: maxName,
        avgPrice: average,
      });
    } catch (error) {
      console.error("Lỗi tính thống kê dịch vụ:", error);
    }
  };

  // --- 3. Data Fetching (Table & Categories) ---
  const fetchServices = async () => {
    setLoading(true);
    try {
      let servicesData = [];
      let totalP = 0;
      let totalE = 0;

      const term = searchTerm ? searchTerm.trim() : "";

      if (term) {
        const data = await productService.searchGlobal(term);
        const allSearchResults = data.dichVus || [];
        totalE = allSearchResults.length;
        totalP = Math.ceil(totalE / ITEMS_PER_PAGE);

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        servicesData = allSearchResults.slice(
          startIndex,
          startIndex + ITEMS_PER_PAGE
        );
      } else {
        const page = currentPage - 1;
        const response = await productService.getAllServices({
          page,
          size: ITEMS_PER_PAGE,
        });
        servicesData = response?.content || [];
        totalP = response?.totalPages || 0;
        totalE = response?.totalElements || 0;
      }

      const formattedData = servicesData.map((svc) => ({
        ...svc,
        dichVuId: svc.id || svc.dichVuId,
        tenDichVu: svc.tenDichVu || "Chưa đặt tên",
        moTa: svc.moTa || "Không có mô tả",
        giaDichVu: svc.giaDichVu || svc.gia || 0,
        thoiLuongUocTinhPhut:
          svc.thoiLuongUocTinh || svc.thoiLuongUocTinhPhut || 0,
        trangThai: svc.trangThai || "Hoạt động",
        hinhAnh: svc.hinhAnh,
      }));

      setServices(formattedData);
      setTotalPages(totalP);
      setTotalElements(totalE);
    } catch (error) {
      console.error("Lỗi tải dịch vụ:", error);
      toast.error("Không thể tải danh sách dịch vụ.");
    } finally {
      setLoading(false);
    }
  };

  // Lấy danh mục
  useEffect(() => {
    const fetchServiceCategories = async () => {
      try {
        const response = await productService.getAllServices({
          page: 0,
          size: 200,
        });
        const allServices = response?.content || [];
        const categoriesMap = new Map();

        allServices.forEach((service) => {
          if (service.danhMucDvId && service.tenDanhMucDv) {
            categoriesMap.set(service.danhMucDvId, {
              id: service.danhMucDvId,
              danhMucDvId: service.danhMucDvId,
              tenDanhMucDv: service.tenDanhMucDv,
            });
          }
        });
        setServiceCategories(Array.from(categoriesMap.values()));
      } catch (error) {
        console.error("Lỗi tải danh mục dịch vụ:", error);
      }
    };
    fetchServiceCategories();
  }, []);

  // Effect: Load Stats 1 lần
  useEffect(() => {
    fetchStats();
  }, []);

  // Effect: Load Table khi filter/search đổi
  useEffect(() => {
    fetchServices();
  }, [currentPage, searchTerm]);

  // Handle ESC
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

  const handleDeleteClick = (id) => {
    setServiceToDeleteId(id);
    setIsConfirmDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!serviceToDeleteId) return;
    try {
      await productService.deleteService(serviceToDeleteId);
      toast.success("Xóa thành công!");
      fetchServices();
      fetchStats(); // Update stats
    } catch (error) {
      console.error(error);
      toast.error("Xóa thất bại! Có thể dịch vụ đang được sử dụng.");
    } finally {
      setIsConfirmDeleteModalOpen(false);
      setServiceToDeleteId(null);
    }
  };

  const handleViewDetail = async (id) => {
    try {
      const data = await productService.getServiceById(id);
      const formattedService = {
        ...data,
        thoiLuongUocTinhPhut: data.thoiLuongUocTinh || 0,
      };
      setSelectedService(formattedService);
      setIsDetailModalOpen(true);
    } catch (error) {
      console.error("Lỗi tải chi tiết dịch vụ:", error);
      toast.error("Không thể tải chi tiết dịch vụ.");
    }
  };

  const handleOpenCreateModal = () => {
    setEditingService(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (service) => {
    setEditingService(service);
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = async (formData, imageFile) => {
    if (!formData.tenDichVu || !formData.giaDichVu || !formData.danhMucDvId) {
      toast.warning("Vui lòng điền Tên dịch vụ, Giá và chọn Danh mục.");
      return;
    }

    const payload = new FormData();
    const serviceData = {
      tenDichVu: formData.tenDichVu,
      moTa: formData.moTa,
      giaDichVu: Number(formData.giaDichVu),
      thoiLuongUocTinh: Number(formData.thoiLuongUocTinhPhut),
      danhMucDvId: Number(formData.danhMucDvId),
    };

    payload.append(
      "dichVu",
      new Blob([JSON.stringify(serviceData)], { type: "application/json" })
    );
    if (imageFile) {
      payload.append("hinhAnh", imageFile);
    }

    try {
      if (editingService) {
        await productService.updateService(editingService.dichVuId, payload);
        toast.success("Cập nhật thành công!");
      } else {
        await productService.createService(payload);
        toast.success("Thêm dịch vụ thành công!");
      }
      setIsFormModalOpen(false);
      fetchServices();
      fetchStats(); // Update stats
    } catch (error) {
      console.error("Lỗi thao tác dịch vụ:", error);
      toast.error("Thao tác thất bại. Vui lòng kiểm tra lại thông tin.");
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
          Quản lý Dịch vụ
        </p>
      </div>

      {/* Truyền giá trị tính toán xuống component con */}
      <ServiceStats
        totalServices={stats.totalServices}
        maxPriceName={stats.maxPriceName}
        avgPrice={stats.avgPrice}
      />

      <ServiceFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setCurrentPage={setCurrentPage}
        onOpenCreateModal={handleOpenCreateModal}
      />

      <ServiceTable
        loading={loading}
        services={services}
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
      <ServiceDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        service={selectedService}
      />

      <ServiceFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        initialData={editingService}
        serviceCategories={serviceCategories}
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

export default AdminServices;
