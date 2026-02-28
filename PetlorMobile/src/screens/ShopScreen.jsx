import React, { useState } from "react";
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
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

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
};

const CATEGORIES = ["Tất cả", "Thức ăn", "Đồ chơi", "Phụ kiện", "Thuốc"];

const PRODUCTS = [
  {
    id: "1",
    name: "Hạt Royal Canin",
    price: "185.000 ₫",
    rating: 4.8,
    discount: "-10%",
    image: "https://images.unsplash.com/photo-1589924691195-41432c84c161?w=400",
  },
  {
    id: "2",
    name: "Xương gặm canxi",
    price: "45.000 ₫",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400",
  },
  {
    id: "3",
    name: "Whiskas Cá Biển",
    price: "15.000 ₫",
    rating: 4.9,
    isNew: true,
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400",
  },
  {
    id: "4",
    name: "Vòng Cổ Cao Cấp",
    price: "50.000 ₫",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1544568100-847a948585b9?w=400",
  },
  {
    id: "5",
    name: "Sữa tắm SOS",
    price: "120.000 ₫",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400",
  },
  {
    id: "6",
    name: "Nệm Thú Cưng",
    price: "350.000 ₫",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1541599540903-216a46ca1dfc?w=400",
  },
];

const ShopScreen = () => {
  const [activeTab, setActiveTab] = useState("Tất cả");

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <View style={styles.imageContainer}>
        {item.discount && (
          <View style={[styles.badge, { backgroundColor: "#EF4444" }]}>
            <Text style={styles.badgeText}>{item.discount}</Text>
          </View>
        )}
        {item.isNew && (
          <View style={[styles.badge, { backgroundColor: COLORS.primary }]}>
            <Text style={styles.badgeText}>MỚI</Text>
          </View>
        )}
        <TouchableOpacity style={styles.favoriteBtn}>
          <MaterialIcons name="favorite-border" size={16} color="#9CA3AF" />
        </TouchableOpacity>
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </View>

      <Text style={styles.productName} numberOfLines={1}>
        {item.name}
      </Text>

      <View style={styles.ratingRow}>
        <MaterialIcons name="star" size={14} color={COLORS.star} />
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.productPrice}>{item.price}</Text>
        {/* Nút Add: Shadow-lg shadow-primary/30 */}
        <TouchableOpacity style={styles.addBtn}>
          <MaterialIcons name="add" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
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
        {/* Categories Section - Scroll X */}
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

        {/* Grid Sản phẩm */}
        <FlatList
          data={PRODUCTS}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.gridContainer}
          columnWrapperStyle={styles.columnWrapper}
        />
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
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
    trackingTight: -0.5,
  },
  cartBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },
  cartDot: {
    position: "absolute",
    top: 8,
    right: 10,
    width: 8,
    height: 8,
    backgroundColor: "#EF4444",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "white",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6", // bg-gray-100
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
    width: (width - 64) / 2, // 24*2 padding + 16 gap
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
});

export default ShopScreen;
