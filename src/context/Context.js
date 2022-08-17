import React, { createContext, useState, useEffect } from "react";
import { getStorage, setStorage } from "../utils/localstorage-utils";

export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [role, setRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getStorage("user_token");
    const role = getStorage("role");
    if (token) {
      setIsLoggedIn(true);
      setRole(role);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <AppContext.Provider value={{ role, setRole, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
}
