import React, { useState, useRef } from "react";
import { SafeAreaView, StyleSheet, Alert } from "react-native";
import BarcodeScanner from "../components/BarcodeScanner"; // Adjust path as necessary
import WebView from "react-native-webview";
import { useNavigationContext } from "../context/NavigationContext"; // Adjust the path as necessary
import BrowserHeader from "../components/BrowserHeader";

const Scanner = () => {
  const webViewRef = useRef(null);
  const { url, updateUrl } = useNavigationContext();
  const [cameraEnabled, setCameraEnabled] = useState(false);

  const handleScanData = (data) => {
    let newData = data.startsWith("0") ? data.substring(1) : data;
    const script = `
      (function() {
        var inputs = document.querySelectorAll("input[formControlName='search']");
        var newData = '${newData}';
        if(inputs.length > 0) {
          var input = inputs[0];
          input.value = newData;
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.setAttribute('readonly', true);
        }
      })();
      true;
    `;
    webViewRef.current?.injectJavaScript(script);
  };

  const handleNavigationStateChange = (navState) => {
    const newUrl = navState.url;
    if (url !== newUrl) {
      updateUrl(newUrl);
      const isScannerPage = newUrl.includes("/cart/scanner");
      setCameraEnabled(isScannerPage);
    }
  };

  const handleWebViewError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    Alert.alert("WebView error", nativeEvent.description);
  };
  const isHomepage = url.endsWith("/home") || url.endsWith("/");

  return (
    <SafeAreaView style={styles.container}>
      {isHomepage && <BrowserHeader onUrlSubmit={updateUrl} currentUrl={url} />}
      {cameraEnabled && <BarcodeScanner onScan={handleScanData} />}
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        style={styles.webView}
        javaScriptEnabled={true}
        onNavigationStateChange={handleNavigationStateChange}
        onError={handleWebViewError}
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
