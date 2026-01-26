import React, { useState, useEffect, useRef } from "react";
import bookingService from "../../../../services/bookingService";
import productService from "../../../../services/productService";

// --- COMPONENT CON: Ô TÌM KIẾM THUỐC (GIỮ NGUYÊN) ---
const MedicineSearchInput = ({ value, onSelect, placeholder }) => {
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);
  const MEDICINE_CATEGORY_ID = 9; // ID danh mục thuốc

  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (keyword) => {
    setQuery(keyword);
    if (!keyword.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      onSelect(null);
      return;
    }
    try {
      const response = await productService.getAllProducts({
        keyword: keyword,
        categoryId: MEDICINE_CATEGORY_ID,
        page: 0,
        size: 10,
      });
      const list = response.content || response || [];
      setSuggestions(list);
      setShowDropdown(true);
    } catch (error) {
      console.error("Lỗi tìm thuốc:", error);
    }
  };

  const handleSelectItem = (item) => {
    setQuery(item.tenSanPham);
    setShowDropdown(false);
    onSelect(item);
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <input
        type="text"
        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:border-[#007A7A] outline-none font-bold placeholder:font-medium transition-all"
        placeholder={placeholder}
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => query && setShowDropdown(true)}
      />
      {showDropdown && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-100 rounded-xl shadow-xl mt-1 z-50 max-h-48 overflow-y-auto custom-scrollbar animate-in fade-in zoom-in-95 duration-200">
          {suggestions.length > 0 ? (
            suggestions.map((item) => (
              <div
                key={item.sanPhamId}
                onClick={() => handleSelectItem(item)}
                className="px-4 py-2.5 hover:bg-teal-50 cursor-pointer border-b border-gray-50 last:border-0 group"
              >
                <p className="text-xs font-bold text-gray-800 group-hover:text-[#007A7A] transition-colors">
                  {item.tenSanPham}
                </p>
                <div className="flex justify-between mt-0.5">
                  <p className="text-[10px] text-gray-400">
                    Tồn kho:{" "}
                    <span className="text-gray-600 font-bold">
                      {item.soLuongTonKho}
                    </span>
                  </p>
                  <p className="text-[10px] text-gray-400">
                    Giá: {item.gia?.toLocaleString("vi-VN")}đ
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-center">
              <p className="text-xs text-gray-400 italic">
                Không tìm thấy thuốc...
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// --- COMPONENT CHÍNH ---
const PatientDetail = ({
  appointment,
  petDetail, // Dữ liệu thú cưng + lịch sử từ API
  history, // Prop này có thể không cần dùng nữa nếu ta tự xử lý trong useEffect
  loadingDetail,
  onRefresh,
  titleHistory = "Lịch sử điều trị",
}) => {
  const API_URL = "http://localhost:8080/uploads/";
  const [isProcessing, setIsProcessing] = useState(false);
  const isSpa = titleHistory === "Lịch sử làm đẹp";

  // State hiển thị lịch sử tổng hợp (Vaccine + Thuốc)
  const [combinedHistory, setCombinedHistory] = useState([]);

  // --- LOGIC MỚI: XỬ LÝ DỮ LIỆU LỊCH SỬ ---
  useEffect(() => {
    if (petDetail) {
      // 1. Xử lý Lịch sử Tiêm chủng
      const vaccines = (petDetail.lichSuTiemChung || []).map((v) => ({
        type: "VACCINE",
        date: v.ngayTiem,
        title: `Tiêm phòng: ${v.tenVacXin}`,
        note: `${v.ghiChu || "Không có ghi chú"} (BS: ${v.bacSi || "N/A"})`,
      }));

      // 2. Xử lý Lịch sử Đơn thuốc (MỚI)
      const prescriptions = (petDetail.lichSuDonThuoc || []).map((p) => {
        // Tạo chuỗi mô tả thuốc gọn gàng
        const medicineList = (p.danhSachThuoc || [])
          .map((m) => `${m.tenThuoc} (${m.soLuong})`)
          .join(", ");

        return {
          type: "PRESCRIPTION",
          date: p.ngayKe, // Sử dụng ngày kê đơn
          title: `Kê đơn: ${p.chanDoan}`, // Tiêu đề là chẩn đoán
          // Nội dung hiển thị chi tiết
          note: `BS: ${p.bacSi} • Lời dặn: ${p.loiDan} • Thuốc: ${medicineList || "Không có thuốc"}`,
        };
      });

      // 3. Gộp và Sắp xếp theo ngày giảm dần (Mới nhất lên đầu)
      const merged = [...vaccines, ...prescriptions].sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );

      setCombinedHistory(merged);
    } else {
      setCombinedHistory([]);
    }
  }, [petDetail]); // Chạy lại khi petDetail thay đổi

  // --- STATE QUẢN LÝ MODAL HOÀN THÀNH ---
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [completeData, setCompleteData] = useState({
    coKeDon: false,
    chanDoan: "",
    loiDan: "",
    danhSachThuoc: [],
    coTiemPhong: false,
    tenVacXin: "",
    ngayTaiChung: "",
    ghiChu: "",
  });

  // --- HELPERS THUỐC (Modal) ---
  const handleAddMedicine = () => {
    setCompleteData({
      ...completeData,
      danhSachThuoc: [
        ...completeData.danhSachThuoc,
        {
          id: Date.now(),
          thuocId: "",
          tenThuocDisplay: "",
          soLuong: 1,
          lieuDung: "",
        },
      ],
    });
  };

  const handleRemoveMedicine = (index) => {
    const newList = [...completeData.danhSachThuoc];
    newList.splice(index, 1);
    setCompleteData({ ...completeData, danhSachThuoc: newList });
  };

  const handleMedicineChange = (index, field, value) => {
    const newList = [...completeData.danhSachThuoc];
    newList[index][field] = value;
    setCompleteData({ ...completeData, danhSachThuoc: newList });
  };

  const handleSelectMedicineFromSearch = (index, productItem) => {
    const newList = [...completeData.danhSachThuoc];
    if (productItem) {
      newList[index].thuocId = productItem.sanPhamId;
      newList[index].tenThuocDisplay = productItem.tenSanPham;
    } else {
      newList[index].thuocId = "";
      newList[index].tenThuocDisplay = "";
    }
    setCompleteData({ ...completeData, danhSachThuoc: newList });
  };

  // --- XỬ LÝ API ---
  const handleConfirmAppointment = async () => {
    if (!appointment?.lichHenId) return;
    if (
      window.confirm(`Xác nhận tiếp nhận lịch hẹn #${appointment.lichHenId}?`)
    ) {
      setIsProcessing(true);
      try {
        await bookingService.confirmDoctorAppointment(appointment.lichHenId);
        alert("Đã tiếp nhận lịch hẹn thành công!");
        if (onRefresh) onRefresh();
      } catch (error) {
        alert("Lỗi xác nhận.");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleCompleteClick = async () => {
    if (!appointment?.lichHenId) return;
    if (isSpa) {
      if (
        window.confirm(
          `Xác nhận hoàn thành Spa cho #${appointment.tenThuCung}?`,
        )
      ) {
        setIsProcessing(true);
        try {
          await bookingService.completeDoctorAppointment(
            appointment.lichHenId,
            { coKeDon: false, coTiemPhong: false },
          );
          alert("Dịch vụ Spa đã hoàn thành!");
          if (onRefresh) onRefresh("DA_XONG");
        } catch (error) {
          alert("Lỗi khi hoàn thành.");
        } finally {
          setIsProcessing(false);
        }
      }
    } else {
      setShowCompleteModal(true);
    }
  };

  const handleFinalCompleteDoctor = async () => {
    if (completeData.coTiemPhong && !completeData.tenVacXin) {
      alert("Vui lòng nhập tên vắc xin!");
      return;
    }
    if (completeData.coKeDon) {
      if (!completeData.chanDoan) {
        alert("Vui lòng nhập chẩn đoán bệnh!");
        return;
      }
      if (completeData.danhSachThuoc.length === 0) {
        alert("Vui lòng thêm ít nhất 1 loại thuốc!");
        return;
      }
      if (completeData.danhSachThuoc.some((m) => !m.thuocId || !m.lieuDung)) {
        alert("Vui lòng chọn thuốc và nhập liều dùng đầy đủ.");
        return;
      }
    }

    setIsProcessing(true);
    try {
      const payload = {
        ...completeData,
        danhSachThuoc: completeData.coKeDon
          ? completeData.danhSachThuoc.map((m) => ({
              thuocId: parseInt(m.thuocId),
              soLuong: parseInt(m.soLuong),
              lieuDung: m.lieuDung,
            }))
          : [],
      };
      await bookingService.completeDoctorAppointment(
        appointment.lichHenId,
        payload,
      );
      alert("Hoàn thành lịch hẹn thành công!");
      setShowCompleteModal(false);
      setCompleteData({
        coKeDon: false,
        chanDoan: "",
        loiDan: "",
        danhSachThuoc: [],
        coTiemPhong: false,
        tenVacXin: "",
        ngayTaiChung: "",
        ghiChu: "",
      });
      if (onRefresh) onRefresh("DA_XONG");
    } catch (error) {
      alert("Có lỗi xảy ra khi lưu kết quả.");
    } finally {
      setIsProcessing(false);
    }
  };

  // --- HELPERS HIỂN THỊ ---
  const getPetImage = () => {
    if (petDetail?.hinhAnh)
      return petDetail.hinhAnh.startsWith("http")
        ? petDetail.hinhAnh
        : `${API_URL}${petDetail.hinhAnh}`;
    return `https://ui-avatars.com/api/?name=${appointment?.tenThuCung || "Pet"}&background=random&size=300`;
  };
  const formatDate = (iso) =>
    iso
      ? new Date(iso).toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "";
  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const years = Math.abs(
      new Date(Date.now() - new Date(dob).getTime()).getUTCFullYear() - 1970,
    );
    return years < 1 ? "Dưới 1 tuổi" : `${years} tuổi`;
  };

  if (!appointment)
    return (
      <section className="flex-1 bg-white flex items-center justify-center p-8">
        <p className="text-gray-500">Chọn lịch hẹn...</p>
      </section>
    );

  return (
    <section className="flex-1 bg-white flex flex-col overflow-hidden min-w-0 font-sans relative">
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-4xl mx-auto p-8 py-10 space-y-8">
          {/* 1. HEADER INFO */}
          <div className="flex items-start gap-8">
            <div className="relative shrink-0">
              <div className="absolute -inset-4 bg-[#007A7A]/5 rounded-[40px] rotate-6"></div>
              <div className="asymmetrical-frame w-40 h-40 bg-white p-2 relative overflow-hidden border border-gray-100 shadow-xl z-10 rounded-[30px_10px_30px_10px]">
                <img
                  alt="Pet profile"
                  className="w-full h-full object-cover rounded-[inherit]"
                  src={getPetImage()}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${appointment.tenThuCung}&background=random&size=300`;
                  }}
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#2a9d8f] text-white p-3 rounded-2xl shadow-xl z-20 border-4 border-white flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">pets</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-extrabold text-[#0c1d1d] tracking-tight mb-2">
                    {appointment.tenThuCung}
                  </h2>
                  {petDetail ? (
                    <div className="flex items-center gap-6 text-xs font-bold text-gray-400">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[#007A7A]">
                          cake
                        </span>{" "}
                        {calculateAge(petDetail.ngaySinh)}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[#007A7A]">
                          scale
                        </span>{" "}
                        {petDetail.canNang} kg
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400 italic text-xs">
                      Đang tải...
                    </span>
                  )}
                </div>
                <div className="bg-gray-50/80 p-4 px-6 rounded-2xl border border-gray-100 text-right">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    CHỦ NUÔI
                  </p>
                  <p className="text-base font-extrabold text-gray-900">
                    {appointment.tenKhachHang}
                  </p>
                  <p className="text-xs font-bold text-[#007A7A] mt-0.5">
                    {appointment.soDienThoaiKhachHang}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* 2. HISTORY TIMELINE (ĐÃ CẬP NHẬT ĐỂ HIỂN THỊ CẢ 2 LOẠI) */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-extrabold flex items-center gap-2 text-[#0c1d1d]">
                <span className="material-symbols-outlined text-[#007A7A] text-2xl">
                  history
                </span>{" "}
                {titleHistory}
              </h3>
            </div>
            <div className="space-y-0 px-1">
              {loadingDetail ? (
                <p className="text-gray-400 italic text-sm">
                  Đang tải hồ sơ...
                </p>
              ) : combinedHistory.length > 0 ? (
                combinedHistory.map((rec, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex flex-col items-center">
                      {/* LOGIC MÀU SẮC DOT: Teal cho Vaccine, Amber cho Đơn thuốc */}
                      <div
                        className={`size-3 rounded-full border-[2px] bg-white z-10 shadow-sm 
                        ${rec.type === "VACCINE" ? "border-[#007A7A]" : rec.type === "PRESCRIPTION" ? "border-amber-500" : "border-gray-300"}`}
                      ></div>
                      <div className="w-[1px] h-full bg-gray-100 group-last:hidden"></div>
                    </div>
                    <div className="pb-8 flex-1">
                      <div className="flex justify-between items-baseline mb-2">
                        <h4
                          className={`text-sm font-bold uppercase tracking-wide ${rec.type === "PRESCRIPTION" ? "text-amber-700" : "text-gray-900"}`}
                        >
                          {rec.title}
                        </h4>
                        <span className="text-[11px] font-bold text-gray-400">
                          {formatDate(rec.date)}
                        </span>
                      </div>
                      <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50">
                        <p className="text-xs text-gray-500 leading-relaxed font-medium">
                          {rec.note}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400 italic">
                  Chưa có lịch sử nào được ghi nhận.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. FOOTER ACTIONS */}
      <div className="h-20 flex items-center justify-between px-8 bg-white border-t border-gray-100 shrink-0">
        <div className="flex gap-3">
          {appointment.trangThaiLichHen === "CHO_XAC_NHAN" && (
            <button
              onClick={handleConfirmAppointment}
              disabled={isProcessing}
              className="px-6 h-11 bg-[#2a9d8f] text-white rounded-full font-bold text-xs tracking-wider shadow-lg hover:bg-[#007A7A]/90 transition-all"
            >
              {isProcessing ? "ĐANG XỬ LÝ..." : "CHẤP NHẬN"}
            </button>
          )}
          {appointment.trangThaiLichHen === "DA_XAC_NHAN" && (
            <button
              onClick={handleCompleteClick}
              disabled={isProcessing}
              className="px-6 h-11 bg-[#2a9d8f] text-white rounded-full font-bold text-xs tracking-wider shadow-lg shadow-green-600/20 transition-all"
            >
              HOÀN THÀNH
            </button>
          )}
          <button className="px-5 h-11 border border-gray-200 text-gray-500 rounded-full font-bold text-xs tracking-wide hover:bg-gray-50 transition-all">
            THÊM TT
          </button>
        </div>
      </div>

      {/* --- MODAL HOÀN THÀNH --- */}
      {!isSpa && showCompleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-[32px] shadow-2xl relative flex flex-col">
            <div className="p-8 pb-4 shrink-0">
              <h3 className="text-xl font-black text-gray-900 mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#007A7A]">
                  verified
                </span>{" "}
                Xác nhận hoàn thành
              </h3>
              <p className="text-xs text-gray-400 font-medium">
                Nhập thông tin khám chữa bệnh hoặc tiêm phòng bên dưới.
              </p>
            </div>

            <div className="px-8 overflow-y-auto custom-scrollbar space-y-6 pb-6">
              {/* 1. KÊ ĐƠN THUỐC */}
              <div className="bg-gray-50/50 p-6 rounded-[24px] border border-gray-100">
                <label className="flex items-center gap-3 cursor-pointer w-fit mb-4 group">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-[#007A7A] cursor-pointer"
                    checked={completeData.coKeDon}
                    onChange={(e) =>
                      setCompleteData({
                        ...completeData,
                        coKeDon: e.target.checked,
                      })
                    }
                  />
                  <span className="text-sm font-black text-gray-700 uppercase tracking-wide group-hover:text-[#007A7A] transition-colors">
                    Kê đơn thuốc
                  </span>
                </label>
                {completeData.coKeDon && (
                  <div className="space-y-4 pl-1 animate-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#007A7A] outline-none transition-all placeholder:text-gray-400 font-medium"
                        placeholder="Chẩn đoán bệnh..."
                        value={completeData.chanDoan}
                        onChange={(e) =>
                          setCompleteData({
                            ...completeData,
                            chanDoan: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#007A7A] outline-none transition-all placeholder:text-gray-400 font-medium"
                        placeholder="Lời dặn..."
                        value={completeData.loiDan}
                        onChange={(e) =>
                          setCompleteData({
                            ...completeData,
                            loiDan: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                      <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-50">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Danh sách thuốc
                        </span>
                        <button
                          onClick={handleAddMedicine}
                          className="flex items-center gap-1 text-[10px] font-bold bg-[#007A7A]/10 text-[#007A7A] px-3 py-1.5 rounded-lg hover:bg-[#007A7A] hover:text-white transition-all"
                        >
                          <span className="material-symbols-outlined text-sm">
                            add
                          </span>{" "}
                          THÊM
                        </button>
                      </div>
                      {completeData.danhSachThuoc.length === 0 ? (
                        <p className="text-center text-xs text-gray-300 py-4 italic">
                          Chưa có thuốc nào.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {completeData.danhSachThuoc.map((med, index) => (
                            <div key={index} className="flex gap-3 items-start">
                              <div className="flex-[3]">
                                <MedicineSearchInput
                                  placeholder="Tìm tên thuốc..."
                                  value={med.tenThuocDisplay}
                                  onSelect={(item) =>
                                    handleSelectMedicineFromSearch(index, item)
                                  }
                                />
                              </div>
                              <div className="w-16">
                                <input
                                  type="number"
                                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:border-[#007A7A] outline-none font-bold text-center"
                                  placeholder="SL"
                                  value={med.soLuong}
                                  onChange={(e) =>
                                    handleMedicineChange(
                                      index,
                                      "soLuong",
                                      e.target.value,
                                    )
                                  }
                                />
                              </div>
                              <div className="flex-[2]">
                                <input
                                  type="text"
                                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:border-[#007A7A] outline-none font-medium"
                                  placeholder="Liều dùng..."
                                  value={med.lieuDung}
                                  onChange={(e) =>
                                    handleMedicineChange(
                                      index,
                                      "lieuDung",
                                      e.target.value,
                                    )
                                  }
                                />
                              </div>
                              <button
                                onClick={() => handleRemoveMedicine(index)}
                                className="p-2 text-gray-300 hover:text-red-500 transition-colors mt-0.5"
                              >
                                <span className="material-symbols-outlined text-lg">
                                  delete
                                </span>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* 2. TIÊM PHÒNG */}
              <div className="bg-gray-50/50 p-6 rounded-[24px] border border-gray-100">
                <label className="flex items-center gap-3 cursor-pointer w-fit mb-4 group">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-[#007A7A] cursor-pointer"
                    checked={completeData.coTiemPhong}
                    onChange={(e) =>
                      setCompleteData({
                        ...completeData,
                        coTiemPhong: e.target.checked,
                      })
                    }
                  />
                  <span className="text-sm font-black text-gray-700 uppercase tracking-wide group-hover:text-[#007A7A] transition-colors">
                    Tiêm phòng vắc xin
                  </span>
                </label>
                {completeData.coTiemPhong && (
                  <div className="space-y-4 pl-1 animate-in slide-in-from-top-2 duration-300">
                    <input
                      type="text"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#007A7A] outline-none transition-all placeholder:text-gray-400 font-medium"
                      placeholder="Tên vắc xin..."
                      value={completeData.tenVacXin}
                      onChange={(e) =>
                        setCompleteData({
                          ...completeData,
                          tenVacXin: e.target.value,
                        })
                      }
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="date"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#007A7A] outline-none transition-all text-gray-600 font-medium"
                        value={completeData.ngayTaiChung}
                        onChange={(e) =>
                          setCompleteData({
                            ...completeData,
                            ngayTaiChung: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#007A7A] outline-none transition-all placeholder:text-gray-400 font-medium"
                        placeholder="Ghi chú tiêm..."
                        value={completeData.ghiChu}
                        onChange={(e) =>
                          setCompleteData({
                            ...completeData,
                            ghiChu: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-8 pt-0 flex gap-4 mt-auto">
              <button
                onClick={() => setShowCompleteModal(false)}
                className="flex-1 h-12 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
              >
                HỦY BỎ
              </button>
              <button
                onClick={handleFinalCompleteDoctor}
                disabled={isProcessing}
                className="flex-1 h-12 bg-[#007A7A] text-white rounded-2xl font-bold shadow-lg shadow-teal-500/20 hover:bg-[#0c1d1d] hover:shadow-xl transition-all"
              >
                {isProcessing ? "ĐANG LƯU..." : "XÁC NHẬN"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PatientDetail;
