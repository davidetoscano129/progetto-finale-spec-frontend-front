import { useRef, useState, useEffect } from "react";
import "../../styles/SearchBar.css";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search faculties...",
  hideLabel = false,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Handle click outside to remove focus styling
  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-bar-container" ref={inputRef}>
      {!hideLabel && (
        <label className="form-label search-label">Search faculties</label>
      )}
      <div className="search-input-wrapper">
        <input
          className={`form-control search-bar-input ${
            isFocused ? "focused" : ""
          }`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          aria-label="Search faculties"
        />
        {value && (
          <button
            className="search-clear-btn"
            onClick={(e) => {
              e.preventDefault();
              onChange("");
            }}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
      {!hideLabel && (
        <small className="text-muted search-help-text">
          Type to filter faculties by name
        </small>
      )}
    </div>
  );
}
