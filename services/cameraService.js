import { useState, useEffect, useCallback } from "react";
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

  const handleBarcodeScanned = useCallback(
    ({ type, data }) => {
      if (!isScanningEnabled || !data) return;
      setIsScanningEnabled(false);
      Alert.alert("Barcode Scanned", `Type: ${type}, Data: ${data}`);

      // Re-enable scanning after 3 seconds, ensure cleanup if the component unmounts
      const timer = setTimeout(() => setIsScanningEnabled(true), 3000);

      // Cleanup function
      return () => clearTimeout(timer);
    },
    [isScanningEnabled]
  );

  return {
    permission,
    isScanningEnabled,
    handleBarcodeScanned,
  };
};

export default CameraService;
