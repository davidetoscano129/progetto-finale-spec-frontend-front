import { memo } from "react";
import "./FilterControls.css";

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
        <select
          className="filter-category-select"
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
        <button
          className="filter-sort-btn"
          onClick={() => onSortChange(!sortAsc)}
          type="button"
          aria-label="Toggle alphabetical order"
        >
          {sortAsc ? "A → Z" : "Z → A"}
        </button>
      </div>
    );
  }
);

export default FilterControls;
