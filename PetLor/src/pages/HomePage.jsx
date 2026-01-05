import React, { useEffect } from "react";
// 1. Import thư viện AOS và CSS của nó
import AOS from "aos";
import "aos/dist/aos.css";

const Homepage = () => {
  // 2. Khởi tạo AOS khi trang web load xong
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
      {/* HERO SECTION */}
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4 md:pt-20 md:pb-10">
        <div className="@container">
          <div className="@[480px]:p-4">
            <div
              className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10"
              data-alt="A happy golden retriever playing with a ball in a sunny park."
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAtC6xXp4MJU3q98FgNk7hLwIs43g8l_9ptL6JcfCs97KZC-QwwcjbIPWXBfX5LAfvpEC9z9CZkQZlcHwiRTV4xYR5phHUjYLXXSuQTHrJlvcQBHl_h_sBvk9nDA9BrBPKAoSAT_ibd4eJzf_2J-qAaAZVjBp8drkinymn5TyHiL9-BrGGzz-yN9VSgRL7zVl5oG_x7Y5heAivA4TLq9KX0nJNk3OEiLl0dL3wv9d4FqcMdIiCRmD58ICO6TWk4zM3FkYktwh39py5-")',
              }}
            >
              <div
                className="flex flex-col gap-2 text-left max-w-2xl"
                data-aos="fade-up"
              >
                <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                  Chăm sóc đặc biệt cho người bạn thân nhất của bạn
                </h1>
                <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                  Chúng tôi cung cấp dịch vụ chăm sóc thú cưng toàn diện và nhân
                  ái để đảm bảo thú cưng của bạn luôn vui vẻ và khỏe mạnh.
                </h2>
              </div>
              <div className="mt-4" data-aos="fade-up" data-aos-delay="300">
                <button className="relative group inline-flex items-center justify-center overflow-hidden rounded-lg bg-primary px-8 py-3 text-sm font-bold text-[#111813] shadow-lg transition-all duration-300 ease-out hover:scale-105 before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:bg-[#10B981] before:transition-all before:duration-300 before:ease-out hover:before:w-full">
                  <span className="relative z-10 truncate transition-colors duration-300 group-hover:text-white">
                    Đặt lịch hẹn
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20">
        <h2
          className="text-text-main text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-center"
          data-aos="fade-up"
        >
          Dịch vụ của chúng tôi
        </h2>
        <p
          className="text-center text-text-secondary max-w-2xl mx-auto pb-8"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Từ việc chải chuốt đến chăm sóc sức khỏe, chúng tôi cung cấp mọi thứ
          mà người bạn lông xù của bạn cần để luôn hạnh phúc và khỏe mạnh.
        </p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 p-4">
          <div
            className="flex flex-col gap-3 pb-3"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBlBe98eqx_FJ9BPC7rsfsHss7F30UJWfn02-Eu4aKJngW70smk9lXudT0bf6Vu3xJWjCifk0BH5BZC-ZOYmETasO_PCyzlskfPsL-_pzEpJaZmpJCE4d4W6fQ3RA3trdmwUopchZ7IqYTaYaEIW0TpJta9Hw3HXbWMMtOir-L6_VqE0heaKG_tXlpQr7pIXkB9OP5dQAPY2_1hGkqtY7VL31GiejBkE1c2RqjVYwvTns3NXmkUV3qj9-6Zh0rTSO2gfZC7S9x3JFIM")',
              }}
            ></div>
            <div>
              <p className="text-text-main text-base font-medium leading-normal">
                Chăm sóc lông chuyên nghiệp
              </p>
              <p className="text-text-secondary text-sm font-normal leading-normal">
                Giúp thú cưng của bạn trông đẹp nhất với các dịch vụ chăm sóc
                lông của chúng tôi.
              </p>
            </div>
          </div>

          <div
            className="flex flex-col gap-3 pb-3"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjvPaf-P0OKCyq-4m4KqS6JFxdjdlYo7X1BE7Th5T2aPeuGo52pZTlkfr1xXAE59edXVFWLHfqq5BOpatnPF_xMYbZvZGoGQs2csOt7sw86TCGPdlndMP3jy0wTdQcQhGen8-DOrgahc3Lg-84p6k6gDanv69cbD1z1CB3ojvD1Pev5TMko8e6PrN4bf7NOYLRyGW_yStlvzRCqsnHdsr7-t0HvUWQeq4SjgVFADnDsVf584zmC_Te4qUBqiwdoJ8raFEcl3m9TbKV")',
              }}
            ></div>
            <div>
              <p className="text-text-main text-base font-medium leading-normal">
                Nhà trẻ an toàn & vui vẻ
              </p>
              <p className="text-text-secondary text-sm font-normal leading-normal">
                Một môi trường được giám sát để thú cưng của bạn chơi và giao
                lưu.
              </p>
            </div>
          </div>

          <div
            className="flex flex-col gap-3 pb-3"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD7rzu48y5vAgElTRy0B4caAVV0ziu0bheApcmQHP-je0exqa3Gq4-QhpDw6r3cncaQDLn_JIMLA3pyTzwO1hG_POLbnFtrm7T34GJ84fbu0oNly6HCdRjIeRR4tAXkthbar9_7G_JPqgnr_PTRXgGldO63nz34UTBxUeJBv3Xd0JtKPmC7sQeUH1LPs6q0z50VTK0t5-ieb8SF1Sakssahg-zEFnJ3M6UX744QCsNZlDRQHOZyau7Yk8VuS3j42RJvFQRXz4ynP8iP")',
              }}
            ></div>
            <div>
              <p className="text-text-main text-base font-medium leading-normal">
                Dịch vụ thú y chuyên nghiệp
              </p>
              <p className="text-text-secondary text-sm font-normal leading-normal">
                Kiểm tra sức khỏe toàn diện và chăm sóc phòng ngừa từ các bác sĩ
                thú y của chúng tôi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US - (ĐÃ SỬA LỖI ANIMATION MƯỢT MÀ) */}
      <section className="bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20">
          <div className="flex flex-col gap-10 @container">
            <div
              className="flex flex-col gap-6 items-center text-center"
              data-aos="fade-up"
            >
              <div className="flex flex-col gap-4">
                <h1 className="text-text-main tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
                  Tại sao chọn chúng tôi?
                </h1>
                <p className="text-text-secondary text-base font-normal leading-normal max-w-[720px]">
                  Chúng tôi cam kết cung cấp môi trường an toàn, chu đáo và tốt
                  nhất cho thú cưng của bạn.
                </p>
              </div>
              <button className="relative group inline-flex items-center justify-center overflow-hidden rounded-lg bg-primary px-8 py-3 text-sm font-bold text-[#111813] shadow-lg transition-all duration-300 ease-out hover:scale-105 before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:bg-[#10B981] before:transition-all before:duration-300 before:ease-out hover:before:w-full">
                <span className="relative z-10 truncate transition-colors duration-300 group-hover:text-white">
                  Tìm hiểu thêm
                </span>
              </button>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 p-0">
              {/* Item 1: Nhân viên */}
              <div data-aos="fade-up" data-aos-delay="200" className="h-full">
                <div className="flex flex-1 gap-3 rounded-lg border border-border-color bg-background-light p-4 flex-col text-center items-center h-full transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-2">
                  <div className="text-primary text-3xl">
                    <span className="material-symbols-outlined !text-4xl">
                      groups
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-text-main text-base font-bold leading-tight">
                      Nhân viên giàu kinh nghiệm
                    </h2>
                    <p className="text-text-secondary text-sm font-normal leading-normal">
                      Đội ngũ của chúng tôi bao gồm các chuyên gia yêu thú cưng
                      tận tâm.
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 2: Môi trường */}
              <div data-aos="fade-up" data-aos-delay="300" className="h-full">
                <div className="flex flex-1 gap-3 rounded-lg border border-border-color bg-background-light p-4 flex-col text-center items-center h-full transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-2">
                  <div className="text-primary text-3xl">
                    <span className="material-symbols-outlined !text-4xl">
                      shield
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-text-main text-base font-bold leading-tight">
                      Môi trường an toàn
                    </h2>
                    <p className="text-text-secondary text-sm font-normal leading-normal">
                      Cơ sở vật chất của chúng tôi được thiết kế an toàn và
                      thoải mái cho thú cưng.
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 3: Chăm sóc */}
              <div data-aos="fade-up" data-aos-delay="400" className="h-full">
                <div className="flex flex-1 gap-3 rounded-lg border border-border-color bg-background-light p-4 flex-col text-center items-center h-full transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-2">
                  <div className="text-primary text-3xl">
                    <span className="material-symbols-outlined !text-4xl">
                      favorite
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-text-main text-base font-bold leading-tight">
                      Chăm sóc toàn diện
                    </h2>
                    <p className="text-text-secondary text-sm font-normal leading-normal">
                      Từ chăm sóc sức khỏe đến vui chơi, chúng tôi đáp ứng mọi
                      nhu cầu của thú cưng.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section: Thư viện khoảnh khắc --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 border-t border-border-color">
        <div
          className="flex flex-col gap-4 mb-8 text-center"
          data-aos="fade-up"
        >
          <h2 className="text-text-main text-[22px] font-bold leading-tight tracking-[-0.015em]">
            Thư viện khoảnh khắc
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Những hình ảnh đáng yêu của các bé thú cưng khi sử dụng dịch vụ tại
            PetCare.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {/* Ảnh lớn */}
          <div
            className="col-span-2 row-span-2 relative group overflow-hidden rounded-xl"
            data-aos="zoom-in"
          >
            <div
              className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-500"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAtC6xXp4MJU3q98FgNk7hLwIs43g8l_9ptL6JcfCs97KZC-QwwcjbIPWXBfX5LAfvpEC9z9CZkQZlcHwiRTV4xYR5phHUjYLXXSuQTHrJlvcQBHl_h_sBvk9nDA9BrBPKAoSAT_ibd4eJzf_2J-qAaAZVjBp8drkinymn5TyHiL9-BrGGzz-yN9VSgRL7zVl5oG_x7Y5heAivA4TLq9KX0nJNk3OEiLl0dL3wv9d4FqcMdIiCRmD58ICO6TWk4zM3FkYktwh39py5-")`,
              }}
            ></div>
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <span className="material-symbols-outlined text-white !text-4xl">
                play_circle
              </span>
            </div>
          </div>

          {/* Các ảnh nhỏ */}
          <div
            className="col-span-1 row-span-1 rounded-xl overflow-hidden"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <div
              className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-500"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBlBe98eqx_FJ9BPC7rsfsHss7F30UJWfn02-Eu4aKJngW70smk9lXudT0bf6Vu3xJWjCifk0BH5BZC-ZOYmETasO_PCyzlskfPsL-_pzEpJaZmpJCE4d4W6fQ3RA3trdmwUopchZ7IqYTaYaEIW0TpJta9Hw3HXbWMMtOir-L6_VqE0heaKG_tXlpQr7pIXkB9OP5dQAPY2_1hGkqtY7VL31GiejBkE1c2RqjVYwvTns3NXmkUV3qj9-6Zh0rTSO2gfZC7S9x3JFIM")`,
              }}
            ></div>
          </div>
          <div
            className="col-span-1 row-span-1 rounded-xl overflow-hidden"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div
              className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-500"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjvPaf-P0OKCyq-4m4KqS6JFxdjdlYo7X1BE7Th5T2aPeuGo52pZTlkfr1xXAE59edXVFWLHfqq5BOpatnPF_xMYbZvZGoGQs2csOt7sw86TCGPdlndMP3jy0wTdQcQhGen8-DOrgahc3Lg-84p6k6gDanv69cbD1z1CB3ojvD1Pev5TMko8e6PrN4bf7NOYLRyGW_yStlvzRCqsnHdsr7-t0HvUWQeq4SjgVFADnDsVf584zmC_Te4qUBqiwdoJ8raFEcl3m9TbKV")`,
              }}
            ></div>
          </div>
          <div
            className="col-span-1 row-span-1 rounded-xl overflow-hidden"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <div
              className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-500"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuD7rzu48y5vAgElTRy0B4caAVV0ziu0bheApcmQHP-je0exqa3Gq4-QhpDw6r3cncaQDLn_JIMLA3pyTzwO1hG_POLbnFtrm7T34GJ84fbu0oNly6HCdRjIeRR4tAXkthbar9_7G_JPqgnr_PTRXgGldO63nz34UTBxUeJBv3Xd0JtKPmC7sQeUH1LPs6q0z50VTK0t5-ieb8SF1Sakssahg-zEFnJ3M6UX744QCsNZlDRQHOZyau7Yk8VuS3j42RJvFQRXz4ynP8iP")`,
              }}
            ></div>
          </div>
          <div
            className="col-span-1 row-span-1 rounded-xl overflow-hidden"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div
              className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-500"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCC2Yw5KRIHmlkMIeMvskGAauYdQslWR4nhqV5KJArUu77Z7l4IQLvN3Lo3Juh0go0qQ6atwMJ4Mwg06gT2bugK9Ih8cxWnWZwBG4hG0cFy20lTm27unCUJ31N7xmZ6eo79omYRhuqKqHzE-wJr5ghI4zmM7DdbKbmM_WvDIv2XBK6UAKEMIX0jC_RGLUzOuqSjR8pefSeVhz8Rr-l8IcJ8pLhVMFkvYb06KpQoXYJv8wZeyVqPXAdyvH_-Nn71steakGNtckQ8FpAb")`,
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - (ĐÃ SỬA DÙNG WRAPPER ĐỂ FIX LỖI & THÊM HIỆU ỨNG) */}
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20">
        <h2
          className="text-text-main text-[22px] font-bold leading-tight tracking-[-0.015em] text-center mb-8"
          data-aos="fade-up"
        >
          Khách hàng nói gì về chúng tôi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div data-aos="fade-up" data-aos-delay="200" className="h-full">
            <div className="bg-white p-6 rounded-xl border border-border-color flex flex-col items-center text-center h-full transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1">
              <img
                className="w-20 h-20 rounded-full object-cover mb-4"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCC2Yw5KRIHmlkMIeMvskGAauYdQslWR4nhqV5KJArUu77Z7l4IQLvN3Lo3Juh0go0qQ6atwMJ4Mwg06gT2bugK9Ih8cxWnWZwBG4hG0cFy20lTm27unCUJ31N7xmZ6eo79omYRhuqKqHzE-wJr5ghI4zmM7DdbKbmM_WvDIv2XBK6UAKEMIX0jC_RGLUzOuqSjR8pefSeVhz8Rr-l8IcJ8pLhVMFkvYb06KpQoXYJv8wZeyVqPXAdyvH_-Nn71steakGNtckQ8FpAb"
                alt="Whiskers"
              />
              <p className="text-text-secondary italic">
                "Dịch vụ tuyệt vời! Whiskers nhà tôi luôn rất vui vẻ mỗi khi trở
                về từ đây. Nhân viên rất thân thiện và chuyên nghiệp."
              </p>
              <div className="flex mt-2 text-primary">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined !text-xl">
                    star
                  </span>
                ))}
              </div>
              <p className="mt-4 font-bold text-text-main">
                Lan Anh & Whiskers
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div data-aos="fade-up" data-aos-delay="300" className="h-full">
            <div className="bg-white p-6 rounded-xl border border-border-color flex flex-col items-center text-center h-full transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1">
              <img
                className="w-20 h-20 rounded-full object-cover mb-4"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1aC0yG6depGCWIo7KYj6trhBfJjnfw-utCgKWxckZzXiWKpqq-_80mk1edL3UFy_8e9CRKAX0N2xQKW10v2B6cxUr8wUqetwy2tRNOZIxPCpi0tDOwgFj2UjotzWuhwvYzXO3a_8qgQFJ3LV3iF8kLYU9mpAoq2MiJ-agsHBaBQna902sNkc6fIZCrzcDGlPAord4SWuu2khSVeoaOwdpBgQE5pq6y00Dt5ZWRhDgov7ffkwCcdVn17LSiB9FKrZ1ECyH8ZOMa7h9"
                alt="Buddy"
              />
              <p className="text-text-secondary italic">
                "Tôi hoàn toàn tin tưởng PetCare. Buddy luôn được chăm sóc tốt
                nhất. Cơ sở vật chất sạch sẽ và an toàn."
              </p>
              <div className="flex mt-2 text-primary">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined !text-xl">
                    star
                  </span>
                ))}
              </div>
              <p className="mt-4 font-bold text-text-main">
                Minh Khang & Buddy
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div data-aos="fade-up" data-aos-delay="400" className="h-full">
            <div className="bg-white p-6 rounded-xl border border-border-color flex flex-col items-center text-center h-full transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1">
              <img
                className="w-20 h-20 rounded-full object-cover mb-4"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHs7m1gBxyD-6h5qe8JwAEFlFsUusTbMHwBocRZXcrUxgab7NlNUb7PWkjuK2E3lVQAqveFLnjbYPFKqZOHYAzprlOIqLuxCvEJIvgcfXyzfFXLFnlDF1jDSIchYOQ_lZcOjzvBtyJ3RPLGpJ9Tvq-p1HfIJ_fObhE-k9_e573yKw8__nPTYDZpyIv9soMZZ9Hgt67HsDEcOpJ2sKDoI9bGmU3cPNO-pR7ZAfsIvNj8dMwL-Y76q4mIaQSds_-MYog6GZK2zUtFoNF"
                alt="Luna"
              />
              <p className="text-text-secondary italic">
                "Ngay cả với những thú cưng nhỏ như thỏ, họ cũng rất chu đáo.
                Luna rất thích thú khi ở đây. Rất khuyến khích!"
              </p>
              <div className="flex mt-2 text-primary">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined !text-xl">
                    star
                  </span>
                ))}
              </div>
              <p className="mt-4 font-bold text-text-main">Hà My & Luna</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 border-t border-border-color">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Cột trái */}
          <div className="md:w-1/3" data-aos="fade-right">
            <h2 className="text-text-main text-[28px] font-bold leading-tight mb-4">
              Câu hỏi thường gặp
            </h2>
            <p className="text-text-secondary mb-6">
              Bạn có thắc mắc? Chúng tôi ở đây để giải đáp mọi câu hỏi của bạn
              về việc chăm sóc thú cưng.
            </p>

            {/* Nút Liên hệ hỗ trợ (Wrapper Fix) */}
            <div
              className="inline-block"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <a
                className="relative group inline-flex items-center justify-center rounded-lg bg-gray-100 px-4 py-2 text-sm font-bold text-[#111813] overflow-hidden shadow-sm transition-all duration-300 ease-out hover:scale-105"
                href="#"
              >
                <span className="absolute left-0 top-0 h-full w-0 bg-gray-300 transition-all duration-300 ease-out group-hover:w-full"></span>
                <span className="relative z-10">Liên hệ hỗ trợ</span>
              </a>
            </div>
          </div>

          {/* Cột phải */}
          <div className="md:w-2/3 space-y-4" data-aos="fade-left">
            <div className="border-b border-border-color pb-4">
              <h3 className="flex items-center justify-between w-full text-left font-bold text-text-main text-lg">
                Tôi cần đặt lịch trước bao lâu?
                <span className="material-symbols-outlined text-text-secondary">
                  expand_more
                </span>
              </h3>
              <p className="mt-2 text-text-secondary">
                Để đảm bảo dịch vụ tốt nhất, chúng tôi khuyến khích bạn đặt lịch
                trước ít nhất 24 giờ.
              </p>
            </div>
            <div className="border-b border-border-color pb-4">
              <h3 className="flex items-center justify-between w-full text-left font-bold text-text-main text-lg">
                PetCare có nhận trông giữ qua đêm không?
                <span className="material-symbols-outlined text-text-secondary">
                  expand_more
                </span>
              </h3>
              <p className="mt-2 text-text-secondary">
                Có, chúng tôi cung cấp dịch vụ khách sạn thú cưng với hệ thống
                camera giám sát 24/7.
              </p>
            </div>
            <div className="border-b border-border-color pb-4">
              <h3 className="flex items-center justify-between w-full text-left font-bold text-text-main text-lg">
                Dịch vụ có bao gồm đưa đón không?
                <span className="material-symbols-outlined text-text-secondary">
                  expand_more
                </span>
              </h3>
              <p className="mt-2 text-text-secondary">
                Chúng tôi hỗ trợ đưa đón thú cưng trong bán kính 10km.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST BLOG SECTION - (MỚI THÊM) */}
      <section className="py-12 md:py-20 bg-white border-t border-border-color">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4"
            data-aos="fade-up"
          >
            <div>
              <h2 className="text-3xl font-bold text-text-main">
                Tin tức & Mẹo vặt
              </h2>
              <p className="text-text-secondary mt-2 text-lg">
                Kiến thức chăm sóc thú cưng hữu ích dành cho bạn.
              </p>
            </div>
            <a
              href="/blog"
              className="hidden md:flex items-center gap-2 text-primary font-bold hover:underline transition-all group"
            >
              Xem tất cả bài viết
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "5 mẹo huấn luyện mèo đi vệ sinh đúng chỗ",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJDe-Fc03oujRDxzfhE2e0_6ua-wKaYbEik04_Zmma5ydBKsyiJK50xsYgwUI_R4yOWvpS88M1v1tmmtWIECCEtuKLm4pd0lLNZswoA4-N7jzETlzCxCNTH6rOAKBvkdbIg9USfwNAtZPXMQ-NYE-dQsF7-x4adyFVsNk_HgK3-NlYVQyxQuQK8AwSrTJ_eA7-JD79Yn4VXXVfuD0NyZNt01rITJZgMb-p7vZ-NGW2ausSwLVp_cu1rX5i_0jWA4XsSnnRwcgBM3Wc",
                date: "12 Tháng 10, 2023",
              },
              {
                title: "Dấu hiệu nhận biết thú cưng bị stress",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfF4FuwTpz0kuzEow2KiuQ0DR_zkAPZhpCWaC6dwxCC9IvwbXPxDL7_yJJ0pxs8aaDF4iANur7fxRM-9b5Z4c2lZmwjQqRCTNdzZbWMdNtpTTjA12xMV2NZg13RAs7sXAShBAtRcD6VhVh0d9go7pCf-zroVQysDs5YpEIkd457Uc_tWMsvgwBC9ob_LwECxtbwbWVv6god0S6uHVmmxMfI0eMNqwWzRWd4uijnjglq8D_Ls3b4WDvIkYteeiLgusKsiRNUwtJj77W",
                date: "10 Tháng 10, 2023",
              },
              {
                title: "Review các loại thức ăn hạt tốt nhất",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDosikFGM5_X9HSmyfiH4Zt1-Q5n-iBDuUGNA_3Dzm-FvtBWboukxrKdvMsPxCBwekeqmM2diAcMSMi_oGlCBwyjVfkC9rr1PMIHc-JiXGxipVG5p14-FkYW0ENblu-IL45IkTei0AAtkm0GvZkM8wIxvQLsgLeNjoCEbTxwBlyflN75dpujRpRCpshatxiSchMnoSwVTnMLT-KTDJF6dpdE_huIaqieovh3MDD-TO4ghmAQ4whU3Bs8c4Tvgem1BbSvb03USeqBvJG",
                date: "08 Tháng 10, 2023",
              },
            ].map((post, idx) => (
              <div
                key={idx}
                className="group cursor-pointer flex flex-col gap-3"
                data-aos="fade-up"
                data-aos-delay={idx * 100 + 100}
              >
                <div className="overflow-hidden rounded-xl aspect-[4/3]">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url("${post.img}")` }}
                  ></div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">
                    {post.date}
                  </span>
                  <h3 className="text-xl font-bold text-text-main leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER SECTION - (MỚI THÊM) */}
      <section className="py-16 md:py-24 bg-[#e8fdf0] border-t border-border-color">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto" data-aos="fade-up">
            <span className="material-symbols-outlined text-primary text-5xl mb-4">
              mail
            </span>
            <h2 className="text-3xl font-bold text-text-main mb-4">
              Đừng bỏ lỡ tin tức thú vị!
            </h2>
            <p className="text-text-secondary mb-8 text-lg">
              Đăng ký nhận bản tin để cập nhật các mẹo chăm sóc thú cưng hữu ích
              và nhận ưu đãi độc quyền từ PetLor.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Nhập email của bạn..."
                className="flex-1 px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
              />
              <button className="relative group/btn inline-flex items-center justify-center overflow-hidden rounded-lg bg-primary px-8 py-3 text-sm font-bold text-[#111813] shadow-lg transition-all duration-300 ease-out hover:scale-105 before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:bg-[#10B981] before:transition-all before:duration-300 before:ease-out hover:before:w-full">
                <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-white">
                  Đăng ký ngay
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --- Section: Đối tác uy tín --- */}
      <section className="border-y border-border-color bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-center text-text-secondary text-sm font-bold uppercase tracking-wider mb-8"
            data-aos="fade-up"
          >
            Đối tác uy tín của chúng tôi
          </h2>
          <div
            className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="h-8 text-text-main font-black text-xl flex items-center gap-2">
              <span className="material-symbols-outlined">pets</span> PetFood
            </div>
            <div className="h-8 text-text-main font-black text-xl flex items-center gap-2">
              <span className="material-symbols-outlined">
                health_and_safety
              </span>{" "}
              VetMed
            </div>
            <div className="h-8 text-text-main font-black text-xl flex items-center gap-2">
              <span className="material-symbols-outlined">toys</span> JoyToy
            </div>
            <div className="h-8 text-text-main font-black text-xl flex items-center gap-2">
              <span className="material-symbols-outlined">home_health</span>{" "}
              SafeHome
            </div>
            <div className="h-8 text-text-main font-black text-xl flex items-center gap-2">
              <span className="material-symbols-outlined">water_drop</span>{" "}
              FreshPet
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Homepage;
