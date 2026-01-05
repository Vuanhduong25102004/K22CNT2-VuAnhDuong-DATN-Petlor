import React, { useEffect } from "react";
// 1. Import AOS
import AOS from "aos";
import "aos/dist/aos.css";

// Dữ liệu bài viết mới nhất
const recentArticles = [
  {
    title: "5 mẹo huấn luyện mèo đi vệ sinh đúng chỗ",
    author: "Jane Doe",
    time: "3 giờ trước",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJDe-Fc03oujRDxzfhE2e0_6ua-wKaYbEik04_Zmma5ydBKsyiJK50xsYgwUI_R4yOWvpS88M1v1tmmtWIECCEtuKLm4pd0lLNZswoA4-N7jzETlzCxCNTH6rOAKBvkdbIg9USfwNAtZPXMQ-NYE-dQsF7-x4adyFVsNk_HgK3-NlYVQyxQuQK8AwSrTJ_eA7-JD79Yn4VXXVfuD0NyZNt01rITJZgMb-p7vZ-NGW2ausSwLVp_cu1rX5i_0jWA4XsSnnRwcgBM3Wc",
  },
  {
    title: "Dấu hiệu nhận biết thú cưng bị stress",
    author: "Dr. Thú Y",
    time: "1 ngày trước",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfF4FuwTpz0kuzEow2KiuQ0DR_zkAPZhpCWaC6dwxCC9IvwbXPxDL7_yJJ0pxs8aaDF4iANur7fxRM-9b5Z4c2lZmwjQqRCTNdzZbWMdNtpTTjA12xMV2NZg13RAs7sXAShBAtRcD6VhVh0d9go7pCf-zroVQysDs5YpEIkd457Uc_tWMsvgwBC9ob_LwECxtbwbWVv6god0S6uHVmmxMfI0eMNqwWzRWd4uijnjglq8D_Ls3b4WDvIkYteeiLgusKsiRNUwtJj77W",
  },
  {
    title: "Review các loại thức ăn hạt tốt nhất năm 2024",
    author: "PetLor Team",
    time: "2 ngày trước",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDosikFGM5_X9HSmyfiH4Zt1-Q5n-iBDuUGNA_3Dzm-FvtBWboukxrKdvMsPxCBwekeqmM2diAcMSMi_oGlCBwyjVfkC9rr1PMIHc-JiXGxipVG5p14-FkYW0ENblu-IL45IkTei0AAtkm0GvZkM8wIxvQLsgLeNjoCEbTxwBlyflN75dpujRpRCpshatxiSchMnoSwVTnMLT-KTDJF6dpdE_huIaqieovh3MDD-TO4ghmAQ4whU3Bs8c4Tvgem1BbSvb03USeqBvJG",
  },
  {
    title: "Lịch tiêm phòng cần thiết cho chó con",
    author: "Dr. Thú Y",
    time: "5 ngày trước",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5ZbzLszltV20AJtNe_28rQB48ssnTVX6Ef_PQUfl2YxpF9pzHirlVbQNtHMJSl5ZjibzSe0qaIYoocj27nu44j7_AVJSmR7u0L2Ws5BIqkGF4l-VpKWGRmZDTyXnr2C81qBIPyLeEcdfGr-yEXofZWiWaRfqZ6lOOo2VR8Gh7ElTbmLXWSv5PXiOHNn_XtVWk_apyjrBJY8tOAQU6CTZxx1RdE5kMe6Q9viZPN8WxlPUjtbmrr1b-dh4MsBU4Ju5iEC-BJHJQuy3y",
  },
];

// Dữ liệu chuyên mục
const categories = [
  { name: "Dinh dưỡng", count: 12 },
  { name: "Huấn luyện", count: 8 },
  { name: "Sức khỏe", count: 21 },
  { name: "Mẹo chăm sóc", count: 15 },
  { name: "Tin tức cộng đồng", count: 5 },
];

// Dữ liệu bài viết phổ biến
const popularPosts = [
  {
    title: "Những điều cần chuẩn bị khi đón một chú cún mới",
    time: "1 tuần trước",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyb21Fl9L1ZnPfUDkDfBGWnSqNaK-YuhPhQDaafB13Z0vEaX3_4A0BCzfHNdRzx5zNZcF6Oxd7MDUIgkqN74aUTSS0otyS2Ei8wir8KsSC_ycSn4LNVJQIGB0E2Z7NI9Y5AxGmZcYQI_h2ox-mcf8Y6AgEaQAIOat129Sa9gaCWTsivDb7rsEVVNs3ZFL49Ayw8rhd6uDmH-QRusqMCXBXou_YW0zAP2MHbrKPx6tVuR6EKyN05DTncNyOgN7A8WM3Jf8ljyIHW_HI",
  },
  {
    title: "Chăm sóc lông cho mèo: Bí quyết để bộ lông luôn bóng mượt",
    time: "2 tuần trước",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9SLajyQXY8M9QfSRzEuT_h4sbxKVhgCXoH40mNHmP_9x62oViWRTbQrMvuaUzES6k50OIOpGhdcue7RxJ3rETJaMMjGIy18ishOzCYS_-_YK4t-BKL8evtOv0RkHB-j-l0pxggpoQrKJfIKe18vOD3e77gdYJPH0NlL7Uli5j1LEjXgBy_ttDxk8BBHRHQ2l2zKBbO88--ysmO7_nAEDEWmmnBEwilg_7iq-_our820-eOODqrxQi_krRFyiRdYFjvQzlHRzS9UKI",
  },
];

