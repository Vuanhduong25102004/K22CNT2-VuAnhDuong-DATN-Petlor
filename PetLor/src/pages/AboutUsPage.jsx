import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUsPage = () => {
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

  const heroPatternStyle = {
    backgroundImage: "radial-gradient(#0FB478 0.5px, transparent 0.5px)",
    backgroundSize: "24px 24px",
    opacity: 0.1,
  };

  return (
    <div className="w-full min-h-screen font-display bg-gray-50 text-gray-900 overflow-x-hidden transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 mt-16">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <div className="order-2 lg:order-1" data-aos="fade-right">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
              <span className="material-symbols-outlined text-lg">
                verified
              </span>
              <span className="tracking-wider uppercase">Established 2019</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight text-gray-900">
              Câu chuyện về <span className="text-primary">PetLor</span>
            </h1>
            <p className="text-gray-600 text-lg lg:text-xl mb-10 leading-relaxed max-w-xl">
              Khởi nguồn từ niềm đam mê vô tận với thú cưng, PetLor ra đời với
              sứ mệnh xây dựng một hệ sinh thái chăm sóc toàn diện. Chúng tôi
              tin rằng mỗi người bạn bốn chân đều xứng đáng nhận được sự tôn
              trọng và tình yêu thương tốt nhất.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-center mb-10">
              <button className="w-full sm:w-auto bg-primary hover:bg-primary/90 transition-all text-white font-bold px-10 py-4 rounded-xl text-lg shadow-lg shadow-primary/25 flex items-center justify-center gap-2">
                Tìm hiểu thêm
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img
                      alt="Avatar"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBh5Ebb9RT5mHA_DCn6fMyCMrW1qz17Su5yfFQzX6s3EmdobnrNzJ7DESM7VL3ZXoAW-A5gLAsBIHhqgVs6cgMjAVN-X45Ym9-Ikh6qlCJqfWqVtyQ2aTZPobULp8mKEn6utHaDGYFERx8lbKLmmDt3bPwJmB3wbfKqah0MoUugsykzHgw3D_bdcmbuRQxzgbjiY2ws8kjhnnUt3RFMrJa4KBxPeyqvNmlgYNQU_gn5mwRC3RiaX_z1FxWu7FhdCd4EdzI22YCr8Wc"
                    />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 overflow-hidden">
                    <img
                      alt="Avatar"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgkhqO5Sz6n3jPe7L1K09dx8_9nT8GB4AtEFl6GQ5AhP9InELBL41J1k6Ze6hABsdkeWcMmfO5bp-lj9Py3F2x6oh-DO-YHpsSLewCvVPOS-eGtNLGA-RGxM42dpq4oSSs_3SE1pXPMKqCs5WHZ54nZIsSvaxTgyCdyWEh5QjRf3nVjHU4ogHuBlNJjisAhM6HeajTUixjkftD-UvpXdpyV-roIQEnbD-cwBXZk8Zca8IIPVZhZqu7CX5HLlCzsPcZOpLbKJNyWRY"
                    />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-400 overflow-hidden">
                    <img
                      alt="Avatar"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyLXK7AzVH26RrOe1AGCe_9exeYBwM09ls5yxE-_SqNHSRzf6Q-L2Quyq1Wl6Scb_yHQ_4pWwtuB8Mbc1TGdikvfgJLPM73bRcwSVPZHpZWA_qH8vQ8JqQd-72ZKPVh2va38WhoCxG1c-fPczsbt4GycYQrvM58rpJR9Jp_ZLSEWY4ka6rm_0f3FjeNKOPbjpqJutosAf8TvTy1_1yJ0uM-VPMonbUjWxUDs64mxL0c8mDYUwVttU03TfSbGCAhorH59ZpeEhvaLc"
                    />
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-700">
                  Đồng hành cùng 5000+ Sen
                </span>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative" data-aos="fade-left">
            <div className="relative z-10 rounded-[48px] overflow-hidden bg-gray-100 border-8 border-white shadow-2xl">
              <img
                alt="PetLor Dogs"
                className="w-full h-[500px] object-cover"
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1286&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </div>
            <div className="absolute -top-6 -right-6 w-full h-full border-2 border-primary rounded-[48px] -z-0"></div>
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 animate-bounce">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white">
                <span className="material-symbols-outlined">favorite</span>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                  Trải nghiệm
                </div>
                <div className="text-sm font-extrabold">100% Tận tâm</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div
              className="bg-white p-12 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-8xl text-primary">
                  rocket_launch
                </span>
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
                Sứ mệnh của chúng tôi
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Nâng tầm chất lượng sống của thú cưng thông qua những dịch vụ y
                tế và chăm sóc chuẩn quốc tế. Chúng tôi cam kết tạo ra môi
                trường hạnh phúc, nơi mà sức khỏe và sự an tâm của khách hàng là
                ưu tiên hàng đầu.
              </p>
              <div className="mt-8 flex items-center gap-4 text-primary font-bold">
                <span className="material-symbols-outlined">check_circle</span>
                <span>Chuẩn mực y khoa cao nhất</span>
              </div>
            </div>
            <div
              className="bg-primary p-12 rounded-[40px] shadow-xl relative overflow-hidden group text-white hover:shadow-2xl transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-8xl text-white">
                  visibility
                </span>
              </div>
              <h2 className="text-3xl font-extrabold mb-6">Tầm nhìn dài hạn</h2>
              <p className="text-white/80 text-lg leading-relaxed">
                Trở thành người đồng hành số 1 tại Việt Nam trong lĩnh vực chăm
                sóc thú cưng toàn diện. PetLor không ngừng đổi mới và áp dụng
                công nghệ để mang đến những trải nghiệm cá nhân hóa tối ưu cho
                mọi loại thú cưng.
              </p>
              <div className="mt-8 flex items-center gap-4 text-white font-bold">
                <span className="material-symbols-outlined">trending_up</span>
                <span>Phát triển hệ thống trên toàn quốc</span>
              </div>
            </div>
          </div>
        </section>

        <section
          className="mb-24 py-16 px-8 bg-white rounded-[40px] border border-gray-100 shadow-sm"
          data-aos="fade-up"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              Giá trị cốt lõi
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Kim chỉ nam cho mọi hoạt động của PetLor, giúp chúng tôi không
              ngừng hoàn thiện mỗi ngày.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "favorite",
                title: "Yêu thương",
                desc: "Xem thú cưng của khách hàng như chính thành viên trong gia đình.",
              },
              {
                icon: "workspace_premium",
                title: "Chuyên nghiệp",
                desc: "Quy trình khoa học, trang thiết bị hiện đại và tay nghề cao.",
              },
              {
                icon: "volunteer_activism",
                title: "Tận tâm",
                desc: "Luôn sẵn sàng lắng nghe và hỗ trợ khách hàng mọi lúc mọi nơi.",
              },
              {
                icon: "lightbulb",
                title: "Sáng tạo",
                desc: "Luôn đổi mới phương pháp chăm sóc để mang lại hiệu quả tốt nhất.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center group p-6 hover:bg-gray-50 rounded-3xl transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">
                    {item.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              Đội ngũ chuyên gia
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Những con người tài năng, giàu kinh nghiệm và tràn đầy lòng nhân
              ái.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "BS. Nguyễn Minh",
                role: "Bác sĩ Thú y Trưởng",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBh5Ebb9RT5mHA_DCn6fMyCMrW1qz17Su5yfFQzX6s3EmdobnrNzJ7DESM7VL3ZXoAW-A5gLAsBIHhqgVs6cgMjAVN-X45Ym9-Ikh6qlCJqfWqVtyQ2aTZPobULp8mKEn6utHaDGYFERx8lbKLmmDt3bPwJmB3wbfKqah0MoUugsykzHgw3D_bdcmbuRQxzgbjiY2ws8kjhnnUt3RFMrJa4KBxPeyqvNmlgYNQU_gn5mwRC3RiaX_z1FxWu7FhdCd4EdzI22YCr8Wc",
              },
              {
                name: "Trần Thu Lan",
                role: "Chuyên gia Grooming",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgkhqO5Sz6n3jPe7L1K09dx8_9nT8GB4AtEFl6GQ5AhP9InELBL41J1k6Ze6hABsdkeWcMmfO5bp-lj9Py3F2x6oh-DO-YHpsSLewCvVPOS-eGtNLGA-RGxM42dpq4oSSs_3SE1pXPMKqCs5WHZ54nZIsSvaxTgyCdyWEh5QjRf3nVjHU4ogHuBlNJjisAhM6HeajTUixjkftD-UvpXdpyV-roIQEnbD-cwBXZk8Zca8IIPVZhZqu7CX5HLlCzsPcZOpLbKJNyWRY",
              },
              {
                name: "Lê Việt Hoàng",
                role: "Huấn luyện viên",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyLXK7AzVH26RrOe1AGCe_9exeYBwM09ls5yxE-_SqNHSRzf6Q-L2Quyq1Wl6Scb_yHQ_4pWwtuB8Mbc1TGdikvfgJLPM73bRcwSVPZHpZWA_qH8vQ8JqQd-72ZKPVh2va38WhoCxG1c-fPczsbt4GycYQrvM58rpJR9Jp_ZLSEWY4ka6rm_0f3FjeNKOPbjpqJutosAf8TvTy1_1yJ0uM-VPMonbUjWxUDs64mxL0c8mDYUwVttU03TfSbGCAhorH59ZpeEhvaLc",
              },
              {
                name: "BS. Phan Thu Hà",
                role: "Nội khoa Thú y",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgEFjauwy_GNl54zK9RLRUWigecWZ6lzch52KOCovg1DHvhJjGLIbtpoRR2vOrHdrg0najDQWUDgJ9mWIaqUmAfxg5hFsz6ExRuOO6IyVPgrgnzmuecu9bvG6eXjOP6Mv_yj-YScjPhI9OhZ9zOZhN4xLE9-x1WNyHs_RlOSRhxLc5cz1HSA4fYr1APT2l5MMjbgM92S5BX6AZHKHbN1WgtDRwYLZ3_yv89-KZJpOnaPXvn5tFLQmIntVj2z6cy4uob3-OwT5A0NI",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={member.img}
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1 text-gray-900">
                    {member.name}
                  </h3>
                  <div className="text-primary font-semibold text-sm">
                    {member.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              Hành trình phát triển
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Nhìn lại những cột mốc đáng nhớ trong quá trình hình thành của
              PetLor.
            </p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-primary/20 hidden md:block"></div>

            <div
              className="relative mb-12 flex flex-col md:flex-row items-center justify-between"
              data-aos="fade-up"
            >
              <div className="w-full md:w-[45%] md:text-right mb-4 md:mb-0">
                <h3 className="text-2xl font-bold text-primary mb-2">2019</h3>
                <h4 className="text-xl font-bold mb-2 text-gray-900">
                  Những bước chân đầu tiên
                </h4>
                <p className="text-gray-500">
                  PetLor được thành lập với cửa hàng nhỏ đầu tiên chuyên về phụ
                  kiện và thức ăn thú cưng.
                </p>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary z-10 border-4 border-white shadow-md hidden md:block"></div>
              <div className="w-full md:w-[45%]"></div>
            </div>

            <div
              className="relative mb-12 flex flex-col md:flex-row items-center justify-between"
              data-aos="fade-up"
            >
              <div className="w-full md:w-[45%]"></div>
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary z-10 border-4 border-white shadow-md hidden md:block"></div>
              <div className="w-full md:w-[45%] mb-4 md:mb-0">
                <h3 className="text-2xl font-bold text-primary mb-2">2021</h3>
                <h4 className="text-xl font-bold mb-2 text-gray-900">
                  Ra mắt Pet Clinic
                </h4>
                <p className="text-gray-500">
                  Chính thức mở rộng sang lĩnh vực y tế với đội ngũ bác sĩ giàu
                  kinh nghiệm.
                </p>
              </div>
            </div>

            <div
              className="relative mb-12 flex flex-col md:flex-row items-center justify-between"
              data-aos="fade-up"
            >
              <div className="w-full md:w-[45%] md:text-right mb-4 md:mb-0">
                <h3 className="text-2xl font-bold text-primary mb-2">2023</h3>
                <h4 className="text-xl font-bold mb-2 text-gray-900">
                  Hệ sinh thái Pet Hotel & Spa
                </h4>
                <p className="text-gray-500">
                  Hoàn thiện mô hình chăm sóc 5 sao với khu nghỉ dưỡng và làm
                  đẹp cao cấp.
                </p>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary z-10 border-4 border-white shadow-md hidden md:block"></div>
              <div className="w-full md:w-[45%]"></div>
            </div>

            <div
              className="relative flex flex-col md:flex-row items-center justify-between"
              data-aos="fade-up"
            >
              <div className="w-full md:w-[45%]"></div>
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary z-10 border-4 border-white shadow-md hidden md:block"></div>
              <div className="w-full md:w-[45%] mb-4 md:mb-0">
                <h3 className="text-2xl font-bold text-primary mb-2">2024</h3>
                <h4 className="text-xl font-bold mb-2 text-gray-900">
                  Số hóa trải nghiệm
                </h4>
                <p className="text-gray-500">
                  Ra mắt ứng dụng đặt lịch và theo dõi sức khỏe thú cưng thông
                  minh.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="mt-24 rounded-[48px] overflow-hidden bg-[#F3F7F6] border border-teal-50 mb-10"
          data-aos="fade-up"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-[400px] lg:h-auto order-2 lg:order-1">
              <img
                alt="Happy pet owners"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqLPSKl-nWV_zxTXmrM7NbrCkgiS3AlNL4UXNxJT3E0rMzB7s7YD2xFkH093hIfqaJFcI-CXA-llLQpuJx_sPtrxvAPnhmv712E5cvlbJxAaxGMStrzsYVIXUn4rh7-ymxxULecrhVFIJeO910kGoy7Tnq-tIIhqmhEacY5Y1-R9PDsQefg_G1wvIFwZkYU17UHEWGGgaSpqbgPdver2A8hJwtimTxV17txHRBerIxM8k29AcyRR1v3NYpHt70xu45wfrhmSNiUNk"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/600x400?text=Community";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#F3F7F6] hidden lg:block"></div>
            </div>

            <div className="p-10 lg:p-20 flex flex-col justify-center order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold w-fit mb-6">
                <span className="material-symbols-outlined text-sm">group</span>
                <span>CỘNG ĐỒNG YÊU THÚ CƯNG</span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Gia nhập cộng đồng <span className="text-primary">PetLor</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Kết nối với hàng ngàn người yêu thú cưng để chia sẻ kinh nghiệm,
                nhận tư vấn từ chuyên gia và hưởng trọn những đặc quyền chăm sóc
                sức khỏe định kỳ tốt nhất.
              </p>

              <div className="flex items-center gap-6 mb-10">
                <div className="flex -space-x-4">
                  <img
                    alt="User"
                    className="w-12 h-12 rounded-full border-4 border-white object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBh5Ebb9RT5mHA_DCn6fMyCMrW1qz17Su5yfFQzX6s3EmdobnrNzJ7DESM7VL3ZXoAW-A5gLAsBIHhqgVs6cgMjAVN-X45Ym9-Ikh6qlCJqfWqVtyQ2aTZPobULp8mKEn6utHaDGYFERx8lbKLmmDt3bPwJmB3wbfKqah0MoUugsykzHgw3D_bdcmbuRQxzgbjiY2ws8kjhnnUt3RFMrJa4KBxPeyqvNmlgYNQU_gn5mwRC3RiaX_z1FxWu7FhdCd4EdzI22YCr8Wc"
                  />
                  <img
                    alt="User"
                    className="w-12 h-12 rounded-full border-4 border-white object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgkhqO5Sz6n3jPe7L1K09dx8_9nT8GB4AtEFl6GQ5AhP9InELBL41J1k6Ze6hABsdkeWcMmfO5bp-lj9Py3F2x6oh-DO-YHpsSLewCvVPOS-eGtNLGA-RGxM42dpq4oSSs_3SE1pXPMKqCs5WHZ54nZIsSvaxTgyCdyWEh5QjRf3nVjHU4ogHuBlNJjisAhM6HeajTUixjkftD-UvpXdpyV-roIQEnbD-cwBXZk8Zca8IIPVZhZqu7CX5HLlCzsPcZOpLbKJNyWRY"
                  />
                  <img
                    alt="User"
                    className="w-12 h-12 rounded-full border-4 border-white object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyLXK7AzVH26RrOe1AGCe_9exeYBwM09ls5yxE-_SqNHSRzf6Q-L2Quyq1Wl6Scb_yHQ_4pWwtuB8Mbc1TGdikvfgJLPM73bRcwSVPZHpZWA_qH8vQ8JqQd-72ZKPVh2va38WhoCxG1c-fPczsbt4GycYQrvM58rpJR9Jp_ZLSEWY4ka6rm_0f3FjeNKOPbjpqJutosAf8TvTy1_1yJ0uM-VPMonbUjWxUDs64mxL0c8mDYUwVttU03TfSbGCAhorH59ZpeEhvaLc"
                  />
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-primary flex items-center justify-center text-white text-xs font-bold">
                    +10k
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-bold text-gray-900">
                    Hơn 10,000+ Sen tin tưởng
                  </div>
                  <div className="text-gray-500">
                    Đã tham gia cùng chúng tôi
                  </div>
                </div>
              </div>

              <button className="bg-primary hover:bg-primary/90 text-white font-extrabold px-10 py-5 rounded-2xl text-lg shadow-xl shadow-primary/25 transition-all w-fit flex items-center gap-3">
                Khám phá ngay
                <span className="material-symbols-outlined">rocket_launch</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUsPage;
