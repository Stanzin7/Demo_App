import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import { useCameraPermissions } from "expo-camera/next";

const CameraService = ({ cameraDelay }) => {
  const [permissions, requestPermission] = useCameraPermissions();
  const [isScanningEnabled, setIsScanningEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await requestPermission();
      if (status === "granted") {
        setIsScanningEnabled(true); // Enable scanning only if permissions are granted
      } else {
        Alert.alert(
          "Camera Permission",
          "Camera permission is required to scan barcodes."
        );
      }
    })();
  }, [requestPermission]);

  // Define a method to handle the barcode scanned event
  const handleBarcodeScanned = useCallback(
    ({ type, data }) => {
      if (!isScanningEnabled || !data) return;

      // Immediately disable scanning to prevent duplicate scans
      setIsScanningEnabled(false);

      // Show an alert or handle the scanned data
      Alert.alert("Barcode Scanned", `Type: ${type}, Data: ${data}`);

      // Set a timeout to re-enable scanning after the user-defined delay
      const timer = setTimeout(() => {
        setIsScanningEnabled(true);
      }, cameraDelay);

      // Cleanup function to clear the timer
      return () => clearTimeout(timer);
    },
    [cameraDelay, isScanningEnabled]
  );

  // Return the camera permissions, scanning enabled state, and the scanning handler
  return {
    permissions,
    isScanningEnabled,
    handleBarcodeScanned,
  };
};

export default CameraService;
