import "../style/components/FavoriteButton.css";

export default function FavoriteButton({
  packageId,
  isFavorite,
  onToggle,
  size = "normal",
  className = "",
}) {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle(packageId);
  };

  return (
    <button
      className={`favorite-btn ${size} ${className} ${
        isFavorite ? "active" : ""
      }`}
      onClick={handleClick}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        viewBox="0 0 24 24"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        className="bookmark-icon"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
    </button>
  );
}
