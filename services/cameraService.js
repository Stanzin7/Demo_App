// useCameraService.js
import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useCameraPermissions } from "expo-camera/next";

const CameraService = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanningEnabled, setIsScanningEnabled] = useState(true);

  const handleBarcodeScanned = ({ type, data }) => {
    if (!isScanningEnabled || !data) return;

    setIsScanningEnabled(false);
    // Add your barcode processing logic here
    Alert.alert("Barcode Scanned", `Type: ${type}, Data: ${data}`);
    // Re-enable scanning after 3 seconds
    setTimeout(() => setIsScanningEnabled(true), 3000);
  };

  return {
    permission,
    requestPermission,
    isScanningEnabled,
    handleBarcodeScanned,
  };
};

export default CameraService;
