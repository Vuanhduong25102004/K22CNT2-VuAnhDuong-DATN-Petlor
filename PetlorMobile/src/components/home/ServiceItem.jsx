import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const ServiceItem = ({ icon, label, color, bg }) => (
  <TouchableOpacity style={styles.container}>
    <View style={[styles.iconBox, { backgroundColor: bg }]}>
      <MaterialIcons name={icon} size={28} color={color} />
    </View>
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { alignItems: "center", gap: 8 },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  label: { fontSize: 12, fontWeight: "600", color: "#4B5563" },
});

export default ServiceItem;
