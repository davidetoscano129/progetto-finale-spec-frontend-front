import { useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";

export default function FavoriteButton({ faculty }) {
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

  return (
    <button
      className={`btn btn-${isFavorite(faculty.id) ? "danger" : "outline-danger"} btn-sm`}
      onClick={() => toggleFavorite(faculty)}
    >
      <i className={`bi bi-heart${isFavorite(faculty.id) ? "-fill" : ""}`}></i>
    </button>
  );
}