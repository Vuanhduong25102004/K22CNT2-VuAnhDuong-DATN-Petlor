import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Dữ liệu Timeline
const historyEvents = [
  {
    year: "2015",
    title: "Thành lập năm 2015",
    date: "Tháng 5, 2015",
    icon: "flag",
  },
  {
    year: "2017",
    title: "Khai trương Spa đầu tiên",
    date: "Tháng 3, 2017",
    icon: "spa",
  },
  {
    year: "2020",
    title: "Mở rộng Dịch vụ",
    date: "Tháng 1, 2020",
    icon: "storefront",
  },
  {
    year: "2022",
    title: "Giải thưởng 'Chăm sóc Thú cưng Tốt nhất'",
    date: "Tháng 12, 2022",
    icon: "emoji_events",
  },
];

// Dữ liệu Team
const teamMembers = [
  {
    name: "BS. Trần An Nhiên",
    role: "Bác sĩ Thú y Trưởng",
    desc: "Với hơn 10 năm kinh nghiệm, BS. An Nhiên luôn đặt sức khỏe của thú cưng lên hàng đầu.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAS-BTTd_oRzp5hBuHmmgkqOm5KJSspYswlOLn1A9Es4Ep6vJoxfOWIW9pO9EiLu4pQx_w2S6OwmL6RFxDFjSkVlJb7eAaW37wFVgthHb0HJF8S1IH4dZz1zHCoO6oeyLe7jW8yiHRBTTXuCVhp7azdfID1aSgw5pe-c1Syn25c2RuHF8kjrg9BY6sCzWpB5pXXtSLjj3DwfLduhFsVXgvhbZ14CqLwKVQ9ZA1ogjULsIL84_Vuj_tcQDpQOIv94mjWXJt4bC3RMiS9",
  },
  {
    name: "Lê Quang Minh",
    role: "Chuyên viên Grooming",
    desc: "Anh Minh là chuyên gia tạo kiểu, mang lại vẻ ngoài xinh đẹp và gọn gàng cho các bé.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAa78Gx7IRsYeZluClw4mxo60GdX3468T7dh31k6BvNDEeBuHy39IuR6W9YI2rGtl9XxjMkfTRlk7t85OTTZsFA6E049sCAay_r2RNCvvPpJVJqhfZIwqc1QuvOma7nwUqiuGC_3GhqmzC46IsuJE9Ap9I8DRTBqSyfyy6AqU6NLaYmAA_g3XwW03uOP-2_XXvuBLQ_rag5b_I8BpoirqRPc0tn0n3sbqTQwTVfwUy4Sjdl7ibhdFslCV64vezU3SsXG9OtVRcdBrxI",
  },
  {
    name: "Phạm Hoàng Đức",
    role: "Nhân viên Chăm sóc",
    desc: "Anh Đức đảm bảo mọi thú cưng đều được vui chơi, ăn uống và nghỉ ngơi thoải mái.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqsabPlP_Clw4_dTb6W2CsV_u6vQvD33ZHWSAuGjPgqKERJOvYXhjuzC8hKL98IKQ5QF3TjhNxdyk5us5giKR-6FWEA1W0mWCNVW5PFvBa8HTl7zkxXSEzWy7h6IHpyRm4CefRjFB91yH6GudaboDOTl9RH71oTUS5JbhC4hUoKbVi558PxfTaNI3iFYG0BSaBQZ-Y3so8uBpimkDATr_IOObwAYeuOphjjpF7FZdeDhiRFC1Ta49oaaIPDu0T1t0Quvej-dwUAE7q",
  },
];

