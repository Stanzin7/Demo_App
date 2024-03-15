// NavigationContext.js
import React, { createContext, useContext, useState, useRef } from "react";

const NavigationContext = createContext();

export const useNavigationContext = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const [url, setUrl] = useState("https://www.google.com");
  const [cameraEnabled, setCameraEnabled] = useState(false); // State to control camera
  const webViewRef = useRef(null);

  const updateUrl = (newUrl) => {
    setUrl(newUrl);
  };

  const goBack = () => webViewRef.current?.goBack();
  const goForward = () => webViewRef.current?.goForward();

  return (
    <NavigationContext.Provider
      value={{
        url,
        updateUrl,
        webViewRef,
        goBack,
        goForward,
        cameraEnabled,
        setCameraEnabled,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
