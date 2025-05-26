import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import CategoryFilter from "../filters/CategoryFilter";
import "./ComparatorButton.css";

const ComparatorButton = ({ faculty, onCompare }) => {
  const { faculties } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Use useRef to keep track of the last comparison value without causing re-renders
  const lastCompareRef = useRef(null);

  // Store filtered faculties to avoid expensive recalculations on each render
  const otherFaculties = useMemo(() => {
    return faculties.filter((f) => f.id !== faculty.id);
  }, [faculties, faculty.id]);

  // Store categories to avoid recreating the array on each render
  const categories = useMemo(() => {
    return [...new Set(otherFaculties.map((f) => f.category))];
  }, [otherFaculties]);

  // Filter faculties based on search criteria
  const filteredFaculties = useMemo(() => {
    let result = otherFaculties;
    
    // Filter by category if selected
    if (selectedCategory) {
      result = result.filter((f) => f.category === selectedCategory);
    }
    
    // Filter by search term if present
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (f) =>
          f.title.toLowerCase().includes(term) ||
          f.category.toLowerCase().includes(term)
      );
    }
    
    return result;
  }, [otherFaculties, searchTerm, selectedCategory]);

  // Handle click outside the dropdown to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectFaculty = (selectedFaculty) => {
    // Avoid infinite loops by checking if we're selecting the same faculty
    if (lastCompareRef.current?.id !== selectedFaculty.id) {
      lastCompareRef.current = selectedFaculty;
      onCompare(selectedFaculty);
    }
    setSearchTerm("");
    setIsDropdownOpen(false);
  };

  return (
    <footer className="mt-4">
      <label className="form-label mb-2">
        Compare with another faculty
      </label>
      
      <div className="filters-row">
        <div className="faculty-autocomplete-container" ref={dropdownRef}>
          <input
            type="text"
            className="form-control faculty-search-input"
            placeholder="Type to search faculties..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (!isDropdownOpen) {
                setIsDropdownOpen(true);
              }
            }}
            onFocus={() => setIsDropdownOpen(true)}
            aria-label="Search faculties"
          />
          
          {isDropdownOpen && filteredFaculties.length > 0 && (
            <ul className="faculty-results-dropdown">
              {filteredFaculties.map((f) => (
                <li 
                  key={f.id} 
                  onClick={() => handleSelectFaculty(f)}
                  className="faculty-result-item"
                >
                  <span className="faculty-title">{f.title}</span>
                  <span className="faculty-category">{f.category}</span>
                </li>
              ))}
            </ul>
          )}
          
          {isDropdownOpen && searchTerm && filteredFaculties.length === 0 && (
            <div className="no-results-message">
              No faculties match your search
            </div>
          )}
        </div>
        
        <div className="category-filter-container">
          <CategoryFilter 
            categories={categories} 
            value={selectedCategory} 
            onChange={setSelectedCategory} 
          />
        </div>
      </div>
      
      <small className="text-muted mt-2">
        Type to search, then select a faculty to compare side by side
      </small>
    </footer>
  );
};

export default ComparatorButton;
