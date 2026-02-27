import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import productService from "../services/productService";
import petService from "../services/petService";
import searchService from "../services/searchService";

const formatCurrency = (amount) => {
  if (typeof amount !== "number") return "Liên hệ";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await petService.getAllServiceCategories();
        let data = response?.data || response?.content || response || [];
        setCategories(data);
      } catch (error) {
        console.error("Lỗi tải danh mục dịch vụ:", error);
      }
    };
    fetchCategories();
  }, []);

  const fetchServices = async (
    searchQuery = "",
    catId = null,
    sortValue = "",
  ) => {
    setLoading(true);
    try {
      let response;
      const params = sortValue ? { sort: sortValue } : {};
      if (searchQuery.trim() || catId !== null) {
        response = await searchService.searchServices(searchQuery, catId);
      } else {
        response = await productService.getAllServices(params);
      }
      let data =
        response?.data?.content ||
        response?.data ||
        response?.content ||
        response ||
        [];
      setServices(data);
    } catch (error) {
      console.error("Lỗi khi tải dịch vụ:", error);
    } finally {
      setLoading(false);
      setTimeout(() => AOS.refresh(), 100);
    }
  };

  const handleSearch = () =>
    fetchServices(keyword, selectedCategoryId, sortOrder);
  const handleKeyDown = (e) => e.key === "Enter" && handleSearch();
  const handleCategoryClick = (catId) => {
    setSelectedCategoryId(catId);
    fetchServices(keyword, catId, sortOrder);
  };
  const handleReset = () => {
    setKeyword("");
    setSelectedCategoryId(null);
    setSortOrder("");
    fetchServices("", null, "");
  };

  const handleSortChange = (e) => {
    const newSortValue = e.target.value;
    setSortOrder(newSortValue);
    fetchServices(keyword, selectedCategoryId, newSortValue);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 800, once: true });
    fetchServices();
  }, []);

  const heroPatternStyle = {
    backgroundColor: "#0fb478",
    backgroundImage:
      "radial-gradient(#ffffff 0.5px, transparent 0.5px), radial-gradient(#ffffff 0.5px, #0fb478 0.5px)",
    backgroundSize: "20px 20px",
    backgroundPosition: "0 0, 10px 10px",
    opacity: 0.1,
  };

  return (
    <div className="w-full min-h-screen font-display bg-gray-50 text-gray-900 overflow-x-hidden">
      <main>
        {/* HERO SECTION */}
        <section className="bg-primary relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-20">
          <div
            className="absolute inset-0 pointer-events-none"
            style={heroPatternStyle}
          ></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <nav className="flex justify-center items-center gap-2 text-white/70 text-xs md:text-sm mb-4 md:mb-6 font-medium">
              <Link to="/" className="hover:text-white transition-colors">
                Trang chủ
              </Link>
              <span className="material-symbols-outlined text-[10px]">
                chevron_right
              </span>
              <span className="text-white">Dịch vụ</span>
            </nav>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 md:mb-6">
              Dịch vụ của chúng tôi
            </h1>
            <p className="text-white/80 text-sm md:text-lg max-w-2xl mx-auto font-medium px-4">
              Mang đến trải nghiệm chăm sóc toàn diện và chuyên nghiệp nhất cho
              người bạn bốn chân của bạn.
            </p>
          </div>
        </section>

        {/* SEARCH & FILTER SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 md:-mt-8 relative z-20 mb-8 md:mb-12">
          <div className="bg-white p-4 md:p-5 rounded-3xl md:rounded-full border border-gray-100 shadow-xl flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative w-full lg:w-80 xl:w-96">
              <span
                className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-primary transition-colors"
                onClick={handleSearch}
              >
                search
              </span>
              <input
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl md:rounded-full focus:ring-2 focus:ring-primary outline-none text-sm"
                placeholder="Tìm kiếm dịch vụ..."
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            {/* Categories - Scrollable on mobile */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar w-full lg:flex-1 justify-start lg:justify-center">
              <button
                onClick={handleReset}
                className={`px-5 py-2 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategoryId === null
                    ? "bg-primary text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-primary/10"
                }`}
              >
                Tất cả
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.danhMucDvId || cat.id}
                  onClick={() => handleCategoryClick(cat.danhMucDvId || cat.id)}
                  className={`px-5 py-2 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-all ${
                    selectedCategoryId === (cat.danhMucDvId || cat.id)
                      ? "bg-primary text-white"
                      : "bg-gray-50 text-gray-600 hover:bg-primary/10"
                  }`}
                >
                  {cat.tenDanhMucDv || cat.tenDanhMuc || cat.name}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="w-full lg:w-44">
              <select
                className="w-full py-3 px-4 bg-gray-50 border-none rounded-xl md:rounded-full focus:ring-2 focus:ring-primary outline-none text-xs md:text-sm font-medium cursor-pointer"
                value={sortOrder}
                onChange={handleSortChange}
              >
                <option value="">Phổ biến nhất</option>
                <option value="giaDichVu,asc">Giá thấp đến cao</option>
                <option value="giaDichVu,desc">Giá cao đến thấp</option>
              </select>
            </div>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {loading ? (
              <div className="col-span-full text-center py-20">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-r-transparent"></div>
                <p className="mt-4 text-gray-500">
                  Đang tải danh sách dịch vụ...
                </p>
              </div>
            ) : services.length > 0 ? (
              services.map((service, index) => (
                <div
                  key={service.dichVuId || service.id || index}
                  className="group bg-white p-6 md:p-8 lg:p-10 rounded-[24px] md:rounded-[32px] border border-gray-100 hover:border-primary transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 md:mb-8 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={`http://localhost:8080/uploads/${service.hinhAnh}`}
                      alt={service.tenDichVu}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.parentNode.innerHTML =
                          '<span class="material-symbols-outlined text-3xl md:text-4xl text-primary">pets</span>';
                      }}
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {service.tenDichVu}
                  </h3>
                  <div className="mb-3 md:mb-4 text-base md:text-lg font-extrabold text-primary">
                    {formatCurrency(service.giaDichVu)}
                  </div>
                  <p className="text-sm md:text-base text-gray-500 mb-6 md:mb-8 leading-relaxed line-clamp-3 flex-grow">
                    {service.moTa}
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-50">
                    <Link
                      to={`/services/${service.dichVuId || service.id}`}
                      className="text-primary text-sm md:text-base font-bold flex items-center gap-2 hover:gap-3 transition-all"
                    >
                      Xem thêm chi tiết
                      <span className="material-symbols-outlined text-lg md:text-xl">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 flex flex-col items-center">
                <span className="material-symbols-outlined text-5xl md:text-6xl text-gray-300 mb-4">
                  search_off
                </span>
                <p className="text-gray-500 text-base md:text-lg mb-4">
                  Không tìm thấy dịch vụ nào phù hợp.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-primary text-white font-bold rounded-xl"
                >
                  Xem tất cả dịch vụ
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ServicesPage;
