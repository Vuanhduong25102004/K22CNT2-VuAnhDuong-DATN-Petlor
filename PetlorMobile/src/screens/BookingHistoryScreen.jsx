import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { getMyBookingHistoryAPI } from "../api/bookingApi";

const COLORS = {
  primary: "#10B981",
  background: "#F8FAFC",
  surface: "#FFFFFF",
  text: "#1F2937",
  muted: "#64748B",
  border: "#E2E8F0",
  waiting: "#F59E0B", // Vàng
  success: "#10B981", // Xanh
  danger: "#EF4444", // Đỏ
};

const BookingHistoryScreen = ({ navigation }) => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistory = async () => {
    setIsLoading(true);
    const data = await getMyBookingHistoryAPI();

    if (data && Array.isArray(data)) {
      const sortedData = [...data].sort((a, b) => {
        return new Date(b.thoiGianBatDau) - new Date(a.thoiGianBatDau);
      });
      setBookings(sortedData);
    } else {
      setBookings([]);
    }

    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, []),
  );

  // Hàm format ngày giờ từ chuỗi ISO
  const formatDateTime = (isoString) => {
    if (!isoString) return "---";
    const date = new Date(isoString);
    const time = date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const day = date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return `${time} - ${day}`;
  };

  // Hàm lấy màu và nhãn cho trạng thái
  const getStatusInfo = (status) => {
    switch (status) {
      case "CHO_XAC_NHAN":
        return {
          label: "Chờ xác nhận",
          color: COLORS.waiting,
          icon: "hourglass-empty",
        };
      case "DA_XAC_NHAN":
        return { label: "Đã xác nhận", color: "#3B82F6", icon: "check-circle" };
      case "HOAN_THANH":
        return { label: "Hoàn thành", color: COLORS.success, icon: "verified" };
      case "DA_HUY":
        return { label: "Đã hủy", color: COLORS.danger, icon: "cancel" };
      default:
        return { label: status, color: COLORS.muted, icon: "info" };
    }
  };

  const renderItem = ({ item }) => {
    const statusInfo = getStatusInfo(item.trangThaiLichHen);

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: statusInfo.color + "15" },
            ]}
          >
            <MaterialIcons
              name={statusInfo.icon}
              size={14}
              color={statusInfo.color}
            />
            <Text style={[styles.statusLabel, { color: statusInfo.color }]}>
              {statusInfo.label}
            </Text>
          </View>
          <Text style={styles.priceText}>
            {item.giaDichVu.toLocaleString("vi-VN")} ₫
          </Text>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="paw"
              size={20}
              color={COLORS.primary}
            />
            <Text style={styles.petNameText}>
              {item.tenThuCung}{" "}
              <Text style={styles.breedText}>({item.giongLoai})</Text>
            </Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="content-cut" size={20} color={COLORS.muted} />
            <Text style={styles.serviceText}>{item.tenDichVu}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="access-time" size={20} color={COLORS.muted} />
            <Text style={styles.timeText}>
              {formatDateTime(item.thoiGianBatDau)}
            </Text>
          </View>

          {item.tenNhanVien && (
            <View style={styles.infoRow}>
              <MaterialIcons name="person" size={20} color={COLORS.muted} />
              <Text style={styles.staffText}>
                Nhân viên: {item.tenNhanVien}
              </Text>
            </View>
          )}
        </View>

        {item.trangThaiLichHen === "CHO_XAC_NHAN" && (
          <TouchableOpacity style={styles.cancelBtn}>
            <Text style={styles.cancelBtnText}>Hủy lịch</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lịch sử đặt chỗ</Text>
        <TouchableOpacity style={styles.backBtn} onPress={fetchHistory}>
          <MaterialIcons name="refresh" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : bookings.length === 0 ? (
        <View style={styles.center}>
          <MaterialCommunityIcons
            name="calendar-blank"
            size={80}
            color={COLORS.border}
          />
          <Text style={styles.emptyText}>Bạn chưa có lịch hẹn nào</Text>
          <TouchableOpacity
            style={styles.bookNowBtn}
            onPress={() => navigation.navigate("Booking")}
          >
            <Text style={styles.bookNowText}>Đặt lịch ngay</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.lichHenId.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.text },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  listContent: { padding: 16, paddingBottom: 40 },
  emptyText: {
    marginTop: 12,
    color: COLORS.muted,
    fontSize: 16,
    textAlign: "center",
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: { elevation: 2 },
    }),
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  statusLabel: { fontSize: 12, fontWeight: "bold" },
  priceText: { fontSize: 16, fontWeight: "bold", color: COLORS.primary },

  cardContent: { gap: 10 },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  petNameText: { fontSize: 16, fontWeight: "bold", color: COLORS.text },
  breedText: { fontWeight: "normal", color: COLORS.muted, fontSize: 13 },
  serviceText: { fontSize: 14, color: COLORS.text },
  timeText: { fontSize: 14, color: COLORS.text, fontWeight: "500" },
  staffText: { fontSize: 13, color: COLORS.muted },

  cancelBtn: {
    marginTop: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    alignItems: "center",
  },
  cancelBtnText: { color: COLORS.danger, fontWeight: "bold" },

  bookNowBtn: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  bookNowText: { color: "white", fontWeight: "bold" },
});

export default BookingHistoryScreen;
