import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import productService from "../services/productService";

// Helper: Format tiền tệ
const formatCurrency = (amount) => {
  if (typeof amount !== "number") {
    return "Liên hệ";
  }
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const aosInit = setTimeout(() => {
      AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        delay: 0,
        easing: "ease-out-cubic",
      });
      AOS.refresh();
    }, 100);

    const fetchServices = async () => {
      try {
        const response = await productService.getAllServices();
        let data = [];
        if (Array.isArray(response)) data = response;
        else if (response?.data && Array.isArray(response.data))
          data = response.data;
        else if (response?.content && Array.isArray(response.content))
          data = response.content;
        else if (
          response?.data?.content &&
          Array.isArray(response.data.content)
        )
          data = response.data.content;
        setServices(data);
      } catch (error) {
        console.error("Lỗi khi tải dịch vụ:", error);
      } finally {
        setLoading(false);
        setTimeout(() => AOS.refresh(), 100);
      }
    };

    fetchServices();

    return () => clearTimeout(aosInit);
  }, []);

  // Style cho background pattern
  const heroPatternStyle = {
    backgroundColor: "#0fb478",
    backgroundImage:
      "radial-gradient(#ffffff 0.5px, transparent 0.5px), radial-gradient(#ffffff 0.5px, #0fb478 0.5px)",
    backgroundSize: "20px 20px",
    backgroundPosition: "0 0, 10px 10px",
    opacity: 0.1,
  };

  return (
    // SỬA: Đổi bg-white thành bg-gray-50 để khớp với background-light trong HTML mẫu
    // Thêm overflow-x-hidden để tránh scroll ngang ngoài ý muốn
    <div className="w-full min-h-screen font-display bg-gray-50 text-gray-900 overflow-x-hidden">
      <main>
        {/* ================= HERO SECTION ================= */}
        {/* SỬA: Thay mt-16 bằng pt-28 (padding-top) để tránh lỗi margin collapse đẩy layout xuống */}
        <section className="bg-primary relative overflow-hidden pt-28 pb-16 lg:pb-24">
          <div
            className="absolute inset-0 pointer-events-none"
            style={heroPatternStyle}
          ></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <nav
              className="flex justify-center items-center gap-2 text-white/70 text-sm mb-6 font-medium"
              data-aos="fade-down"
            >
              <Link to="/" className="hover:text-white transition-colors">
                Trang chủ
              </Link>
              <span className="material-symbols-outlined text-xs">
                chevron_right
              </span>
              <span className="text-white">Dịch vụ</span>
            </nav>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Dịch vụ của chúng tôi
            </h1>
            <p
              className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Mang đến trải nghiệm chăm sóc toàn diện và chuyên nghiệp nhất cho
              người bạn bốn chân của bạn.
            </p>
          </div>
        </section>

        {/* ================= SERVICES GRID ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center py-20">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-r-transparent"></div>
                <p className="mt-4 text-gray-500">
                  Đang tải danh sách dịch vụ...
                </p>
              </div>
            ) : services.length > 0 ? (
              services.map((service, index) => {
                const serviceId = service.dichVuId || service.id;
                return (
                  <div
                    key={serviceId || index}
                    className="group bg-white p-10 rounded-[32px] border border-gray-100 hover:border-primary transition-all duration-300 shadow-sm hover:shadow-2xl flex flex-col"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    {/* Ảnh dịch vụ */}
                    <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={`http://localhost:8080/uploads/${service.hinhAnh}`}
                        alt={service.tenDichVu}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = "none";
                          e.target.parentNode.innerHTML =
                            '<span class="material-symbols-outlined text-4xl text-primary">pets</span>';
                        }}
                      />
                    </div>

                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {service.tenDichVu}
                    </h3>

                    <div className="mb-4 text-lg font-extrabold text-primary">
                      {formatCurrency(service.giaDichVu)}
                    </div>

                    <p className="text-gray-500 mb-8 leading-relaxed line-clamp-3 flex-grow">
                      {service.moTa}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-50">
                      <Link
                        to={`/services/${serviceId}`}
                        className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all"
                      >
                        Xem thêm chi tiết
                        <span className="material-symbols-outlined text-xl">
                          arrow_forward
                        </span>
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="col-span-full text-center text-gray-500">
                Chưa có dịch vụ nào.
              </p>
            )}
          </div>
        </section>

        {/* ================= CONTACT SECTION ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-24">
          <div
            className="bg-primary/5 rounded-[40px] p-12 flex flex-col md:flex-row items-center justify-between gap-12 border border-primary/10"
            data-aos="zoom-in"
          >
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-3xl font-extrabold mb-4 text-gray-900">
                Bạn chưa tìm thấy dịch vụ mong muốn?
              </h2>
              <p className="text-gray-600 font-medium">
                Liên hệ với chúng tôi ngay để được tư vấn các gói chăm sóc cá
                nhân hóa theo yêu cầu riêng biệt của thú cưng của bạn.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <button className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
                  <span className="material-symbols-outlined">call</span>
                  Liên hệ tư vấn
                </button>
              </Link>
              <button className="bg-white border border-gray-200 text-gray-700 font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
                <span className="material-symbols-outlined">chat</span>
                Chat qua Zalo
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ServicesPage;
