import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

// Import các hàm API
import { getMyPetsAPI } from "../api/bookingApi";
import { getCurrentUser, BASE_URL } from "../api/userApi"; // Thêm getCurrentUser ở đây

const COLORS = {
  primary: "#10B981",
  background: "#FAFAFA",
  surface: "#FFFFFF",
  text: "#1F2937",
  muted: "#6B7280",
  border: "#F1F5F9",
  red: "#EF4444",
};

const MENU_ITEMS = [
  {
    id: 1,
    title: "Lịch sử đặt chỗ",
    icon: "history",
    color: "#3B82F6",
    bg: "#EFF6FF",
  },
  {
    id: 2,
    title: "Đơn hàng của tôi",
    icon: "shopping-bag",
    color: "#A855F7",
    bg: "#FAF5FF",
  },
  {
    id: 3,
    title: "Địa chỉ đã lưu",
    icon: "location-on",
    color: "#F97316",
    bg: "#FFF7ED",
  },
  {
    id: 4,
    title: "Phương thức thanh toán",
    icon: "credit-card",
    color: "#14B8A6",
    bg: "#F0FDFA",
  },
  {
    id: 5,
    title: "Cài đặt",
    icon: "settings",
    color: "#6B7280",
    bg: "#F8FAFC",
  },
];

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- LOGIC LẤY ẢNH GIỐNG HEADER ---
  const fetchProfileData = async () => {
    try {
      setIsLoading(true);

      // 1. Lấy thông tin User từ server (giống Header)
      const user = await getCurrentUser();
      if (user) {
        setUserData(user);
      }

      // 2. Lấy danh sách thú cưng
      const petsData = await getMyPetsAPI();
      setPets(petsData);
    } catch (error) {
      console.log("ProfileScreen: Lỗi tải dữ liệu", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Cập nhật liên tục khi quay lại trang
  useFocusEffect(
    useCallback(() => {
      fetchProfileData();
    }, []),
  );

  // --- HÀM TẠO ĐƯỜNG DẪN ẢNH (Giống Header) ---
  const getUserAvatar = () => {
    if (userData?.anhDaiDien) {
      return { uri: `${BASE_URL}/uploads/${userData.anhDaiDien}` };
    }
    // Ảnh mặc định giống Header nếu không có ảnh
    return { uri: "https://i.pravatar.cc/150?img=11" };
  };

  const getPetImage = (hinhAnh) => {
    if (hinhAnh) {
      return { uri: `${BASE_URL}/uploads/${hinhAnh}` };
    }
    return { uri: "https://via.placeholder.com/300?text=Pet" };
  };

  // --- ĐĂNG XUẤT ---
  const handleLogout = () => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.multiRemove(["accessToken", "userInfo"]);
          navigation.reset({ index: 0, routes: [{ name: "Login" }] });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Thông tin cá nhân */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={getUserAvatar()} // Gọi hàm lấy ảnh đã xử lý logic uploads
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarBtn}>
              <MaterialIcons name="edit" size={16} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{userData?.hoTen || "Người dùng"}</Text>
          <Text style={styles.userEmail}>
            {userData?.email || "Chưa có email"}
          </Text>
          <TouchableOpacity style={styles.editProfileBtn}>
            <Text style={styles.editProfileText}>Chỉnh sửa hồ sơ</Text>
          </TouchableOpacity>
        </View>

        {/* Thú cưng của tôi */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Thú cưng của tôi ({pets.length})
            </Text>
            <TouchableOpacity
              style={styles.addBtnSmall}
              onPress={() => navigation.navigate("AddPet")}
            >
              <MaterialIcons name="add" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <ActivityIndicator
              color={COLORS.primary}
              style={{ marginLeft: 24 }}
            />
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.petList}
            >
              {Array.isArray(pets) &&
                pets.map((pet) => (
                  <TouchableOpacity key={pet.thuCungId} style={styles.petCard}>
                    <Image
                      source={getPetImage(pet.hinhAnh)}
                      style={styles.petImg}
                    />
                    <LinearGradient
                      colors={["transparent", "rgba(0,0,0,0.7)"]}
                      style={styles.petGradient}
                    />
                    <View style={styles.petInfo}>
                      <Text style={styles.petName}>{pet.tenThuCung}</Text>
                      <Text style={styles.petBreed}>{pet.giongLoai}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              <TouchableOpacity
                style={styles.addPetCard}
                onPress={() => navigation.navigate("AddPet")}
              >
                <MaterialIcons name="pets" size={32} color={COLORS.muted} />
                <Text style={styles.addPetText}>Thêm bé</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>

        {/* Menu danh mục */}
        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => {
                // Điều hướng dựa trên ID của menu item
                if (item.id === 1) {
                  navigation.navigate("BookingHistory");
                } else if (item.id === 2) {
                  navigation.navigate("OrderHistory");
                } else if (item.id === 3) navigation.navigate("AddressList");
              }}
            >
              <View style={[styles.menuIconBox, { backgroundColor: item.bg }]}>
                <MaterialIcons name={item.icon} size={22} color={item.color} />
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <MaterialIcons name="chevron-right" size={24} color="#CBD5E1" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Nút đăng xuất */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <MaterialIcons name="logout" size={20} color={COLORS.red} />
            <Text style={styles.logoutText}>Đăng xuất</Text>
          </TouchableOpacity>
          <Text style={styles.versionText}>Phiên bản 1.0.2</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- GIỮ NGUYÊN STYLES ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { paddingBottom: 50, paddingTop: 20 },
  profileSection: { alignItems: "center", marginBottom: 30 },
  avatarContainer: { position: "relative", marginBottom: 15 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "white",
  },
  editAvatarBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 4,
  },
  userEmail: { fontSize: 14, color: COLORS.muted, marginBottom: 15 },
  editProfileBtn: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: "#F1F5F9",
  },
  editProfileText: { fontSize: 14, fontWeight: "700", color: COLORS.text },
  section: { marginBottom: 30 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: COLORS.text },
  addBtnSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  petList: { paddingLeft: 24, paddingRight: 10 },
  petCard: {
    width: 130,
    height: 160,
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  petImg: { width: "100%", height: "100%" },
  petGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
  },
  petInfo: { position: "absolute", bottom: 12, left: 12 },
  petName: { color: "white", fontWeight: "bold", fontSize: 14 },
  petBreed: { color: "white", fontSize: 10, opacity: 0.8 },
  addPetCard: {
    width: 130,
    height: 160,
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#CBD5E1",
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  addPetText: { fontSize: 12, fontWeight: "700", color: COLORS.muted },
  menuContainer: {
    marginHorizontal: 24,
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    paddingVertical: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F8FAFC",
  },
  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  menuTitle: {
    flex: 1,
    marginLeft: 15,
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
  },
  logoutSection: { paddingHorizontal: 24, alignItems: "center" },
  logoutBtn: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#FEF2F2",
    paddingVertical: 16,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  logoutText: { color: COLORS.red, fontWeight: "700", fontSize: 16 },
  versionText: { fontSize: 12, color: COLORS.muted, marginTop: 15 },
});

export default ProfileScreen;
