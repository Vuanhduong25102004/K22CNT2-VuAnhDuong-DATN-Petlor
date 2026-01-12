import React, { useEffect, useState } from "react";
// 1. Import Link từ react-router-dom
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import productService from "../services/productService";
import { useCart } from "../context/CartContext";

const formatPrice = (price) => {
  if (price === null || price === undefined) return "";
  if (typeof price === "number") {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  }
  return price;
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getAllProducts();
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

        const mappedProducts = data.map((product) => ({
          ...product,
          id: product.sanPhamId || product.id,
          name: product.tenSanPham || product.name,
          price: product.gia || product.price,
          image: product.hinhAnh
            ? `http://localhost:8080/uploads/${product.hinhAnh}`
            : product.image,
          category: product.tenDanhMuc || product.category || "Sản phẩm",
        }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
        setTimeout(() => {
          AOS.refresh();
        }, 100);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light font-display text-text-main overflow-x-hidden">
      <main className="flex-1">
        {/* --- BANNER SECTION (GIỮ NGUYÊN) --- */}
        <section className="max-w-screen-xl mx-auto mt-16" data-aos="fade-up">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className="flex min-h-[400px] flex-col gap-6 rounded-xl bg-cover bg-center bg-no-repeat items-center justify-center p-6 text-center shadow-md relative overflow-hidden"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=2000&auto=format&fit=crop")`,
              }}
            >
              <div className="flex flex-col gap-4 relative z-10">
                <h1
                  className="text-white text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl lg:text-6xl uppercase drop-shadow-md"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  Siêu Sale Mùa Đông <br />
                  <span className="text-primary">Giảm tới 50%</span>
                </h1>
                <p
                  className="text-white text-base font-normal leading-normal max-w-2xl mx-auto sm:text-lg drop-shadow-md"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  Dành tặng những điều tốt đẹp nhất cho thú cưng của bạn. Thức
                  ăn, đồ chơi và phụ kiện chính hãng.
                </p>
                <div className="mt-4" data-aos="fade-up" data-aos-delay="300">
                  <button className="relative group inline-flex items-center justify-center overflow-hidden rounded-lg bg-primary px-8 py-3 text-sm font-bold text-[#111813] shadow-lg transition-all duration-300 ease-out hover:scale-105 before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:bg-[#10B981] before:transition-all before:duration-300 before:ease-out hover:before:w-full">
                    <span className="relative z-10 transition-colors duration-300 text-white">
                      Mua Ngay Hôm Nay
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SẢN PHẨM & BỘ LỌC --- */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header Search & Filter (Giữ nguyên) */}
            <div
              className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8"
              data-aos="fade-up"
            >
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                  Sản Phẩm Của Chúng Tôi
                </h2>
                <p className="text-gray-500">
                  Hơn 500+ sản phẩm chất lượng cao dành riêng cho bạn
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative min-w-[300px]">
                  <span className="material-icons-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 select-none">
                    search
                  </span>
                  <input
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-3xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-gray-600 transition-shadow"
                    placeholder="Tìm kiếm thức ăn, đồ chơi..."
                    type="text"
                  />
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-3xl font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <span className="material-icons-outlined select-none">
                    tune
                  </span>
                  Bộ lọc
                </button>
              </div>
            </div>

            {/* Category Buttons (Giữ nguyên) */}
            <div
              className="flex flex-wrap gap-3 mb-10"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <button className="bg-primary text-white px-6 py-2.5 rounded-full font-bold shadow-md shadow-primary/20 hover:opacity-90 transition-opacity">
                Tất cả
              </button>
              {["Thức ăn", "Đồ chơi", "Phụ kiện", "Vệ sinh & Chăm sóc"].map(
                (item) => (
                  <button
                    key={item}
                    className="bg-white border border-gray-200 text-gray-600 px-6 py-2.5 rounded-full font-medium hover:border-primary hover:text-primary transition-all"
                  >
                    {item}
                  </button>
                )
              )}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {loading ? (
                <p className="col-span-full text-center py-10">
                  Đang tải sản phẩm...
                </p>
              ) : (
                products.map((product, index) => (
                  <div key={product.id} data-aos="fade-up">
                    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col h-full relative">
                      {/* THAY ĐỔI 1: Link bao quanh ảnh để click vào xem chi tiết */}
                      <Link
                        to={`/products/${product.id}`}
                        className="relative h-64 overflow-hidden bg-gray-50 block cursor-pointer"
                      >
                        <img
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          src={product.image}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://placehold.co/400x400?text=No+Image";
                          }}
                        />
                        <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-lg text-xs font-bold text-gray-500 uppercase backdrop-blur-sm shadow-sm">
                          {product.category}
                        </div>
                      </Link>

                      <div className="p-5 flex flex-col flex-grow">
                        {/* THAY ĐỔI 2: Link bao quanh tên sản phẩm */}
                        <Link
                          to={`/products/${product.id}`}
                          className="font-bold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-2 cursor-pointer"
                          title={product.name}
                        >
                          {product.name}
                        </Link>

                        <div className="text-primary font-extrabold text-xl mb-4">
                          {formatPrice(product.price)}
                        </div>

                        {/* Nút thêm vào giỏ (Giữ nguyên logic giỏ hàng, ko cần link) */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product, 1);
                          }}
                          className="mt-auto w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-primary hover:text-white text-gray-700 font-bold py-3 rounded-xl transition-all duration-300"
                        >
                          <span className="material-icons-outlined text-xl">
                            shopping_cart
                          </span>
                          Thêm vào giỏ
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination (Giữ nguyên) */}
            <div
              className="mt-12 flex items-center justify-center gap-2"
              data-aos="fade-up"
            >
              {/* ... (Code pagination) ... */}
              <button className="flex size-10 items-center justify-center rounded-lg bg-primary text-white font-bold shadow-md hover:scale-105 transition-transform">
                1
              </button>
            </div>
          </div>
        </section>

        {/* --- ADVICE SECTION (GIỮ NGUYÊN) --- */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white border-t border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className="bg-primary/20 rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center gap-6 border border-primary/20"
              data-aos="fade-up"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Bạn Cần Tư Vấn Chọn Sản Phẩm?
              </h2>
              <p className="text-base sm:text-lg text-gray-500 max-w-2xl">
                Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn tìm
                kiếm thức ăn, đồ chơi phù hợp nhất cho thú cưng của mình.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <button className="relative group flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal shadow-md transition-all duration-300 ease-out hover:scale-105">
                  <span className="absolute left-0 top-0 h-full w-0 bg-[#0dbd47] transition-all duration-300 ease-out group-hover:w-full"></span>
                  <span className="relative z-10">Chat Với Chúng Tôi</span>
                </button>

                <button className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-white border border-gray-200 text-gray-900 text-base font-bold leading-normal transition-all duration-300 ease-out hover:bg-gray-50 hover:scale-105 hover:border-primary">
                  Gọi Hotline 1900 1234
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductsPage;
