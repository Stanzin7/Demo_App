import React, { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

export const useNavigationContext = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const [url, setUrl] = useState("");

  const updateUrl = (newUrl) => {
    setUrl(newUrl);
  };

  return (
    <NavigationContext.Provider value={{ url, updateUrl }}>
      {children}
    </NavigationContext.Provider>
  );
};
