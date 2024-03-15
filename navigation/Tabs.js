// Tabs.js
import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import {
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { useNavigationContext } from "../context/NavigationContext";
import Scanner from "../screens/Scanner";
import KeyPad from "../screens/KeyPad";
import SetDelayModal from "../components/ModalComponent";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { url, goBack, goForward, cameraDelay, setCameraDelay } =
    useNavigationContext();
  const [isModalVisible, setModalVisible] = useState(false);

  console.log(cameraDelay);
  //handle errors
  // const { cameraDelay: contextCameraDelay } = useNavigationContext();
  // const cameraDelay =
  //   contextCameraDelay !== undefined ? contextCameraDelay : 3000;

  // useEffect(() => {
  //   console.log("Component received updated cameraDelay:", cameraDelay);
  // }, []);

  const shouldShowTabBar = url.endsWith("/");
  const screenOptions = ({ route }) => ({
    tabBarStyle: url.includes("/cart/scanner") ? { display: "none" } : {},
    headerStyle: { backgroundColor: "#007AFF" },
    headerTintColor: "#fff",
    headerTitleStyle: { fontWeight: "bold", fontSize: 15 },
    headerLeft: () =>
      !url.includes("/cart/scanner") && (
        <TouchableOpacity onPress={goBack}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      ),
    headerRight: () =>
      url.includes("/cart/scanner") ? (
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Entypo name="dots-three-horizontal" size={24} color="white" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={goForward}>
          <MaterialIcons name="arrow-forward" size={24} color="white" />
        </TouchableOpacity>
      ),
  });

  return (
    <>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Scanner"
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
          }}
        />
      </Tab.Navigator>
      <SetDelayModal
        isVisible={isModalVisible}
        currentDelay={cameraDelay}
        onClose={() => setModalVisible(false)}
        onSetDelay={(newDelay) => {
          console.log("Updating context with new delay:", newDelay);
          setCameraDelay(newDelay);
          setModalVisible(false);
        }}
      />
    </>
  );
};

export default Tabs;
