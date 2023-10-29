import React, { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext<any>();

export const GlobalStateProvider = ({ children }) => {
  const [genImage1, setGenImage1] = useState<string | null>(null);
  const [genImage2, setGenImage2] = useState<string | null>(null);
  const [genImage3, setGenImage3] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  return (
    <GlobalStateContext.Provider
      value={
        {
          genImage1,
          setGenImage1,
          genImage2,
          setGenImage2,
          genImage3,
          setGenImage3,
          username,
          setUsername,
        } as any
      }
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