const tags = [
  "Chó Poodle",
  "Mèo Anh",
  "Dinh dưỡng",
  "Huấn luyện",
  "Tiêm phòng",
  "Spa thú cưng",
  "Đồ chơi",
  "Sức khỏe",
];

const BlogPage = () => {
  // 2. Khởi tạo AOS
  useEffect(() => {
    const aosInit = setTimeout(() => {
      AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        delay: 0,
      });
      AOS.refresh();
    }, 100);
    return () => clearTimeout(aosInit);
  }, []);

  return (
    <div className="w-full font-display bg-background-light text-text-main">
      <main className="flex-1 px-4 sm:px-10 lg:px-20 py-10">
        <div className="max-w-7xl mx-auto">
          {/* Page Heading - Animation Fade Up */}
          <div
            className="flex flex-wrap justify-between gap-3 p-4 mt-6"
            data-aos="fade-up"
          >
            <div className="flex min-w-72 flex-col gap-3">
              <h1 className="text-4xl font-black leading-tight tracking-[-0.033em]">
                Góc Chuyên Gia Thú Cưng
              </h1>
              <p className="text-text-muted text-base font-normal leading-normal">
                Tất cả những gì bạn cần biết để chăm sóc tốt nhất cho người bạn
                bốn chân của mình.
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* LEFT CONTENT (Main) */}
            <div className="lg:col-span-8">
              {/* Featured Post */}
              <div className="p-4 mb-8" data-aos="fade-up" data-aos-delay="100">
                <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">
                  Bài viết nổi bật
                </h2>
                <div className="flex flex-col items-stretch justify-start rounded-lg shadow-sm bg-white overflow-hidden transition-all duration-300 hover:shadow-md">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover"
                    style={{
                      backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDXuksCp9dnSahK2_niRoxlu45O-eLyOnnc_Rr6GdPlbn6FGX6GkTI53rJMZU4dYsuOXpDi4wE-u7hCCJfG0b5FJp0sTaxr6_i1NMriFiGdNscSsO7-b8XVSPblOGXApEeGw84Pub0-EsMBNFdovu2GdObIG7Lny2OXB32ebh9zCNP7v05gehJjEAF-KcCLtZ4nGIg8ogcoUMgmuDn6iGeM-7p3Uk36STJvCTuj6Hmzajak7YLGahVrg4ZsQKL-COc3XT_UCQ2hCoMk")`,
                    }}
                  ></div>
                  <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-3 p-6">
                    <p className="text-2xl font-bold leading-tight tracking-[-0.015em] cursor-pointer hover:text-primary transition-colors">
                      Hướng dẫn toàn diện về dinh dưỡng cho chó Poodle
                    </p>
                    <p className="text-text-muted text-base font-normal leading-normal">
                      Khám phá chế độ ăn uống lý tưởng, các loại thực phẩm nên
                      và không nên cho chó Poodle để chúng luôn khỏe mạnh và
                      năng động.
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-text-muted text-sm font-normal leading-normal">
                        Bởi Dr. Thú Y | 1 giờ trước
                      </p>

                      <button
                        className="relative group/btn flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-primary text-[#111813] text-sm font-bold shadow-sm transition-all duration-300 ease-out hover:scale-105
  before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:bg-[#10B981] before:transition-all before:duration-300 before:ease-out hover:before:w-full"
                      >
                        <span className="relative z-10 truncate transition-colors duration-300 group-hover/btn:text-white">
                          Đọc thêm
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Latest Articles Grid */}
              <h2
                className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5"
                data-aos="fade-up"
              >
                Bài viết mới nhất
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentArticles.map((article, index) => (
                  <div
                    key={index}
                    className="p-4"
                    data-aos="fade-up"
                    data-aos-delay={index * 100 + 100} // Bài viết xuất hiện lần lượt
                  >
                    <div className="flex flex-col items-stretch justify-start rounded-lg shadow-sm bg-white overflow-hidden h-full transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                      <div
                        className="w-full bg-center bg-no-repeat aspect-video bg-cover"
                        style={{ backgroundImage: `url("${article.img}")` }}
                      ></div>
                      <div className="flex w-full min-w-72 grow flex-col items-stretch justify-between gap-1 p-4">
                        <p className="text-lg font-bold leading-tight tracking-[-0.015em] hover:text-primary cursor-pointer transition-colors">
                          {article.title}
                        </p>
                        <div className="flex flex-col gap-1 mt-2">
                          <p className="text-text-muted text-sm font-normal leading-normal">
                            Bởi {article.author} | {article.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination - Fade Up */}
              <div
                className="flex justify-center items-center gap-2 mt-12 p-4"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <button className="flex items-center justify-center size-10 rounded-lg text-sm bg-white border border-gray-200 text-text-main hover:bg-gray-100 transition-colors">
                  <span className="material-symbols-outlined text-lg">
                    chevron_left
                  </span>
                </button>
                <button className="flex items-center justify-center size-10 rounded-lg text-sm bg-primary text-[#111813] font-bold shadow-sm">
                  1
                </button>
                <button className="flex items-center justify-center size-10 rounded-lg text-sm bg-white border border-gray-200 text-text-main hover:bg-gray-100 transition-colors">
                  2
                </button>
                <button className="flex items-center justify-center size-10 rounded-lg text-sm bg-white border border-gray-200 text-text-main hover:bg-gray-100 transition-colors">
                  3
                </button>
                <button className="flex items-center justify-center size-10 rounded-lg text-sm bg-white border border-gray-200 text-text-main hover:bg-gray-100 transition-colors">
                  <span className="material-symbols-outlined text-lg">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>

            {/* RIGHT CONTENT (Sidebar) */}
            <aside className="lg:col-span-4 space-y-8 p-4">
              {/* Search Widget - Fade Left */}
              <div className="py-3" data-aos="fade-left" data-aos-delay="100">
                <h3 className="font-bold text-lg mb-4">Tìm kiếm bài viết</h3>
                <label className="flex flex-col min-w-40 h-12 w-full">
                  <div className="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden border border-gray-200 bg-white">
                    <div className="text-text-muted flex items-center justify-center pl-4">
                      <span className="material-symbols-outlined">search</span>
                    </div>
                    <input
                      className="flex w-full min-w-0 flex-1 resize-none border-none bg-transparent h-full placeholder:text-text-muted px-4 pl-2 text-base font-normal focus:outline-none focus:ring-0"
                      placeholder="Tìm kiếm..."
                    />
                  </div>
                </label>
              </div>

              {/* Categories Widget - Fade Left */}
              <div data-aos="fade-left" data-aos-delay="200">
                <h3 className="font-bold text-lg mb-4">Chuyên mục</h3>
                <ul className="space-y-3">
                  {categories.map((cat, index) => (
                    <li key={index}>
                      <a
                        className="flex justify-between items-center text-text-muted hover:text-primary transition-colors group"
                        href="#"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">
                          {cat.name}
                        </span>
                        <span className="text-xs font-mono bg-primary/20 text-[#111813] px-2 py-1 rounded font-bold">
                          {cat.count}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Popular Posts Widget - Fade Left */}
              <div data-aos="fade-left" data-aos-delay="300">
                <h3 className="font-bold text-lg mb-4">Bài viết phổ biến</h3>
                <div className="space-y-4 ">
                  {popularPosts.map((post, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 group cursor-pointer transition-all duration-300 ease-out hover:scale-105"
                    >
                      <div
                        className="w-20 h-20 bg-center bg-no-repeat bg-cover rounded-lg flex-shrink-0 transition-transform group-hover:scale-105"
                        style={{ backgroundImage: `url("${post.img}")` }}
                      ></div>
                      <div>
                        <p className="font-bold text-sm leading-snug group-hover:text-primary transition-colors">
                          {post.title}
                        </p>
                        <p className="text-xs text-text-muted mt-1">
                          {post.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags Widget - Fade Left (MỚI THÊM) */}
              <div data-aos="fade-left" data-aos-delay="350">
                <h3 className="font-bold text-lg mb-4">Từ khóa nổi bật</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <a
                      key={index}
                      href="#"
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-text-muted hover:text-primary hover:border-primary transition-colors"
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </div>

              {/* Newsletter Widget - Fade Left */}
              <div
                className="p-6 rounded-lg bg-[#e8fdf0] border border-[#d1fae5] text-center"
                data-aos="fade-left"
                data-aos-delay="400"
              >
                <h4 className="font-bold text-lg mb-2 text-[#111813]">
                  Đăng ký nhận tin
                </h4>
                <p className="text-sm text-text-muted mb-4">
                  Nhận những mẹo và tin tức mới nhất về chăm sóc thú cưng thẳng
                  vào hộp thư của bạn.
                </p>
                <div className="flex flex-col gap-2">
                  <input
                    className="w-full rounded-lg border border-gray-200 bg-white p-2 text-sm placeholder:text-text-muted focus:ring-1 focus:ring-primary outline-none"
                    placeholder="Email của bạn"
                    type="email"
                  />

                  <button
                    className="relative group/btn flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-[#111813] text-sm font-bold shadow-sm transition-all duration-300 ease-out hover:scale-105
  before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:bg-[#10B981] before:transition-all before:duration-300 before:ease-out hover:before:w-full"
                  >
                    <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-white">
                      Đăng ký
                    </span>
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPage;
