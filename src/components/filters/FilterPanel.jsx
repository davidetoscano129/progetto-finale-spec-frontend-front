import React from "react";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";

const FilterPanel = ({
  searchTerm,
  onSearch,
  categories,
  selectedCategory,
  onCategoryChange,
  sortAsc,
  onSortToggle,
  searchPlaceholder = "Type to search faculties...",
  searchLabel = "Search faculties",
  categoryLabel = "Filter by category",
}) => {
  return (
    <div className="filters-container">
      <div className="filter-group">
        <label className="form-label">
          <i className="bi bi-search me-2"></i>
          {searchLabel}
        </label>
        <div className="search-container">
          <SearchBar
            value={searchTerm}
            onChange={onSearch}
            placeholder={searchPlaceholder}
            hideLabel={true}
          />
        </div>
      </div>

      <div className="filter-group">
        <label className="form-label">
          <i className="bi bi-filter me-2"></i>
          {categoryLabel}
        </label>
        <CategoryFilter
          categories={categories}
          value={selectedCategory}
          onChange={onCategoryChange}
        />
      </div>
    </div>
  );
};

export default React.memo(FilterPanel);
