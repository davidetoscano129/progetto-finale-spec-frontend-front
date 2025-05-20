import { memo } from "react";

const SearchBar = memo(({ value, onChange }) => {
  return (
    <div className="col-md-8">
      <div className="form-floating search-container">
        <input
          type="search"
          className="form-control search-input"
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
    </div>
  );
});

export default SearchBar;
