import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Dữ liệu mẫu cho bài viết
const recentArticles = [
  {
    title: "Lịch tiêm phòng đầy đủ cho mèo trong năm 2024",
    desc: "Cập nhật những thay đổi mới nhất về phác đồ tiêm vaccine 4 bệnh cơ bản cho mèo và những lưu ý trước khi tiêm.",
    date: "15 Tháng 5, 2024",
    readTime: "5 phút đọc",
    category: "Sức khỏe",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgEFjauwy_GNl54zK9RLRUWigecWZ6lzch52KOCovg1DHvhJjGLIbtpoRR2vOrHdrg0najDQWUDgJ9mWIaqUmAfxg5hFsz6ExRuOO6IyVPgrgnzmuecu9bvG6eXjOP6Mv_yj-YScjPhI9OhZ9zOZhN4xLE9-x1WNyHs_RlOSRhxLc5cz1HSA4fYr1APT2l5MMjbgM92S5BX6AZHKHbN1WgtDRwYLZ3_yv89-KZJpOnaPXvn5tFLQmIntVj2z6cy4uob3-OwT5A0NI",
  },
  {
    title: "Top 5 đồ chơi giúp mèo con thông minh và năng động hơn",
    desc: "Đồ chơi không chỉ để giải trí, chúng còn là công cụ quan trọng giúp phát triển não bộ và bản năng săn mồi tự nhiên.",
    date: "10 Tháng 5, 2024",
    readTime: "7 phút đọc",
    category: "Huấn luyện",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyLXK7AzVH26RrOe1AGCe_9exeYBwM09ls5yxE-_SqNHSRzf6Q-L2Quyq1Wl6Scb_yHQ_4pWwtuB8Mbc1TGdikvfgJLPM73bRcwSVPZHpZWA_qH8vQ8JqQd-72ZKPVh2va38WhoCxG1c-fPczsbt4GycYQrvM58rpJR9Jp_ZLSEWY4ka6rm_0f3FjeNKOPbjpqJutosAf8TvTy1_1yJ0uM-VPMonbUjWxUDs64mxL0c8mDYUwVttU03TfSbGCAhorH59ZpeEhvaLc",
  },
  {
    title: "Tự tắm cho mèo tại nhà đúng cách không lo bị cào",
    desc: "Việc tắm cho mèo có thể là một cơn ác mộng nếu bạn không biết kỹ thuật. Hãy cùng tìm hiểu các bước cơ bản.",
    date: "02 Tháng 5, 2024",
    readTime: "10 phút đọc",
    category: "Chăm sóc",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgkhqO5Sz6n3jPe7L1K09dx8_9nT8GB4AtEFl6GQ5AhP9InELBL41J1k6Ze6hABsdkeWcMmfO5bp-lj9Py3F2x6oh-DO-YHpsSLewCvVPOS-eGtNLGA-RGxM42dpq4oSSs_3SE1pXPMKqCs5WHZ54nZIsSvaxTgyCdyWEh5QjRf3nVjHU4ogHuBlNJjisAhM6HeajTUixjkftD-UvpXdpyV-roIQEnbD-cwBXZk8Zca8IIPVZhZqu7CX5HLlCzsPcZOpLbKJNyWRY",
  },
  {
    title: "Chế độ ăn 'Raw Food' cho chó: Lợi ích và những rủi ro",
    desc: "Nhiều chủ nuôi đang chuyển sang chế độ ăn thực phẩm thô. Hãy cùng nghe ý kiến từ các chuyên gia dinh dưỡng.",
    date: "28 Tháng 4, 2024",
    readTime: "6 phút đọc",
    category: "Dinh dưỡng",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyLXK7AzVH26RrOe1AGCe_9exeYBwM09ls5yxE-_SqNHSRzf6Q-L2Quyq1Wl6Scb_yHQ_4pWwtuB8Mbc1TGdikvfgJLPM73bRcwSVPZHpZWA_qH8vQ8JqQd-72ZKPVh2va38WhoCxG1c-fPczsbt4GycYQrvM58rpJR9Jp_ZLSEWY4ka6rm_0f3FjeNKOPbjpqJutosAf8TvTy1_1yJ0uM-VPMonbUjWxUDs64mxL0c8mDYUwVttU03TfSbGCAhorH59ZpeEhvaLc",
  },
];

