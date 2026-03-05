import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  TextInput,
  ActivityIndicator,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
// LƯU Ý: Bạn nhớ đảm bảo đã thêm hàm getMyPetsAPI vào file bookingApi.js như hướng dẫn trước đó nhé!
import {
  createBookingAPI,
  getServicesAPI,
  getMyPetsAPI,
} from "../api/bookingApi";
import { BASE_URL } from "../api/userApi";

const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#10B981",
  primaryLight: "rgba(16, 185, 129, 0.1)",
  background: "#FAFAFA",
  surface: "#FFFFFF",
  text: "#1F2937",
  muted: "#6B7280",
  border: "#E5E7EB",
  white: "#FFFFFF",
  red: "#EF4444",
};

const TIMES = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

// --- CẤU HÌNH THỜI GIAN HIỆN TẠI ---
const currentDate = new Date();
const CURRENT_YEAR = currentDate.getFullYear();
const CURRENT_MONTH = currentDate.getMonth() + 1;
const CURRENT_DAY = currentDate.getDate();
const currentMinutesOfDay =
  currentDate.getHours() * 60 + currentDate.getMinutes();

// Hàm hỗ trợ load ảnh thú cưng
const getImageUrl = (imageName) => {
  if (!imageName) return null;
  if (imageName.startsWith("http")) return imageName;
  return `${BASE_URL}/uploads/${imageName}`;
};

