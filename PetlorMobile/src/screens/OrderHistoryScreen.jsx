import React, { useState, useCallback, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { getMyOrdersAPI } from "../api/orderApi";
import { BASE_URL } from "../api/userApi";

const COLORS = {
  primary: "#10B981",
  background: "#F8FAFC",
  surface: "#FFFFFF",
  text: "#1F2937",
  muted: "#64748B",
  border: "#E2E8F0",
  success: "#10B981",
  danger: "#EF4444",
  warning: "#F59E0B",
  info: "#3B82F6",
};

// ID phải khớp chính xác với chuỗi 'trangThai' trong JSON bạn gửi
const ORDER_TABS = [
  { id: "ALL", label: "Tất cả" },
  { id: "Chờ xử lý", label: "Chờ xử lý" },
  { id: "Đã xác nhận", label: "Đã xác nhận" },
  { id: "Đã giao", label: "Đã giao" },
  { id: "Đã hủy", label: "Đã hủy" },
];

const OrderHistoryScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ALL");

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const data = await getMyOrdersAPI();
      setOrders(data);
    } catch (error) {
      console.log("Lỗi tải đơn hàng:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, []),
  );

  // Lọc dữ liệu dựa trên chuỗi tiếng Việt từ API
  const filteredOrders = useMemo(() => {
    if (activeTab === "ALL") return orders;
    return orders.filter((order) => order.trangThai === activeTab);
  }, [orders, activeTab]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Chờ xử lý":
        return { label: "Chờ xử lý", color: COLORS.warning };
      case "Đã xác nhận":
        return { label: "Đã xác nhận", color: COLORS.info };
      case "Đã giao":
        return { label: "Đã hoàn thành", color: COLORS.success };
      case "Đã hủy":
        return { label: "Đã hủy đơn", color: COLORS.danger };
      default:
        return { label: status, color: COLORS.muted };
    }
  };

  const renderOrderItem = ({ item }) => {
    const statusInfo = getStatusStyle(item.trangThai);
    const firstProduct = item.chiTietDonHangs?.[0];

    return (
      <View style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.orderId}>Đơn hàng #{item.donHangId}</Text>
            <Text style={styles.dateText}>
              {new Date(item.ngayDatHang).toLocaleString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "2-digit",
              })}
            </Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: statusInfo.color + "15" },
            ]}
          >
            <Text style={[styles.statusText, { color: statusInfo.color }]}>
              {statusInfo.label}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Thông tin sản phẩm */}
        <View style={styles.productBrief}>
          <Image
            source={{ uri: `${BASE_URL}/uploads/${firstProduct?.hinhAnh}` }}
            style={styles.productImg}
            defaultSource={require("../../assets/icon.png")} // Bạn có thể thay bằng ảnh placeholder
          />
          <View style={styles.productInfo}>
            <Text style={styles.productName} numberOfLines={1}>
              {firstProduct?.tenSanPham}
            </Text>
            <Text style={styles.productQty}>
              Số lượng: {firstProduct?.soLuong} món | {item.phuongThucThanhToan}
            </Text>
          </View>
          <Text style={styles.itemPrice}>
            {firstProduct?.donGia?.toLocaleString("vi-VN")}đ
          </Text>
        </View>

        {item.chiTietDonHangs?.length > 1 && (
          <Text style={styles.moreProducts}>
            Xem thêm {item.chiTietDonHangs.length - 1} sản phẩm khác...
          </Text>
        )}

        <View style={styles.divider} />

        <View style={styles.orderFooter}>
          <Text style={styles.totalLabel}>Tổng thanh toán:</Text>
          <Text style={styles.totalValue}>
            {item.tongThanhToan.toLocaleString("vi-VN")} ₫
          </Text>
        </View>
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
        <Text style={styles.headerTitle}>Đơn hàng của tôi</Text>
        <TouchableOpacity style={styles.backBtn} onPress={fetchOrders}>
          <MaterialIcons name="refresh" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* Thanh Tab chia mục */}
      <View style={styles.tabBarContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabBar}
        >
          {ORDER_TABS.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabItem,
                activeTab === tab.id && styles.activeTabItem,
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === tab.id && styles.activeTabLabel,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.donHangId.toString()}
          renderItem={renderOrderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialIcons
                name="shopping-basket"
                size={64}
                color={COLORS.border}
              />
              <Text style={styles.emptyText}>
                Không có đơn hàng nào ở mục này
              </Text>
            </View>
          }
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
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.text },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  tabBarContainer: {
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tabBar: { paddingHorizontal: 12, paddingVertical: 10 },
  tabItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  activeTabItem: { backgroundColor: COLORS.primary },
  tabLabel: { fontSize: 13, fontWeight: "600", color: COLORS.muted },
  activeTabLabel: { color: "#FFFFFF" },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  listContainer: { padding: 16, paddingBottom: 40 },

  orderCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  orderId: { fontSize: 14, fontWeight: "bold", color: COLORS.text },
  dateText: { fontSize: 11, color: COLORS.muted, marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  statusText: { fontSize: 11, fontWeight: "bold" },
  divider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 12 },

  productBrief: { flexDirection: "row", alignItems: "center" },
  productImg: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#F8FAFC",
  },
  productInfo: { marginLeft: 12, flex: 1 },
  productName: { fontSize: 14, fontWeight: "600", color: COLORS.text },
  productQty: { color: COLORS.muted, fontSize: 12, marginTop: 2 },
  itemPrice: { fontSize: 13, fontWeight: "600", color: COLORS.text },
  moreProducts: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 10,
    fontStyle: "italic",
  },

  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: { fontSize: 13, color: COLORS.text },
  totalValue: { fontSize: 16, fontWeight: "800", color: COLORS.primary },

  emptyContainer: { alignItems: "center", marginTop: 100 },
  emptyText: { marginTop: 12, color: COLORS.muted, fontSize: 15 },
});

export default OrderHistoryScreen;
