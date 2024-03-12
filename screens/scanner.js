import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  Alert,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera/next";
import WebView from "react-native-webview";

const Scanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [adjustedData, setAdjustedData] = useState("");
  const webViewRef = useRef(null);
  const [cameraEnabled, setCameraEnabled] = useState(false);

  const handleBarcodeScanned = ({ type, data }) => {
    const newData =
      data.length === 13 && data.startsWith("0") ? data.substring(1) : data;
    setAdjustedData(newData);
    console.log("Scanned data is here:", newData);

    if (newData.length < 12) {
      Alert.alert("Please enter the Item No in KeyPad");
      return;
    }

    // Inject JavaScript to fill in the scanned data into the web page
    const script = `
    (function() {
      const inputs = ['mat-input-1', 'mat-input-2', 'mat-input-3', 'mat-input-4'];
      const data = '${newData}';
      for (let i = 0; i < inputs.length; i++) {
        const input = document.getElementById(inputs[i]);
        if (input) {
          input.value = data;
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.setAttribute('readonly', true); 
          break; 
        }
      }
    })();
    true; 
  `;
    webViewRef.current.injectJavaScript(script);
  };

  const clearInputScript = `
    document.querySelector('form').addEventListener('submit', function() {
      setTimeout(function() {
        document.getElementById('mat-input-1').value = '';
      }, 500); 
    });
    true;
  `;

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <Button title="Allow Camera" onPress={requestPermission} />
      </View>
    );
  }
  const handleNavigationStateChange = (navState) => {
    // Check if the current URL ends with '/cart/scanner'
    const url = navState.url;
    const isScannerPage = url.endsWith("/cart/scanner");
    setCameraEnabled(isScannerPage); // Enable camera if on scanner page
  };

  const handleScanAgainPress = () => {
    setAdjustedData("");
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
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
        source={{ uri: "https://google.com" }}
        javaScriptEnabled={true}
        injectedJavaScript={clearInputScript}
        onNavigationStateChange={handleNavigationStateChange} // Track URL changes
      />

      {/* <View style={styles.buttonContainer}>
        <Button
          color={"black"}
          title="Scan Again"
          onPress={handleScanAgainPress}
        />
      </View> */}
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
});

export default Scanner;
