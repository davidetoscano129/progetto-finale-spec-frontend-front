import { createContext } from "react";
import usePackages from "../hooks/usePackages";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const packagesFetch = usePackages();

  return (
    <GlobalContext.Provider value={{ ...packagesFetch }}>
      {children}
    </GlobalContext.Provider>
  );
}
