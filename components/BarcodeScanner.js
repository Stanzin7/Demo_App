import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, Alert, Text, Button } from "react-native";
import { CameraView } from "expo-camera/next";
import { useCustomCameraPermissions } from "../hook/useCameraPermissions";

const BarcodeScanner = ({ onScan }) => {
  const { permission, requestPermission } = useCustomCameraPermissions();
  const [isScanningEnabled, setIsScanningEnabled] = useState(true);

  const handleBarcodeScanned = ({ type, data }) => {
    if (!isScanningEnabled || !data) return;

    setIsScanningEnabled(false); // Disable scanning temporarily
    onScan(data); // Send scanned data up to parent component for processing

    // Re-enable scanning after a short delay to prevent immediate re-triggering
    setTimeout(() => {
      setIsScanningEnabled(true);
    }, 3000); // Adjust delay as needed
  };

  // Request camera permission on mount
  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <Button title="Allow Camera" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <CameraView
      style={styles.camera}
      onBarcodeScanned={isScanningEnabled ? handleBarcodeScanned : undefined}
    >
      <View style={styles.overlay}>
        <View style={styles.frame} />
      </View>
    </CameraView>
  );
};

const styles = StyleSheet.create({
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
});

export default BarcodeScanner;
