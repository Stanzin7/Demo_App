import * as React from "react";
import { WebView } from "react-native-webview";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import Tabs from "./navigation/Tabs";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    // <WebView
    //   style={styles.container}
    //   source={{ uri: "https://www.socksgalorews.com/cart/scanner" }}
    // />
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
