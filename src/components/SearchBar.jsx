export default function SearchBar({ onSearch, placeholder = "Search..." }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}