import React, { useState, useCallback, useRef } from "react";
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
  ActivityIndicator,
  Platform,
  Modal,
  Animated,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import {
  getCartAPI,
  getPromotionsAPI,
  updateCartItemAPI,
  removeFromCartAPI,
} from "../api/cartApi";
import { BASE_URL } from "../api/userApi";

const { height } = Dimensions.get("window");

const COLORS = {
  primary: "#10B981",
  background: "#FAFAFA",
  surface: "#FFFFFF",
  text: "#1F2937",
  muted: "#6B7280",
  border: "#F1F5F9",
  red: "#EF4444",
};

const getImageUrl = (imageName) => {
  if (!imageName) return "https://via.placeholder.com/400";
  if (imageName.startsWith("http")) return imageName;
  return `${BASE_URL}/uploads/${imageName}`;
};

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const handleDecrease = () => {
    if (item.soLuong > 1) {
      onUpdateQuantity(item.sanPhamId, item.soLuong - 1);
    }
  };

  const handleIncrease = () => {
    onUpdateQuantity(item.sanPhamId, item.soLuong + 1);
  };

  return (
    <View style={styles.cartCard}>
      <View style={styles.itemImageBg}>
        <Image
          source={{ uri: getImageUrl(item.hinhAnh) }}
          style={styles.itemImage}
        />
      </View>

      <View style={styles.itemDetails}>
        <View style={styles.itemHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemName} numberOfLines={1}>
              {item.tenSanPham}
            </Text>
          </View>
          <TouchableOpacity onPress={() => onRemoveItem(item.sanPhamId)}>
            <MaterialIcons name="delete-outline" size={22} color={COLORS.red} />
          </TouchableOpacity>
        </View>

        <View style={styles.itemFooter}>
          <Text style={styles.itemPrice}>
            {(item.donGia || 0).toLocaleString("vi-VN")} ₫
          </Text>
          <View style={styles.qtySelector}>
            <TouchableOpacity
              style={[styles.qtyBtn, item.soLuong <= 1 && { opacity: 0.5 }]}
              onPress={handleDecrease}
              disabled={item.soLuong <= 1}
            >
              <MaterialIcons name="remove" size={16} color={COLORS.muted} />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{item.soLuong}</Text>
            <TouchableOpacity style={styles.qtyBtn} onPress={handleIncrease}>
              <MaterialIcons name="add" size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const CartScreen = ({ navigation }) => {
  const [cartData, setCartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [promoCode, setPromoCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  const [isPromoModalVisible, setIsPromoModalVisible] = useState(false);
  const [availablePromos, setAvailablePromos] = useState([]);
  const [isLoadingPromos, setIsLoadingPromos] = useState(false);

  const slideAnim = useRef(new Animated.Value(height)).current;
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: "", type: "success" });
    }, 3000);
  };

  const fetchCart = async () => {
    try {
      const data = await getCartAPI();
      if (data) setCartData(data);
    } catch (error) {
      console.error("Lỗi khi load trang Giỏ hàng:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      fetchCart().finally(() => setIsLoading(false));
      setDiscountAmount(0);
      setPromoCode("");
    }, []),
  );

  const handleUpdateQuantity = async (sanPhamId, newQty) => {
    try {
      await updateCartItemAPI(sanPhamId, newQty);
      fetchCart();
    } catch (error) {
      showToast("Không thể cập nhật số lượng.", "error");
    }
  };

  const handleRemoveItem = (sanPhamId) => {
    setItemToRemove(sanPhamId);
    setIsConfirmVisible(true);
  };

  const executeRemove = async () => {
    if (!itemToRemove) return;
    try {
      await removeFromCartAPI(itemToRemove);
      showToast("Đã xóa sản phẩm khỏi giỏ hàng", "success");
      fetchCart();
    } catch (error) {
      showToast("Lỗi khi xóa sản phẩm", "error");
    } finally {
      setIsConfirmVisible(false);
      setItemToRemove(null);
    }
  };

  const cartItems = cartData?.items || [];
  const tongSoLuong = cartData?.tongSoLuong || 0;
  const subTotal = cartData?.tongTien || 0;

  // THÊM LẠI PHÍ VẬN CHUYỂN MẶC ĐỊNH 30K (chỉ tính phí khi có hàng trong giỏ)
  const shippingFee = subTotal > 0 ? 30000 : 0;

  // CỘNG PHÍ SHIP VÀO TỔNG TIỀN
  const calculatedTotal = subTotal + shippingFee - discountAmount;
  const finalTotal = calculatedTotal > 0 ? calculatedTotal : 0;

  const handleOpenPromoModal = async () => {
    setIsPromoModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setIsLoadingPromos(true);
    try {
      const data = await getPromotionsAPI();
      const validPromos = (data.content || []).filter((p) => p.trangThai);
      setAvailablePromos(validPromos);
    } catch (error) {
      showToast("Không thể tải danh sách khuyến mãi.", "error");
    } finally {
      setIsLoadingPromos(false);
    }
  };

  const handleClosePromoModal = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setIsPromoModalVisible(false);
    });
  };

  const selectPromoFromList = (promo) => {
    if (subTotal < promo.donToiThieu) {
      showToast(
        `Đơn hàng tối thiểu để dùng mã này là ${promo.donToiThieu.toLocaleString("vi-VN")} ₫`,
        "error",
      );
      return;
    }

    setPromoCode(promo.maCode);
    let calculatedDiscount = 0;
    if (promo.loaiGiamGia === "PHAN_TRAM") {
      calculatedDiscount = (subTotal * promo.giaTriGiam) / 100;
    } else {
      calculatedDiscount = promo.giaTriGiam;
    }

    setDiscountAmount(calculatedDiscount);
    handleClosePromoModal();
    showToast(`Đã áp dụng mã ${promo.maCode}!`, "success");
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      showToast("Vui lòng nhập mã giảm giá!", "error");
      return;
    }

    try {
      const data = await getPromotionsAPI();
      const promos = data.content || [];
      const validPromo = promos.find(
        (p) => p.maCode.toUpperCase() === promoCode.trim().toUpperCase(),
      );

      if (!validPromo) {
        showToast("Mã giảm giá không tồn tại!", "error");
        setDiscountAmount(0);
        return;
      }
      if (!validPromo.trangThai) {
        showToast("Mã giảm giá đã hết hạn!", "error");
        setDiscountAmount(0);
        return;
      }

      selectPromoFromList(validPromo);
    } catch (error) {
      showToast("Không thể kiểm tra mã giảm giá lúc này.", "error");
    }
  };

  const handleGoToCheckout = () => {
    if (cartItems.length === 0) {
      showToast("Giỏ hàng trống, không thể thanh toán!", "error");
      return;
    }

    // Truyền thêm shippingFee sang trang Checkout
    navigation.navigate("Checkout", {
      subTotal: subTotal,
      shippingFee: shippingFee,
      discountAmount: discountAmount,
      finalTotal: finalTotal,
      cartItems: cartItems,
      appliedPromoCode: promoCode,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
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
          <MaterialIcons name="arrow-back" size={24} color={COLORS.muted} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Giỏ hàng</Text>
        <View style={{ width: 40 }} />
      </View>

      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : cartItems.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            opacity: 0.5,
          }}
        >
          <MaterialIcons name="shopping-cart" size={80} color={COLORS.muted} />
          <Text style={{ marginTop: 10, fontSize: 16, color: COLORS.muted }}>
            Giỏ hàng của bạn đang trống
          </Text>
        </View>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.section}>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                />
              ))}
            </View>

            <View style={styles.section}>
              <View style={styles.promoHeaderRow}>
                <Text style={styles.sectionTitle}>Mã ưu đãi</Text>
                <TouchableOpacity onPress={handleOpenPromoModal}>
                  <Text style={styles.selectPromoText}>Chọn mã giảm giá</Text>
                </TouchableOpacity>
              </View>

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
                    value={promoCode}
                    onChangeText={setPromoCode}
                    autoCapitalize="characters"
                  />
                </View>
                <TouchableOpacity
                  style={styles.applyBtn}
                  onPress={handleApplyPromo}
                >
                  <Text style={styles.applyBtnText}>Áp dụng</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>
                  Tạm tính ({tongSoLuong} món)
                </Text>
                <Text style={styles.summaryValue}>
                  {subTotal.toLocaleString("vi-VN")} ₫
                </Text>
              </View>

              {/* THÊM LẠI HIỂN THỊ PHÍ VẬN CHUYỂN */}
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Phí vận chuyển</Text>
                <Text style={styles.summaryValue}>
                  {shippingFee.toLocaleString("vi-VN")} ₫
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Giảm giá</Text>
                <Text style={[styles.summaryValue, { color: COLORS.primary }]}>
                  -{discountAmount.toLocaleString("vi-VN")} ₫
                </Text>
              </View>
              <View style={styles.dashedDivider} />
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Tổng cộng</Text>
                <Text style={styles.totalValue}>
                  {finalTotal.toLocaleString("vi-VN")} ₫
                </Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.checkoutBtn}
              activeOpacity={0.9}
              onPress={handleGoToCheckout}
            >
              <Text style={styles.checkoutBtnText}>Thanh toán ngay</Text>
              <MaterialIcons name="arrow-forward" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </>
      )}

      <Modal
        visible={isPromoModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={handleClosePromoModal}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={handleClosePromoModal}
          />
          <Animated.View
            style={[
              styles.modalContent,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Khuyến mãi khả dụng</Text>
              <TouchableOpacity onPress={handleClosePromoModal}>
                <MaterialIcons name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            {isLoadingPromos ? (
              <ActivityIndicator
                size="large"
                color={COLORS.primary}
                style={{ marginTop: 20 }}
              />
            ) : availablePromos.length === 0 ? (
              <Text style={styles.noPromoText}>
                Hiện tại không có mã giảm giá nào.
              </Text>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                {availablePromos.map((promo) => (
                  <View key={promo.khuyenMaiId} style={styles.promoCard}>
                    <View style={styles.promoIconBox}>
                      <MaterialCommunityIcons
                        name="ticket-percent"
                        size={30}
                        color="white"
                      />
                    </View>
                    <View style={styles.promoInfo}>
                      <Text style={styles.promoCodeText}>{promo.maCode}</Text>
                      <Text style={styles.promoDescText}>{promo.moTa}</Text>
                      <Text style={styles.promoMinText}>
                        Đơn tối thiểu:{" "}
                        {promo.donToiThieu.toLocaleString("vi-VN")} ₫
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.usePromoBtn,
                        subTotal < promo.donToiThieu && {
                          backgroundColor: COLORS.muted,
                        },
                      ]}
                      onPress={() => selectPromoFromList(promo)}
                    >
                      <Text style={styles.usePromoBtnText}>Dùng</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            )}
          </Animated.View>
        </View>
      </Modal>

      <Modal
        visible={isConfirmVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsConfirmVisible(false)}
      >
        <View style={styles.confirmOverlay}>
          <View style={styles.confirmBox}>
            <View style={styles.confirmIconBox}>
              <MaterialIcons
                name="delete-outline"
                size={36}
                color={COLORS.red}
              />
            </View>
            <Text style={styles.confirmTitle}>Xóa sản phẩm</Text>
            <Text style={styles.confirmMessage}>
              Bạn có chắc chắn muốn bỏ sản phẩm này khỏi giỏ hàng?
            </Text>

            <View style={styles.confirmBtnRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setIsConfirmVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Hủy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={executeRemove}
              >
                <Text style={styles.deleteBtnText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  promoHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 16, fontWeight: "800", color: COLORS.text },
  selectPromoText: { color: COLORS.primary, fontWeight: "700", fontSize: 14 },
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
  promoRow: { flexDirection: "row", gap: 10 },
  promoInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 50,
    paddingHorizontal: 12,
    height: 50,
  },
  promoIcon: { marginRight: 8 },
  promoInput: { flex: 1, fontSize: 14, color: COLORS.text },
  applyBtn: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 20,
    borderRadius: 50,
    justifyContent: "center",
  },
  applyBtnText: { fontWeight: "700", color: COLORS.text },
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
    borderRadius: 50,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 15,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.text },
  noPromoText: { textAlign: "center", marginTop: 20, color: COLORS.muted },
  promoCard: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  promoIconBox: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  promoInfo: { flex: 1, marginLeft: 12 },
  promoCodeText: { fontSize: 16, fontWeight: "800", color: COLORS.text },
  promoDescText: { fontSize: 12, color: COLORS.text, marginTop: 2 },
  promoMinText: { fontSize: 11, color: COLORS.muted, marginTop: 4 },
  usePromoBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  usePromoBtnText: { color: "white", fontWeight: "700", fontSize: 14 },
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

  confirmOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmBox: {
    backgroundColor: COLORS.surface,
    width: "85%",
    maxWidth: 340,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  confirmIconBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  confirmTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 8,
  },
  confirmMessage: {
    fontSize: 15,
    color: COLORS.muted,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  confirmBtnRow: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
  },
  cancelBtnText: {
    fontWeight: "700",
    color: COLORS.muted,
    fontSize: 16,
  },
  deleteBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: COLORS.red,
    alignItems: "center",
    elevation: 2,
    shadowColor: COLORS.red,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  deleteBtnText: {
    fontWeight: "700",
    color: "white",
    fontSize: 16,
  },
});

export default CartScreen;
