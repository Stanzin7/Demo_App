import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  View,
} from "react-native";
import BarcodeScanner from "../components/BarcodeScanner";
import BrowserHeader from "../components/BrowserHeader";
import { useNavigation } from "../context/NavigationContext"; // Adjust the path as necessary
import WebView from "react-native-webview";
import { MaterialIcons } from "@expo/vector-icons";

const Scanner = () => {
  const webViewRef = useRef(null);
  const [webViewUrl, setWebViewUrl] = useState("https://google.com");
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const { updateUrl } = useNavigation();

  const handleScanData = (data) => {
    let newData =
      data.length === 13 && data.startsWith("0") ? data.substring(1) : data;
    console.log("Scanned data is here:", newData);

    // Inject JavaScript into the WebView to fill the search input with scanned data
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
    setWebViewUrl(newUrl);
    updateUrl(newUrl); // If using a navigation context to track URL changes
    const isScannerPage = newUrl.includes("/cart/scanner");
    setCameraEnabled(isScannerPage);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BrowserHeader onUrlSubmit={setWebViewUrl} inputValue={webViewUrl} />
      {cameraEnabled && <BarcodeScanner onScan={handleScanData} />}
      <WebView
        ref={webViewRef}
        style={{ flex: 1 }}
        source={{ uri: webViewUrl }}
        javaScriptEnabled={true}
        onNavigationStateChange={handleNavigationStateChange}
      />
      <TouchableOpacity
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
      </TouchableOpacity>
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
