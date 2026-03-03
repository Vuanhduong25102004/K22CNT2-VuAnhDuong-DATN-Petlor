import React, { useState, useEffect } from "react";
import { View, StyleSheet, Platform, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ShopScreen from "./src/screens/ShopScreen";
import Header from "./src/components/common/Header";
import BottomMenu from "./src/components/common/BottomMenu";
import BookingScreen from "./src/screens/BookingScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import CartScreen from "./src/screens/CartScreen";
import CheckoutScreen from "./src/screens/CheckoutScreen";

const Stack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

const MainApp = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1 }}>
        <MainStack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false, animation: "fade" }}
        >
          <MainStack.Screen name="Home" component={HomeScreen} />
          <MainStack.Screen name="Shop" component={ShopScreen} />
          <MainStack.Screen name="Booking" component={BookingScreen} />
          <MainStack.Screen name="Profile" component={ProfileScreen} />
        </MainStack.Navigator>
      </View>
      <BottomMenu />
    </View>
  );
};

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState("Login");

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        if (token) {
          setInitialRoute("Main");
        } else {
          setInitialRoute("Login");
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra đăng nhập:", error);
        setInitialRoute("Login");
      } finally {
        setIsReady(true);
      }
    };

    checkLoginStatus();
  }, []);

  if (!isReady) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#047857" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Main" component={MainApp} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    maxWidth: Platform.OS === "web" ? 480 : "100%",
    width: "100%",
    marginHorizontal: "auto",
    position: "relative",
    height: Platform.OS === "web" ? "100vh" : "100%",
    overflow: "hidden",
    borderLeftWidth: Platform.OS === "web" ? 1 : 0,
    borderRightWidth: Platform.OS === "web" ? 1 : 0,
    borderColor: "#E5E7EB",
  },
});
