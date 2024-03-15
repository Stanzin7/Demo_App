import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Tabs from "./navigation/Tabs"; // Ensure this is the correct path to your Tabs component
import { NavigationProvider } from "./context/NavigationContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationProvider>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </NavigationProvider>
    </SafeAreaProvider>
  );
}
