import React, { createContext, useContext } from "react";
import { isMobile as detectIsMobile } from "react-device-detect";

const MobileContext = createContext();

export const MobileProvider = ({ children }) => {
  const isMobile = detectIsMobile;
  return <MobileContext.Provider value={isMobile}>{children}</MobileContext.Provider>;
};

export const useIsMobile = () => {
  const isMobile = useContext(MobileContext);
  if (isMobile === undefined) {
    throw new Error("useIsMobile must be used within a MobileProvider");
  }
  return isMobile;
};
