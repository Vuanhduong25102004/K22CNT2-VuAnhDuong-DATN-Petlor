import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";
import { useNavigation, useNavigationState } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const BottomMenu = () => {
  const navigation = useNavigation();

  const activeRouteName = useNavigationState((state) => {
    const route = state.routes[state.index];
    if (route.state) {
      return route.state.routes[route.state.index].name;
    }
    return route.name;
  });

  const handlePress = (screenName) => {
    navigation.navigate("Main", { screen: screenName });
  };

  return (
    <View style={styles.container}>
      <NavItem
        icon="home"
        label="Trang chủ"
        active={activeRouteName === "Home"}
        onPress={() => handlePress("Home")}
      />

      <NavItem
        icon="storefront"
        label="Cửa hàng"
        active={activeRouteName === "Shop"}
        onPress={() => handlePress("Shop")}
      />

      <View style={styles.qrContainer}>
        <TouchableOpacity style={styles.qrBtn} activeOpacity={0.8}>
          <MaterialIcons name="qr-code-scanner" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <NavItem
        icon="calendar-today"
        label="Đặt lịch"
        active={activeRouteName === "Booking"}
        onPress={() => handlePress("Booking")}
      />

      <NavItem
        icon="person-outline"
        label="Cá nhân"
        active={activeRouteName === "Profile"}
        onPress={() => handlePress("Profile")}
      />
    </View>
  );
};

const NavItem = ({ icon, label, active, onPress }) => (
  <TouchableOpacity
    style={styles.navItem}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <MaterialIcons
      name={icon}
      size={24}
      color={active ? COLORS.primary : "#64748b"}
    />
    <Text
      style={[styles.navLabel, { color: active ? COLORS.primary : "#64748b" }]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingBottom: 25,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    elevation: 20,
    zIndex: 100,
  },
  navItem: { alignItems: "center", width: 60, gap: 4 },
  navLabel: { fontSize: 10, fontWeight: "600" },
  qrContainer: { position: "relative", top: -20 },
  qrBtn: {
    width: 56,
    height: 56,
    backgroundColor: "#10B981",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "white",
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
});

export default BottomMenu;
