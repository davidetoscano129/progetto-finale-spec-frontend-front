import CategoryFilter from "./CategoryFilter";
import "../style/components/SearchBar.css";

export default function SearchBar({
  onSearch,
  placeholder = "Search...",
  categories,
  selectedCategory,
  onCategoryChange,
  categoriesLoading,
}) {
  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        loading={categoriesLoading}
      />
    </div>
  );
}
