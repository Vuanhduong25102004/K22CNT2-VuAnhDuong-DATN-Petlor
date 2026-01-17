import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Homepage = () => {
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
    return () => clearTimeout(aosInit);
  }, []);

  return (
    <>
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-22 mb-24">
        <div
          className="relative min-h-[560px] rounded-[40px] overflow-hidden bg-white shadow-2xl shadow-gray-200/50 flex flex-col md:flex-row"
          data-aos="fade-up"
        >
          <div className="absolute inset-0 pointer-events-none bg-gray-50/50"></div>

          <div className="relative z-10 w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6 w-fit">
              <span className="material-symbols-outlined text-lg">
                verified
              </span>
              <span>Chăm sóc tận tâm 24/7</span>
            </div>

            <h1 className="text-gray-900 text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-6 leading-tight">
              Chăm sóc đặc biệt cho{" "}
              <span className="text-primary">người bạn thân nhất</span> của bạn
            </h1>

            <p className="text-gray-600 text-lg md:text-xl mb-10 font-medium max-w-xl">
              Chúng tôi cung cấp dịch vụ chăm sóc thú cưng toàn diện và nhân ái
              để đảm bảo thú cưng của bạn luôn vui vẻ và khỏe mạnh mỗi ngày.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all text-white font-bold px-10 py-5 rounded-2xl text-lg shadow-xl shadow-primary/30 flex items-center justify-center gap-3">
                <span>Đặt lịch hẹn</span>
                <span className="material-symbols-outlined">
                  calendar_today
                </span>
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-10 py-5 rounded-2xl text-lg transition-all flex items-center justify-center gap-2">
                <span>Xem dịch vụ</span>
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 flex items-center gap-8 border-t border-gray-100 pt-8">
              <div>
                <div className="text-2xl font-bold text-gray-900">10k+</div>
                <div className="text-sm text-gray-500">Thú cưng hài lòng</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-500">Chuyên gia thú y</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full md:w-1/2 min-h-[400px] md:min-h-full">
            <div className="absolute inset-0 md:inset-4 md:rounded-[32px] overflow-hidden">
              <img
                alt="Happy pets"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgEFjauwy_GNl54zK9RLRUWigecWZ6lzch52KOCovg1DHvhJjGLIbtpoRR2vOrHdrg0najDQWUDgJ9mWIaqUmAfxg5hFsz6ExRuOO6IyVPgrgnzmuecu9bvG6eXjOP6Mv_yj-YScjPhI9OhZ9zOZhN4xLE9-x1WNyHs_RlOSRhxLc5cz1HSA4fYr1APT2l5MMjbgM92S5BX6AZHKHbN1WgtDRwYLZ3_yv89-KZJpOnaPXvn5tFLQmIntVj2z6cy4uob3-OwT5A0NI"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:hidden"></div>
            </div>

            {/* Floating Badge */}
            <div className="absolute bottom-12 left-12 bg-white p-4 rounded-2xl shadow-2xl hidden lg:flex items-center gap-4 animate-bounce">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">
                  cardiology
                </span>
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">
                  Chất lượng 5 sao
                </div>
                <div className="text-xs text-gray-400">
                  Từ cộng đồng yêu pet
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          NEW SECTIONS (LIGHT MODE ONLY)
      ========================================= */}

      {/* 1. DỊCH VỤ NỔI BẬT */}
      <section className="mb-24 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Dịch vụ nổi bật
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Chúng tôi cung cấp các giải pháp chăm sóc toàn diện nhất cho thú
            cưng của bạn.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Service 1 */}
          <div
            className="group bg-white p-8 rounded-[32px] border border-gray-100 hover:border-primary transition-all duration-300 shadow-sm hover:shadow-xl text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-4xl">spa</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Pet Spa</h3>
            <p className="text-gray-500 mb-6 text-sm">
              Tắm, chải lông và tạo hình phong cách cho boss.
            </p>
            <a
              className="text-primary font-bold flex items-center justify-center gap-1 hover:gap-2 transition-all"
              href="#"
            >
              Xem thêm{" "}
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </a>
          </div>

          {/* Service 2 */}
          <div
            className="group bg-white p-8 rounded-[32px] border border-gray-100 hover:border-primary transition-all duration-300 shadow-sm hover:shadow-xl text-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-4xl">
                medical_services
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3">Pet Clinic</h3>
            <p className="text-gray-500 mb-6 text-sm">
              Khám sức khỏe tổng quát và điều trị chuyên sâu.
            </p>
            <a
              className="text-primary font-bold flex items-center justify-center gap-1 hover:gap-2 transition-all"
              href="#"
            >
              Xem thêm{" "}
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </a>
          </div>

          {/* Service 3 */}
          <div
            className="group bg-white p-8 rounded-[32px] border border-gray-100 hover:border-primary transition-all duration-300 shadow-sm hover:shadow-xl text-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-4xl">
                apartment
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3">Pet Hotel</h3>
            <p className="text-gray-500 mb-6 text-sm">
              Nơi ở sang trọng, sạch sẽ cho thú cưng khi bạn vắng nhà.
            </p>
            <a
              className="text-primary font-bold flex items-center justify-center gap-1 hover:gap-2 transition-all"
              href="#"
            >
              Xem thêm{" "}
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </a>
          </div>

          {/* Service 4 */}
          <div
            className="group bg-white p-8 rounded-[32px] border border-gray-100 hover:border-primary transition-all duration-300 shadow-sm hover:shadow-xl text-center"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-4xl">school</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Pet Training</h3>
            <p className="text-gray-500 mb-6 text-sm">
              Huấn luyện kỹ năng và hành vi chuyên nghiệp.
            </p>
            <a
              className="text-primary font-bold flex items-center justify-center gap-1 hover:gap-2 transition-all"
              href="#"
            >
              Xem thêm{" "}
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. SẢN PHẨM MỚI NHẤT */}
      <section className="mb-24 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex items-center justify-between mb-10"
          data-aos="fade-right"
        >
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Sản phẩm mới nhất
            </h2>
            <p className="text-gray-500">
              Những món đồ chơi và thực phẩm chất lượng vừa cập bến.
            </p>
          </div>
          <a
            className="bg-white border border-gray-200 px-6 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors"
            href="#"
          >
            Xem tất cả
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Product 1 */}
          <div
            className="group bg-white rounded-[24px] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="relative h-72 overflow-hidden bg-gray-50">
              <img
                alt="Royal Canin Puppy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2mBWz25RdlG1JpVfULSsFNZsUYKSzflIAjwLvHSVf4isUMQg8fPMckeFI8cu_3OjuDM6EdDSdrwH9UHS0KuuVUN70GcVBAZgdR03PcsAyrJZ2rliR03Sga3T0cVhKi2sBRbuTAYrST-Mv5nmfjB08Ij9NJSjiQyahKSbiLXRG4RT5Gj2VsNpFNOV-E2jNDQt1CXNDg-VH6BfR4WAqkOvytwfJNT10slsOCcp1CPpSNa7rNZejsC9vc0IdmVH5Q8fHAb015f-M6Ts"
              />
              <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                New
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                Royal Canin Puppy
              </h3>
              <div className="text-primary font-extrabold text-xl mb-4">
                185.000 đ
              </div>
              <button className="mt-auto w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-primary hover:text-white text-gray-700 font-bold py-3.5 rounded-xl transition-all">
                <span className="material-symbols-outlined text-xl">
                  shopping_cart
                </span>
                Thêm vào giỏ
              </button>
            </div>
          </div>

          {/* Product 2 */}
          <div
            className="group bg-white rounded-[24px] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="relative h-72 overflow-hidden bg-gray-50">
              <img
                alt="Whiskas Cá Biển"
                className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvRb94YN-b1Ir5YETEy2Y_z9hpPRAbwmT0A7jw_j0P-bOBkPZCARM1Hzf08CaSF0K_cgcFmLqknApHchKyQSUvS1vEDhhIGFC0MjflsLeAbMOWkziYHun83WId0XfR_2uMA9kZl8OGox4CRZmbJXTf-j2n-qdbbya9yvuk5-obmwovmibENfA5YpVROCmpyWBVYmnLmUD-DA_QLgLnZZxDw-UtIeCl94gDQh3RbXwrg4IqMhYXeurq8rWRUxhcdJ_HUKH0VUHNvTE"
              />
              <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                New
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                Whiskas Cá Biển 480g
              </h3>
              <div className="text-primary font-extrabold text-xl mb-4">
                15.000 đ
              </div>
              <button className="mt-auto w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-primary hover:text-white text-gray-700 font-bold py-3.5 rounded-xl transition-all">
                <span className="material-symbols-outlined text-xl">
                  shopping_cart
                </span>
                Thêm vào giỏ
              </button>
            </div>
          </div>

          {/* Product 3 */}
          <div
            className="group bg-white rounded-[24px] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="relative h-72 overflow-hidden bg-gray-50">
              <img
                alt="Vòng cổ chó"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8taaj-PupF2Taii4OS4kyq7i2IknhEb_bjH23DfhHR4tfpu95Nq5XcKP0g9c25SHRzBoHghYIYeDOqBeDinW1Y_VT-q6XYZ0fi_XaBZkQHM4aOLSFDZmg-6lHIs1wgXZUrbz7nbpffd1g0HwSjvvN5zfOVj6caFXo6hfOXiaGWvSiUbYOXwKXyaEzhgj7n8Dhllsnvf7A2PpdJainCZkesYItK-XKuNimKzQV_BE6EeF47E5odwZOgqpYCpJH0b_zc5bNAtOqQQ4"
              />
              <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                New
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                Vòng cổ Premium
              </h3>
              <div className="text-primary font-extrabold text-xl mb-4">
                50.000 đ
              </div>
              <button className="mt-auto w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-primary hover:text-white text-gray-700 font-bold py-3.5 rounded-xl transition-all">
                <span className="material-symbols-outlined text-xl">
                  shopping_cart
                </span>
                Thêm vào giỏ
              </button>
            </div>
          </div>

          {/* Product 4 */}
          <div
            className="group bg-white rounded-[24px] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="relative h-72 overflow-hidden bg-gray-50">
              <img
                alt="Bóng cao su"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZRw-SvfOGkMjQrBgZ7b5_vNdJs4kr9yW-J9pW66e9CVeQz-WphWeZPbhUanBV01f0P3leuQUZxkG8QFOZhExf1fT3EurB_takFc8uOwaqESWfPRRUsaO1b62lCH8UeC0I0eHKQNE5oU87Boq0sFgmwq6Rc1m-uaNCH-xpt-5GuWlWkAuYTYLPRgETPOBKieoNhXHq8zZW1KY5po8QbtTptqACCe5HrG9xn8WdWpNqjO5QoFjNHZYJ4b37_-akAfFFRU5QpGxxbPU"
              />
              <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                New
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                Bóng cao su bền bỉ
              </h3>
              <div className="text-primary font-extrabold text-xl mb-4">
                40.000 đ
              </div>
              <button className="mt-auto w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-primary hover:text-white text-gray-700 font-bold py-3.5 rounded-xl transition-all">
                <span className="material-symbols-outlined text-xl">
                  shopping_cart
                </span>
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TẠI SAO CHỌN PETLOR */}
      <section
        className="mb-24 py-16 px-8 bg-white rounded-[40px] border border-gray-100 max-w-screen-xl mx-auto"
        data-aos="fade-up"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Tại sao chọn PetLor?
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Chúng tôi cam kết mang lại những điều tốt đẹp nhất cho cộng đồng yêu
            thú cưng.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div
            className="flex flex-col items-center text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
              <span className="material-symbols-outlined text-3xl">
                diversity_1
              </span>
            </div>
            <h3 className="text-xl font-bold mb-4">Chuyên gia tận tâm</h3>
            <p className="text-gray-500">
              Đội ngũ y bác sĩ và nhân viên có trình độ chuyên môn cao và tình
              yêu thương vô bờ bến.
            </p>
          </div>
          <div
            className="flex flex-col items-center text-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
              <span className="material-symbols-outlined text-3xl">
                star_half
              </span>
            </div>
            <h3 className="text-xl font-bold mb-4">Dịch vụ 5 sao</h3>
            <p className="text-gray-500">
              Trang thiết bị hiện đại, quy trình chuyên nghiệp đảm bảo sự thoải
              mái tối đa cho boss.
            </p>
          </div>
          <div
            className="flex flex-col items-center text-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
              <span className="material-symbols-outlined text-3xl">
                receipt_long
              </span>
            </div>
            <h3 className="text-xl font-bold mb-4">Giá cả minh bạch</h3>
            <p className="text-gray-500">
              Mọi chi phí đều được công khai và tư vấn kỹ càng trước khi thực
              hiện dịch vụ.
            </p>
          </div>
        </div>
      </section>

      {/* 4. TIN TỨC & BLOG */}
      <section className="mb-24 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex items-center justify-between mb-10"
          data-aos="fade-right"
        >
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Tin tức & Blog
            </h2>
            <p className="text-gray-500">
              Cập nhật kiến thức và kinh nghiệm chăm sóc thú cưng mỗi ngày.
            </p>
          </div>
          <a className="text-primary font-bold hover:underline" href="#">
            Tất cả bài viết
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Blog 1 */}
          <div
            className="group cursor-pointer"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="relative h-60 rounded-[24px] overflow-hidden mb-6">
              <img
                alt="Blog 1"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgEFjauwy_GNl54zK9RLRUWigecWZ6lzch52KOCovg1DHvhJjGLIbtpoRR2vOrHdrg0najDQWUDgJ9mWIaqUmAfxg5hFsz6ExRuOO6IyVPgrgnzmuecu9bvG6eXjOP6Mv_yj-YScjPhI9OhZ9zOZhN4xLE9-x1WNyHs_RlOSRhxLc5cz1HSA4fYr1APT2l5MMjbgM92S5BX6AZHKHbN1WgtDRwYLZ3_yv89-KZJpOnaPXvn5tFLQmIntVj2z6cy4uob3-OwT5A0NI"
              />
              <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-lg text-xs font-bold text-gray-600">
                Dinh dưỡng
              </div>
            </div>
            <div className="text-sm text-gray-400 mb-2 font-medium">
              15 Tháng 5, 2024
            </div>
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-snug">
              Top 5 loại thức ăn giàu dinh dưỡng nhất cho mèo Anh lông ngắn
            </h3>
          </div>

          {/* Blog 2 */}
          <div
            className="group cursor-pointer"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="relative h-60 rounded-[24px] overflow-hidden mb-6">
              <img
                alt="Blog 2"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2mBWz25RdlG1JpVfULSsFNZsUYKSzflIAjwLvHSVf4isUMQg8fPMckeFI8cu_3OjuDM6EdDSdrwH9UHS0KuuVUN70GcVBAZgdR03PcsAyrJZ2rliR03Sga3T0cVhKi2sBRbuTAYrST-Mv5nmfjB08Ij9NJSjiQyahKSbiLXRG4RT5Gj2VsNpFNOV-E2jNDQt1CXNDg-VH6BfR4WAqkOvytwfJNT10slsOCcp1CPpSNa7rNZejsC9vc0IdmVH5Q8fHAb015f-M6Ts"
              />
              <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-lg text-xs font-bold text-gray-600">
                Sức khỏe
              </div>
            </div>
            <div className="text-sm text-gray-400 mb-2 font-medium">
              12 Tháng 5, 2024
            </div>
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-snug">
              Lịch tiêm phòng định kỳ quan trọng như thế nào đối với chó con?
            </h3>
          </div>

          {/* Blog 3 */}
          <div
            className="group cursor-pointer"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="relative h-60 rounded-[24px] overflow-hidden mb-6">
              <img
                alt="Blog 3"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8taaj-PupF2Taii4OS4kyq7i2IknhEb_bjH23DfhHR4tfpu95Nq5XcKP0g9c25SHRzBoHghYIYeDOqBeDinW1Y_VT-q6XYZ0fi_XaBZkQHM4aOLSFDZmg-6lHIs1wgXZUrbz7nbpffd1g0HwSjvvN5zfOVj6caFXo6hfOXiaGWvSiUbYOXwKXyaEzhgj7n8Dhllsnvf7A2PpdJainCZkesYItK-XKuNimKzQV_BE6EeF47E5odwZOgqpYCpJH0b_zc5bNAtOqQQ4"
              />
              <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-lg text-xs font-bold text-gray-600">
                Cẩm nang
              </div>
            </div>
            <div className="text-sm text-gray-400 mb-2 font-medium">
              10 Tháng 5, 2024
            </div>
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-snug">
              Làm thế nào để huấn luyện chó đi vệ sinh đúng chỗ trong 7 ngày?
            </h3>
          </div>
        </div>
      </section>

      {/* 5. ĐÁNH GIÁ TỪ CỘNG ĐỒNG */}
      {/* 5. ĐÁNH GIÁ TỪ CỘNG ĐỒNG (Đã sửa lỗi hiển thị) */}
      <section
        className="mb-24 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8"
        data-aos="fade-up"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Đánh giá từ cộng đồng
          </h2>
          <div className="flex items-center justify-center gap-1 text-yellow-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="material-symbols-outlined fill-1">
                star
              </span>
            ))}
          </div>
          <p className="text-gray-500">
            4.9/5 dựa trên hơn 2,000 đánh giá từ khách hàng.
          </p>
        </div>

        {/* Thay đổi từ Flex Scroll sang Grid để không bị cắt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Review 1 */}
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                <img
                  alt="User"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBh5Ebb9RT5mHA_DCn6fMyCMrW1qz17Su5yfFQzX6s3EmdobnrNzJ7DESM7VL3ZXoAW-A5gLAsBIHhqgVs6cgMjAVN-X45Ym9-Ikh6qlCJqfWqVtyQ2aTZPobULp8mKEn6utHaDGYFERx8lbKLmmDt3bPwJmB3wbfKqah0MoUugsykzHgw3D_bdcmbuRQxzgbjiY2ws8kjhnnUt3RFMrJa4KBxPeyqvNmlgYNQU_gn5mwRC3RiaX_z1FxWu7FhdCd4EdzI22YCr8Wc"
                />
              </div>
              <div>
                <div className="font-bold text-gray-900">Nguyễn Minh Anh</div>
                <div className="text-xs text-gray-400">
                  Chủ nhân của bé Corgi Mochi
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "Dịch vụ spa ở đây cực kỳ tốt. Bé nhà mình rất nhát nhưng các bạn
              nhân viên dỗ dành rất khéo. Về nhà thơm tho và sạch sẽ hẳn!"
            </p>
          </div>

          {/* Review 2 */}
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                <img
                  alt="User"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgkhqO5Sz6n3jPe7L1K09dx8_9nT8GB4AtEFl6GQ5AhP9InELBL41J1k6Ze6hABsdkeWcMmfO5bp-lj9Py3F2x6oh-DO-YHpsSLewCvVPOS-eGtNLGA-RGxM42dpq4oSSs_3SE1pXPMKqCs5WHZ54nZIsSvaxTgyCdyWEh5QjRf3nVjHU4ogHuBlNJjisAhM6HeajTUixjkftD-UvpXdpyV-roIQEnbD-cwBXZk8Zca8IIPVZhZqu7CX5HLlCzsPcZOpLbKJNyWRY"
                />
              </div>
              <div>
                <div className="font-bold text-gray-900">Trần Hoàng Nam</div>
                <div className="text-xs text-gray-400">
                  Chủ nhân của bé Golden Lu
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "Phòng khám sạch sẽ, bác sĩ tư vấn rất nhiệt tình. Giá cả hợp lý
              so với chất lượng dịch vụ 5 sao như thế này. Rất yên tâm."
            </p>
          </div>

          {/* Review 3 */}
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                <img
                  alt="User"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyLXK7AzVH26RrOe1AGCe_9exeYBwM09ls5yxE-_SqNHSRzf6Q-L2Quyq1Wl6Scb_yHQ_4pWwtuB8Mbc1TGdikvfgJLPM73bRcwSVPZHpZWA_qH8vQ8JqQd-72ZKPVh2va38WhoCxG1c-fPczsbt4GycYQrvM58rpJR9Jp_ZLSEWY4ka6rm_0f3FjeNKOPbjpqJutosAf8TvTy1_1yJ0uM-VPMonbUjWxUDs64mxL0c8mDYUwVttU03TfSbGCAhorH59ZpeEhvaLc"
                />
              </div>
              <div>
                <div className="font-bold text-gray-900">Lê Thu Hà</div>
                <div className="text-xs text-gray-400">
                  Chủ nhân của bé Mèo Sim
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "Gửi bé ở khách sạn thú cưng PetLor mình hoàn toàn yên tâm. Ngày
              nào cũng được gửi clip bé chơi đùa và ăn uống."
            </p>
          </div>
        </div>
      </section>

      {/* 6. ĐĂNG KÝ NHẬN TIN */}
      <section
        className="mt-20 py-16 bg-primary rounded-[40px] text-center px-4 relative overflow-hidden max-w-screen-xl mx-auto mb-20"
        data-aos="zoom-in"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Đăng ký nhận tin khuyến mãi
          </h2>
          <p className="text-white/80 mb-8">
            Đừng bỏ lỡ các đợt giảm giá sâu và quà tặng độc quyền cho boss của
            bạn.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              className="flex-grow px-6 py-4 rounded-3xl border-none focus:ring-2 focus:ring-white outline-none text-gray-800 bg-white"
              placeholder="Địa chỉ email của bạn"
              type="email"
            />
            <button className="bg-gray-900 text-white font-bold px-8 py-4 rounded-3xl hover:bg-black transition-colors">
              Đăng ký ngay
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Homepage;
