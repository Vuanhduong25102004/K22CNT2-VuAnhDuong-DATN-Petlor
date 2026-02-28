import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const COLORS = {
  primary: "#047857",
  primaryDark: "#064e3b",
  background: "#f0fdf4",
  surface: "rgba(255, 255, 255, 0.95)",
  text: "#0f172a",
  textLight: "#64748b",
  border: "#f1f5f9",
  inputBg: "#f8fafc",
};

const SHADOW = {
  soft: {
    shadowColor: "#047857",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 50,
    elevation: 10,
  },
  btn: {
    shadowColor: "#047857",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.replace("Main")}
      >
        <MaterialIcons name="arrow-back" size={28} color={COLORS.primary} />
      </TouchableOpacity>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.card}>
          <View style={styles.header}>
            <LinearGradient
              colors={["rgba(4, 120, 87, 0.2)", "rgba(4, 120, 87, 0.05)"]}
              style={styles.logoBox}
            >
              <MaterialIcons name="pets" size={48} color={COLORS.primary} />
            </LinearGradient>
            <Text style={styles.title}>PetLor</Text>
            <Text style={styles.subtitle}>Chào mừng bạn trở lại</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email hoặc Số điện thoại</Text>
              <View style={styles.inputContainer}>
                <MaterialIcons
                  name="mail"
                  size={22}
                  color="#94a3b8"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Nhập email hoặc số điện thoại"
                  placeholderTextColor="#94a3b8"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.passwordHeader}>
                <Text style={styles.label}>Mật khẩu</Text>
                <TouchableOpacity>
                  <Text style={styles.forgotText}>Quên mật khẩu?</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <MaterialIcons
                  name="lock"
                  size={22}
                  color="#94a3b8"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Nhập mật khẩu của bạn"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={22}
                    color="#94a3b8"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.loginBtnContainer}
              onPress={() => navigation.replace("Main")}
            >
              <LinearGradient
                colors={[COLORS.primary, "#059669"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.loginBtn}
              >
                <Text style={styles.loginBtnText}>Đăng nhập</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>HOẶC TIẾP TỤC VỚI</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn}>
                <AntDesign name="google" size={24} color="#DB4437" />
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialBtn}>
                <MaterialIcons name="facebook" size={24} color="#1877F2" />
                <Text style={styles.socialText}>Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Chưa có tài khoản? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.registerText}>Đăng ký ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
    ...SHADOW.soft,
  },
  header: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  logoBox: {
    width: 96,
    height: 96,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    transform: [{ rotate: "3deg" }],
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: COLORS.primary,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.textLight,
  },
  form: {
    paddingHorizontal: 40,
    paddingBottom: 48,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 8,
  },
  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 60,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
  loginBtnContainer: {
    marginTop: 8,
    borderRadius: 16,
    ...SHADOW.btn,
  },
  loginBtn: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
  },
  loginBtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e2e8f0",
  },
  dividerText: {
    paddingHorizontal: 12,
    fontSize: 12,
    color: COLORS.textLight,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  socialBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 16,
    paddingVertical: 14,
    gap: 12,
  },
  socialText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(248, 250, 252, 0.5)",
    paddingVertical: 32,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  registerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  backButton: {
    position: "absolute",
    top: 50, // Điều chỉnh tùy theo thiết bị
    left: 20,
    zIndex: 10,
    padding: 8,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default LoginScreen;
