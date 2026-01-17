import React, { useEffect, useState } from "react";
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

  // Style cho background pattern (giả lập class .hero-pattern-subtle)
  const heroPatternStyle = {
    backgroundImage: "radial-gradient(#0FB478 0.5px, transparent 0.5px)",
    backgroundSize: "24px 24px",
    opacity: 0.1,
  };

  return (
    <div className="w-full min-h-screen font-display bg-gray-50 text-gray-900 overflow-x-hidden transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        {/* --- HERO SECTION MỚI --- */}
        <section
          className="relative min-h-[480px] lg:h-[520px] rounded-3xl overflow-hidden mb-12 bg-white border border-gray-100 flex flex-col lg:flex-row"
          data-aos="fade-up"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={heroPatternStyle}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>

          <div className="relative z-10 w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold w-fit mb-6">
              <span className="material-symbols-outlined text-lg">stars</span>
              BST Mới Nhất 2024
            </div>
            <h1 className="text-gray-900 text-4xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Sản phẩm của <br />
              <span className="text-primary">chúng tôi</span>
            </h1>
            <p className="text-gray-600 text-lg lg:text-xl max-w-lg font-medium leading-relaxed mb-8">
              Khám phá bộ sưu tập đầy đủ các loại thực phẩm, đồ chơi và phụ kiện
              cao cấp nhất dành riêng cho người bạn nhỏ của bạn.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-all">
                Mua sắm ngay
              </button>
              <button className="bg-gray-100 text-gray-700 font-bold px-8 py-4 rounded-xl hover:bg-gray-200 transition-all">
                Xem ưu đãi
              </button>
            </div>
          </div>

          <div className="relative w-full lg:w-1/2 h-64 lg:h-auto overflow-hidden">
            <img
              alt="Happy pets"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsKA4bJQUp5mRHcMG9sYxHfPgEanH1R4WKbtETtGYSeII2bdl1KnUKZS5jLhumrTVcYaoFA9g30YR9WSoI0eEuJKFEwIYrHKPgP_PIsd-BjRV3taTMu40R5eaMe23-aseCmnOH32d-vjQ0Z350lTKAWKUWZmxxAUctnJZYBeUQrVDK-kGFZjT84yoJCczSy_UgCqUbbwcBPtia6SWvX-kHTZtlC3h36Vl5otzc9NJJuWDDoZOcoWqRzPTNsIHhcVcARru4tZYf9fw"
            />
            {/* Floating Badge 1 */}
            <div
              className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-white/20"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden p-1">
                <img
                  alt="Product"
                  className="w-full h-full object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2mBWz25RdlG1JpVfULSsFNZsUYKSzflIAjwLvHSVf4isUMQg8fPMckeFI8cu_3OjuDM6EdDSdrwH9UHS0KuuVUN70GcVBAZgdR03PcsAyrJZ2rliR03Sga3T0cVhKi2sBRbuTAYrST-Mv5nmfjB08Ij9NJSjiQyahKSbiLXRG4RT5Gj2VsNpFNOV-E2jNDQt1CXNDg-VH6BfR4WAqkOvytwfJNT10slsOCcp1CPpSNa7rNZejsC9vc0IdmVH5Q8fHAb015f-M6Ts"
                />
              </div>
              <div>
                <div className="text-xs text-primary font-bold">
                  Bán chạy nhất
                </div>
                <div className="text-sm font-bold text-gray-900">
                  Royal Canin
                </div>
              </div>
            </div>
            {/* Floating Badge 2 */}
            <div
              className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-white/20"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined">redeem</span>
              </div>
              <div>
                <div className="text-xs text-gray-500">Giảm giá lên đến</div>
                <div className="text-sm font-bold text-orange-500">
                  30% Toàn bộ cửa hàng
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FILTER & SEARCH SECTION --- */}
        <section className="mb-12" data-aos="fade-up">
          <div className="bg-white p-4 rounded-full border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative w-full lg:w-96">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                search
              </span>
              <input
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-full focus:ring-2 focus:ring-primary outline-none text-sm"
                placeholder="Tìm kiếm sản phẩm..."
                type="text"
              />
            </div>

            {/* Category Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar w-full lg:w-auto">
              <button className="px-6 py-2.5 bg-primary text-white font-bold rounded-full whitespace-nowrap shadow-md shadow-primary/20">
                Tất cả
              </button>
              {["Thức ăn", "Đồ chơi", "Phụ kiện", "Vệ sinh"].map((cat) => (
                <button
                  key={cat}
                  className="px-6 py-2.5 bg-gray-50 text-gray-600 hover:bg-primary/10 hover:text-primary font-bold rounded-full transition-all whitespace-nowrap"
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="w-full lg:w-48">
              <select className="w-full py-3 px-4 bg-gray-50 border-none rounded-full focus:ring-2 focus:ring-primary outline-none text-sm font-medium cursor-pointer">
                <option>Mới nhất</option>
                <option>Giá thấp đến cao</option>
                <option>Giá cao đến thấp</option>
              </select>
            </div>
          </div>
        </section>

        {/* --- PRODUCTS GRID --- */}
        <section className="mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              <p className="col-span-full text-center py-10 text-gray-500">
                Đang tải sản phẩm...
              </p>
            ) : products.length > 0 ? (
              products.map((product, index) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  {/* Image Area */}
                  <div className="relative h-72 overflow-hidden bg-gray-50">
                    <Link
                      to={`/products/${product.id}`}
                      className="block h-full w-full"
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
                    </Link>
                    {/* Badge mẫu (có thể custom logic) */}
                    <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                      NEW
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex flex-col flex-grow">
                    <Link to={`/products/${product.id}`}>
                      <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="text-primary font-extrabold text-xl mb-4">
                      {formatPrice(product.price)}
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="mt-auto w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-primary hover:text-white text-gray-700 font-bold py-3.5 rounded-xl transition-all active:scale-95"
                    >
                      <span className="material-symbols-outlined text-xl">
                        shopping_cart
                      </span>
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center py-10 text-gray-500">
                Không có sản phẩm nào.
              </p>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex justify-center gap-2" data-aos="fade-up">
            <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:border-primary hover:text-primary transition-all">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/30">
              1
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:border-primary hover:text-primary transition-all font-bold">
              2
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:border-primary hover:text-primary transition-all font-bold">
              3
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:border-primary hover:text-primary transition-all">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </section>

        {/* --- NEWSLETTER SECTION --- */}
        <section
          className="mt-20 py-16 bg-primary rounded-3xl text-center px-4 relative overflow-hidden mb-20"
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
                className="flex-grow px-6 py-4 rounded-3xl border-none focus:ring-2 focus:ring-white outline-none text-gray-900 bg-white"
                placeholder="Địa chỉ email của bạn"
                type="email"
              />
              <button className="bg-gray-900 text-white font-bold px-8 py-4 rounded-3xl hover:bg-black transition-colors">
                Đăng ký ngay
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductsPage;