const popularPosts = [
  {
    title: "Cách xử lý khi mèo bị ngộ độc thực phẩm",
    views: "12,402 lượt xem",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBh5Ebb9RT5mHA_DCn6fMyCMrW1qz17Su5yfFQzX6s3EmdobnrNzJ7DESM7VL3ZXoAW-A5gLAsBIHhqgVs6cgMjAVN-X45Ym9-Ikh6qlCJqfWqVtyQ2aTZPobULp8mKEn6utHaDGYFERx8lbKLmmDt3bPwJmB3wbfKqah0MoUugsykzHgw3D_bdcmbuRQxzgbjiY2ws8kjhnnUt3RFMrJa4KBxPeyqvNmlgYNQU_gn5mwRC3RiaX_z1FxWu7FhdCd4EdzI22YCr8Wc",
  },
  {
    title: "Huấn luyện chó ngồi theo lệnh chỉ trong 1 tuần",
    views: "8,950 lượt xem",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgkhqO5Sz6n3jPe7L1K09dx8_9nT8GB4AtEFl6GQ5AhP9InELBL41J1k6Ze6hABsdkeWcMmfO5bp-lj9Py3F2x6oh-DO-YHpsSLewCvVPOS-eGtNLGA-RGxM42dpq4oSSs_3SE1pXPMKqCs5WHZ54nZIsSvaxTgyCdyWEh5QjRf3nVjHU4ogHuBlNJjisAhM6HeajTUixjkftD-UvpXdpyV-roIQEnbD-cwBXZk8Zca8IIPVZhZqu7CX5HLlCzsPcZOpLbKJNyWRY",
  },
  {
    title: "Tại sao mèo lại thích ngủ chung với chủ?",
    views: "7,321 lượt xem",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqLPSKl-nWV_zxTXmrM7NbrCkgiS3AlNL4UXNxJT3E0rMzB7s7YD2xFkH093hIfqaJFcI-CXA-llLQpuJx_sPtrxvAPnhmv712E5cvlbJxAaxGMStrzsYVIXUn4rh7-ymxxULecrhVFIJeO910kGoy7Tnq-tIIhqmhEacY5Y1-R9PDsQefg_G1wvIFwZkYU17UHEWGGgaSpqbgPdver2A8hJwtimTxV17txHRBerIxM8k29AcyRR1v3NYpHt70xu45wfrhmSNiUNk",
  },
];

