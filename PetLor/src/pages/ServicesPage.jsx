import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Dữ liệu dịch vụ
const services = [
  {
    title: "Cắt Tỉa & Tắm Rửa",
    desc: "Quy trình tắm, sấy, cắt tỉa chuyên nghiệp theo yêu cầu.",
    price: "Từ 500.000 VNĐ",
    imgUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAlUPzYQu3Kt8yja-2KhY76pWJ0xDZWKyiOoNvFMlh1OBOV6EUc91DSZbgiFIn0gBelh6GmTQ3wjYVIqDl6hAlm1HnDEjACsz5OrbP67UJ9kSzqsGBlVgzpBuH1q8BOWG_kcmxOT8jQ91wlzsmyHTrTGsCoyNdHSrIHTltp8WmwUAzILv3L1SbxlKZblF6SM7uNi_5C19M_FlveT1XnqeYMErOyINY_Ic-7oEs52S3-lvlIuV6P3nTnY7vZFDcHt7bjjmcjnb3hWMUV",
  },
  {
    title: "Trông Giữ Thú Cưng",
    desc: "Không gian an toàn, chế độ chăm sóc tận tình, hoạt động vui chơi.",
    price: "Từ 300.000 VNĐ/ngày",
    imgUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD2ORUkBfRHB-ck4eWeR3YQGZ6B86xk16AoSJz7-nDKfUYFuD5huDUtgmrbaQvnE8TYj1WKiDgA-fPBNPB0PcMfZ520m0OmLyfI9iiX0w2ME1WMJ9u6UeC0m6OuUhVLhC1k3f0-f11cshyE0o4-lQ6TtZmEdpS8ioxa_9wF4mb4gowmVrT-mDGaB7UoIsUG-QdIHFzAHA95hJlpUUKgzuby_iDUnc_xkXtGA7mkD6jha07H9du5JvJh87ssaFFyPwX0JPr7X9dXcf8o",
  },
  {
    title: "Huấn Luyện Cơ Bản",
    desc: "Các bài học vâng lời cơ bản với phương pháp huấn luyện tích cực.",
    price: "Từ 2.000.000 VNĐ/khóa",
    imgUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAvqPwwLHeV4gGAVGlEkJ1m9CgmkLPjbbjw_pQ0Vda030ZMhycuw8WW1cdzIlemhJFq-vl6ElifVOmK05lJn5Fx3CvgKbEou2GAxGGi-Bl4UBcOaLfbpKF2E-Z3lw6r0xZFVTZx3IBU4I474Mq4Xkh7JfCouwWPBGYSK1MrLCe2I-p4gCKt9x4tvfus5M9ir7YXnXS8C8wbZbnrhPEg4a8cD-MAE_onZeedmd7SlyerwDPLeEsgkJaODojZpsytNVRkGT8ggMynkvs9",
  },
  {
    title: "Dịch Vụ Spa & Thư Giãn",
    desc: "Các liệu pháp chăm sóc đặc biệt giúp thú cưng thư giãn tối đa.",
    price: "Liên hệ để biết giá",
    imgUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCDAHUwBeXZGS8t9hdUFHNWKEfUj9ccXlh5YrAi3jBq4PyImz8oQmjFpHQ3AzT_Hs-nCipMuUGX6bnsCdTWSw5cV-5g9e13BvNVKRGG6HIo836UVpcBVvgf-bzePOFY28w9Mgif8_OHCkUZjykLZrQS5Tk9zfvON3QEfoekeCz4H6CFxzEb1IsyN6dV6ssPxvdvdJbnLbdeRhnB7-u4Qwkg5W-KNoHHEFwXMUY5gb8dc0Nyyki54IkesnDNQKj6ig5DS2YFrFyvWhXT",
  },
];

