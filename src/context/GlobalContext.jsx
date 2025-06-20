import { createContext, useState, useEffect } from "react";
const { VITE_API_URL } = import.meta.env;

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch(`${VITE_API_URL}/consultingpackages`)
      .then((res) => res.json())
      .then((data) => setPackages(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <GlobalContext.Provider value={{ packages, setPackages }}>
      {children}
    </GlobalContext.Provider>
  );
}
