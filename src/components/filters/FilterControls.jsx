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
        <div className="form-floating flex-grow-1">
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
          <label htmlFor="categoryFilter" className="text-white">
            <i className="bi bi-funnel me-2"></i>
            Category
          </label>
        </div>
        <button
          className="btn filter-sort-btn d-flex align-items-center justify-content-center"
          onClick={() => onSortChange(!sortAsc)}
          type="button"
        >
          {sortAsc ? "A → Z" : "Z → A"}
        </button>
      </div>
    );
  }
);

export default FilterControls;
