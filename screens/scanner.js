import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Alert } from "react-native";
import BarcodeScanner from "../components/BarcodeScanner"; // Adjust this path as necessary
import WebView from "react-native-webview";
import { useNavigationContext } from "../context/NavigationContext";
import BrowserHeader from "../components/BrowserHeader";
import { useCameraService } from "../services/cameraService";

const Scanner = () => {
  const { url, updateUrl, cameraEnabled, webViewRef, cameraDelay } =
    useNavigationContext();
  const [cameraKey, setCameraKey] = useState(0);

  console.log("Current cameraDelay in scanner:", cameraDelay);
  const shouldShowHeader = (url) => {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;
    const pathname = parsedUrl.pathname;

    const isGoogleSearch =
      hostname.includes("google.com") &&
      (pathname === "/search" || pathname === "/");

    const isHomePage = pathname === "/home";

    return isGoogleSearch || isHomePage;
  };

  const handleScanData = (data) => {
    let newData = data.startsWith("0") ? data.substring(1) : data;
    const script = `
    (function() {
      var input = document.querySelector("input[formControlName='search']");
      if (input) {
        input.value = '${newData}';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        var form = input.closest('form');
        if (form) {
          form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        }
        document.activeElement.blur(); // Attempt to blur any currently focused element
      }
    })();
    true;
    `;
    webViewRef.current?.injectJavaScript(script);
    setCameraKey((prevKey) => prevKey + 1);
  };

  // Monitor the navigation state to update the URL accordingly
  const handleNavigationStateChange = (navState) => {
    if (url !== navState.url) {
      updateUrl(navState.url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {shouldShowHeader(url) && (
        <BrowserHeader onUrlSubmit={updateUrl} currentUrl={url} />
      )}
      {cameraEnabled && (
        <BarcodeScanner
          onScan={handleScanData}
          cameraDelay={cameraDelay}
          // isScanningEnabled={isScanningEnabled}
        />
      )}
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        style={styles.webView}
        onNavigationStateChange={handleNavigationStateChange}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          Alert.alert("WebView error", nativeEvent.description);
        }}
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

export default Scanner;
