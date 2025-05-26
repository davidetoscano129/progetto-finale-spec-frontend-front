import "./CategoryFilter.css";

export default function CategoryFilter({ categories, value, onChange }) {
  return (
    <select
      className="form-select category-dropdown"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Filter by category"
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}
