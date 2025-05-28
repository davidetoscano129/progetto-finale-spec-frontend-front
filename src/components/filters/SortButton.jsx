import "../../styles/SortButton.css";

export default function SortButton({ asc, onToggle }) {
  return (
    <button
      className="sort-button"
      onClick={onToggle}
      title={asc ? "Sort Z to A" : "Sort A to Z"}
      aria-label={asc ? "Sort Z to A" : "Sort A to Z"}
    >
      <i
        className={`bi ${
          asc ? "bi-sort-alpha-down" : "bi-sort-alpha-up-alt"
        } sort-button-icon ${asc ? "asc" : "desc"}`}
      ></i>
    </button>
  );
}
