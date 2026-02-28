import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#ec5b13",
  primaryGradient: ["#ec5b13", "#ff8c52"],
  background: "#fafafa",
  surface: "rgba(255, 255, 255, 0.95)",
  text: "#0f172a",
  textLight: "#64748b",
  border: "#e2e8f0",
  inputBg: "rgba(255, 255, 255, 0.5)",
};

const RegisterScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const InputField = ({
    label,
    icon,
    placeholder,
    secureTextEntry,
    isHalf,
    children,
    ...props
  }) => (
    <View style={[styles.inputGroup, isHalf && { width: "48%" }]}>
      <Text style={styles.label}>{label.toUpperCase()}</Text>
      <View style={styles.inputContainer}>
        <MaterialIcons
          name={icon}
          size={20}
          color={COLORS.textLight}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          secureTextEntry={secureTextEntry}
          {...props}
        />
        {children}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.bgDecoration} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.card}>
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.logoCircle}>
              <MaterialIcons name="pets" size={40} color="white" />
            </View>
            <Text style={styles.title}>PetLor</Text>
            <Text style={styles.subtitle}>
              Tham gia cộng đồng yêu thú cưng ngay hôm nay
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.form}>
            <InputField
              label="Họ và tên"
              icon="person"
              placeholder="Nguyễn Văn A"
              onChangeText={(val) =>
                setFormData({ ...formData, fullName: val })
              }
            />

            <View style={styles.row}>
              <InputField
                label="Số điện thoại"
                icon="smartphone"
                placeholder="09xx..."
                isHalf
                keyboardType="phone-pad"
              />
              <InputField
                label="Email"
                icon="mail"
                placeholder="petlor@ex.com"
                isHalf
                keyboardType="email-address"
              />
            </View>

            <InputField
              label="Địa chỉ"
              icon="location-on"
              placeholder="Thành phố, Quận/Huyện"
            />

            <View style={styles.row}>
              <InputField
                label="Mật khẩu"
                icon="lock"
                placeholder="••••••••"
                secureTextEntry={!showPassword}
                isHalf
              >
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={20}
                    color={COLORS.textLight}
                  />
                </TouchableOpacity>
              </InputField>

              <InputField
                label="Xác nhận"
                icon="vpn-key"
                placeholder="••••••••"
                secureTextEntry={!showPassword}
                isHalf
              />
            </View>

            {/* Terms Checkbox */}
            <TouchableOpacity
              style={styles.termsContainer}
              onPress={() => setAgree(!agree)}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={agree ? "checkbox-marked" : "checkbox-blank-outline"}
                size={24}
                color={COLORS.primary}
              />
              <Text style={styles.termsText}>
                Tôi đồng ý với <Text style={styles.linkText}>Điều khoản</Text> &{" "}
                <Text style={styles.linkText}>Chính sách</Text>
              </Text>
            </TouchableOpacity>

            {/* Register Button */}
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.btnShadow}
              onPress={() => console.log("Register press")}
            >
              <LinearGradient
                colors={COLORS.primaryGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.registerBtn}
              >
                <Text style={styles.registerBtnText}>Đăng ký ngay</Text>
                <MaterialIcons name="arrow-forward" size={20} color="white" />
              </LinearGradient>
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Đã có tài khoản? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginLink}>Đăng nhập ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  bgDecoration: {
    position: "absolute",
    top: 0,
    right: 0,
    width: width,
    height: width,
    backgroundColor: COLORS.primary,
    opacity: 0.05,
    borderRadius: width / 2,
    transform: [{ translateX: width / 2 }, { translateY: -width / 4 }],
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 10,
    overflow: "hidden",
  },
  header: {
    padding: 30,
    alignItems: "center",
    backgroundColor: "rgba(236, 91, 19, 0.03)",
  },
  logoCircle: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.primary,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: "center",
    marginTop: 5,
  },
  form: {
    paddingHorizontal: 25,
    paddingBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#94a3b8",
    marginBottom: 6,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
  },
  icon: { marginRight: 10 },
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 8,
  },
  termsText: {
    fontSize: 13,
    color: COLORS.textLight,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  btnShadow: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
    marginTop: 25,
  },
  registerBtn: {
    flexDirection: "row",
    height: 58,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  registerBtnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  footerText: {
    color: COLORS.textLight,
    fontSize: 14,
  },
  loginLink: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 14,
  },
  bottomBarBase: {
    height: 6,
    backgroundColor: "rgba(236, 91, 19, 0.1)",
    width: "100%",
  },
  bottomBarActive: {
    height: "100%",
    width: "33%",
    backgroundColor: COLORS.primary,
  },
});

export default RegisterScreen;
