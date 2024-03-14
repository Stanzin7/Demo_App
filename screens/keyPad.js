import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import { useNavigationContext } from "../context/NavigationContext"; // Adjusted import to useNavigationContext
import BrowserHeader from "../components/BrowserHeader";

const KeyPad = () => {
  const { url, updateUrl, webViewRef } = useNavigationContext();
  const isHomepage = url.endsWith("/home");
  console.log("Keypad", url);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {isHomepage && <BrowserHeader onUrlSubmit={updateUrl} currentUrl={url} />}
      <View style={styles.inputContainer}></View>
      <WebView style={styles.webview} source={{ uri: url }} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "black",
    paddingBottom: 20,
    marginTop: -60,
    marginBottom: -60,
  },

  inputContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "white",
    marginBottom: -35,
  },
  // Ensure the WebView fills the space without unnecessary coloring, unless it's for loading state.
  webview: {
    flex: 1,
  },
});

export default KeyPad;
