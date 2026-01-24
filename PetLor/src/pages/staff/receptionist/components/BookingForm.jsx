import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import petService from "../../../../services/petService";
import bookingService from "../../../../services/bookingService";

// --- CONSTANTS ---
const IMAGE_BASE_URL = "http://localhost:8080/uploads";

// Enum loại lịch hẹn
const APPOINTMENT_TYPES = [
  { value: "THUONG_LE", label: "Thường lệ" },
  { value: "KHAN_CAP", label: "Khẩn cấp (Cấp cứu)" },
  { value: "TAI_KHAM", label: "Tái khám" },
  { value: "TU_VAN", label: "Tư vấn" },
  { value: "TIEM_PHONG", label: "Tiêm phòng" },
  { value: "PHAU_THUAT", label: "Phẫu thuật" },
];

const BookingForm = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);

  // State quản lý tìm kiếm
  const [foundPets, setFoundPets] = useState([]);
  const [isSearchingUser, setIsSearchingUser] = useState(false);
  const [isNewPet, setIsNewPet] = useState(true);

  // Form Data
  const [formData, setFormData] = useState({
    tenKhachHang: "",
    soDienThoaiKhachHang: "",
    tenThuCung: "",
    chungLoai: "Chó",
    giongLoai: "", // [MỚI] Trường giống loài
    gioiTinh: "Đực",
    dichVuId: "",
    loaiLichHen: "THUONG_LE",
    ghiChu: "",
    selectedPetId: null,
  });

  // Calendar State
  const [dateTime, setDateTime] = useState({
    date: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    time: "",
    viewDate: new Date(),
  });

  // --- EFFECT: Lấy dịch vụ ---
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await petService.getAllServices();
        const data = Array.isArray(res) ? res : res.content || [];
        setServices(data);
      } catch (error) {
        console.error("Lỗi lấy danh sách dịch vụ:", error);
        toast.error("Không thể tải danh sách dịch vụ");
      }
    };
    fetchServices();
  }, []);

  // --- HANDLER: Tìm thú cưng & Tự điền tên chủ ---
  const handlePhoneBlur = async () => {
    const phone = formData.soDienThoaiKhachHang;
    if (!phone || phone.length < 9) return;

    setIsSearchingUser(true);
    setFoundPets([]);

    try {
      const res = await petService.getPetsByPhone(phone);
      const pets = Array.isArray(res) ? res : res.content || [];

      if (pets.length > 0) {
        setFoundPets(pets);
        toast.info(`Tìm thấy ${pets.length} thú cưng.`);

        // [LOGIC MỚI] Lấy tên chủ từ thú cưng đầu tiên tìm thấy
        // Dựa trên JSON: { "tenChu": "Vu Anh Duong", ... }
        const ownerName = pets[0].tenChu || "";

        if (ownerName) {
          setFormData((prev) => ({ ...prev, tenKhachHang: ownerName }));
        }
      } else {
        setIsNewPet(true);
        setFormData((prev) => ({ ...prev, selectedPetId: null }));
      }
    } catch (error) {
      setIsNewPet(true);
    } finally {
      setIsSearchingUser(false);
    }
  };

  // --- HANDLER: Chọn thú cưng cũ ---
  const handleSelectOldPet = (pet) => {
    setFormData((prev) => ({
      ...prev,
      tenThuCung: pet.tenThuCung,
      selectedPetId: pet.thuCungId || pet.id,
      chungLoai: pet.chungLoai || "Chó",
      giongLoai: pet.giongLoai || "", // Map giống loài cũ
      gioiTinh: pet.gioiTinh || "Đực",
    }));
    setIsNewPet(false);
  };

  // --- HANDLER: Chuyển sang nhập mới ---
  const handleSwitchToNewPet = () => {
    setFormData((prev) => ({
      ...prev,
      tenThuCung: "",
      selectedPetId: null,
      chungLoai: "Chó",
      giongLoai: "", // Reset giống loài
      gioiTinh: "Đực",
    }));
    setIsNewPet(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- CALENDAR LOGIC ---
  const viewYear = dateTime.viewDate.getFullYear();
  const viewMonth = dateTime.viewDate.getMonth();
  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y, m) => {
    const d = new Date(y, m, 1).getDay();
    return d === 0 ? 6 : d - 1;
  };
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const startDayIndex = getFirstDayOfMonth(viewYear, viewMonth);

  const handleMonthChange = (direction) => {
    setDateTime((prev) => ({
      ...prev,
      viewDate: new Date(viewYear, viewMonth + direction, 1),
    }));
  };

  const handleDateClick = (day) => {
    setDateTime((prev) => ({
      ...prev,
      date: day,
      month: viewMonth + 1,
      year: viewYear,
      time: "",
    }));
  };

  const handleTimeSelect = (time) => {
    setDateTime((prev) => ({ ...prev, time: time }));
  };

  const timeSlots = useMemo(() => {
    const slots = [];
    for (let i = 8; i <= 18; i++) {
      const h = i.toString().padStart(2, "0");
      slots.push(`${h}:00`);
      if (i < 18) slots.push(`${h}:30`);
    }
    return slots;
  }, []);

  const isTimeSlotAvailable = (slot) => {
    const targetDate = new Date(
      dateTime.year,
      dateTime.month - 1,
      dateTime.date,
    );
    const now = new Date();
    const targetZero = new Date(targetDate).setHours(0, 0, 0, 0);
    const todayZero = new Date().setHours(0, 0, 0, 0);

    if (targetZero < todayZero) return false;
    if (targetZero > todayZero) return true;

    const [h, m] = slot.split(":").map(Number);
    const slotTime = new Date().setHours(h, m, 0, 0);
    return slotTime > now.getTime();
  };

  const getAutoTimeSlot = () => {
    const now = new Date();
    let minutes = now.getMinutes();
    let hours = now.getHours();

    if (minutes < 30) {
      minutes = 30;
    } else {
      minutes = 0;
      hours += 1;
    }
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  };

  // --- SUBMIT ---
  const handleSubmit = async () => {
    if (
      !formData.tenKhachHang ||
      !formData.soDienThoaiKhachHang ||
      !formData.tenThuCung ||
      !formData.dichVuId
    ) {
      toast.warning("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    try {
      let finalTime = dateTime.time;
      if (!finalTime) finalTime = getAutoTimeSlot();

      const formattedDate = `${dateTime.year}-${String(dateTime.month).padStart(2, "0")}-${String(dateTime.date).padStart(2, "0")}`;
      const thoiGianBatDau = `${formattedDate}T${finalTime}:00`;

      const payload = {
        tenKhachHang: formData.tenKhachHang,
        soDienThoaiKhachHang: formData.soDienThoaiKhachHang,
        dichVuId: Number(formData.dichVuId),
        thoiGianBatDau: thoiGianBatDau,
        loaiLichHen: formData.loaiLichHen,
        ghiChuKhachHang: formData.ghiChu,
        tenThuCung: formData.tenThuCung,

        // Logic gửi kèm dữ liệu pet
        thuCungId: !isNewPet ? formData.selectedPetId : null,
        chungLoai: isNewPet ? formData.chungLoai : null,
        giongLoai: isNewPet ? formData.giongLoai : null, // [MỚI] Gửi giống loài
        gioiTinh: isNewPet ? formData.gioiTinh : null,
      };

      console.log("📦 Payload:", payload);
      await bookingService.createReceptionistBooking(payload);
      toast.success("Đặt lịch thành công!");
      setTimeout(() => navigate("/staff/receptionist/booking"), 1500);
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error(error.response?.data?.message || "Đặt lịch thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-8 lg:p-12 pb-32 custom-scrollbar bg-[#fbfcfc] min-h-screen font-sans text-[#101918]">
      <div className="max-w-[1600px] mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-[#101918]">
              Đăng ký lịch hẹn
            </h1>
            <p className="text-base text-gray-500 font-medium mt-2">
              Tạo lịch hẹn mới tại quầy
            </p>
          </div>
          <div className="bg-white px-6 py-3 rounded-[20px] border border-[#e9f1f0] text-base font-bold text-[#588d87] shadow-sm">
            Lễ tân: <span className="text-[#2a9d90] text-lg">Admin</span>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            {/* THÔNG TIN KHÁCH HÀNG */}
            <section className="bg-white p-8 rounded-[32px] border border-[#e9f1f0] shadow-xl shadow-gray-200/50">
              <div className="flex items-center gap-4 mb-8">
                <div className="size-12 rounded-full bg-[#2a9d90]/10 flex items-center justify-center text-[#2a9d90]">
                  <span className="material-symbols-outlined text-[24px]">
                    person
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#101918]">
                  Thông tin khách hàng
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-black text-[#588d87] uppercase tracking-widest ml-1">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      name="soDienThoaiKhachHang"
                      value={formData.soDienThoaiKhachHang}
                      onChange={handleChange}
                      onBlur={handlePhoneBlur}
                      onKeyDown={(e) => e.key === "Enter" && handlePhoneBlur()}
                      className="w-full px-6 py-5 bg-[#f9fbfb] border border-[#e9f1f0] rounded-[24px] focus:ring-4 focus:ring-[#2a9d90]/10 focus:border-[#2a9d90] transition-all text-base font-bold text-[#101918] placeholder:text-gray-300 outline-none"
                      placeholder="Nhập SĐT và nhấn Enter..."
                    />
                    {isSearchingUser && (
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 material-symbols-outlined animate-spin text-[#2a9d90]">
                        progress_activity
                      </span>
                    )}
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-black text-[#588d87] uppercase tracking-widest ml-1">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="tenKhachHang"
                    value={formData.tenKhachHang}
                    onChange={handleChange}
                    className="w-full px-6 py-5 bg-[#f9fbfb] border border-[#e9f1f0] rounded-[24px] focus:ring-4 focus:ring-[#2a9d90]/10 focus:border-[#2a9d90] transition-all text-base font-bold text-[#101918] placeholder:text-gray-300 outline-none"
                    placeholder="Nhập họ và tên khách hàng"
                  />
                </div>
              </div>
            </section>

            {/* THÔNG TIN THÚ CƯNG */}
            <section className="bg-white p-8 rounded-[32px] border border-[#e9f1f0] shadow-xl shadow-gray-200/50">
              <div className="flex items-center gap-4 mb-8">
                <div className="size-12 rounded-full bg-[#2a9d90]/10 flex items-center justify-center text-[#2a9d90]">
                  <span className="material-symbols-outlined text-[24px]">
                    pets
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#101918]">
                  Thông tin dịch vụ
                </h3>
              </div>

              {/* LIST PETS */}
              {foundPets.length > 0 && (
                <div className="mb-8">
                  <p className="text-sm font-black text-[#588d87] uppercase tracking-widest ml-1 mb-3">
                    Chọn thú cưng của khách:
                  </p>
                  <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                    <div
                      onClick={handleSwitchToNewPet}
                      className={`flex-shrink-0 w-40 h-32 rounded-[24px] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${isNewPet ? "border-[#2a9d90] bg-[#2a9d90]/5" : "border-gray-300 hover:border-[#2a9d90]"}`}
                    >
                      <span className="material-symbols-outlined text-3xl text-gray-400">
                        add
                      </span>
                      <span className="text-xs font-bold text-gray-500 mt-2">
                        Thêm Boss Mới
                      </span>
                    </div>

                    {foundPets.map((pet) => {
                      const isSelected =
                        formData.selectedPetId === (pet.thuCungId || pet.id);
                      return (
                        <div
                          key={pet.thuCungId || pet.id}
                          onClick={() => handleSelectOldPet(pet)}
                          className={`flex-shrink-0 w-40 h-32 rounded-[24px] border-2 flex flex-col items-center justify-center cursor-pointer transition-all relative ${isSelected ? "border-[#2a9d90] bg-[#2a9d90]/5 shadow-md" : "border-[#e9f1f0] bg-white hover:border-[#2a9d90]/50"}`}
                        >
                          <div className="size-12 rounded-full flex items-center justify-center mb-2 overflow-hidden bg-gray-100">
                            {pet.hinhAnh ? (
                              <img
                                src={`${IMAGE_BASE_URL}/${pet.hinhAnh}`}
                                alt={pet.tenThuCung}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.nextSibling.style.display = "block";
                                }}
                              />
                            ) : null}
                            <span
                              className="material-symbols-outlined text-gray-400 text-xl"
                              style={{
                                display: pet.hinhAnh ? "none" : "block",
                              }}
                            >
                              pets
                            </span>
                          </div>
                          <span className="text-sm font-bold text-[#101918]">
                            {pet.tenThuCung}
                          </span>
                          <span className="text-xs text-gray-500">
                            {pet.giongLoai || pet.chungLoai}
                          </span>
                          {isSelected && (
                            <span className="material-symbols-outlined text-[#2a9d90] absolute top-2 right-2 text-lg">
                              check_circle
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-black text-[#588d87] uppercase tracking-widest ml-1">
                    Tên thú cưng <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="tenThuCung"
                    value={formData.tenThuCung}
                    onChange={handleChange}
                    className="w-full px-6 py-5 bg-[#f9fbfb] border border-[#e9f1f0] rounded-[24px] focus:ring-4 focus:ring-[#2a9d90]/10 focus:border-[#2a9d90] transition-all text-base font-bold text-[#101918] placeholder:text-gray-300 outline-none"
                    placeholder="Nhập tên thú cưng"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-black text-[#588d87] uppercase tracking-widest ml-1">
                    Chọn dịch vụ <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="dichVuId"
                      value={formData.dichVuId}
                      onChange={handleChange}
                      className="w-full appearance-none bg-[#f9fbfb] border border-[#e9f1f0] rounded-[24px] px-6 py-5 text-base font-bold text-[#101918] focus:ring-4 focus:ring-[#2a9d90]/10 focus:border-[#2a9d90] outline-none cursor-pointer"
                    >
                      <option value="">-- Chọn dịch vụ --</option>
                      {services.map((sv) => (
                        <option
                          key={sv.dichVuId || sv.id}
                          value={sv.dichVuId || sv.id}
                        >
                          {sv.tenDichVu}
                        </option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xl">
                      expand_more
                    </span>
                  </div>
                </div>

                {isNewPet && (
                  <>
                    {/* CHỦNG LOẠI */}
                    <div className="space-y-3">
                      <label className="text-sm font-black text-[#588d87] uppercase tracking-widest ml-1">
                        Chủng loại
                      </label>
                      <div className="relative">
                        <select
                          name="chungLoai"
                          value={formData.chungLoai}
                          onChange={handleChange}
                          className="w-full appearance-none bg-[#f9fbfb] border border-[#e9f1f0] rounded-[24px] px-6 py-5 text-base font-bold text-[#101918] outline-none"
                        >
                          <option value="Chó">Chó</option>
                          <option value="Mèo">Mèo</option>
                          <option value="Khác">Khác</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xl">
                          expand_more
                        </span>
                      </div>
                    </div>

                    {/* [MỚI] GIỐNG LOÀI */}
                    <div className="space-y-3">
                      <label className="text-sm font-black text-[#588d87] uppercase tracking-widest ml-1">
                        Giống loài
                      </label>
                      <input
                        name="giongLoai"
                        value={formData.giongLoai}
                        onChange={handleChange}
                        className="w-full px-6 py-5 bg-[#f9fbfb] border border-[#e9f1f0] rounded-[24px] focus:ring-4 focus:ring-[#2a9d90]/10 focus:border-[#2a9d90] transition-all text-base font-bold text-[#101918] placeholder:text-gray-300 outline-none"
                        placeholder="VD: Poodle, Golden, Mèo Anh..."
                      />
                    </div>

                    <div className="space-y-3 md:col-span-2">
                      <label className="text-sm font-black text-[#588d87] uppercase tracking-widest ml-1">
                        Giới tính
                      </label>
                      <div className="flex gap-4">
                        {["Đực", "Cái"].map((g) => (
                          <label
                            key={g}
                            className={`flex-1 cursor-pointer border rounded-[24px] py-5 flex items-center justify-center gap-2 font-bold transition-all ${formData.gioiTinh === g ? "border-[#2a9d90] bg-[#2a9d90]/5 text-[#2a9d90]" : "border-[#e9f1f0] bg-[#f9fbfb] text-gray-400"}`}
                          >
                            <input
                              type="radio"
                              name="gioiTinh"
                              value={g}
                              checked={formData.gioiTinh === g}
                              onChange={handleChange}
                              className="hidden"
                            />
                            <span className="material-symbols-outlined">
                              {g === "Đực" ? "male" : "female"}
                            </span>{" "}
                            {g}
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-3 md:col-span-2">
                  <label className="text-sm font-black text-[#588d87] uppercase tracking-widest ml-1">
                    Loại lịch hẹn <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {APPOINTMENT_TYPES.map((type) => (
                      <label
                        key={type.value}
                        className={`cursor-pointer border-2 rounded-[20px] px-4 py-3 text-sm font-bold flex items-center justify-center transition-all ${formData.loaiLichHen === type.value ? "border-[#2a9d90] bg-[#2a9d90] text-white shadow-md" : "border-[#e9f1f0] bg-[#f9fbfb] text-[#101918] hover:border-[#2a9d90]"}`}
                      >
                        <input
                          type="radio"
                          name="loaiLichHen"
                          value={type.value}
                          checked={formData.loaiLichHen === type.value}
                          onChange={handleChange}
                          className="hidden"
                        />
                        {type.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* GHI CHÚ */}
            <section className="bg-white p-8 rounded-[32px] border border-[#e9f1f0] shadow-xl shadow-gray-200/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="size-12 rounded-full bg-[#2a9d90]/10 flex items-center justify-center text-[#2a9d90]">
                  <span className="material-symbols-outlined text-[24px]">
                    note_alt
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#101918]">
                  Ghi chú & Yêu cầu
                </h3>
              </div>
              <textarea
                name="ghiChu"
                value={formData.ghiChu}
                onChange={handleChange}
                className="w-full bg-[#f9fbfb] border border-[#e9f1f0] rounded-[24px] p-6 text-base font-medium focus:ring-4 focus:ring-[#2a9d90]/10 focus:border-[#2a9d90] outline-none transition-all placeholder:text-gray-300 resize-none min-h-[150px]"
                placeholder="Ví dụ: Bé sợ máy sấy..."
              ></textarea>
            </section>
          </div>

          {/* CỘT PHẢI - CALENDAR */}
          <div className="space-y-8">
            <section className="bg-white p-8 rounded-[32px] border border-[#e9f1f0] shadow-xl shadow-gray-200/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="size-12 rounded-full bg-[#2a9d90]/10 flex items-center justify-center text-[#2a9d90]">
                  <span className="material-symbols-outlined text-[24px]">
                    calendar_month
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#101918]">
                  Thời gian hẹn
                </h3>
              </div>
              <div className="mb-8 bg-[#f9fbfb] p-6 rounded-[24px] border border-[#e9f1f0]">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-extrabold text-base text-[#101918] capitalize">
                    Tháng {viewMonth + 1}, {viewYear}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleMonthChange(-1)}
                      className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-[#2a9d90] transition-colors shadow-sm"
                    >
                      <span className="material-symbols-outlined text-lg">
                        chevron_left
                      </span>
                    </button>
                    <button
                      onClick={() => handleMonthChange(1)}
                      className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-[#2a9d90] transition-colors shadow-sm"
                    >
                      <span className="material-symbols-outlined text-lg">
                        chevron_right
                      </span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 text-xs font-black text-[#588d87] mb-4 uppercase text-center">
                  {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((d) => (
                    <div key={d}>{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 text-sm font-bold text-center gap-y-2">
                  {Array.from({ length: startDayIndex }).map((_, i) => (
                    <div key={`e-${i}`} className="p-3"></div>
                  ))}
                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                    (day) => {
                      const isSelected =
                        dateTime.date === day &&
                        dateTime.month === viewMonth + 1 &&
                        dateTime.year === viewYear;
                      const isPast =
                        new Date(viewYear, viewMonth, day).setHours(
                          0,
                          0,
                          0,
                          0,
                        ) < new Date().setHours(0, 0, 0, 0);
                      return (
                        <div
                          key={day}
                          onClick={() => !isPast && handleDateClick(day)}
                          className={`p-3 rounded-xl cursor-pointer transition-all ${isSelected ? "bg-[#2a9d90] text-white shadow-lg shadow-[#2a9d90]/30" : isPast ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-white hover:shadow-sm"}`}
                        >
                          {day}
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
              <div className="w-full h-[1px] bg-[#e9f1f0] my-6"></div>
              <p className="text-sm font-black text-[#588d87] mb-4 uppercase tracking-widest ml-1">
                Khung giờ <span className="text-red-500">*</span>
              </p>
              <div className="grid grid-cols-3 gap-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {timeSlots.map((time) => {
                  const available = isTimeSlotAvailable(time);
                  const isSelected = dateTime.time === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      disabled={!available}
                      onClick={() => available && handleTimeSelect(time)}
                      className={`py-4 text-sm font-bold border-2 rounded-[20px] transition-all ${isSelected ? "border-[#2a9d90] bg-[#2a9d90]/5 text-[#2a9d90]" : available ? "border-[#e9f1f0] bg-white text-gray-500 hover:border-[#2a9d90] hover:text-[#2a9d90] hover:shadow-md" : "border-[#e9f1f0] bg-gray-50 text-gray-300 cursor-not-allowed"}`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* NGƯỜI PHỤ TRÁCH */}
            <section className="bg-white p-8 rounded-[32px] border border-[#e9f1f0] shadow-xl shadow-gray-200/50 opacity-80">
              <div className="flex items-center gap-4 mb-6">
                <div className="size-12 rounded-full bg-[#2a9d90]/10 flex items-center justify-center text-[#2a9d90]">
                  <span className="material-symbols-outlined text-[24px]">
                    person_search
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#101918]">
                  Người phụ trách
                </h3>
              </div>
              <div className="space-y-6">
                <p className="text-sm text-orange-500 italic bg-orange-50 p-3 rounded-xl border border-orange-100">
                  * Hệ thống sẽ tự động phân bổ bác sĩ hoặc nhân viên phù hợp.
                </p>
                <div className="space-y-3">
                  <label className="text-sm font-black text-[#588d87] uppercase tracking-widest ml-1">
                    Phòng / Khoa
                  </label>
                  <div className="relative">
                    <select className="w-full appearance-none bg-[#f9fbfb] border border-[#e9f1f0] rounded-[24px] px-6 py-5 text-base font-bold text-[#101918] outline-none">
                      <option>Dịch vụ Spa & Grooming</option>
                      <option>Khoa Nội</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xl">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* FOOTER */}
        <div className="fixed bottom-0 right-0 left-0 xl:left-[289px] bg-white border-t border-[#e9f1f0] p-5 z-20">
          <div className="max-w-[1600px] mx-auto flex justify-end gap-4">
            <button
              onClick={() => navigate("/staff/receptionist/booking")}
              className="px-8 py-4 rounded-[20px] border border-[#e9f1f0] text-base font-bold text-[#588d87] hover:bg-gray-50 transition-all shadow-sm"
            >
              Hủy bỏ
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`px-10 py-4 rounded-[20px] bg-[#2a9d90] text-base font-bold text-white shadow-xl shadow-[#2a9d90]/30 hover:bg-[#238b7e] transition-all flex items-center gap-3 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin">
                  progress_activity
                </span>
              ) : (
                <span className="material-symbols-outlined text-[24px]">
                  calendar_add_on
                </span>
              )}
              {loading ? "Đang xử lý..." : "Xác nhận đặt lịch"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookingForm;
