import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const COLORS = {
  primary: "#ec5b13",
  emerald: "#10b981",
  background: "#f8f6f6",
  surface: "#FFFFFF",
  text: "#0f172a",
  muted: "#64748b",
  border: "#e2e8f0",
  white: "#FFFFFF",
};

// 1. Nhận thêm props "route" để lấy dữ liệu từ CartScreen gửi qua
const CheckoutScreen = ({ navigation, route }) => {
  // Lấy các tham số, nếu không có thì mặc định bằng 0
  const {
    subTotal = 0,
    discountAmount = 0,
    cartItems = [],
  } = route.params || {};

  // Quản lý phí ship cục bộ tại trang thanh toán (Fast: 35k, Economy: 15k)
  const [shippingMethod, setShippingMethod] = useState("fast");
  const [currentShippingFee, setCurrentShippingFee] = useState(35000);

  // Cập nhật phí ship khi người dùng thay đổi lựa chọn
  useEffect(() => {
    if (shippingMethod === "fast") {
      setCurrentShippingFee(35000);
    } else {
      setCurrentShippingFee(15000);
    }
  }, [shippingMethod]);

  // Tính toán tổng tiền cuối cùng dựa trên lựa chọn ship mới
  const finalTotal = subTotal + currentShippingFee - discountAmount;

  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN") + "₫";
  };

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const RadioBtn = ({ selected }) => (
    <View style={[styles.radioOuter, selected && styles.radioOuterActive]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation?.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thanh toán</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Shipping Address */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons
              name="location-on"
              size={20}
              color={COLORS.primary}
            />
            <Text style={styles.sectionTitle}>Địa chỉ nhận hàng</Text>
          </View>
          <View style={styles.addressCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.addressName}>
                Nguyễn Minh Tuấn | 0987 654 321
              </Text>
              <Text style={styles.addressDetail}>
                Số 45, Ngõ 123, Đường Trần Duy Hưng, Phường Trung Hòa, Quận Cầu
                Giấy, Hà Nội
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.changeText}>Thay đổi</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Shipping Method */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons
              name="local-shipping"
              size={20}
              color={COLORS.primary}
            />
            <Text style={styles.sectionTitle}>Phương thức vận chuyển</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.methodCard,
              shippingMethod === "fast" && styles.methodCardActive,
            ]}
            onPress={() => setShippingMethod("fast")}
          >
            <RadioBtn selected={shippingMethod === "fast"} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.methodName}>Giao hàng nhanh</Text>
              <Text style={styles.methodDesc}>Dự kiến nhận: 1-2 ngày</Text>
            </View>
            <Text style={styles.methodPrice}>35.000đ</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodCard,
              shippingMethod === "economy" && styles.methodCardActive,
              { marginTop: 12 },
            ]}
            onPress={() => setShippingMethod("economy")}
          >
            <RadioBtn selected={shippingMethod === "economy"} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.methodName}>Giao hàng tiết kiệm</Text>
              <Text style={styles.methodDesc}>Dự kiến nhận: 3-5 ngày</Text>
            </View>
            <Text style={styles.methodPrice}>15.000đ</Text>
          </TouchableOpacity>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="payments" size={20} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
          </View>

          <View style={styles.paymentGroup}>
            <TouchableOpacity
              style={styles.paymentItem}
              onPress={() => setPaymentMethod("cod")}
            >
              <MaterialIcons name="money" size={22} color={COLORS.muted} />
              <Text style={styles.paymentText}>
                Thanh toán khi nhận hàng (COD)
              </Text>
              <RadioBtn selected={paymentMethod === "cod"} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.paymentItem}
              onPress={() => setPaymentMethod("momo")}
            >
              <View style={styles.momoIcon}>
                <Text style={styles.momoText}>M</Text>
              </View>
              <Text style={styles.paymentText}>Ví MoMo</Text>
              <RadioBtn selected={paymentMethod === "momo"} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.paymentItem, { borderBottomWidth: 0 }]}
              onPress={() => setPaymentMethod("card")}
            >
              <MaterialIcons
                name="credit-card"
                size={22}
                color={COLORS.muted}
              />
              <Text style={styles.paymentText}>
                Thẻ ATM / Visa / Mastercard
              </Text>
              <RadioBtn selected={paymentMethod === "card"} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons
              name="shopping-basket"
              size={20}
              color={COLORS.primary}
            />
            {/* Hiển thị số lượng món động */}
            <Text style={styles.sectionTitle}>
              Tóm tắt đơn hàng ({cartItems.length} món)
            </Text>
          </View>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Tiền hàng ({cartItems.length} sản phẩm)
              </Text>
              <Text style={styles.summaryValue}>
                {formatCurrency(subTotal)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Phí vận chuyển</Text>
              <Text style={styles.summaryValue}>
                {formatCurrency(currentShippingFee)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Giảm giá voucher</Text>
              <Text style={[styles.summaryValue, { color: COLORS.emerald }]}>
                -{formatCurrency(discountAmount)}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tổng cộng</Text>
              <Text style={styles.totalPrice}>
                {formatCurrency(finalTotal)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer Action */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View>
            <Text style={styles.footerLabel}>Tổng thanh toán</Text>
            <Text style={styles.footerPrice}>{formatCurrency(finalTotal)}</Text>
          </View>
          <TouchableOpacity style={styles.orderBtn} activeOpacity={0.8}>
            <Text style={styles.orderBtnText}>Đặt hàng ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// ... TOÀN BỘ PHẦN STYLES GIỮ NGUYÊN 100%
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    backgroundColor: "rgba(248, 246, 246, 0.8)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  scrollContent: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 120 },
  section: { marginBottom: 24 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: COLORS.text },
  addressCard: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#f1f5f9",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: { elevation: 2 },
    }),
  },
  addressName: { fontWeight: "bold", color: COLORS.text, marginBottom: 4 },
  addressDetail: { fontSize: 13, color: COLORS.muted, lineHeight: 20 },
  changeText: { color: COLORS.primary, fontSize: 14, fontWeight: "600" },
  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  methodCardActive: { borderColor: COLORS.primary },
  methodName: { fontWeight: "600", fontSize: 15, color: COLORS.text },
  methodDesc: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
  methodPrice: { fontWeight: "bold", color: COLORS.primary },
  paymentGroup: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  paymentItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  paymentText: {
    flex: 1,
    marginLeft: 12,
    fontWeight: "500",
    color: COLORS.text,
  },
  momoIcon: {
    width: 24,
    height: 24,
    backgroundColor: "#a5106a",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  momoText: { color: "white", fontWeight: "bold", fontSize: 10 },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#cbd5e1",
    justifyContent: "center",
    alignItems: "center",
  },
  radioOuterActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  radioInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "white",
  },
  summaryCard: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: { fontSize: 14, color: COLORS.muted },
  summaryValue: { fontSize: 14, fontWeight: "500", color: COLORS.text },
  divider: {
    height: 1,
    backgroundColor: "#f1f5f9",
    marginVertical: 4,
    marginBottom: 12,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: { fontSize: 16, fontWeight: "bold", color: COLORS.text },
  totalPrice: { fontSize: 20, fontWeight: "900", color: COLORS.primary },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    padding: 16,
    paddingBottom: Platform.OS === "ios" ? 30 : 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerContent: {
    maxWidth: 500,
    alignSelf: "center",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerLabel: { fontSize: 12, color: COLORS.muted },
  footerPrice: { fontSize: 20, fontWeight: "900", color: COLORS.primary },
  orderBtn: {
    backgroundColor: COLORS.emerald,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    flex: 0.7,
    alignItems: "center",
    shadowColor: COLORS.emerald,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  orderBtnText: { color: "white", fontWeight: "bold", fontSize: 16 },
});

export default CheckoutScreen;
