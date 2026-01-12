import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatters";
import { SERVER_URL } from "../services/apiClient";
import orderService from "../services/orderService";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fetchCart } = useCart(); // Dùng để refresh giỏ hàng sau khi mua

  // 1. Nhận dữ liệu từ CartPage
  const { selectedItems, totalAmount } = location.state || {};

  // 2. State quản lý Form nhập liệu
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "Hồ Chí Minh", // Mặc định
    note: "",
    voucherCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  // Phí ship & Tính toán tổng
  const SHIPPING_FEE = 30000;
  const DISCOUNT = 0; // Tạm thời hardcode, sau này xử lý logic voucher sau
  const FINAL_TOTAL = (totalAmount || 0) + SHIPPING_FEE - DISCOUNT;

  // Helper xử lý ảnh
  const getImageUrl = (imageName) => {
    if (!imageName) return "https://placehold.co/100x100?text=No+Image";
    if (imageName.startsWith("http")) return imageName;
    return `${SERVER_URL}/uploads/${imageName}`;
  };

  // 3. Bảo vệ Route: Nếu không có sản phẩm (vào trực tiếp link) -> Đá về giỏ hàng
  useEffect(() => {
    if (!selectedItems || selectedItems.length === 0) {
      alert("Vui lòng chọn sản phẩm từ giỏ hàng trước!");
      navigate("/cart");
    }
  }, [selectedItems, navigate]);

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 4. LOGIC GỌI API ĐẶT HÀNG
  const handlePlaceOrder = async () => {
    // Validate
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert("Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ!");
      return;
    }

    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      alert("Phiên đăng nhập hết hạn hoặc bạn chưa đăng nhập.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      // Tạo chuỗi địa chỉ đầy đủ gửi cho backend
      // Format: "Số nhà..., Thành phố (Người nhận: Tên - Ghi chú: ...)"
      const fullAddress = `${formData.address}, ${formData.city} (Người nhận: ${
        formData.fullName
      }${formData.note ? ` - Ghi chú: ${formData.note}` : ""})`;

      // Payload đúng chuẩn API Backend yêu cầu
      const payload = {
        userId: parseInt(storedUserId),
        diaChiGiaoHang: fullAddress,
        soDienThoaiNhan: formData.phone,
        phuongThucThanhToan: paymentMethod,
        maKhuyenMai: formData.voucherCode,
        chiTietDonHangs: selectedItems.map((item) => ({
          sanPhamId: item.sanPhamId,
          soLuong: item.soLuong,
        })),
      };

      console.log("📦 Gửi đơn hàng:", payload);

      // Gọi API
      await orderService.createOrder(payload);

      // Thành công
      alert("Đặt hàng thành công! Cảm ơn bạn đã mua sắm.");
      await fetchCart(); // Cập nhật lại giỏ hàng (số lượng trên header)
      navigate("/"); // Chuyển về trang chủ hoặc trang Order Success
    } catch (error) {
      console.error("Lỗi đặt hàng:", error);
      alert("Đặt hàng thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  if (!selectedItems) return null;

  return (
    <main className="max-w-screen-xl mx-auto mt-24 mb-20 px-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 text-sm">
        <Link className="text-gray-500 hover:text-primary" to="/cart">
          Giỏ hàng
        </Link>
        <span className="material-symbols-outlined text-sm text-gray-400">
          chevron_right
        </span>
        <span className="font-semibold text-primary">Thông tin thanh toán</span>
        <span className="material-symbols-outlined text-sm text-gray-400">
          chevron_right
        </span>
        <span className="text-gray-400">Hoàn tất</span>
      </div>

      {/* Page Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tight mb-2 text-gray-900">
          Thanh toán
        </h1>
        <p className="text-gray-500">
          Vui lòng kiểm tra lại thông tin và xác nhận đơn hàng của bạn.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Shipping & Payment */}
        <div className="lg:col-span-7 space-y-10">
          {/* Shipping Information */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">
                local_shipping
              </span>
              <h2 className="text-2xl font-bold text-gray-900">
                Thông tin giao hàng
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  Họ và tên *
                </label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="form-input w-full bg-white rounded-lg border border-gray-300 h-12 px-4 focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                  placeholder="Nguyễn Văn A"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  Số điện thoại *
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input w-full bg-white rounded-lg border border-gray-300 h-12 px-4 focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                  placeholder="0901 234 567"
                  type="tel"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">
                  Địa chỉ nhận hàng *
                </label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="form-input w-full bg-white rounded-lg border border-gray-300 h-12 px-4 focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                  placeholder="Số nhà, tên đường, phường/xã"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  Thành phố / Tỉnh
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="form-input w-full bg-white rounded-lg border border-gray-300 h-12 px-4 focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                >
                  <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Cần Thơ">Cần Thơ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  Ghi chú (Tùy chọn)
                </label>
                <input
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  className="form-input w-full bg-white rounded-lg border border-gray-300 h-12 px-4 focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                  placeholder="Ghi chú cho shipper..."
                  type="text"
                />
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">
                account_balance_wallet
              </span>
              <h2 className="text-2xl font-bold text-gray-900">
                Phương thức thanh toán
              </h2>
            </div>
            <div className="space-y-3">
              {/* COD - Thanh toán khi nhận hàng */}
              <label
                className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer group transition-all ${
                  paymentMethod === "COD"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <input
                    className="text-primary focus:ring-primary h-5 w-5 accent-primary"
                    name="payment"
                    type="radio"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900">
                      Thanh toán khi nhận hàng (COD)
                    </span>
                    <span className="text-xs text-gray-500">
                      Thanh toán tiền mặt cho shipper khi nhận hàng
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">
                    local_shipping
                  </span>
                </div>
              </label>

              {/* Momo */}
              <label
                className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer group transition-all ${
                  paymentMethod === "MOMO"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <input
                    className="text-primary focus:ring-primary h-5 w-5 accent-primary"
                    name="payment"
                    type="radio"
                    value="MOMO"
                    checked={paymentMethod === "MOMO"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900">
                      Ví điện tử MoMo
                    </span>
                    <span className="text-xs text-gray-500">
                      Thanh toán nhanh chóng qua ứng dụng MoMo
                    </span>
                  </div>
                </div>
                <div className="size-8 bg-[#A50064] rounded flex items-center justify-center text-white text-[10px] font-bold">
                  MOMO
                </div>
              </label>

              {/* Banking / VNPAY */}
              <label
                className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer group transition-all ${
                  paymentMethod === "VNPAY"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <input
                    className="text-primary focus:ring-primary h-5 w-5 accent-primary"
                    name="payment"
                    type="radio"
                    value="VNPAY" // Map sang VNPAY theo API bạn ví dụ
                    checked={paymentMethod === "VNPAY"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900">
                      VNPAY / Ngân hàng
                    </span>
                    <span className="text-xs text-gray-500">
                      Quét mã QR qua ứng dụng ngân hàng
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">
                  qr_code_scanner
                </span>
              </label>
            </div>
          </section>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-6 py-6 border-t border-gray-200">
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <span className="material-symbols-outlined text-sm">lock</span>
              Thanh toán an toàn 256-bit SSL
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <span className="material-symbols-outlined text-sm">
                verified_user
              </span>
              Bảo mật thông tin khách hàng
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6 text-gray-900">
              Đơn hàng của bạn ({selectedItems.length})
            </h2>

            {/* Product List */}
            <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto scrollbar-thin pr-2">
              {selectedItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="size-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                    <img
                      src={getImageUrl(item.hinhAnh)}
                      alt={item.tenSanPham}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm leading-tight mb-1 text-gray-800 line-clamp-2">
                      {item.tenSanPham}
                    </p>
                    <p className="text-xs text-gray-500">
                      Số lượng: {item.soLuong}
                    </p>
                    <p className="font-bold text-primary mt-1">
                      {formatCurrency(item.donGia * item.soLuong)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Voucher Section */}
            <div className="mb-8">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                Mã giảm giá
              </label>
              <div className="flex gap-2">
                <input
                  name="voucherCode"
                  value={formData.voucherCode}
                  onChange={handleInputChange}
                  className="form-input flex-1 bg-white rounded-lg border border-gray-300 h-10 px-3 focus:ring-1 focus:ring-primary focus:border-primary text-sm outline-none"
                  placeholder="Nhập mã..."
                  type="text"
                />
                <button
                  type="button"
                  onClick={() => alert("Tính năng đang phát triển")}
                  className="bg-primary/10 hover:bg-primary/20 text-primary font-bold px-4 rounded-lg text-sm transition-colors"
                >
                  Áp dụng
                </button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 border-t border-gray-100 pt-6 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Phí vận chuyển</span>
                <span>{formatCurrency(SHIPPING_FEE)}</span>
              </div>
              {DISCOUNT > 0 && (
                <div className="flex justify-between text-primary font-medium italic">
                  <span>Giảm giá voucher</span>
                  <span>-{formatCurrency(DISCOUNT)}</span>
                </div>
              )}
              <div className="flex justify-between items-end pt-4 border-t border-dashed border-gray-200 mt-4">
                <span className="text-lg font-bold text-gray-900">
                  Tổng cộng
                </span>
                <div className="text-right">
                  <span className="block text-2xl font-black text-primary leading-none">
                    {formatCurrency(FINAL_TOTAL)}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    (Đã bao gồm VAT)
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className={`w-full text-white font-extrabold py-4 rounded-xl text-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:brightness-105 active:scale-[0.98]"
              }`}
            >
              {loading ? (
                <span>ĐANG XỬ LÝ...</span>
              ) : (
                <>
                  <span>ĐẶT HÀNG NGAY</span>
                  <span className="material-symbols-outlined font-bold">
                    arrow_forward
                  </span>
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-gray-400 mt-4 px-4">
              Bằng việc nhấn "Đặt hàng", bạn đồng ý với Điều khoản dịch vụ &
              Chính sách bảo mật của PetLor.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
