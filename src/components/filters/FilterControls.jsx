import { memo } from 'react';

const FilterControls = memo(({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  sortAsc, 
  onSortChange 
}) => {
  return (
    <div className="col-md-4">
      <div className="row g-2">
        <div className="col-6">
          <div className="form-floating">
            <select
              className="form-select"
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
            <label htmlFor="categoryFilter">
              <i className="bi bi-funnel me-2"></i>
              Category
            </label>
          </div>
        </div>

        <div className="col-6">
          <div className="form-floating">
            <button
              className="btn btn-outline-primary w-100 h-100 d-flex align-items-center justify-content-center"
              style={{ minHeight: '58px' }}
              onClick={() => onSortChange(!sortAsc)}
            >
              <i className={`bi bi-sort-alpha-${sortAsc ? 'down' : 'up'} me-2`}></i>
              {sortAsc ? "A → Z" : "Z → A"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default FilterControls;