const AboutUsPage = () => {
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
    <div className="w-full font-display bg-white text-text-main pb-20">
      {/* 1. HERO SECTION */}
      <section
        className="px-4 py-6 md:px-10 max-w-7xl mx-auto md:py-20"
        data-aos="fade-up"
      >
        <div
          className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden bg-cover bg-center flex items-center justify-center text-center px-4"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuA-XE8dZ-dR39eo1-iWgOe83jRvwgDNcRGxZbMMadxuvJcaineuYLe4ZfjLYdL7jCHFlQ9OIQazZj8A-ZdiQEZpl6D1DdC5rGsGtjLma_p7-rtQbTzEAS9SNQLx0W2rX30Q494UHukKX0Butcr_6U1rL8FCB-xmQ4v5SHi6mbQg8Wk0irI73P1bTvM0y41_XtxabGdJLVcSaa0IvtysekGTDV2zKbrm4Afqdi-UQDyLmEHY_yTJD_lPIYcKhLoG3k5br_NEf5x-vmBU")`,
          }}
        >
          <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
            <h1
              className="text-white text-3xl md:text-5xl font-bold leading-tight drop-shadow-md"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Về PetLor Center – Ngôi Nhà Thứ Hai Của Thú Cưng
            </h1>
            <p
              className="text-white text-base md:text-lg font-medium drop-shadow-md"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Nơi tình yêu và sự chuyên nghiệp song hành.
            </p>

            {/* Button */}
            <div className="mt-4" data-aos="fade-up" data-aos-delay="300">
              <button className="relative group flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-6 py-3 font-bold text-[#111813] shadow-sm transition-all duration-300 ease-out hover:scale-105">
                <span className="absolute left-0 top-0 h-full w-0 bg-[#0dbd47] transition-all duration-300 ease-out group-hover:w-full"></span>
                <span className="relative z-10">Khám Phá Dịch Vụ</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TIMELINE SECTION */}
      <section
        className="px-4 py-12 md:px-10 max-w-7xl mx-auto"
        data-aos="fade-up"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-text-main">
          Câu Chuyện Của Chúng Tôi
        </h2>

        <div className="relative flex flex-col gap-0 pl-2">
          <div
            className="absolute left-[19px] top-3 bottom-10 w-[2px] bg-gray-200 z-0"
            data-aos="fade-in"
            data-aos-delay="200"
          ></div>

          {historyEvents.map((event, index) => (
            <div
              key={index}
              className="flex gap-6 relative z-10 pb-8 last:pb-0"
              data-aos="fade-up"
              data-aos-delay={index * 100 + 200}
            >
              <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                <span className="material-symbols-outlined text-[20px] text-text-main">
                  {event.icon}
                </span>
              </div>
              <div className="flex flex-col pt-0.5">
                <h3 className="text-base font-bold text-text-main leading-tight">
                  {event.title}
                </h3>
                <p className="text-sm text-text-muted mt-1">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MISSION SECTION (ĐÃ FIX LỖI HOVER) */}
      <section className="px-4 py-12 md:px-10 max-w-7xl mx-auto">
        <div className="mb-10" data-aos="fade-up">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-text-main">
            Sứ Mệnh & Giá Trị Cốt Lõi
          </h2>
          <p className="text-text-muted max-w-2xl">
            Chúng tôi tận tâm cung cấp sự chăm sóc tốt nhất cho những người bạn
            lông xù của bạn, dựa trên các nguyên tắc cốt lõi của chúng tôi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Wrapper fix */}
          <div data-aos="fade-up" data-aos-delay="100" className="h-full">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3 h-full transition-all duration-300 ease-out hover:shadow-md hover:-translate-y-2">
              <span className="material-symbols-outlined text-primary text-4xl">
                health_and_safety
              </span>
              <h3 className="font-bold text-lg">An Toàn Là Trên Hết</h3>
              <p className="text-sm text-text-muted">
                Chúng tôi ưu tiên sự an toàn và hạnh phúc của mỗi thú cưng.
              </p>
            </div>
          </div>

          {/* Card 2: Wrapper fix */}
          <div data-aos="fade-up" data-aos-delay="200" className="h-full">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3 h-full transition-all duration-300 ease-out hover:shadow-md hover:-translate-y-2">
              <span className="material-symbols-outlined text-primary text-4xl">
                favorite
              </span>
              <h3 className="font-bold text-lg">Tận Tâm Chuyên Nghiệp</h3>
              <p className="text-sm text-text-muted">
                Đội ngũ của chúng tôi gồm những chuyên gia được đào tạo bài bản
                và đầy đam mê.
              </p>
            </div>
          </div>

          {/* Card 3: Wrapper fix */}
          <div data-aos="fade-up" data-aos-delay="300" className="h-full">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3 h-full transition-all duration-300 ease-out hover:shadow-md hover:-translate-y-2">
              <span className="material-symbols-outlined text-primary text-4xl">
                groups
              </span>
              <h3 className="font-bold text-lg">Không Gian Thân Thiện</h3>
              <p className="text-sm text-text-muted">
                Chúng tôi tạo ra một không gian ấm áp và chào đón cho thú cưng
                và chủ nhân.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION - (MỚI THÊM) */}
      <section className="bg-primary text-[#102216] py-16 md:py-20 my-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-black/10">
            <div data-aos="fade-up" data-aos-delay="0" className="px-2">
              <p className="text-4xl md:text-6xl font-black mb-2">8+</p>
              <p className="font-bold text-sm md:text-base uppercase tracking-wider opacity-80">
                Năm Kinh Nghiệm
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="100" className="px-2">
              <p className="text-4xl md:text-6xl font-black mb-2">5k+</p>
              <p className="font-bold text-sm md:text-base uppercase tracking-wider opacity-80">
                Khách Hàng Hài Lòng
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="200" className="px-2">
              <p className="text-4xl md:text-6xl font-black mb-2">20+</p>
              <p className="font-bold text-sm md:text-base uppercase tracking-wider opacity-80">
                Chuyên Gia Thú Y
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="300" className="px-2">
              <p className="text-4xl md:text-6xl font-black mb-2">100%</p>
              <p className="font-bold text-sm md:text-base uppercase tracking-wider opacity-80">
                Tình Yêu Thú Cưng
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TEAM SECTION (ĐÃ FIX LỖI HOVER CHO BÁC SĨ) */}
      <section className="px-4 py-16 md:px-10 max-w-7xl mx-auto">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-text-main">
            Gặp Gỡ Đội Ngũ Chuyên Gia Của Chúng Tôi
          </h2>
          <p className="text-text-muted">
            Những con người tận tâm đứng sau sự chăm sóc tuyệt vời cho thú cưng
            của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            // --- KỸ THUẬT WRAPPER FIX LỖI ---
            // 1. Div CHA: Chạy AOS
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100 + 100}
              className="h-full"
            >
              {/* 2. Div CON: Chạy Hover & Style */}
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 h-full transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-2">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-primary/20 p-1 bg-white">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-bold text-text-main">
                  {member.name}
                </h3>
                <p className="text-primary font-bold text-sm mt-1 mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-text-muted leading-relaxed">
                  {member.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section
        className="px-4 md:px-10 max-w-7xl mx-auto mt-8"
        data-aos="fade-up"
      >
        <div className="bg-[#e8fdf0] border border-[#d1fae5] rounded-[32px] px-8 py-16 text-center flex flex-col items-center gap-6">
          <h2 className="text-2xl md:text-3xl font-bold text-text-main">
            Hãy để chúng tôi chăm sóc người bạn bốn chân của bạn!
          </h2>
          <p className="text-text-muted max-w-2xl text-center text-base">
            Chúng tôi cung cấp một môi trường an toàn, vui vẻ và chuyên nghiệp
            cho thú cưng của bạn. Liên hệ ngay để được tư vấn dịch vụ phù hợp
            nhất.
          </p>
          <button
            className="relative group/btn mt-4 flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-8 py-3 font-bold text-[#111813] shadow-sm transition-all duration-300 ease-out hover:scale-105
  before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:bg-[#10B981] before:transition-all before:duration-300 before:ease-out hover:before:w-full"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-white">
              Liên Hệ Tư Vấn
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
