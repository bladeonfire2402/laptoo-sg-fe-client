/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

export const AppContext = createContext<{
  initJs?: boolean;
  setInitJs?: any;
  loading?: boolean;
  setLoading?: Dispatch<SetStateAction<boolean | undefined>>;
  user?: any;
  setUser?: any;
  product?: any;
  setProduct?: any;
  userInitialized?: boolean;
}>({
  loading: false,
});

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>();
  const [initJs, setInitJs] = useState<boolean>();
  const [user, setUser] = useState<any>()
  const [product, setProduct] = useState<any>([]);
  const [userInitialized, setUserInitialized] = useState(false);

  useEffect(() => {
    const rawUser = localStorage.getItem("user");
    if (rawUser) {
      try {
        setUser(JSON.parse(rawUser));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }

    setUserInitialized(true); // <== QUAN TRỌNG
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        initJs,
        setInitJs,
        user,
        setUser,
        product,
        setProduct,
        userInitialized
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ClientProvider;