const ServicesPage = () => {
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
    <>
      <div className="w-full font-display bg-background-light text-gray-800">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 lg:py-20" data-aos="fade-up">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className="flex min-h-[400px] flex-col gap-6 rounded-xl bg-cover bg-center bg-no-repeat items-center justify-center p-4 text-center shadow-md"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBH7Mh6-y8FjGuuxz3DrTFbg3acOHyT-L75jZ1zdo4wH7a6qA_pegIFoEQ4dmkY_5GItSo-D1UVA7pIjqh4Yz4VqxXyfFgnTigdv-ef-zyfbULiyJplsoUuBkIoa3qzhebUoSco8XCF3NeWDfLoRHNBSYMJ0Ucr17Vj73fOn5fYJDofxH_dDqaSG9rEEeTsAC_kdvidz-CklnSWi9T1aCbKfxlq4AP1jRc0sqDnmUXQA4N88wdke6jx2837mZEnO1_yFN7E1DL7LAaf")`,
              }}
            >
              <div className="flex flex-col gap-4">
                <h1
                  className="text-white text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl lg:text-6xl drop-shadow-md"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  Dịch Vụ Chăm Sóc Thú Cưng 5 Sao
                </h1>
                <p
                  className="text-white text-base font-normal leading-normal max-w-2xl sm:text-lg drop-shadow-md"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  Cam kết mang đến chất lượng và tình yêu thương tốt nhất cho
                  thú cưng của bạn.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services List Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6">
              <h2
                className="text-gray-900 text-3xl font-bold leading-tight tracking-[-0.015em] px-4"
                data-aos="fade-up"
              >
                Các Dịch Vụ Của Chúng Tôi
              </h2>

              {/* Filters */}
              <div
                className="flex flex-wrap gap-3 p-3"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="flex h-9 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-full bg-primary/20 px-4">
                  <p className="text-primary text-sm font-bold leading-normal">
                    Tất cả
                  </p>
                </div>
                {["Chăm sóc lông", "Trông giữ", "Huấn luyện"].map((filter) => (
                  <div
                    key={filter}
                    className="flex h-9 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-full bg-gray-200 px-4 hover:bg-gray-300 transition-colors"
                  >
                    <p className="text-gray-800 text-sm font-medium leading-normal">
                      {filter}
                    </p>
                  </div>
                ))}
              </div>

              {/* Grid Services */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                {services.map((item, index) => (
                  // --- KỸ THUẬT WRAPPER ĐỂ FIX LỖI ---

                  // 1. Div CHA: Chỉ chịu trách nhiệm chạy AOS (Xuất hiện)
                  <div
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={index * 100 + 100}
                    className="h-full" // Đảm bảo chiều cao full để grid đều nhau
                  >
                    {/* 2. Div CON: Chịu trách nhiệm Giao diện & Hover (Không dính dáng AOS) */}
                    <div className="flex flex-col gap-4 overflow-hidden rounded-xl bg-white border border-gray-200 h-full transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-2">
                      <div
                        className="w-full bg-center bg-no-repeat aspect-video bg-cover"
                        style={{ backgroundImage: `url("${item.imgUrl}")` }}
                      ></div>
                      <div className="flex flex-col p-4 pt-0 gap-3 flex-1">
                        {" "}
                        {/* flex-1 để đẩy nút xuống đáy nếu cần */}
                        <p className="text-gray-900 text-lg font-bold leading-normal">
                          {item.title}
                        </p>
                        <p className="text-gray-600 text-sm font-normal leading-normal">
                          {item.desc}
                        </p>
                        <p className="text-gray-700 text-sm font-semibold leading-normal mt-auto">
                          {" "}
                          {/* mt-auto đẩy giá xuống dưới */}
                          {item.price}
                        </p>
                        {/* Button Swipe Right + Scale */}
                        <button className="relative group mt-2 w-full flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-[#111813] text-sm font-bold shadow-sm transition-all duration-300 ease-out hover:scale-105">
                          <span className="absolute left-0 top-0 h-full w-0 bg-[#0dbd47] transition-all duration-300 ease-out group-hover:w-full"></span>
                          <span className="relative z-10 truncate">
                            Xem Chi Tiết
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS SECTION - (MỚI THÊM) */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white border-y border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-3xl font-bold text-gray-900">
                Quy Trình Dịch Vụ
              </h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Chúng tôi tối ưu hóa quy trình để mang lại trải nghiệm thoải mái
                nhất cho thú cưng và sự an tâm tuyệt đối cho bạn.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connecting Line (Desktop only) */}
              <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-10"></div>

              {[
                {
                  step: "01",
                  icon: "calendar_month",
                  title: "Đặt Lịch Hẹn",
                  desc: "Chọn dịch vụ và thời gian phù hợp qua website hoặc hotline của chúng tôi.",
                },
                {
                  step: "02",
                  icon: "pets",
                  title: "Đưa Đón & Chăm Sóc",
                  desc: "Mang thú cưng đến spa hoặc sử dụng dịch vụ đưa đón tận nơi. Các bé sẽ được chăm sóc tận tình.",
                },
                {
                  step: "03",
                  icon: "sentiment_satisfied",
                  title: "Hoàn Tất & Vui Vẻ",
                  desc: "Bạn nhận lại thú cưng trong trạng thái sạch sẽ, khỏe mạnh và vui vẻ nhất.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center group"
                  data-aos="fade-up"
                  data-aos-delay={idx * 150}
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary text-[#111813] flex items-center justify-center shadow-lg shadow-primary/30 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <span className="material-symbols-outlined text-3xl">
                        {item.icon}
                      </span>
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white border-2 border-primary flex items-center justify-center text-xs font-bold text-primary">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING SECTION - (MỚI THÊM) */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12" data-aos="fade-up">
              <h2 className="text-3xl font-bold text-gray-900">
                Bảng Giá Tham Khảo
              </h2>
              <p className="mt-4 text-gray-600">
                Chọn gói dịch vụ phù hợp nhất với nhu cầu của bé cưng nhà bạn.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Cơ Bản",
                  price: "300.000đ",
                  desc: "Dành cho việc vệ sinh định kỳ.",
                  features: [
                    "Tắm & Sấy khô",
                    "Vệ sinh tai & móng",
                    "Chải lông cơ bản",
                  ],
                  highlight: false,
                },
                {
                  name: "Tiêu Chuẩn",
                  price: "500.000đ",
                  desc: "Gói được yêu thích nhất.",
                  features: [
                    "Bao gồm gói Cơ Bản",
                    "Cắt tỉa tạo kiểu",
                    "Vệ sinh tuyến hôi",
                    "Xịt thơm cao cấp",
                  ],
                  highlight: true,
                },
                {
                  name: "Thượng Hạng",
                  price: "900.000đ",
                  desc: "Trải nghiệm Spa đẳng cấp.",
                  features: [
                    "Bao gồm gói Tiêu Chuẩn",
                    "Massage thư giãn",
                    "Ủ dưỡng lông mềm mượt",
                    "Đưa đón tận nơi (<5km)",
                  ],
                  highlight: false,
                },
              ].map((plan, idx) => (
                <div
                  key={idx}
                  className={`relative flex flex-col p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 ${
                    plan.highlight
                      ? "bg-white border-2 border-primary shadow-xl scale-105 z-10"
                      : "bg-white border border-gray-200 shadow-sm"
                  }`}
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  {plan.highlight && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-[#111813] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      Phổ biến nhất
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900">
                    {plan.name}
                  </h3>
                  <div className="mt-4 flex items-baseline text-gray-900">
                    <span className="text-4xl font-black tracking-tight">
                      {plan.price}
                    </span>
                    <span className="ml-1 text-sm font-semibold text-gray-500">
                      /lần
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{plan.desc}</p>
                  <ul className="mt-8 space-y-4 flex-1">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start">
                        <span className="material-symbols-outlined text-primary text-xl mr-3 shrink-0">
                          check_circle
                        </span>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`mt-8 w-full py-3 px-4 rounded-lg font-bold text-sm transition-colors ${
                      plan.highlight
                        ? "bg-primary text-[#111813] hover:bg-[#0dbd47]"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    Chọn Gói Này
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center" data-aos="fade-up">
              <p className="text-sm text-gray-500 italic">
                * Giá trên chỉ mang tính chất tham khảo và có thể thay đổi tùy
                theo cân nặng và tình trạng lông của thú cưng.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20" data-aos="fade-up">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-primary/20 rounded-xl p-8 sm:p-12 text-center flex flex-col items-center gap-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Sẵn Sàng Chăm Sóc Bé Yêu Của Bạn?
              </h2>
              <p className="text-base sm:text-lg text-gray-700 max-w-2xl">
                Đặt lịch hẹn ngay hôm nay để nhận được sự tư vấn và dịch vụ tốt
                nhất từ đội ngũ chuyên gia của chúng tôi. Thú cưng của bạn xứng
                đáng được yêu thương và chăm sóc đặc biệt!
              </p>

              {/* Button CTA */}
              <button className="relative group flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-[#111813] text-base font-bold shadow-sm transition-all duration-300 ease-out hover:scale-105">
                <span className="absolute left-0 top-0 h-full w-0 bg-[#0dbd47] transition-all duration-300 ease-out group-hover:w-full"></span>
                <span className="relative z-10 truncate">Đặt Lịch Ngay</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServicesPage;
