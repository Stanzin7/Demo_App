import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useCameraPermissions } from "expo-camera/next";

const CameraService = () => {
  const [permission, requestPermission] = useCameraPermissions();
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

  const handleBarcodeScanned = ({ type, data }) => {
    if (!isScanningEnabled || !data) return;
    setIsScanningEnabled(false);
    Alert.alert("Barcode Scanned", `Type: ${type}, Data: ${data}`);

    // Re-enable scanning after 3 seconds
    const timer = setTimeout(() => {
      setIsScanningEnabled(true);
    }, 3000);

    // Cleanup function in useEffect hook
    return () => clearTimeout(timer);
  };

  return {
    permission,
    isScanningEnabled,
    handleBarcodeScanned,
  };
};

export default CameraService;
