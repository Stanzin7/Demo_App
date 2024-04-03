import React, { createContext, useContext, useState, useRef } from "react";

const NavigationContext = createContext();

export const useNavigationContext = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const [url, setUrl] = useState(""); // Set your default URL
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const webViewRef = useRef(null);

  const updateUrl = (newUrl) => {
    setUrl(newUrl);
  };

  const toggleCameraEnabled = () => {
    setCameraEnabled(!cameraEnabled);
  };

  return (
    <NavigationContext.Provider
      value={{
        url,
        updateUrl,
        cameraEnabled,
        setCameraEnabled: toggleCameraEnabled,
        webViewRef,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
