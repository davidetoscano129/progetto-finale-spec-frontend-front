import { createContext } from "react";
import useFaculties from "../hooks/useFaculties";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const facultiesData = useFaculties();

  return (
    <GlobalContext.Provider value={{ ...facultiesData }}>
      {children}
    </GlobalContext.Provider>
  );
}
