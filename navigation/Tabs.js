import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Scanner from "../screens/scanner";
import KeyPad from "../screens/keyPad";
import ContinuousScan from "../screens/continousScan";
import {
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigationContext } from "../context/NavigationContext";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { url, setCameraEnabled, goBack, goForward } = useNavigationContext();
  const navigation = useNavigation();

  useEffect(() => {
    const isScannerPage = url.includes("/cart/scanner");
    setCameraEnabled(isScannerPage);
  }, [url, setCameraEnabled]);

  const screenOptions = {
    headerStyle: { backgroundColor: "#007AFF" },
    headerTintColor: "#fff",
    headerTitleStyle: { fontWeight: "bold" },
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          if (webViewRef.current && webViewRef.current.canGoBack()) {
            webViewRef.current.goBack();
          } else {
            console.log("No back history available in WebView");
          }
        }}
      >
        <MaterialIcons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          if (webViewRef.current && webViewRef.current.canGoForward()) {
            webViewRef.current.goForward();
          } else {
            console.log("No forward history available in WebView");
          }
        }}
      >
        <MaterialIcons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>
    ),
  };
  return (
    <Tab.Navigator screenOptions={{ headerShown: true }}>
      <Tab.Screen
        name="SCANNER"
        component={Scanner}
        options={{
          ...screenOptions,
          tabBarLabel: "Scan",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="barcode-scan"
              color={color}
              size={size}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                // Directly enable scanner without toggling
                if (!url.includes("/cart/scanner")) {
                  navigation.navigate("SCANNER");
                }
                setCameraEnabled(true);
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CONTINUOUS_SCANNER"
        component={ContinuousScan}
        options={{
          ...screenOptions,
          tabBarLabel: "Continuous Scan",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="barcode-scan"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="KeyPad"
        component={KeyPad}
        options={{
          ...screenOptions,
          tabBarLabel: "KeyPad",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="keypad" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
