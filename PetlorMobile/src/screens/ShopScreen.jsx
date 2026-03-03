import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getAllProducts, BASE_URL } from "../api/productApi";
import { addToCartAPI } from "../api/cartApi";

const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#10B981",
  primaryDark: "#059669",
  background: "#FAFAFA",
  surface: "#FFFFFF",
  text: "#1F2937",
  muted: "#6B7280",
  border: "#F3F4F6",
  star: "#FACC15",
  white: "#FFFFFF",
  red: "#EF4444", // Thêm màu đỏ cho toast lỗi
};

const CATEGORIES = ["Tất cả", "Thức ăn", "Đồ chơi", "Phụ kiện", "Thuốc"];

// 1. CHUYỂN HÀM XỬ LÝ ẢNH RA NGOÀI (Chống nháy ảnh)
const getImageUrl = (imageName) => {
  if (!imageName) return "https://via.placeholder.com/400";
  if (imageName.startsWith("http")) return imageName;
  return `${BASE_URL}/uploads/${imageName}`;
};

// 2. CHUYỂN HÀM FORMAT GIÁ RA NGOÀI
const formatPrice = (price) => {
  if (!price) return "0 ₫";
  return price.toLocaleString("vi-VN") + " ₫";
};

// 3. TÁCH COMPONENT SẢN PHẨM RA NGOÀI (Chống render lại nguyên list)
const ProductItem = ({ item, onAddToCart }) => {
  let discountPercent = null;
  if (item.giaGiam > 0 && item.giaGiam < item.gia) {
    discountPercent = `-${Math.round(((item.gia - item.giaGiam) / item.gia) * 100)}%`;
  }

  return (
    <View style={styles.productCard}>
      <View style={styles.imageContainer}>
        {discountPercent ? (
          <View style={[styles.badge, { backgroundColor: "#EF4444" }]}>
            <Text style={styles.badgeText}>{discountPercent}</Text>
          </View>
        ) : null}

        <TouchableOpacity style={styles.favoriteBtn}>
          <MaterialIcons name="favorite-border" size={16} color="#9CA3AF" />
        </TouchableOpacity>

        <Image
          source={{ uri: getImageUrl(item.hinhAnh) }}
          style={styles.productImage}
        />
      </View>

      <Text style={styles.productName} numberOfLines={1}>
        {item.tenSanPham}
      </Text>

      <View style={styles.ratingRow}>
        <MaterialIcons name="star" size={14} color={COLORS.star} />
        <Text style={styles.ratingText}>5.0</Text>
      </View>

      <View style={styles.priceRow}>
        <View>
          <Text style={styles.productPrice}>
            {formatPrice(item.giaGiam > 0 ? item.giaGiam : item.gia)}
          </Text>
          {item.giaGiam > 0 && item.giaGiam < item.gia ? (
            <Text style={styles.originalPrice}>{formatPrice(item.gia)}</Text>
          ) : null}
        </View>

        <TouchableOpacity
          style={styles.addBtn}
          activeOpacity={0.7}
          onPress={() => onAddToCart(item)}
        >
          <MaterialIcons name="add" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- COMPONENT CHÍNH ---
const ShopScreen = () => {
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // STATE QUẢN LÝ CUSTOM TOAST
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: "", type: "success" });
    }, 3000); // Tự tắt sau 3 giây
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await getAllProducts();
        if (data && data.content) {
          setProducts(data.content);
        }
      } catch (error) {
        console.error("Lỗi khi tải trang Shop:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // XỬ LÝ NÚT THÊM GIỎ HÀNG BẰNG TOAST
  const handleAddToCart = async (sanPham) => {
    try {
      await addToCartAPI(sanPham.sanPhamId, 1);
      // Hiện thông báo thành công xanh lá
      showToast(`Đã thêm "${sanPham.tenSanPham}" vào giỏ hàng!`, "success");
    } catch (error) {
      const errorMsg = error.message || "Lỗi kết nối. Vui lòng thử lại!";
      // Hiện thông báo lỗi màu đỏ
      showToast(errorMsg, "error");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HIỂN THỊ TOAST THÔNG BÁO Ở CẠNH TRÊN */}
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
        <View style={styles.searchContainer}>
          <MaterialIcons
            name="search"
            size={20}
            color={COLORS.muted}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm sản phẩm..."
            placeholderTextColor={COLORS.muted}
          />
          <TouchableOpacity>
            <MaterialIcons name="tune" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          >
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryBtn,
                  activeTab === cat && styles.categoryBtnActive,
                ]}
                onPress={() => setActiveTab(cat)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    activeTab === cat && styles.categoryTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
            style={{ marginTop: 50 }}
          />
        ) : (
          <FlatList
            data={products}
            // Gọi component con và truyền hàm xử lý
            renderItem={({ item }) => (
              <ProductItem item={item} onAddToCart={handleAddToCart} />
            )}
            keyExtractor={(item) => item.sanPhamId.toString()}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.gridContainer}
            columnWrapperStyle={styles.columnWrapper}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Không có sản phẩm nào.</Text>
            }
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 24,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: COLORS.text },

  categoryList: { paddingHorizontal: 24, paddingVertical: 20 },
  categoryBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 99,
    backgroundColor: "white",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  categoryBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    elevation: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  categoryText: { fontSize: 14, fontWeight: "600", color: COLORS.muted },
  categoryTextActive: { color: "white", fontWeight: "700" },

  gridContainer: { paddingHorizontal: 24 },
  columnWrapper: { justifyContent: "space-between" },
  productCard: {
    backgroundColor: COLORS.surface,
    width: "47%",
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    overflow: "hidden",
  },
  productImage: { width: "100%", height: "100%", resizeMode: "cover" },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 10,
  },
  badgeText: { color: "white", fontSize: 10, fontWeight: "800" },
  favoriteBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 26,
    height: 26,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },
  ratingText: { fontSize: 12, color: COLORS.muted, fontWeight: "600" },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: { fontSize: 14, fontWeight: "800", color: COLORS.primary },
  originalPrice: {
    fontSize: 10,
    textDecorationLine: "line-through",
    color: COLORS.muted,
  },
  addBtn: {
    width: 28,
    height: 28,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  emptyText: { textAlign: "center", marginTop: 20, color: COLORS.muted },

  toastContainer: {
    position: "absolute",
    top: 15,
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

export default ShopScreen;
