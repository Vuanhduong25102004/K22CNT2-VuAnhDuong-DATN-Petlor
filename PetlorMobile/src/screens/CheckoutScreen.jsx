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
  TextInput,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createOrderAPI } from "../api/orderApi";

const COLORS = {
  primary: "#ec5b13",
  emerald: "#10b981",
  background: "#f8f6f6",
  surface: "#FFFFFF",
  text: "#0f172a",
  muted: "#64748b",
  border: "#e2e8f0",
  white: "#FFFFFF",
  red: "#EF4444",
};

const CheckoutScreen = ({ navigation, route }) => {
  // Nhận thêm shippingFee từ CartScreen gửi sang
  const {
    subTotal = 0,
    shippingFee = 0,
    discountAmount = 0,
    cartItems = [],
    appliedPromoCode = "",
  } = route.params || {};

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // --- STATE QUẢN LÝ ĐỊA CHỈ ---
  const [isEditingAddress, setIsEditingAddress] = useState(true);
  const [addressData, setAddressData] = useState({
    diaChiGiaoHang: "",
    tinhThanh: "",
    quanHuyen: "",
    phuongXa: "",
    soDienThoaiNhan: "",
  });

  // --- STATE CHO TOAST ---
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: "", type: "success" });
    }, 3000);
  };

  // --- TỰ ĐỘNG TẢI ĐỊA CHỈ ĐÃ LƯU KHI MỞ TRANG ---
  useEffect(() => {
    const loadSavedAddress = async () => {
      try {
        const savedAddressString =
          await AsyncStorage.getItem("USER_SAVED_ADDRESS");
        if (savedAddressString) {
          const savedAddress = JSON.parse(savedAddressString);
          setAddressData(savedAddress);
          setIsEditingAddress(false);
        }
      } catch (error) {
        console.error("Không thể tải địa chỉ đã lưu", error);
      }
    };
    loadSavedAddress();
  }, []);

  // Tính tổng tiền dựa trên số liệu từ Giỏ hàng truyền sang
  const finalTotal = subTotal + shippingFee - discountAmount;
  const formatCurrency = (amount) => amount.toLocaleString("vi-VN") + "₫";

  const handleInputChange = (field, value) => {
    setAddressData({ ...addressData, [field]: value });
  };

  const validateAddress = () => {
    const { diaChiGiaoHang, tinhThanh, quanHuyen, phuongXa, soDienThoaiNhan } =
      addressData;
    if (
      !diaChiGiaoHang ||
      !tinhThanh ||
      !quanHuyen ||
      !phuongXa ||
      !soDienThoaiNhan
    ) {
      showToast("Vui lòng điền đầy đủ thông tin địa chỉ!", "error");
      return false;
    }
    const phoneRegex = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (!phoneRegex.test(soDienThoaiNhan)) {
      showToast("Số điện thoại không hợp lệ!", "error");
      return false;
    }
    return true;
  };

  // --- HÀM LƯU ĐỊA CHỈ XUỐNG MÁY ---
  const handleSaveAddress = async () => {
    if (validateAddress()) {
      try {
        await AsyncStorage.setItem(
          "USER_SAVED_ADDRESS",
          JSON.stringify(addressData),
        );
        setIsEditingAddress(false);
        showToast("Đã lưu địa chỉ cho các lần mua sau!", "success");
      } catch (error) {
        showToast("Lỗi khi lưu địa chỉ vào máy", "error");
      }
    }
  };

  // --- HÀM XỬ LÝ ĐẶT HÀNG ---
  const handlePlaceOrder = async () => {
    if (isEditingAddress) {
      showToast("Vui lòng lưu địa chỉ trước khi đặt hàng!", "error");
      return;
    }
    if (!validateAddress()) return;

    setIsPlacingOrder(true);

    try {
      const chiTietDonHangs = cartItems.map((item) => ({
        sanPhamId: item.sanPhamId,
        soLuong: item.soLuong,
      }));

      const payload = {
        diaChiGiaoHang: addressData.diaChiGiaoHang,
        tinhThanh: addressData.tinhThanh,
        quanHuyen: addressData.quanHuyen,
        phuongXa: addressData.phuongXa,
        soDienThoaiNhan: addressData.soDienThoaiNhan,
        maKhuyenMai: appliedPromoCode || null,
        phuongThucThanhToan: paymentMethod,
        phiVanChuyen: shippingFee, // Truyền phí ship mặc định lên server
        phuongThucVanChuyen: "Giao hàng tiêu chuẩn", // Fix cứng tên phương thức
        chiTietDonHangs: chiTietDonHangs,
      };

      console.log(
        "🔥 PAYLOAD GỬI LÊN SERVER:",
        JSON.stringify(payload, null, 2),
      );

      await createOrderAPI(payload);

      showToast("Đặt hàng thành công!", "success");

      setTimeout(() => {
        // Đảm bảo tên "Main" là đúng với màn hình trang chủ của bạn nhé
        navigation.reset({
          index: 0,
          routes: [{ name: "Main" }],
        });
      }, 1500);
    } catch (error) {
      showToast(
        error.message || "Đặt hàng thất bại. Vui lòng thử lại!",
        "error",
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const RadioBtn = ({ selected }) => (
    <View style={[styles.radioOuter, selected && styles.radioOuterActive]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* TOAST NOTIFICATION */}
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
        {/* --- ĐỊA CHỈ NHẬN HÀNG --- */}
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
            {isEditingAddress ? (
              <View style={styles.formContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Số điện thoại người nhận *"
                  keyboardType="phone-pad"
                  value={addressData.soDienThoaiNhan}
                  onChangeText={(val) =>
                    handleInputChange("soDienThoaiNhan", val)
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Tỉnh/Thành phố *"
                  value={addressData.tinhThanh}
                  onChangeText={(val) => handleInputChange("tinhThanh", val)}
                />
                <View style={styles.rowInputs}>
                  <TextInput
                    style={[styles.input, { flex: 1, marginRight: 8 }]}
                    placeholder="Quận/Huyện *"
                    value={addressData.quanHuyen}
                    onChangeText={(val) => handleInputChange("quanHuyen", val)}
                  />
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="Phường/Xã *"
                    value={addressData.phuongXa}
                    onChangeText={(val) => handleInputChange("phuongXa", val)}
                  />
                </View>
                <TextInput
                  style={[
                    styles.input,
                    { height: 80, textAlignVertical: "top" },
                  ]}
                  placeholder="Địa chỉ cụ thể (Số nhà, tên đường...) *"
                  multiline
                  value={addressData.diaChiGiaoHang}
                  onChangeText={(val) =>
                    handleInputChange("diaChiGiaoHang", val)
                  }
                />
                <TouchableOpacity
                  style={styles.saveAddressBtn}
                  onPress={handleSaveAddress}
                >
                  <Text style={styles.saveAddressText}>Lưu địa chỉ</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                <View style={{ flex: 1, paddingRight: 10 }}>
                  <Text style={styles.addressName}>
                    SĐT: {addressData.soDienThoaiNhan}
                  </Text>
                  <Text style={styles.addressDetail}>
                    {`${addressData.diaChiGiaoHang}, ${addressData.phuongXa}, ${addressData.quanHuyen}, ${addressData.tinhThanh}`}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setIsEditingAddress(true)}>
                  <Text style={styles.changeText}>Thay đổi</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Đã xóa Phương thức vận chuyển ở đây */}

        {/* Payment Method */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="payments" size={20} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
          </View>

          <View style={styles.paymentGroup}>
            <TouchableOpacity
              style={styles.paymentItem}
              onPress={() => setPaymentMethod("COD")}
            >
              <MaterialIcons name="money" size={22} color={COLORS.muted} />
              <Text style={styles.paymentText}>
                Thanh toán khi nhận hàng (COD)
              </Text>
              <RadioBtn selected={paymentMethod === "COD"} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.paymentItem}
              onPress={() => setPaymentMethod("MOMO")}
            >
              <View style={styles.momoIcon}>
                <Text style={styles.momoText}>M</Text>
              </View>
              <Text style={styles.paymentText}>Ví MoMo</Text>
              <RadioBtn selected={paymentMethod === "MOMO"} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.paymentItem, { borderBottomWidth: 0 }]}
              onPress={() => setPaymentMethod("VNPAY")}
            >
              <View style={styles.vnpayIcon}>
                <Text style={styles.vnpayText}>V</Text>
              </View>
              <Text style={styles.paymentText}>Thanh toán qua VNPay</Text>
              <RadioBtn selected={paymentMethod === "VNPAY"} />
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
                {formatCurrency(shippingFee)}
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
          <TouchableOpacity
            style={[styles.orderBtn, isPlacingOrder && { opacity: 0.7 }]}
            activeOpacity={0.8}
            onPress={handlePlaceOrder}
            disabled={isPlacingOrder}
          >
            {isPlacingOrder ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.orderBtnText}>Đặt hàng ngay</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

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

  formContainer: { width: "100%" },
  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 14,
    color: COLORS.text,
  },
  rowInputs: { flexDirection: "row", justifyContent: "space-between" },
  saveAddressBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  saveAddressText: { color: "white", fontWeight: "bold", fontSize: 14 },

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
  vnpayIcon: {
    width: 24,
    height: 24,
    backgroundColor: "#005baa",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  vnpayText: { color: "white", fontWeight: "bold", fontSize: 10 },

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

export default CheckoutScreen;
