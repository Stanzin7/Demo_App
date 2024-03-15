import React from "react";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Scanner from "../screens/scanner";
import KeyPad from "../screens/keyPad";
import {
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigationContext } from "../context/NavigationContext";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { url, goBack, goForward } = useNavigationContext();

  const generateScannerUrl = () => {
    const baseUrl = url.substring(0, url.indexOf("/", 8)); // Get base URL until /
    return `${baseUrl}/cart/scanner`; // Append /cart/scanner to the base URL
  };

  const screenOptions = ({ route }) => ({
    tabBarStyle: url.includes("/") ? {} : { display: "none" },
    headerStyle: { backgroundColor: "#007AFF" },
    headerTintColor: "#fff",
    headerTitleStyle: { fontWeight: "bold" },
    headerLeft: () => (
      <TouchableOpacity onPress={goBack}>
        <MaterialIcons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity onPress={goForward}>
        <MaterialIcons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>
    ),
  });

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="SCANNER"
        component={Scanner}
        options={{
          tabBarLabel: "Scan",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="barcode-scan"
              color={color}
              size={size}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={goBack}>
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={goForward}>
              <MaterialIcons name="arrow-forward" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="KeyPad"
        component={KeyPad}
        options={{
          tabBarLabel: "KeyPad",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="keypad" color={color} size={size} />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={goBack}>
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={goForward}>
              <MaterialIcons name="arrow-forward" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
