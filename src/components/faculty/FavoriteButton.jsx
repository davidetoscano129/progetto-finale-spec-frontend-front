import React from "react";
import useFavorites from "../../hooks/useFavorites";
import "../../styles/FavoriteButton.css";

const FavoriteButton = ({ faculty }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(faculty.id);

  return (
    <button
      type="button"
      className={`favorite-btn ${isFav ? "favorite-btn-active" : ""}`}
      onClick={(e) => toggleFavorite(faculty, e)}
      title={isFav ? "Remove from saved" : "Save this faculty"}
      aria-label={isFav ? "Remove from saved" : "Save this faculty"}
      aria-pressed={isFav}
    >
      <i className={`bi ${isFav ? "bi-bookmark-fill" : "bi-bookmark"}`}></i>
    </button>
  );
};

export default React.memo(FavoriteButton);
