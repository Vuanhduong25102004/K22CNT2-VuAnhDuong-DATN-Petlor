import React, { useState, useCallback } from "react";
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
import { useNavigation, useFocusEffect } from "@react-navigation/native"; // Dùng useFocusEffect để cập nhật liên tục khi quay lại trang
import { getCurrentUser, BASE_URL } from "../../api/userApi";

const Header = () => {
  const navigation = useNavigation();
  const [avatar, setAvatar] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Thêm biến kiểm tra đăng nhập

  // Dùng useFocusEffect thay cho useEffect để mỗi khi người dùng quay lại trang Home (sau khi Login), Header sẽ load lại
  useFocusEffect(
    useCallback(() => {
      const fetchUserData = async () => {
        try {
          const userData = await getCurrentUser();

          if (userData) {
            setIsLoggedIn(true);
            if (userData.anhDaiDien) {
              setAvatar(`${BASE_URL}/uploads/${userData.anhDaiDien}`);
            }
          } else {
            setIsLoggedIn(false);
          }
        } catch (error) {
          setIsLoggedIn(false);
          console.log("Header: Người dùng chưa đăng nhập");
        }
      };

      fetchUserData();
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <View style={styles.logoIcon}>
          <MaterialIcons name="pets" size={24} color={COLORS.primary} />
        </View>
        <Text style={styles.logoText}>PetLor</Text>
      </View>

      <View style={styles.actionsRow}>
        {/* Nút Giỏ hàng */}
        <TouchableOpacity
          style={styles.cartBtn}
          onPress={() => navigation.navigate("Cart")}
        >
          <MaterialIcons
            name="shopping-cart"
            size={22}
            color={COLORS.textLight}
          />
          {/* Chỉ hiện dấu chấm đỏ giỏ hàng nếu đã đăng nhập */}
          {isLoggedIn && <View style={styles.cartDot} />}
        </TouchableOpacity>

        {/* Nút Thông báo */}
        <TouchableOpacity style={styles.notifBtn}>
          <MaterialIcons
            name="notifications-none"
            size={24}
            color={COLORS.textLight}
          />
          {isLoggedIn && <View style={styles.badge} />}
        </TouchableOpacity>

        {/* --- XỬ LÝ HIỂN THỊ AVATAR --- */}
        {isLoggedIn ? (
          // Nếu đã đăng nhập: Hiện ảnh đại diện
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={() => navigation.navigate("Profile")} // Hoặc trang cá nhân của bạn
          >
            <Image
              source={{
                uri: avatar ? avatar : "https://i.pravatar.cc/150?img=11",
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        ) : (
          // Nếu chưa đăng nhập: Hiện nút Đăng nhập hoặc Icon mặc định
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => navigation.navigate("Login")}
          >
            <MaterialIcons
              name="account-circle"
              size={32}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        )}
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
    borderBottomColor: "#F1F5F9",
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
  actionsRow: { flexDirection: "row", alignItems: "center", gap: 10 },
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
  loginBtn: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Header;
