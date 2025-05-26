import { useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";
import "./FavoriteButton.css";

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
      className={`favorite-btn ${isFav ? 'favorite-btn-active' : ''}`}
      onClick={(e) => {
        handleClick(e);
        toggleFavorite(faculty);
      }}
      title={isFav ? "Remove from saved" : "Save this faculty"}
      aria-label={isFav ? "Remove from saved" : "Save this faculty"}
      aria-pressed={isFav}
    >
      <i className={`bi ${isFav ? 'bi-bookmark-fill' : 'bi-bookmark'}`}></i>
    </button>
  );
};

export default FavoriteButton;
