import { useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";

const FavoriteButton = ({ faculty, onClick }) => {
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const isFav = isFavorite(faculty.id);

  const handleClick = (event) => {
    event.stopPropagation();
    if (onClick) onClick(event);
  };

  return (
    <button
      type="button"
      className={`btn btn-${isFav ? "danger" : "outline-danger"} btn-sm favorite-btn`}
      onClick={(e) => {
        handleClick(e);
        toggleFavorite(faculty);
      }}
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
};

export default FavoriteButton;
