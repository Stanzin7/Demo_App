import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useCameraPermissions } from "expo-camera/next";

const CameraService = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanningEnabled, setIsScanningEnabled] = useState(false); // Initially set to false, enable after permissions are granted

  useEffect(() => {
    // Automatically request permissions when the hook is used
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

  // This function should be called when a barcode is scanned.
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

  // If there's any other state or side effects you want to clean up,
  // it should be managed in a separate useEffect hook.

  return {
    permission,
    isScanningEnabled,
    handleBarcodeScanned,
  };
};

export default CameraService;
