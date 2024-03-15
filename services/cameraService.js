// Rename CameraService to useCameraService to follow React hook naming convention
import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import { useCameraPermissions } from "expo-camera/next";

export const useCameraService = ({ cameraDelay = 3000 }) => {
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
      // console.log("CameraService here", cameraDelay);
    })();
  }, [requestPermission, cameraDelay]); // Add cameraDelay to useEffect dependencies if its value affects this effect

  const handleBarcodeScanned = useCallback(
    ({ type, data }) => {
      if (!isScanningEnabled || !data) return;

      setIsScanningEnabled(false);
      Alert.alert("Barcode Scanned", `Type: ${type}, Data: ${data}`);

      const timer = setTimeout(() => {
        setIsScanningEnabled(true);
      }, cameraDelay);

      return () => clearTimeout(timer);
    },
    [cameraDelay, isScanningEnabled]
  );

  return { permissions, isScanningEnabled, handleBarcodeScanned };
};
