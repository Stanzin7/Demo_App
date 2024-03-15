import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import WebView from "react-native-webview";
import { useNavigationContext } from "../context/NavigationContext";
import BrowserHeader from "../components/BrowserHeader";

const KeyPad = () => {
  const { url, updateUrl, webViewRef, setCameraEnabled } =
    useNavigationContext();
  useEffect(() => {
    setCameraEnabled(false); // This will turn off the camera when the KeyPad is active
  }, [setCameraEnabled]);
  return (
    <SafeAreaView style={styles.container}>
      <BrowserHeader onUrlSubmit={updateUrl} currentUrl={url} />
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        style={styles.webView}
        onNavigationStateChange={(navState) => updateUrl(navState.url)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});

export default KeyPad;
