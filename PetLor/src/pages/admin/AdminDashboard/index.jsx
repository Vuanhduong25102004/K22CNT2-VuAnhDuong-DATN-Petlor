import React, { useEffect, useState } from "react";
import adminService from "../../../services/adminService";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const BASE_IMAGE_URL = "http://localhost:8080/uploads/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminService.getDashboardData();
        if (response) {
          setData(response);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Lỗi tải dữ liệu dashboard:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getInitials = (name) => {
    if (!name) return "";
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-slate-500">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent mr-2"></div>
        Đang tải dữ liệu...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-screen items-center justify-center font-bold text-red-500">
        Không thể tải dữ liệu từ máy chủ. Vui lòng thử lại sau.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-8 p-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon="payments"
          iconColor="text-emerald-600"
          bgColor="bg-emerald-100"
          label="Doanh thu tháng"
          value={formatCurrency(data.doanhThuThangNay)}
        />
        <StatCard
          icon="shopping_cart"
          iconColor="text-blue-600"
          bgColor="bg-blue-100"
          label="Tổng đơn hàng"
          value={data.tongDonHang}
        />
        <StatCard
          icon="person_add"
          iconColor="text-orange-600"
          bgColor="bg-orange-100"
          label="Khách hàng mới"
          value={data.khachHangMoi}
        />
        <StatCard
          icon="content_cut"
          iconColor="text-purple-600"
          bgColor="bg-purple-100"
          trend="Realtime"
          trendColor="text-slate-500 bg-slate-100"
          label="Dịch vụ đang chạy"
          value={data.dichVuDangChay}
        />
      </div>

      <div className="w-full">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Biểu đồ tăng trưởng doanh thu
              </h3>
              <p className="text-sm text-slate-500">
                Doanh thu tổng hợp theo tháng
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-indigo-600"></span>
              <span className="text-xs font-medium text-slate-600">
                Doanh thu
              </span>
            </div>
          </div>

          <div className="relative flex h-[300px] w-full items-end justify-around px-2 pb-8">
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between py-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full border-t border-slate-100"></div>
              ))}
            </div>

            {data.bieuDoDoanhThu?.map((item, index) => {
              const maxVal = Math.max(
                ...data.bieuDoDoanhThu.map((d) => d.doanhThu),
                1000000,
              );
              // Đảm bảo có đơn vị % trong chuỗi style
              const heightPercent = `${(item.doanhThu / (maxVal * 1.2)) * 100}%`;

              return (
                <div
                  key={index}
                  className="group relative flex h-full flex-col items-center justify-end"
                >
                  <div
                    className="w-12 rounded-t-lg bg-indigo-600 transition-all duration-700 ease-out hover:bg-indigo-400"
                    style={{ height: heightPercent }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-slate-800 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                      {formatCurrency(item.doanhThu)}
                    </div>
                  </div>
                  <span className="absolute -bottom-6 text-[10px] font-bold text-slate-400 uppercase">
                    T.{item.thang}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sản phẩm bán chạy */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">
              Sản phẩm bán chạy
            </h3>
            <span className="rounded-lg bg-indigo-50 px-2 py-1 text-xs font-bold text-indigo-600">
              Tháng này
            </span>
          </div>
          <div className="space-y-4">
            {data.sanPhamBanChay?.map((sp, index) => (
              <ProductItem
                key={index}
                img={
                  sp.hinhAnh
                    ? `${BASE_IMAGE_URL}${sp.hinhAnh}`
                    : "https://placehold.co/100"
                }
                name={sp.tenSanPham}
                desc={`Doanh thu: ${formatCurrency(sp.doanhThu)}`}
                sold={sp.daBan}
              />
            ))}
          </div>
        </div>

        {/* Dịch vụ phổ biến */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-lg font-bold text-gray-900">
            Dịch vụ phổ biến
          </h3>
          <div className="space-y-6 pt-2">
            {data.dichVuPhoBien?.map((dv, index) => (
              <ServiceBar
                key={index}
                name={dv.tenDichVu}
                count={dv.luotSuDung}
                color={
                  ["bg-indigo-600", "bg-blue-500", "bg-orange-400"][index % 3]
                }
                width={`${Math.min((dv.luotSuDung / 10) * 100, 100)}%`}
              />
            ))}
          </div>
        </div>

        {/* Trạng thái nhân sự */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-lg font-bold text-gray-900">
            Trạng thái nhân sự
          </h3>
          <div className="mb-8 flex items-center justify-between rounded-2xl bg-slate-50 p-4">
            <div className="flex-1 border-r border-slate-200 text-center">
              <p className="text-2xl font-bold text-emerald-500">
                {data.danhSachNhanVien?.length || 0}
              </p>
              <p className="text-[10px] font-bold uppercase text-slate-500">
                Tổng nhân sự
              </p>
            </div>
            <div className="flex-1 text-center">
              <p className="text-2xl font-bold text-slate-400">0</p>
              <p className="text-[10px] font-bold uppercase text-slate-500">
                Đang nghỉ
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {data.danhSachNhanVien?.map((nv, index) => (
              <StaffItem
                key={index}
                img={nv.anhDaiDien ? `${BASE_IMAGE_URL}${nv.anhDaiDien}` : null}
                initials={getInitials(nv.hoTen)}
                name={nv.hoTen}
                role={nv.chucVu}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* Sub-components */
const StatCard = ({
  icon,
  iconColor,
  bgColor,
  trend,
  trendColor,
  label,
  value,
}) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="mb-4 flex items-center justify-between">
      <div className={`rounded-2xl p-3 ${bgColor}`}>
        <span className={`material-symbols-outlined flex ${iconColor}`}>
          {icon}
        </span>
      </div>
      {trend && (
        <span
          className={`rounded-lg px-2 py-1 text-xs font-bold ${trendColor}`}
        >
          {trend}
        </span>
      )}
    </div>
    <p className="text-sm font-medium text-slate-500">{label}</p>
    <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
  </div>
);

const ProductItem = ({ img, name, desc, sold }) => (
  <div className="flex items-center gap-4">
    <img
      src={img}
      alt=""
      className="h-12 w-12 rounded-xl object-cover border border-slate-100"
    />
    <div className="flex-1">
      <p className="text-sm font-bold text-slate-800">{name}</p>
      <p className="text-xs text-slate-500">{desc}</p>
    </div>
    <div className="text-right">
      <p className="text-sm font-bold text-indigo-600">{sold}</p>
      <p className="text-[10px] font-bold uppercase text-slate-400">Đã bán</p>
    </div>
  </div>
);

const ServiceBar = ({ name, count, color, width }) => (
  <div>
    <div className="mb-2 flex items-center justify-between">
      <span className="text-sm font-bold text-slate-800">{name}</span>
      <span className="text-xs font-bold text-slate-500">{count} lượt</span>
    </div>
    <div className="h-2 w-full rounded-full bg-slate-100">
      <div className={`h-full rounded-full ${color}`} style={{ width }}></div>
    </div>
  </div>
);

const StaffItem = ({ img, initials, name, role }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      {img ? (
        <img
          src={img}
          alt=""
          className="h-8 w-8 rounded-full object-cover border border-slate-200"
        />
      ) : (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-600">
          {initials}
        </div>
      )}
      <div>
        <p className="text-sm font-bold leading-tight text-gray-900">{name}</p>
        <p className="text-[10px] uppercase text-slate-500">{role}</p>
      </div>
    </div>
    <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
  </div>
);

export default AdminDashboard;
