import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Button } from "react-native";
import BarcodeScanner from "../components/BarcodeScanner"; // Make sure the path matches your project structure
import WebView from "react-native-webview";
import { useNavigationContext } from "../context/NavigationContext"; // Adjust path as needed
import BrowserHeader from "../components/BrowserHeader"; // Adjust path as needed

const Scanner = () => {
  const { url, updateUrl, cameraEnabled, setCameraEnabled, webViewRef } =
    useNavigationContext();
  const [webViewKey, setWebViewKey] = useState(0);
  const [hasScannedOnce, setHasScannedOnce] = useState(false);

  useEffect(() => {
    if (url.includes("/cart/scanner")) {
      setHasScannedOnce(true);
    }
  }, [url]);

  const shouldShowHeader = (url) => {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;
    const pathname = parsedUrl.pathname;

    return (
      hostname.includes("google.com") &&
      (pathname === "/search" || pathname === "/")
    );
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
          document.activeElement.blur();
        }
      })();
      true;

      // After processing, disable the camera
      setCameraEnabled(false);
    
      // Optionally, set a flag indicating the scan was processed, if needed
      setHasScannedOnce(true);
    `;
    webViewRef.current?.injectJavaScript(script);
  };

  const handleNavigationStateChange = (navState) => {
    if (url !== navState.url) {
      updateUrl(navState.url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BrowserHeader onUrlSubmit={updateUrl} currentUrl={url} />
      {cameraEnabled && (
        <BarcodeScanner
          onScan={handleScanData}
          isScanningEnabled={cameraEnabled}
          toggleScanning={() => setCameraEnabled(!cameraEnabled)}
        />
      )}
      {url && (
        <View style={styles.webViewContainer}>
          <WebView
            key={webViewKey}
            ref={webViewRef}
            source={{ uri: url }}
            style={styles.webView}
            onNavigationStateChange={handleNavigationStateChange}
          />
          {hasScannedOnce && url.includes("/cart/scanner") && (
            <View style={styles.scanAgainButton}>
              <Button
                title="Scan"
                onPress={() => {
                  setCameraEnabled(true);
                  // Reactivate scanner as necessary
                }}
                color="black"
              />
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webViewContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  webView: {
    flex: 1,
  },
  scanAgainButton: {
    width: "90%",
    position: "absolute",
    backgroundColor: "orange",
    color: "green",
    bottom: 10,
    alignSelf: "center",
    borderRadius: 5,
    fontWeight: "bold",
  },
});

export default Scanner;
