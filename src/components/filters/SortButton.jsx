import "./SortButton.css";

export default function SortButton({ asc, onToggle }) {
  return (
    <button
      className="btn btn-outline-secondary sort-button"
      onClick={onToggle}
      aria-label={asc ? "Sort Z to A" : "Sort A to Z"}
    >
      <i className={`bi ${asc ? "bi-sort-alpha-down" : "bi-sort-alpha-up-alt"} me-2`}></i>
      <span className="sort-button-icon">
        {asc ? "A-Z" : "Z-A"}
      </span>
    </button>
  );
}
