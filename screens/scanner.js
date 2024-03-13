import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera/next";
import { MaterialIcons } from "@expo/vector-icons";
import WebView from "react-native-webview";
import BrowserHeader from "../components/BrowserHeader"; // Assuming BrowserHeader is the correct component

const Scanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const webViewRef = useRef(null);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState("https://www.google.com");
  const [isScanningEnabled, setIsScanningEnabled] = useState(true);

  const handleBarcodeScanned = ({ type, data }) => {
    if (!isScanningEnabled || !data) return;

    setIsScanningEnabled(false);
    let newData =
      data.length === 13 && data.startsWith("0") ? data.substring(1) : data;
    console.log("Scanned data is here:", newData);

    const script = `
    (function() {
      var inputs = document.querySelectorAll("input[formControlName='search']");
      var newData = '${newData}';
      if(inputs.length > 0) {
        var input = inputs[0];
        input.value = newData;
        input.dispatchEvent(new Event('input', { bubbles: true }));     
        input.setAttribute('readonly', true);

        // Clear the input after 3 seconds
        setTimeout(function() {
          input.value = "";
          input.removeAttribute('readonly'); // Remove readonly attribute after clearing
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }, 2000);
      }
    })();
    true; 
  `;
    webViewRef.current?.injectJavaScript(script);
    setTimeout(() => setIsScanningEnabled(true), 3000);
  };

  const handleNavigationStateChange = (navState) => {
    const url = navState.url;
    setWebViewUrl(url); // Update the URL bar with the current page's URL
    const isScannerPage = url.endsWith("/cart/scanner");
    setCameraEnabled(isScannerPage);
  };

  const onUrlSubmit = (url) => {
    // Ensure the URL starts with 'http://' or 'https://'
    const formattedUrl = url.match(/^http[s]?:\/\//) ? url : `https://${url}`;
    setWebViewUrl(formattedUrl);
  };

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <Button title="Allow Camera" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <BrowserHeader
        onUrlSubmit={onUrlSubmit} // Update WebView URL when the user submits a new URL
        inputValue={webViewUrl} // Pass the current URL to display in the URL bar
      />
      <View style={styles.container}>
        {cameraEnabled && (
          <CameraView
            style={styles.camera}
            onBarcodeScanned={handleBarcodeScanned}
          >
            <View style={styles.overlay}>
              <View style={styles.frame} />
            </View>
          </CameraView>
        )}
      </View>
      <WebView
        ref={webViewRef}
        style={styles.webview}
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
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  container: {
    alignItems: "center",
  },
  camera: {
    width: "100%",
    height: 100,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  frame: {
    width: 350,
    height: 50,
    borderWidth: 2,
    borderColor: "#FF0000",
    backgroundColor: "transparent",
  },
  buttonContainer: {
    width: "90%",
    position: "absolute",
    backgroundColor: "orange",
    bottom: 10,
    alignSelf: "center",
    borderRadius: 5,
  },
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
    shadowColor: "#000000",
    shadowOffset: { height: 3, width: 0 },
    elevation: 6, // for Android shadow
  },
  leftFab: {
    left: 20,
  },
  rightFab: {
    right: 20,
  },
});

export default Scanner;