const BookingScreen = ({ navigation }) => {
  // --- STATE DỮ LIỆU ĐỘNG ---
  const [services, setServices] = useState([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);

  const [pets, setPets] = useState([]);
  const [isLoadingPets, setIsLoadingPets] = useState(true);

  // --- STATE FORM ---
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDay, setSelectedDay] = useState(CURRENT_DAY);
  const [selectedTime, setSelectedTime] = useState("09:00");
  const [selectedPet, setSelectedPet] = useState(null);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsPlacingOrder] = useState(false);

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(
      () => setToast({ visible: false, message: "", type: "success" }),
      3000,
    );
  };

  // --- 1. TẢI DANH SÁCH DỊCH VỤ ---
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServicesAPI();
        setServices(data);
        if (data && data.length > 0) {
          setSelectedService(data[0].dichVuId);
        }
      } catch (error) {
        showToast("Không thể tải danh sách dịch vụ", "error");
      } finally {
        setIsLoadingServices(false);
      }
    };
    fetchServices();
  }, []);

  // --- 2. TẢI DANH SÁCH THÚ CƯNG CỦA USER ---
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getMyPetsAPI();
        setPets(data);
        if (data && data.length > 0) {
          setSelectedPet(data[0].thuCungId);
        }
      } catch (error) {
        showToast("Không thể tải danh sách thú cưng", "error");
      } finally {
        setIsLoadingPets(false);
      }
    };
    fetchPets();
  }, []);

  // --- 3. XỬ LÝ LOGIC CHỌN NGÀY VÀ GIỜ ---
  useEffect(() => {
    if (selectedDay === CURRENT_DAY) {
      const selectedTimeMinutes =
        parseInt(selectedTime.split(":")[0] || "0", 10) * 60 +
        parseInt(selectedTime.split(":")[1] || "0", 10);

      if (selectedTimeMinutes <= currentMinutesOfDay) {
        const firstValidTime = TIMES.find((t) => {
          const tMins =
            parseInt(t.split(":")[0], 10) * 60 + parseInt(t.split(":")[1], 10);
          return tMins > currentMinutesOfDay;
        });
        setSelectedTime(firstValidTime || "");
      }
    } else if (selectedDay > CURRENT_DAY) {
      if (selectedTime === "") {
        setSelectedTime("09:00");
      }
    }
  }, [selectedDay]);

  const selectedServiceData = services.find(
    (s) => s.dichVuId === selectedService,
  );
  const totalPrice = selectedServiceData ? selectedServiceData.giaDichVu : 0;

  // --- HÀM GỬI LÊN BACKEND ---
  const handleBooking = async () => {
    if (!selectedService) {
      showToast("Vui lòng chọn dịch vụ!", "error");
      return;
    }
    if (!selectedTime) {
      showToast("Vui lòng chọn giờ hẹn!", "error");
      return;
    }
    if (!selectedPet) {
      showToast("Vui lòng chọn thú cưng!", "error");
      return;
    }

    setIsPlacingOrder(true);
    try {
      const formattedMonth =
        CURRENT_MONTH < 10 ? `0${CURRENT_MONTH}` : CURRENT_MONTH;
      const formattedDay = selectedDay < 10 ? `0${selectedDay}` : selectedDay;
      const thoiGianBatDau = `${CURRENT_YEAR}-${formattedMonth}-${formattedDay}T${selectedTime}:00`;

      const payload = {
        thuCungId: selectedPet,
        dichVuId: selectedService,
        nhanVienId: 3,
        thoiGianBatDau: thoiGianBatDau,
        ghiChuKhachHang: note,
        loaiLichHen: "THUONG_LE",
      };

      console.log("🔥 PAYLOAD LỊCH HẸN:", JSON.stringify(payload, null, 2));

      await createBookingAPI(payload);

      showToast("Đặt lịch hẹn thành công!", "success");

      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (error) {
      showToast(error.message || "Lỗi khi đặt lịch, thử lại sau!", "error");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* TOAST */}
      {toast.visible && (
        <View
          style={[
            styles.toastContainer,
            toast.type === "error" ? styles.toastError : styles.toastSuccess,
          ]}
        >
          <MaterialIcons
            name={toast.type === "error" ? "error-outline" : "check-circle"}
            size={24}
            color="white"
          />
          <Text style={styles.toastText}>{toast.message}</Text>
        </View>
      )}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đặt lịch hẹn</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* CHỌN DỊCH VỤ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chọn dịch vụ</Text>
          {isLoadingServices ? (
            <ActivityIndicator
              size="large"
              color={COLORS.primary}
              style={{ marginVertical: 20 }}
            />
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.serviceList}
            >
              {services.map((item) => {
                const isSelected = selectedService === item.dichVuId;

                return (
                  <TouchableOpacity
                    key={item.dichVuId}
                    onPress={() => setSelectedService(item.dichVuId)}
                    style={styles.serviceItem}
                  >
                    <View
                      style={[
                        styles.serviceIconBox,
                        isSelected
                          ? styles.serviceIconActive
                          : styles.serviceIconInactive,
                      ]}
                    >
                      {/* Dùng chung icon chân chó cho tất cả dịch vụ */}
                      <MaterialIcons
                        name="pets"
                        size={32}
                        color={isSelected ? COLORS.white : "#9CA3AF"}
                      />
                    </View>
                    <Text
                      style={[
                        styles.serviceLabel,
                        {
                          color: isSelected ? COLORS.primary : COLORS.muted,
                          fontWeight: isSelected ? "700" : "500",
                        },
                      ]}
                      numberOfLines={2}
                    >
                      {item.tenDichVu}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
        </View>

        {/* LỊCH */}
        <View style={styles.section}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>
              Tháng {CURRENT_MONTH}, {CURRENT_YEAR}
            </Text>
          </View>
          <View style={styles.calendarGrid}>
            {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((d) => (
              <Text key={d} style={styles.dayHeader}>
                {d}
              </Text>
            ))}
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
              const isPastDay = d < CURRENT_DAY;

              return (
                <TouchableOpacity
                  key={d}
                  onPress={() => !isPastDay && setSelectedDay(d)}
                  activeOpacity={isPastDay ? 1 : 0.2}
                  style={[
                    styles.dayCell,
                    selectedDay === d && styles.dayCellActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      isPastDay && { color: COLORS.border },
                      selectedDay === d && {
                        color: COLORS.white,
                        fontWeight: "bold",
                      },
                    ]}
                  >
                    {d}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* GIỜ HẸN */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Giờ hẹn</Text>
          <View style={styles.timeGrid}>
            {TIMES.map((t) => {
              const [hourStr, minStr] = t.split(":");
              const timeMinutes =
                parseInt(hourStr, 10) * 60 + parseInt(minStr, 10);

              const isPastTime =
                selectedDay === CURRENT_DAY &&
                timeMinutes <= currentMinutesOfDay;

              return (
                <TouchableOpacity
                  key={t}
                  onPress={() => {
                    if (!isPastTime) setSelectedTime(t);
                  }}
                  activeOpacity={isPastTime ? 1 : 0.2}
                  style={[
                    styles.timeItem,
                    selectedTime === t
                      ? styles.timeActive
                      : styles.timeInactive,
                    isPastTime && {
                      backgroundColor: "#F1F5F9",
                      borderColor: "#F1F5F9",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.timeText,
                      selectedTime === t && styles.timeTextActive,
                      isPastTime && { color: "#CBD5E1" },
                    ]}
                  >
                    {t}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {selectedTime === "" && selectedDay === CURRENT_DAY && (
            <Text
              style={{
                color: COLORS.red,
                fontSize: 12,
                marginTop: 5,
                fontStyle: "italic",
              }}
            >
              Hôm nay đã hết giờ đặt lịch, vui lòng chọn ngày khác.
            </Text>
          )}
        </View>

        {/* CHỌN THÚ CƯNG ĐỘNG TỪ API */}
        <View style={styles.section}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Chọn thú cưng</Text>
            <TouchableOpacity style={styles.addPetBtn}>
              <MaterialIcons name="add" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {isLoadingPets ? (
            <ActivityIndicator
              size="small"
              color={COLORS.primary}
              style={{ marginVertical: 10 }}
            />
          ) : pets && Array.isArray(pets) && pets.length > 0 ? (
            pets.map((pet, index) => {
              const isSelected = selectedPet === pet.thuCungId;
              const petImageUrl = getImageUrl(pet.hinhAnh);

              return (
                <TouchableOpacity
                  key={pet.thuCungId.toString()} // toString để đảm bảo key là string
                  style={[
                    styles.petCard,
                    isSelected ? styles.petCardActive : styles.petCardInactive,
                    index > 0 && { marginTop: 12 },
                  ]}
                  onPress={() => setSelectedPet(pet.thuCungId)}
                >
                  {isSelected && (
                    <View style={styles.checkBadge}>
                      <MaterialIcons name="check" size={10} color="white" />
                    </View>
                  )}

                  {petImageUrl ? (
                    <Image
                      source={{ uri: petImageUrl }}
                      style={styles.petAvatar}
                    />
                  ) : (
                    <View
                      style={[
                        styles.petAvatar,
                        {
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#E5E7EB",
                        },
                      ]}
                    >
                      <MaterialIcons
                        name="pets"
                        size={24}
                        color={COLORS.muted}
                      />
                    </View>
                  )}

                  <View style={{ flex: 1 }}>
                    <Text style={styles.petName}>{pet.tenThuCung}</Text>
                    <Text style={styles.petDesc}>
                      {pet.chungLoai} • {pet.giongLoai} • {pet.canNang}kg
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            /* Trường hợp mảng rỗng hoặc không phải mảng */
            <View style={{ alignItems: "center", padding: 20 }}>
              <Text style={{ color: COLORS.muted, fontStyle: "italic" }}>
                Bạn chưa có thú cưng nào.
              </Text>
            </View>
          )}
        </View>

        {/* GHI CHÚ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ghi chú cho nhân viên</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="Ví dụ: Bé nhà mình hơi nhát người lạ..."
            placeholderTextColor={COLORS.muted}
            multiline
            numberOfLines={3}
            value={note}
            onChangeText={setNote}
          />
        </View>

        {/* TỔNG KẾT */}
        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Dịch vụ</Text>
            <Text
              style={[
                styles.summaryValue,
                { flex: 1, textAlign: "right", marginLeft: 20 },
              ]}
              numberOfLines={1}
            >
              {selectedServiceData
                ? selectedServiceData.tenDichVu
                : "Chưa chọn"}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Thời gian</Text>
            <Text style={styles.summaryValue}>
              {selectedDay}/{CURRENT_MONTH}/{CURRENT_YEAR}{" "}
              {selectedTime ? `• ${selectedTime}` : ""}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Tổng cộng (Tham khảo)</Text>
            <Text style={styles.totalValue}>
              {totalPrice.toLocaleString("vi-VN")} ₫
            </Text>
          </View>
        </View>

        {/* NÚT XÁC NHẬN */}
        <TouchableOpacity
          style={[
            styles.confirmBtn,
            (isSubmitting || !selectedTime || !selectedPet) && { opacity: 0.7 },
          ]}
          activeOpacity={0.8}
          onPress={handleBooking}
          disabled={isSubmitting || !selectedTime || !selectedPet}
        >
          {isSubmitting ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <MaterialIcons name="check-circle" size={20} color="white" />
              <Text style={styles.confirmBtnText}>Xác nhận đặt lịch</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
  scrollContent: { paddingBottom: 100, paddingTop: 20 },
  section: { paddingHorizontal: 24, marginBottom: 30 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 15,
  },

  // Services
  serviceList: { gap: 16 },
  serviceItem: { alignItems: "center", gap: 8, width: 100 },
  serviceIconBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    overflow: "hidden",
  },
  serviceIconActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    elevation: 5,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  serviceIconInactive: {
    backgroundColor: "#F8FAFC",
    borderColor: COLORS.border,
  },
  serviceLabel: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
    minHeight: 36,
    paddingHorizontal: 5,
  },

  // Calendar
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  calendarGrid: { flexDirection: "row", flexWrap: "wrap" },
  dayHeader: {
    width: "14.28%",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.muted,
    marginBottom: 10,
  },
  dayCell: {
    width: "14.28%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 8,
  },
  dayCellActive: { backgroundColor: COLORS.primary, elevation: 4 },
  dayText: { fontSize: 14, color: COLORS.text },

  // Time
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  timeItem: {
    width: "23%",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    marginBottom: 10,
  },
  timeActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  timeInactive: { backgroundColor: COLORS.surface, borderColor: COLORS.border },
  timeText: { fontSize: 13, fontWeight: "600", color: COLORS.muted },
  timeTextActive: { color: "white", fontWeight: "800" },

  // Pet
  addPetBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  petCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 16,
    gap: 15,
    position: "relative",
    borderWidth: 1,
  },
  petCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.surface,
    elevation: 3,
  },
  petCardInactive: {
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    opacity: 0.7,
  },
  petAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F8FAFC",
  },
  petName: { fontSize: 16, fontWeight: "bold", color: COLORS.text },
  petDesc: { fontSize: 12, color: COLORS.muted },
  checkBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },

  // Note
  noteInput: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 16,
    fontSize: 14,
    color: COLORS.text,
    textAlignVertical: "top",
  },

  // Summary & Button
  summaryBox: {
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 25,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    alignItems: "center",
  },
  summaryLabel: { fontSize: 14, color: COLORS.muted },
  summaryValue: { fontSize: 14, fontWeight: "600", color: COLORS.text },
  divider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 10 },
  totalLabel: { fontSize: 15, fontWeight: "bold", color: COLORS.text },
  totalValue: { fontSize: 18, fontWeight: "800", color: COLORS.primary },
  confirmBtn: {
    marginHorizontal: 24,
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    elevation: 5,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  confirmBtnText: { color: "white", fontSize: 16, fontWeight: "bold" },

  // Toast
  toastContainer: {
    position: "absolute",
    top: Platform.OS === "android" ? 40 : 60,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 9999,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  toastSuccess: { backgroundColor: COLORS.primary },
  toastError: { backgroundColor: COLORS.red },
  toastText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 10,
    flex: 1,
  },
});

export default BookingScreen;
