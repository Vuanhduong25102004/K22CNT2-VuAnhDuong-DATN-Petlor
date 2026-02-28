import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, SHADOW } from "../../constants/theme";

const ProductCard = ({ image, name, price }) => (
  <View style={styles.card}>
    <View style={styles.imageBox}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>MỚI</Text>
      </View>
      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
    <Text style={styles.name} numberOfLines={1}>
      {name}
    </Text>
    <Text style={styles.price}>{price}</Text>
    <TouchableOpacity style={styles.btn}>
      <MaterialIcons name="add-shopping-cart" size={16} color="#333" />
      <Text style={styles.btnText}>Thêm</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: 160,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 12,
    marginRight: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    ...SHADOW.soft,
  },
  imageBox: {
    height: 110,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: "80%", height: "80%" },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 1,
  },
  badgeText: { color: "white", fontSize: 10, fontWeight: "bold" },
  name: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 12,
  },
  btn: {
    backgroundColor: COLORS.grayBg,
    padding: 8,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  btnText: { fontSize: 12, fontWeight: "600", color: COLORS.text },
});

export default ProductCard;