const BlogPage = () => {
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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 text-gray-900 font-sans mt-13">
      {/* --- SECTION 1: FEATURED POST --- */}
      <section className="mb-16" data-aos="fade-up">
        <div className="relative group overflow-hidden rounded-[32px] bg-white shadow-xl border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="h-64 lg:h-[500px] overflow-hidden">
              <img
                alt="Featured Post"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://images.unsplash.com/photo-1511044568932-338cba0ad803?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Nổi bật
                </span>
                <span className="text-gray-400 text-sm">24 Tháng 5, 2024</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6 leading-tight group-hover:text-primary transition-colors">
                Bí quyết chăm sóc mèo con cho người mới bắt đầu: Hướng dẫn toàn
                tập từ A-Z
              </h1>
              <p className="text-gray-600 text-lg mb-8 line-clamp-3">
                Khám phá những kiến thức nền tảng quan trọng về dinh dưỡng, y tế
                và tâm lý để giúp chú mèo con của bạn phát triển toàn diện và
                hạnh phúc trong môi trường mới.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    alt="Author"
                    className="w-10 h-10 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBh5Ebb9RT5mHA_DCn6fMyCMrW1qz17Su5yfFQzX6s3EmdobnrNzJ7DESM7VL3ZXoAW-A5gLAsBIHhqgVs6cgMjAVN-X45Ym9-Ikh6qlCJqfWqVtyQ2aTZPobULp8mKEn6utHaDGYFERx8lbKLmmDt3bPwJmB3wbfKqah0MoUugsykzHgw3D_bdcmbuRQxzgbjiY2ws8kjhnnUt3RFMrJa4KBxPeyqvNmlgYNQU_gn5mwRC3RiaX_z1FxWu7FhdCd4EdzI22YCr8Wc"
                  />
                  <span className="text-sm font-bold text-gray-900">
                    BS. Nguyễn Minh
                  </span>
                </div>
                <a
                  className="flex items-center gap-2 text-primary font-bold hover:translate-x-1 transition-transform"
                  href="#"
                >
                  Đọc bài viết{" "}
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: FILTERS & SEARCH --- */}
      <section
        className="mb-12 flex flex-col md:flex-row items-center justify-between gap-8 border-b border-gray-100 pb-8"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
          <button className="px-6 py-2.5 bg-primary text-white rounded-full font-bold whitespace-nowrap shadow-md shadow-primary/20">
            Tất cả
          </button>
          {["Chăm sóc", "Dinh dưỡng", "Sức khỏe", "Huấn luyện"].map((cat) => (
            <button
              key={cat}
              className="px-6 py-2.5 bg-white text-gray-600 rounded-full font-semibold border border-gray-100 hover:border-primary hover:text-primary transition-all whitespace-nowrap hover:shadow-sm"
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-80">
          <input
            className="w-full bg-white border border-gray-100 rounded-3xl py-3 pl-4 pr-12 focus:ring-2 focus:ring-primary/50 text-sm shadow-sm outline-none"
            placeholder="Tìm kiếm bài viết..."
            type="text"
          />
          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            search
          </span>
        </div>
      </section>

      {/* --- SECTION 3: MAIN GRID (ARTICLES & SIDEBAR) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT COLUMN: ARTICLES */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentArticles.map((article, index) => (
              <article
                key={index}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 flex flex-col h-full"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="h-56 overflow-hidden relative shrink-0">
                  <img
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={article.img}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-primary shadow-sm uppercase">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">
                        calendar_today
                      </span>{" "}
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">
                        schedule
                      </span>{" "}
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3 leading-snug line-clamp-2 hover:underline cursor-pointer">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6 leading-relaxed flex-1">
                    {article.desc}
                  </p>
                  <a
                    className="text-sm font-bold flex items-center gap-2 hover:text-primary transition-colors mt-auto"
                    href="#"
                  >
                    Xem chi tiết{" "}
                    <span className="material-symbols-outlined text-sm">
                      chevron_right
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex justify-center gap-2" data-aos="fade-up">
            <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-100 text-gray-500 hover:border-primary hover:text-primary transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/30">
              1
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-100 text-gray-500 hover:border-primary hover:text-primary transition-colors font-bold">
              2
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-100 text-gray-500 hover:border-primary hover:text-primary transition-colors font-bold">
              3
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-100 text-gray-500 hover:border-primary hover:text-primary transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: SIDEBAR */}
        <aside className="lg:col-span-4">
          <div className="sticky top-28 space-y-10">
            {/* Trending Widget */}
            <div
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
              data-aos="fade-left"
            >
              <h3 className="text-2xl font-extrabold mb-8 text-gray-900 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                Xem nhiều nhất
              </h3>
              <div className="space-y-6">
                {popularPosts.map((post, index) => (
                  <a
                    key={index}
                    className="group flex gap-4 cursor-pointer"
                    href="#"
                  >
                    <div className="flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden shadow-sm">
                      <img
                        alt="Trending"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        src={post.img}
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <span className="text-xs text-gray-400 mt-2">
                        {post.views}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Consultant Widget */}
            <div
              className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 relative overflow-hidden group"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              {/* Icon trang trí nền mờ (Thêm vào để nhìn đỡ trống) */}
              <span className="material-symbols-outlined absolute -bottom-8 -right-8 text-9xl text-emerald-500/10 -rotate-12 pointer-events-none select-none">
                medical_services
              </span>

              <div className="relative z-10">
                <h4 className="text-xl font-bold text-emerald-900 mb-2">
                  Cần tư vấn sức khỏe?
                </h4>
                <p className="text-sm text-emerald-700 mb-6 leading-relaxed">
                  Đội ngũ bác sĩ thú y của chúng tôi luôn sẵn sàng hỗ trợ bạn
                  24/7 qua Zalo.
                </p>
                <button className="w-full py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-lg">
                    chat
                  </span>
                  Chat với bác sĩ ngay
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* --- SECTION 4: NEWSLETTER (NEWLY UPDATED) --- */}
      <section
        className="mt-24 relative overflow-hidden rounded-[48px] p-2 bg-white shadow-2xl border border-gray-100"
        data-aos="fade-up"
      >
        <div className="absolute inset-4 border border-white/20 rounded-[40px] pointer-events-none z-20"></div>
        <div className="relative h-[600px] w-full overflow-hidden rounded-[40px]">
          <img
            alt="Happy pet owners in park"
            className="absolute inset-0 w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqLPSKl-nWV_zxTXmrM7NbrCkgiS3AlNL4UXNxJT3E0rMzB7s7YD2xFkH093hIfqaJFcI-CXA-llLQpuJx_sPtrxvAPnhmv712E5cvlbJxAaxGMStrzsYVIXUn4rh7-ymxxULecrhVFIJeO910kGoy7Tnq-tIIhqmhEacY5Y1-R9PDsQefg_G1wvIFwZkYU17UHEWGGgaSpqbgPdver2A8hJwtimTxV17txHRBerIxM8k29AcyRR1v3NYpHt70xu45wfrhmSNiUNk"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md text-white border border-white/20 text-xs font-bold w-fit mb-8 tracking-[0.2em] uppercase">
              <span className="material-symbols-outlined text-sm">mail</span>
              <span>Exclusive Updates</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
              Đăng ký nhận <span className="text-primary">bản tin PetLor</span>
            </h2>
            <p className="text-white/90 text-lg md:text-xl mb-12 leading-relaxed max-w-2xl font-medium">
              Nhận ngay các mẹo chăm sóc thú cưng, tin tức mới nhất và ưu đãi
              độc quyền hàng tuần qua email của bạn.
            </p>
            <div className="w-full max-w-md mx-auto relative">
              <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[28px] shadow-2xl">
                <div className="flex-grow flex items-center px-4 min-h-[60px]">
                  <span className="material-symbols-outlined text-white/60 mr-3">
                    alternate_email
                  </span>
                  <input
                    className="w-full bg-transparent border-0 focus:ring-0 text-white placeholder:text-white/50 text-base outline-none"
                    placeholder="Email của bạn..."
                    type="email"
                  />
                </div>
                <button className="bg-primary hover:bg-white hover:text-primary text-white font-extrabold px-8 py-4 sm:py-0 rounded-[20px] text-lg transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap min-h-[60px]">
                  Gửi ngay
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
              <p className="text-white/40 text-xs mt-4">
                Chúng tôi cam kết bảo mật thông tin và không gửi spam.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
