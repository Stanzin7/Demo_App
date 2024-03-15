import React from "react";
import { SafeAreaView, StyleSheet, Alert } from "react-native";
import BarcodeScanner from "../components/BarcodeScanner"; // Adjust this path as necessary
import WebView from "react-native-webview";
import { useNavigationContext } from "../context/NavigationContext";
import BrowserHeader from "../components/BrowserHeader";

const Scanner = () => {
  const { url, updateUrl, cameraEnabled, webViewRef } = useNavigationContext();

  const shouldShowHeader = (url) => {
    // Parse the URL to get the hostname and pathname
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;
    const pathname = parsedUrl.pathname;

    // Check if the URL is on google.com, potentially with a search path or query
    const isGoogleSearch =
      hostname.includes("google.com") &&
      (pathname === "/search" || pathname === "/");

    // Check if the pathname is '/home'
    const isHomePage = pathname === "/home";

    // Show header if it's a Google search or the home page
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
        input.blur(); // This line is added to blur the input field and prevent the keyboard from showing
      }
    })();
    true;
  `;
    webViewRef.current?.injectJavaScript(script);
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
      {cameraEnabled && <BarcodeScanner onScan={handleScanData} />}
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
