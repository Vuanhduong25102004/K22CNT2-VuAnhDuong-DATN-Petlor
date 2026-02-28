import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ShopScreen from "./src/screens/ShopScreen";
import Header from "./src/components/common/Header";
import BottomMenu from "./src/components/common/BottomMenu";
import BookingScreen from "./src/screens/BookingScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import CartScreen from "./src/screens/CartScreen";

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
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Main" component={MainApp} />
          <Stack.Screen name="Cart" component={CartScreen} />
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
