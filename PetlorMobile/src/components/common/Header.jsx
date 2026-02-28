import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoRow}>
        <View style={styles.logoIcon}>
          <MaterialIcons name="pets" size={24} color={COLORS.primary} />
        </View>
        <Text style={styles.logoText}>PetLor</Text>
      </View>

      {/* Action Section */}
      <View style={styles.actionsRow}>
        {/* Giỏ hàng mới thêm vào */}
        <TouchableOpacity
          style={styles.cartBtn}
          onPress={() => navigation.navigate("Cart")}
        >
          <MaterialIcons
            name="shopping-cart"
            size={22}
            color={COLORS.textLight}
          />
          <View style={styles.cartDot} />
        </TouchableOpacity>

        {/* Thông báo */}
        <TouchableOpacity style={styles.notifBtn}>
          <MaterialIcons
            name="notifications-none"
            size={24}
            color={COLORS.textLight}
          />
          <View style={styles.badge} />
        </TouchableOpacity>

        {/* Avatar */}
        <TouchableOpacity style={styles.avatarContainer}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=11" }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 50,
    paddingBottom: 15,
    backgroundColor: "rgba(255,255,255,0.95)",
    zIndex: 100,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9", // Thêm một đường kẻ mờ cho chuyên nghiệp
  },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  logoIcon: {
    width: 32,
    height: 32,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: { fontSize: 20, fontWeight: "800", color: COLORS.primary },
  actionsRow: { flexDirection: "row", alignItems: "center", gap: 10 }, // Giảm gap xuống 10 để vừa 3 icon

  // Style cho nút Giỏ hàng
  cartBtn: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.grayBg,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  cartDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    backgroundColor: "#EF4444",
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "white",
  },

  notifBtn: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.grayBg,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    backgroundColor: "#EF4444",
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "white",
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.grayBg,
    overflow: "hidden",
  },
  avatar: { width: "100%", height: "100%" },
});

export default Header;
