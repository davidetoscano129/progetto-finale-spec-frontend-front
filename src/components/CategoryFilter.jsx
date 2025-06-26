import "../style/components/CategoryFilter.css";

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  loading 
}) {
  return (
    <div className="category-filter">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        disabled={loading}
        className="category-select"
      >
        <option value="">
          {loading ? "Loading categories..." : "All Categories"}
        </option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}