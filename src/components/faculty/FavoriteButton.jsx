import { useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";

export default function FavoriteButton({ faculty }) {
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const isFav = isFavorite(faculty.id);

  return (
    <button
      className={`btn btn-${isFav ? "danger" : "outline-danger"} btn-sm favorite-btn`}
      onClick={() => toggleFavorite(faculty)}
      title={isFav ? "Remove from favorites" : "Add to favorites"}
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={isFav}
    >
      <i 
        className={`bi bi-heart${isFav ? "-fill" : ""}`}
        aria-hidden="true"
      />
    </button>
  );
}
