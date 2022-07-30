import React, { createContext, useState } from "react";

export const Token = createContext();

const Context = ({ children }) => {
  const [token, setToken] = useState("");

  return (
    <Token.Provider value={{ token, setToken }}>{children}</Token.Provider>
  );
};

export default Context;
