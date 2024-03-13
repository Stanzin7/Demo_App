import React, { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const [url, setUrl] = useState("https://www.google.com");

  const updateUrl = (newUrl) => {
    setUrl(newUrl);
  };

  return (
    <NavigationContext.Provider value={{ url, updateUrl }}>
      {children}
    </NavigationContext.Provider>
  );
};
