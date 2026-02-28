import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SHADOW } from "../constants/theme";

// Import components con
import ServiceItem from "../components/home/ServiceItem";
import ProductCard from "../components/home/ProductCard";

const HomeScreen = () => {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View style={styles.padding}>
        <View style={styles.heroCard}>
          <View
            style={[
              styles.circle,
              {
                right: -40,
                top: -40,
                width: 160,
                height: 160,
                backgroundColor: "rgba(16, 185, 129, 0.1)",
              },
            ]}
          />
          <View
            style={[
              styles.circle,
              {
                left: -40,
                bottom: -40,
                width: 120,
                height: 120,
                backgroundColor: "rgba(251, 191, 36, 0.1)",
              },
            ]}
          />

          <View style={styles.tag}>
            <MaterialIcons name="verified" size={14} color={COLORS.primary} />
            <Text style={styles.tagText}>Chăm sóc 24/7</Text>
          </View>

          <Text style={styles.heroTitle}>
            Chăm sóc đặc biệt cho{" "}
            <Text style={{ color: COLORS.primary }}>người bạn tốt nhất</Text>
          </Text>
          <Text style={styles.heroSub}>
            Dịch vụ chăm sóc thú cưng toàn diện và tận tâm.
          </Text>

          <View style={styles.heroBtns}>
            <TouchableOpacity style={styles.btnPrimary}>
              <MaterialIcons name="calendar-today" size={18} color="white" />
              <Text style={styles.btnPrimaryText}>Đặt ngay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSecondary}>
              <Text style={styles.btnSecondaryText}>Xem dịch vụ</Text>
            </TouchableOpacity>
          </View>

          {/* Image & Rating */}
          <View style={styles.heroImgContainer}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?q=80&w=600",
              }}
              style={styles.heroImg}
              resizeMode="contain"
            />
            <View style={styles.ratingFloat}>
              <View style={styles.heartBox}>
                <MaterialIcons
                  name="favorite"
                  size={14}
                  color={COLORS.primary}
                />
              </View>
              <View>
                <Text style={{ fontSize: 10, color: "#6B7280" }}>Đánh giá</Text>
                <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                  5.0 Sao
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <StatItem num="10k+" txt="Thú cưng hạnh phúc" />
          <View style={styles.divider} />
          <StatItem num="50+" txt="Chuyên gia" />
          <View style={styles.divider} />
          <StatItem num="24/7" txt="Hỗ trợ" />
        </View>
      </View>

      {/* 2. SERVICES SECTION */}
      <View style={styles.section}>
        <SectionHeader title="Dịch vụ của chúng tôi" />
        <View style={styles.serviceGrid}>
          <ServiceItem
            label="Pet Spa"
            icon="spa"
            color="#0D9488"
            bg="#F0FDFA"
          />
          <ServiceItem
            label="Phòng khám"
            icon="medical-services"
            color="#2563EB"
            bg="#EFF6FF"
          />
          <ServiceItem
            label="Khách sạn"
            icon="apartment"
            color="#EA580C"
            bg="#FFF7ED"
          />
          <ServiceItem
            label="Huấn luyện"
            icon="school"
            color="#9333EA"
            bg="#FAF5FF"
          />
        </View>
      </View>
      <View style={styles.section}>
        <SectionHeader title="Sản phẩm mới" action="Cửa hàng" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.paddingHorizontal}
        >
          <ProductCard
            image="https://images.unsplash.com/photo-1589924691195-41432c84c161?w=300"
            name="Royal Canin Puppy"
            price="185.000 ₫"
          />
          <ProductCard
            image="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300"
            name="Whiskas Ocean Fish"
            price="15.000 ₫"
          />
        </ScrollView>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Đánh giá cộng đồng" />
        <View style={styles.paddingHorizontal}>
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Image
                source={{ uri: "https://i.pravatar.cc/100?img=5" }}
                style={styles.reviewerAvatar}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.reviewerName}>Nguyễn Minh Anh</Text>
                <Text style={styles.reviewerPet}>Chủ của Corgi Mochi</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                {[...Array(5)].map((_, i) => (
                  <MaterialIcons
                    key={i}
                    name="star"
                    size={16}
                    color={COLORS.yellow}
                  />
                ))}
              </View>
            </View>
            <Text style={styles.reviewText}>
              "Dịch vụ spa ở đây thật tuyệt vời. Cún con của mình thơm tho và
              sạch sẽ lắm."
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.padding, { marginBottom: 20 }]}>
        <LinearGradient
          colors={[COLORS.primary, "#059669"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.newsletter}
        >
          <View
            style={[
              styles.circle,
              {
                right: -20,
                top: -20,
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            ]}
          />
          <Text style={styles.newsTitle}>Nhận ưu đãi đặc biệt</Text>
          <Text style={styles.newsSub}>
            Đăng ký ngay để nhận quà tặng độc quyền.
          </Text>
          <View style={styles.inputRow}>
            <TextInput
              placeholder="Email của bạn..."
              placeholderTextColor="rgba(255,255,255,0.7)"
              style={styles.input}
            />
            <TouchableOpacity style={styles.joinBtn}>
              <Text style={styles.joinText}>Tham gia</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

const SectionHeader = ({ title, action }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.h3}>{title}</Text>
    {action && (
      <TouchableOpacity>
        <Text style={styles.link}>{action}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const StatItem = ({ num, txt }) => (
  <View style={{ alignItems: "center" }}>
    <Text style={styles.statNum}>{num}</Text>
    <Text style={styles.statTxt}>{txt}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  padding: { paddingHorizontal: 24 },
  paddingHorizontal: { paddingHorizontal: 24 },
  section: { marginBottom: 32 },

  heroCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 24,
    marginTop: 10,
    overflow: "hidden",
    ...SHADOW.soft,
  },
  circle: { position: "absolute", borderRadius: 999 },
  tag: {
    flexDirection: "row",
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-start",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  tagText: { color: COLORS.primary, fontWeight: "700", fontSize: 12 },
  heroTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 12,
    lineHeight: 32,
  },
  heroSub: { fontSize: 14, color: COLORS.textLight, marginBottom: 20 },
  heroBtns: { flexDirection: "row", gap: 12, marginBottom: 20 },
  btnPrimary: {
    flex: 1,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    gap: 8,
    ...SHADOW.strong,
  },
  btnPrimaryText: { color: "white", fontWeight: "600" },
  btnSecondary: {
    flex: 1,
    backgroundColor: COLORS.grayBg,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
  },
  btnSecondaryText: { color: COLORS.text, fontWeight: "600" },
  heroImgContainer: {
    height: 180,
    width: "100%",
    alignItems: "center",
    position: "relative",
  },
  heroImg: { width: "100%", height: "100%" },
  ratingFloat: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    ...SHADOW.soft,
  },
  heartBox: {
    width: 32,
    height: 32,
    backgroundColor: "#DCFCE7",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 24,
    marginBottom: 8,
  },
  statNum: { fontSize: 20, fontWeight: "800", color: COLORS.text },
  statTxt: { fontSize: 12, color: COLORS.textLight },
  divider: { width: 1, height: 30, backgroundColor: "#E5E7EB" },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  h3: { fontSize: 18, fontWeight: "800", color: COLORS.text },
  link: { fontSize: 12, fontWeight: "600", color: COLORS.primary },

  serviceGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },

  reviewCard: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  reviewerAvatar: { width: 40, height: 40, borderRadius: 20 },
  reviewerName: { fontSize: 14, fontWeight: "700", color: COLORS.text },
  reviewerPet: { fontSize: 10, color: COLORS.textLight },
  reviewText: {
    fontSize: 12,
    color: COLORS.textLight,
    fontStyle: "italic",
    lineHeight: 18,
  },

  newsletter: {
    padding: 24,
    borderRadius: 24,
    position: "relative",
    overflow: "hidden",
  },
  newsTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },
  newsSub: { color: "rgba(255,255,255,0.9)", fontSize: 12, marginBottom: 16 },
  inputRow: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 4,
    borderRadius: 12,
  },
  input: { flex: 1, paddingHorizontal: 12, color: "white", fontSize: 12 },
  joinBtn: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  joinText: { color: COLORS.primary, fontWeight: "700", fontSize: 12 },
});

export default HomeScreen;
