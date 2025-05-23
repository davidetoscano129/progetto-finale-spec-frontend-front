import { memo } from "react";
import "./SearchBar.css";

const SearchBar = memo(({ value, onChange }) => {
  return (
    <div className="search-container">
      <input
        type="search"
        className="search-input hero-search-input"
        id="searchFaculties"
        placeholder="Search faculties..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search faculties"
      />
      <label htmlFor="searchFaculties" className="search-label">
        <span className="search-icon" aria-hidden="true">🔍</span>
        Search faculties...
      </label>
    </div>
  );
});

export default SearchBar;
