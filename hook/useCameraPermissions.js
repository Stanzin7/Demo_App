import { useCameraPermissions } from "expo-camera/next";

export const useCustomCameraPermissions = () => {
  const [permission, requestPermission] = useCameraPermissions();
  return { permission, requestPermission };
};
