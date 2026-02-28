import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

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
};

const SERVICES = [
  { id: "spa", icon: "spa", label: "Pet Spa" },
  { id: "clinic", icon: "medical-services", label: "Phòng khám" },
  { id: "hotel", icon: "apartment", label: "Khách sạn" },
  { id: "school", icon: "school", label: "Huấn luyện" },
];

const TIMES = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
];

const BookingScreen = ({ navigation }) => {
  const [selectedService, setSelectedService] = useState("spa");
  const [selectedDay, setSelectedDay] = useState(10);
  const [selectedTime, setSelectedTime] = useState("09:00");
  const [selectedPet, setSelectedPet] = useState("mochi");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Chọn dịch vụ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chọn dịch vụ</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.serviceList}
          >
            {SERVICES.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => setSelectedService(item.id)}
                style={styles.serviceItem}
              >
                <View
                  style={[
                    styles.serviceIconBox,
                    selectedService === item.id
                      ? styles.serviceIconActive
                      : styles.serviceIconInactive,
                  ]}
                >
                  <MaterialIcons
                    name={item.icon}
                    size={30}
                    color={
                      selectedService === item.id ? COLORS.white : COLORS.muted
                    }
                  />
                </View>
                <Text
                  style={[
                    styles.serviceLabel,
                    {
                      color:
                        selectedService === item.id
                          ? COLORS.primary
                          : COLORS.muted,
                      fontWeight: selectedService === item.id ? "700" : "500",
                    },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Lịch (Giả lập) */}
        <View style={styles.section}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Tháng 10, 2023</Text>
            <View style={styles.calendarNav}>
              <TouchableOpacity style={styles.navIcon}>
                <MaterialIcons name="chevron-left" size={20} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.navIcon}>
                <MaterialIcons name="chevron-right" size={20} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.calendarGrid}>
            {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((d) => (
              <Text key={d} style={styles.dayHeader}>
                {d}
              </Text>
            ))}
            {[
              28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
            ].map((d, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setSelectedDay(d)}
                style={[
                  styles.dayCell,
                  selectedDay === d && d >= 1 && styles.dayCellActive,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    d > 20 && { color: "#CBD5E1" },
                    selectedDay === d &&
                      d >= 1 && { color: COLORS.white, fontWeight: "bold" },
                  ]}
                >
                  {d}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Giờ hẹn */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Giờ hẹn</Text>
          <View style={styles.timeGrid}>
            {TIMES.map((t) => (
              <TouchableOpacity
                key={t}
                onPress={() => setSelectedTime(t)}
                style={[
                  styles.timeItem,
                  selectedTime === t ? styles.timeActive : styles.timeInactive,
                ]}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === t && styles.timeTextActive,
                  ]}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Chọn thú cưng */}
        <View style={styles.section}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Chọn thú cưng</Text>
            <TouchableOpacity style={styles.addPetBtn}>
              <MaterialIcons name="add" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {/* Pet Item: Mochi */}
          <TouchableOpacity
            style={[
              styles.petCard,
              selectedPet === "mochi"
                ? styles.petCardActive
                : styles.petCardInactive,
            ]}
            onPress={() => setSelectedPet("mochi")}
          >
            {selectedPet === "mochi" && (
              <View style={styles.checkBadge}>
                <MaterialIcons name="check" size={10} color="white" />
              </View>
            )}
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200",
              }}
              style={styles.petAvatar}
            />
            <View>
              <Text style={styles.petName}>Mochi</Text>
              <Text style={styles.petDesc}>Corgi • 2 tuổi • 12kg</Text>
            </View>
          </TouchableOpacity>

          {/* Pet Item: Miu Miu */}
          <TouchableOpacity
            style={[
              styles.petCard,
              selectedPet === "miu"
                ? styles.petCardActive
                : styles.petCardInactive,
              { marginTop: 12 },
            ]}
            onPress={() => setSelectedPet("miu")}
          >
            {selectedPet === "miu" && (
              <View style={styles.checkBadge}>
                <MaterialIcons name="check" size={10} color="white" />
              </View>
            )}
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200",
              }}
              style={styles.petAvatar}
            />
            <View>
              <Text style={styles.petName}>Miu Miu</Text>
              <Text style={styles.petDesc}>Mèo Anh • 1 tuổi • 4kg</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Tổng kết */}
        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Dịch vụ</Text>
            <Text style={styles.summaryValue}>Tắm & Spa cơ bản</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Thời gian</Text>
            <Text style={styles.summaryValue}>10/10/2023 • 09:00</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Tổng cộng</Text>
            <Text style={styles.totalValue}>350.000 ₫</Text>
          </View>
        </View>

        {/* Nút xác nhận */}
        <TouchableOpacity style={styles.confirmBtn} activeOpacity={0.8}>
          <MaterialIcons name="check-circle" size={20} color="white" />
          <Text style={styles.confirmBtnText}>Xác nhận đặt lịch</Text>
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
  scrollContent: { paddingBottom: 120, paddingTop: 20 },
  section: { paddingHorizontal: 24, marginBottom: 30 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 15,
  },

  // Services
  serviceList: { gap: 16 },
  serviceItem: { alignItems: "center", gap: 8, minWidth: 75 },
  serviceIconBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
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
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
  },
  serviceLabel: { fontSize: 12 },

  // Calendar
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  calendarNav: { flexDirection: "row", gap: 8 },
  navIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  calendarGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  dayHeader: {
    width: (width - 48 - 48) / 7,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.muted,
    marginBottom: 10,
  },
  dayCell: {
    width: (width - 48 - 48) / 7,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  dayCellActive: { backgroundColor: COLORS.primary, elevation: 4 },
  dayText: { fontSize: 14, color: COLORS.text },

  // Time
  timeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  timeItem: {
    width: (width - 48 - 30) / 4,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
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
  },
  summaryLabel: { fontSize: 14, color: COLORS.muted },
  summaryValue: { fontSize: 14, fontWeight: "600", color: COLORS.text },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    my: 10,
    marginVertical: 10,
  },
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
});

export default BookingScreen;
