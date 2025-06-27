import { createContext, useState, useEffect } from "react";
import usePackages from "../hooks/usePackages";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const packagesFetch = usePackages();
  const [favorites, setFavorites] = useState([]);

  // Load bookmarks from localStorage on startup
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save bookmarks to localStorage when they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (packageId) => {
    return favorites.includes(packageId);
  };

  const toggleFavorite = (packageId) => {
    setFavorites((prev) => {
      if (prev.includes(packageId)) {
        return prev.filter((id) => id !== packageId);
      } else {
        return [...prev, packageId];
      }
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        ...packagesFetch,
        favorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
