import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

const NavigationContext = createContext();

export const useNavigationContext = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const [url, setUrl] = useState("https://www.google.com");
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [cameraDelay, setCameraDelay] = useState(3000);
  const webViewRef = useRef(null);

  useEffect(() => {
    // Automatically enable the camera when navigating to the scan page
    const enableCameraForScanPage = url.includes("/cart/scan");
    setCameraEnabled(enableCameraForScanPage);
  }, [url]);

  useEffect(() => {
    console.log("Initial cameraDelay in context:", cameraDelay);
  }, []);

  const updateUrl = (newUrl) => {
    setUrl(newUrl);
  };

  const goBack = () => {
    if (webViewRef.current) webViewRef.current.goBack();
  };

  const goForward = () => {
    if (webViewRef.current) webViewRef.current.goForward();
  };

  return (
    <NavigationContext.Provider
      value={{
        url,
        updateUrl,
        cameraEnabled,
        setCameraEnabled,
        setCameraDelay,
        webViewRef,
        goBack,
        goForward,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;
