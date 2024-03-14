import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import BarcodeScanner from "../components/BarcodeScanner";
import BrowserHeader from "../components/BrowserHeader";
import { useNavigationContext } from "../context/NavigationContext"; // Adjust the path as necessary
import WebView from "react-native-webview";
import { MaterialIcons } from "@expo/vector-icons";

const Scanner = () => {
  // const webViewRef = useRef(null);
  const { url, updateUrl, webViewRef } = useNavigationContext(); // Use the global URL from the NavigationContext
  const [cameraEnabled, setCameraEnabled] = useState(false);

  // useEffect(() => {
  //   // This effect ensures the WebView loads the current global URL on mount and when it changes
  //   webViewRef.current?.reload();
  // }, [url]);

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
    // Only update the URL if it has actually changed
    if (url !== newUrl) {
      updateUrl(newUrl);
      const isScannerPage = newUrl.includes("/cart/scanner");
      setCameraEnabled(isScannerPage);
    }
  };
  const isHomepage = url.endsWith("/home");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isHomepage && <BrowserHeader onUrlSubmit={updateUrl} currentUrl={url} />}
      {cameraEnabled && <BarcodeScanner onScan={handleScanData} />}
      <WebView
        ref={webViewRef}
        source={{ uri: url }} // Use the global URL
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        onNavigationStateChange={handleNavigationStateChange}
      />
      {/* <TouchableOpacity
        onPress={() => webViewRef.current?.goBack()}
        style={[styles.fab, styles.leftFab]}
      >
        <MaterialIcons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => webViewRef.current?.goForward()}
        style={[styles.fab, styles.rightFab]}
      >
        <MaterialIcons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF",
    bottom: 20,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowColor: "#000",
    shadowOffset: { height: 3, width: 0 },
    elevation: 6,
  },
  leftFab: {
    left: 20,
  },
  rightFab: {
    right: 20,
  },
});

export default Scanner;
