import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import productService from "../services/productService"; // API lấy chi tiết sp
import { useCart } from "../context/CartContext"; // 1. IMPORT CONTEXT
import { formatCurrency } from "../utils/formatters";
import { SERVER_URL } from "../services/apiClient";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Lấy hàm addToCart từ Context
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // State lưu số lượng muốn mua
  const [mainImage, setMainImage] = useState("");

  // Hàm xử lý ảnh
  const getImageUrl = (imageName) => {
    if (!imageName) return "https://placehold.co/600x600?text=No+Image";
    if (imageName.startsWith("http")) return imageName;
    return `${SERVER_URL}/uploads/${imageName}`;
  };

  // Fetch chi tiết sản phẩm
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);

        // Map dữ liệu cho khớp (tùy API trả về)
        const mappedProduct = {
          ...data,
          id: data.sanPhamId || data.id,
          name: data.tenSanPham || data.name,
          price: data.gia || data.price,
          description: data.moTa || data.description || "Đang cập nhật...",
          image: data.hinhAnh,
          stock: data.soLuongTon || 100, // Giả sử tồn kho
        };

        setProduct(mappedProduct);
        setMainImage(getImageUrl(mappedProduct.image));
      } catch (error) {
        console.error("Lỗi tải sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
    window.scrollTo(0, 0);

    // Init Animation
    const aosInit = setTimeout(() => {
      AOS.init({ duration: 800, once: true });
    }, 100);
    return () => clearTimeout(aosInit);
  }, [id]);

  // Xử lý tăng giảm số lượng
  const handleQuantityChange = (amount) => {
    setQuantity((prev) => {
      const newQty = prev + amount;
      if (newQty < 1) return 1;
      if (product && newQty > product.stock) return product.stock;
      return newQty;
    });
  };

  // 2. HÀM THÊM VÀO GIỎ
  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
  };

  const handleBuyNow = async () => {
    if (!product) return;
    await addToCart(product, quantity);
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background-light">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-20">Không tìm thấy sản phẩm!</div>;
  }

  return (
    <div className="bg-background-light text-gray-900 min-h-screen pb-20 pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500">
        <Link to="/" className="hover:text-primary">
          Trang chủ
        </Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-primary">
          Sản phẩm
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            {/* --- CỘT TRÁI: ẢNH --- */}
            <div data-aos="fade-right">
              <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden mb-4 border border-gray-100 relative group">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {/* Thumbnail Demo (Nếu có nhiều ảnh) */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  product.image,
                  product.image,
                  product.image,
                  product.image,
                ].map((img, idx) => (
                  <div
                    key={idx}
                    className={`aspect-square rounded-lg border cursor-pointer p-1 ${
                      mainImage === getImageUrl(img)
                        ? "border-primary ring-1 ring-primary"
                        : "border-gray-200 hover:border-primary"
                    }`}
                    onClick={() => setMainImage(getImageUrl(img))}
                  >
                    <img
                      src={getImageUrl(img)}
                      className="w-full h-full object-contain mix-blend-multiply"
                      alt="thumb"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* --- CỘT PHẢI: THÔNG TIN --- */}
            <div data-aos="fade-left">
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-yellow-400 text-sm">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined fill-current text-[18px]"
                    >
                      star
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-500 border-l border-gray-300 pl-4">
                  Đã bán <span className="font-bold text-gray-900">1.2k</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl mb-8">
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-extrabold text-primary">
                    {formatCurrency(product.price)}
                  </span>
                  {/* Giá cũ giả định */}
                  <span className="text-gray-400 line-through text-lg mb-1">
                    {formatCurrency(product.price * 1.2)}
                  </span>
                  <span className="text-xs font-bold text-red-500 bg-red-100 px-2 py-1 rounded-md mb-2">
                    -20%
                  </span>
                </div>
              </div>

              {/* Mô tả ngắn */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-2">
                  Mô tả sản phẩm:
                </h3>
                <p className="text-gray-600 leading-relaxed line-clamp-4">
                  {product.description}
                </p>
              </div>

              {/* Bộ chọn số lượng */}
              <div className="flex items-center gap-6 mb-8">
                <span className="font-medium text-gray-700">Số lượng:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-12 h-10 text-center border-none focus:ring-0 text-gray-900 font-bold"
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {product.stock} sản phẩm có sẵn
                </span>
              </div>

              {/* NÚT HÀNH ĐỘNG */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary/10 text-primary border border-primary font-bold py-4 rounded-xl hover:bg-primary/20 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">
                    add_shopping_cart
                  </span>
                  Thêm vào giỏ
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 hover:bg-emerald-600 transition-all active:scale-95"
                >
                  Mua ngay
                </button>
              </div>

              <div className="mt-8 flex items-center gap-6 text-sm text-gray-500 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-500">
                    verified
                  </span>
                  Hàng chính hãng 100%
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-500">
                    local_shipping
                  </span>
                  Miễn phí vận chuyển
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- CHI TIẾT & ĐÁNH GIÁ (Phần dưới) --- */}
        <div
          className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8"
          data-aos="fade-up"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Chi tiết sản phẩm
          </h2>
          <div className="prose max-w-none text-gray-600">
            <p>{product.description}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;
