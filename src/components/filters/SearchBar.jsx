import "./SearchBar.css";

export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="search-bar-input"
      placeholder="Search faculties..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search faculties"
    />
  );
}
