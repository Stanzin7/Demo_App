// NavigationContext.js
import React, { createContext, useContext, useState, useRef } from "react";

const NavigationContext = createContext();

export const useNavigationContext = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const [url, setUrl] = useState("");
  const webViewRef = useRef(null);

  const updateUrl = (newUrl) => {
    setUrl(newUrl);
  };

  const goBack = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
    }
  };

  const goForward = () => {
    if (webViewRef.current) {
      webViewRef.current.goForward();
    }
  };

  return (
    <NavigationContext.Provider
      value={{ url, updateUrl, webViewRef, goBack, goForward }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
