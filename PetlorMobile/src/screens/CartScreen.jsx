import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#10B981",
  background: "#FAFAFA",
  surface: "#FFFFFF",
  text: "#1F2937",
  muted: "#6B7280",
  border: "#F1F5F9",
  red: "#EF4444",
};

const CartScreen = ({ navigation }) => {
  // Mock data giỏ hàng
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Hạt Royal Canin",
      desc: "Gói 1.5kg",
      price: 185000,
      qty: 1,
      image:
        "https://images.unsplash.com/photo-1589924691195-41432c84c161?w=400",
    },
    {
      id: 2,
      name: "Xương gặm canxi",
      desc: "Hương bò",
      price: 90000,
      qty: 2,
      image:
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400",
    },
    {
      id: 3,
      name: "Sữa tắm SOS",
      desc: "Chuyên dụng chó mèo",
      price: 120000,
      qty: 1,
      image:
        "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400",
    },
  ]);

  const CartItem = ({ item }) => (
    <View style={styles.cartCard}>
      <View style={styles.itemImageBg}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
      </View>

      <View style={styles.itemDetails}>
        <View style={styles.itemHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.itemDesc}>{item.desc}</Text>
          </View>
          <TouchableOpacity>
            <MaterialIcons name="delete-outline" size={22} color={COLORS.red} />
          </TouchableOpacity>
        </View>

        <View style={styles.itemFooter}>
          <Text style={styles.itemPrice}>{item.price.toLocaleString()} ₫</Text>
          <View style={styles.qtySelector}>
            <TouchableOpacity style={styles.qtyBtn}>
              <MaterialIcons name="remove" size={16} color={COLORS.muted} />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{item.qty}</Text>
            <TouchableOpacity style={styles.qtyBtn}>
              <MaterialIcons name="add" size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color={COLORS.muted} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Giỏ hàng</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Danh sách món đồ */}
        <View style={styles.section}>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </View>

        {/* Mã ưu đãi */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mã ưu đãi</Text>
          <View style={styles.promoRow}>
            <View style={styles.promoInputContainer}>
              <MaterialIcons
                name="local-offer"
                size={20}
                color={COLORS.primary}
                style={styles.promoIcon}
              />
              <TextInput
                placeholder="Nhập mã giảm giá"
                style={styles.promoInput}
                placeholderTextColor={COLORS.muted}
              />
            </View>
            <TouchableOpacity style={styles.applyBtn}>
              <Text style={styles.applyBtnText}>Áp dụng</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tổng kết hóa đơn */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tạm tính (4 món)</Text>
            <Text style={styles.summaryValue}>395.000 ₫</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Phí vận chuyển</Text>
            <Text style={styles.summaryValue}>15.000 ₫</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Giảm giá</Text>
            <Text style={[styles.summaryValue, { color: COLORS.primary }]}>
              -0 ₫
            </Text>
          </View>

          <View style={styles.dashedDivider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tổng cộng</Text>
            <Text style={styles.totalValue}>410.000 ₫</Text>
          </View>
        </View>
      </ScrollView>

      {/* Nút thanh toán cố định ở dưới */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.checkoutBtn} activeOpacity={0.9}>
          <Text style={styles.checkoutBtnText}>Thanh toán ngay</Text>
          <MaterialIcons name="arrow-forward" size={22} color="white" />
        </TouchableOpacity>
      </View>
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
    borderBottomColor: COLORS.border,
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

  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 150 },
  section: { marginBottom: 25 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 15,
  },

  // Cart Card
  cartCard: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  itemImageBg: {
    width: 90,
    height: 90,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    overflow: "hidden",
  },
  itemImage: { width: "100%", height: "100%", resizeMode: "cover" },
  itemDetails: { flex: 1, marginLeft: 15, justifyContent: "space-between" },
  itemHeader: { flexDirection: "row", justifyContent: "space-between" },
  itemName: { fontSize: 15, fontWeight: "700", color: COLORS.text },
  itemDesc: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
  itemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemPrice: { fontSize: 15, fontWeight: "800", color: COLORS.primary },
  qtySelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
    padding: 4,
    gap: 10,
  },
  qtyBtn: {
    width: 26,
    height: 26,
    backgroundColor: "white",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
  },
  qtyText: {
    fontSize: 14,
    fontWeight: "bold",
    minWidth: 15,
    textAlign: "center",
  },

  // Promo Section
  promoRow: { flexDirection: "row", gap: 10 },
  promoInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
  },
  promoIcon: { marginRight: 8 },
  promoInput: { flex: 1, fontSize: 14, color: COLORS.text },
  applyBtn: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: "center",
  },
  applyBtnText: { fontWeight: "700", color: COLORS.text },

  // Summary Card
  summaryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: { color: COLORS.muted, fontSize: 14 },
  summaryValue: { fontWeight: "600", fontSize: 14, color: COLORS.text },
  dashedDivider: {
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    borderStyle: "dashed",
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
  },
  totalLabel: { fontSize: 16, fontWeight: "bold", color: COLORS.text },
  totalValue: { fontSize: 22, fontWeight: "900", color: COLORS.primary },

  // Footer
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    padding: 24,
    paddingBottom: 35,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 20,
  },
  checkoutBtn: {
    backgroundColor: COLORS.primary,
    height: 60,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  checkoutBtnText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default CartScreen;
