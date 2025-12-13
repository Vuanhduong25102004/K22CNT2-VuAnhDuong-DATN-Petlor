import React, { useEffect } from "react";
// 1. Import AOS
import AOS from "aos";
import "aos/dist/aos.css";

const ContactPage = () => {
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
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="flex flex-col gap-12">
            {/* Header Section - Animation Fade Up */}
            <div
              className="flex flex-wrap justify-between gap-6"
              data-aos="fade-up"
            >
              <div className="flex min-w-72 flex-col gap-3">
                <h1 className="text-text-main text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em]">
                  Liên hệ với chúng tôi
                </h1>
                <p className="text-text-muted text-base font-normal leading-normal max-w-lg">
                  Chúng tôi rất mong được lắng nghe từ bạn! Hãy sử dụng thông
                  tin dưới đây để kết nối hoặc gửi tin nhắn cho chúng tôi.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
              {/* LEFT COLUMN: Contact Info & Map */}
              <div className="lg:col-span-2 flex flex-col gap-8">
                {/* Info Cards */}
                <div className="space-y-6">
                  {/* Address - Delay 100ms */}
                  <div
                    className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <div className="text-text-main flex items-center justify-center rounded-lg bg-primary/20 shrink-0 size-12">
                      <span className="material-symbols-outlined">
                        location_on
                      </span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-text-main text-base font-medium leading-normal line-clamp-1">
                        Địa chỉ
                      </p>
                      <p className="text-text-muted text-sm font-normal leading-normal line-clamp-2">
                        123 Đường Pet Lover, Quận 1, TP. Hồ Chí Minh
                      </p>
                    </div>
                  </div>

                  {/* Phone - Delay 200ms */}
                  <div
                    className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <div className="text-text-main flex items-center justify-center rounded-lg bg-primary/20 shrink-0 size-12">
                      <span className="material-symbols-outlined">phone</span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-text-main text-base font-medium leading-normal line-clamp-1">
                        Số điện thoại
                      </p>
                      <p className="text-text-muted text-sm font-normal leading-normal line-clamp-2">
                        (+84) 987 654 321
                      </p>
                    </div>
                  </div>

                  {/* Email - Delay 300ms */}
                  <div
                    className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <div className="text-text-main flex items-center justify-center rounded-lg bg-primary/20 shrink-0 size-12">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-text-main text-base font-medium leading-normal line-clamp-1">
                        Email
                      </p>
                      <p className="text-text-muted text-sm font-normal leading-normal line-clamp-2">
                        support@petlor.vn
                      </p>
                    </div>
                  </div>
                </div>

                {/* Google Maps Iframe - Delay 400ms */}
                <div
                  className="w-full h-80 rounded-xl overflow-hidden border border-gray-200 shadow-sm"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <iframe
                    title="Bản đồ PetLor"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5132741062075!2d106.69915290000001!3d10.7719601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f40a3b49e59%3A0xa1bd14e483a602db!2sBen%20Thanh%20Market!5e0!3m2!1sen!2s!4v1710927000000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              {/* RIGHT COLUMN: Contact Form - Delay 200ms (Xuất hiện cùng lúc với cột trái) */}
              <div
                className="lg:col-span-3 bg-white p-8 rounded-xl border border-gray-200 shadow-sm"
                data-aos="fade-up" // Hoặc dùng "fade-left" nếu muốn nó trượt từ phải sang
                data-aos-delay="200"
              >
                <form action="#" className="space-y-6" method="POST">
                  <div>
                    <label
                      className="block text-sm font-medium leading-6 text-text-main"
                      htmlFor="full-name"
                    >
                      Họ và Tên
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="full-name"
                        id="full-name"
                        autoComplete="name"
                        className="block w-full rounded-lg border-0 py-2.5 px-4 bg-background-light text-text-main shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        placeholder="Nhập họ và tên của bạn"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium leading-6 text-text-main"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <div className="mt-2">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        className="block w-full rounded-lg border-0 py-2.5 px-4 bg-background-light text-text-main shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium leading-6 text-text-main"
                      htmlFor="phone-number"
                    >
                      Số điện thoại
                    </label>
                    <div className="mt-2">
                      <input
                        type="tel"
                        name="phone-number"
                        id="phone-number"
                        autoComplete="tel"
                        className="block w-full rounded-lg border-0 py-2.5 px-4 bg-background-light text-text-main shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        placeholder="Nhập số điện thoại của bạn"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium leading-6 text-text-main"
                      htmlFor="subject"
                    >
                      Chủ đề
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        className="block w-full rounded-lg border-0 py-2.5 px-4 bg-background-light text-text-main shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        placeholder="Chủ đề tin nhắn"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium leading-6 text-text-main"
                      htmlFor="message"
                    >
                      Nội dung tin nhắn
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        className="block w-full rounded-lg border-0 py-2.5 px-4 bg-background-light text-text-main shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 resize-y max-h-60 min-h-20"
                        placeholder="Nội dung bạn muốn gửi đến chúng tôi..."
                      ></textarea>
                    </div>
                  </div>

                  <div>
                    {/* NÚT GỬI: Đã cập nhật animation "Swipe Right" + "Scale mượt" */}
                    <button
                      type="submit"
                      className="relative group flex w-full justify-center rounded-lg bg-primary px-4 py-3 text-sm font-bold text-[#111813] shadow-sm overflow-hidden transition-all duration-300 ease-out hover:scale-105"
                    >
                      {/* Lớp nền chạy từ trái sang */}
                      <span className="absolute left-0 top-0 h-full w-0 bg-[#0dbd47] transition-all duration-300 ease-out group-hover:w-full"></span>

                      {/* Chữ nổi lên trên */}
                      <span className="relative z-10">Gửi tin nhắn</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* FAQ SECTION - (MỚI THÊM) */}
          <div className="mt-20 pt-16 border-t border-gray-200">
            <div className="text-center mb-12" data-aos="fade-up">
              <h2 className="text-3xl font-bold text-text-main">
                Câu Hỏi Thường Gặp
              </h2>
              <p className="mt-4 text-text-muted">
                Giải đáp nhanh những thắc mắc phổ biến của khách hàng.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 max-w-5xl mx-auto">
              {[
                {
                  q: "PetLor có làm việc vào ngày lễ không?",
                  a: "Có, chúng tôi mở cửa xuyên suốt các ngày lễ tết để phục vụ nhu cầu chăm sóc thú cưng của bạn (có thể áp dụng phụ phí ngày lễ).",
                },
                {
                  q: "Tôi cần đặt lịch trước bao lâu?",
                  a: "Để đảm bảo có chỗ tốt nhất, bạn nên đặt lịch trước ít nhất 24h. Đối với các dịp lễ tết, vui lòng đặt trước 3-5 ngày.",
                },
                {
                  q: "Dịch vụ đưa đón tính phí như thế nào?",
                  a: "Chúng tôi miễn phí đưa đón trong bán kính 3km cho hóa đơn từ 500k. Các trường hợp khác sẽ tính phí dựa trên khoảng cách thực tế qua Grab/Ahamove.",
                },
                {
                  q: "Tôi có thể xem camera khi gửi thú cưng không?",
                  a: "Chắc chắn rồi! Với dịch vụ khách sạn thú cưng, chúng tôi cung cấp quyền truy cập camera 24/7 để bạn an tâm quan sát bé.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  <div className="shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-bold">
                      ?
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-main mb-2">
                      {item.q}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
