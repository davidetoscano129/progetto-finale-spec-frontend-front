import { memo } from "react";
import "./SearchBar.css";

const SearchBar = memo(({ value, onChange }) => {
  return (
    <div className="form-floating search-container">
      <input
        type="search"
        className="form-control search-input hero-search-input"
        id="searchFaculties"
        placeholder="Search in titles..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search faculties"
      />
      <label htmlFor="searchFaculties">
        <i className="bi bi-search me-2"></i>
        Search faculties...
      </label>
    </div>
  );
});

export default SearchBar;
