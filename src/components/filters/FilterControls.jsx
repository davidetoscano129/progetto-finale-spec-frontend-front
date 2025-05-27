import { memo } from "react";
import "../../styles/FilterControls.css";

const FilterControls = memo(
  ({
    categories,
    selectedCategory,
    onCategoryChange,
    sortAsc,
    onSortChange,
  }) => {
    return (
      <div className="filter-controls">
        <div className="form-group">
          <select
            className="form-select filter-category-select"
            id="categoryFilter"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            aria-label="Filter faculties by category"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <button
          className="btn btn-outline-secondary filter-sort-btn"
          onClick={() => onSortChange(!sortAsc)}
          type="button"
          aria-label={sortAsc ? "Sort Z to A" : "Sort A to Z"}
        >
          {sortAsc ? "A → Z" : "Z → A"}
        </button>
      </div>
    );
  }
);

FilterControls.displayName = "FilterControls";

export default FilterControls;
