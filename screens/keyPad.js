import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import WebView from "react-native-webview";
import { useNavigationContext } from "../context/NavigationContext";
import BrowserHeader from "../components/BrowserHeader";

const KeyPad = () => {
  const { url, updateUrl } = useNavigationContext(); // Ensure updateUrl is included

  return (
    <SafeAreaView style={styles.container}>
      <BrowserHeader onUrlSubmit={updateUrl} currentUrl={url} />
      <WebView source={{ uri: url }} style={styles.webView} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Adjusted to a more neutral background color
  },
  webView: {
    flex: 1,
  },
});

export default KeyPad;
