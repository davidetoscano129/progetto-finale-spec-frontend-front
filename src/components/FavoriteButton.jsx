import "../style/components/FavoriteButton.css";

export default function FavoriteButton({
  packageId,
  isFavorite,
  onToggle,
  size = "normal",
}) {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle(packageId);
  };

  return (
    <button
      className={`favorite-btn ${size} ${isFavorite ? "active" : ""}`}
      onClick={handleClick}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
}
