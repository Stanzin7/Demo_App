import { useState, useEffect, useCallback } from "react";
import { Alert, Linking } from "react-native";
import { useCameraPermissions } from "expo-camera/next";

export const useCameraService = () => {
  const [permissions, requestPermission] = useCameraPermissions();
  const [isScanningEnabled, setIsScanningEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      // Automatically request permission if it hasn't been requested yet
      if (permissions.status === "undetermined") {
        await requestPermission();
      }
    })();
  }, [permissions.status, requestPermission]);

  useEffect(() => {
    if (permissions.status === "granted") {
      setIsScanningEnabled(true); // Enable scanning only if permissions are granted
    } else if (permissions.status === "denied") {
      // Alert the user if permissions are denied
      Alert.alert(
        "Camera Permission",
        "Camera permission is required to scan barcodes. Please enable it in the Settings.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() }, // Direct the user to the settings
        ]
      );
    }
  }, [permissions.status]); // Depend on permissions.status to re-check whenever it changes
  const toggleScanning = useCallback(() => {
    if (permissions.status === "granted") {
      setIsScanningEnabled(!isScanningEnabled);
    } else {
      // Alert the user if permissions are not granted
      Alert.alert(
        "Camera Permission Required",
        "You need to grant camera permissions to use this feature.",
        [{ text: "OK", onPress: requestPermission }]
      );
    }
  }, [permissions.status, isScanningEnabled, requestPermission]);
  const handleBarcodeScanned = useCallback(
    ({ type, data }) => {
      if (!isScanningEnabled || !data) return;

      setIsScanningEnabled(false);
      Alert.alert("Barcode Scanned", `Type: ${type}, Data: ${data}`);
    },
    [isScanningEnabled]
  );

  return {
    permissions,
    isScanningEnabled,
    handleBarcodeScanned,
    toggleScanning,
  };
};
