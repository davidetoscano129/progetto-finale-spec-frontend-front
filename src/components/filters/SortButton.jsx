import "./SortButton.css";

export default function SortButton({ asc, onToggle }) {
  return (
    <button
      className={`sort-btn sort-btn--small${asc ? " active" : ""}`}
      onClick={onToggle}
      aria-label="Toggle alphabetical order"
      type="button"
    >
      {asc ? "A→Z" : "Z→A"}
    </button>
  );
}
