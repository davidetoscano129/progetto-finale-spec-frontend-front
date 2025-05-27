import { useContext, useCallback } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

export default function useFavorites() {
  const { favorites, toggleFavorite, isFavorite } =
    useContext(FavoritesContext);

  const handleToggleFavorite = useCallback(
    (faculty, event) => {
      if (event) {
        event.stopPropagation();
      }
      toggleFavorite(faculty);
    },
    [toggleFavorite]
  );

  return {
    favorites,
    isFavorite,
    toggleFavorite: handleToggleFavorite,
  };
}
