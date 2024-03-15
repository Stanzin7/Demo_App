import * as React from "react";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import Tabs from "./navigation/Tabs"; // Ensure this is the correct path to your Tabs component
import { NavigationContainer } from "@react-navigation/native";
import { NavigationProvider } from "./context/NavigationContext";

export default function App() {
  return (
    <NavigationProvider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </NavigationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
});
