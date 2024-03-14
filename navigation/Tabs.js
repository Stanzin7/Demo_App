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

export default function Tabs() {
  const { goBack, goForward } = useNavigationContext();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="SCANNER"
        component={Scanner}
        options={{
          tabBarLabel: "Scan",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="barcode-scan"
              size={size}
              color={color}
            />
          ),
          headerStyle: {
            backgroundColor: "#007AFF",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: "Scanner",
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
          headerStyle: {
            backgroundColor: "#007AFF",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: "KeyPad", // Fixed to match the KeyPad screen title
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
}
