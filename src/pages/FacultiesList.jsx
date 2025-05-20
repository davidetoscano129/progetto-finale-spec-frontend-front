import { useState, useMemo, useCallback } from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import FacultyCard from "../components/faculty/FacultyCard";
import SearchBar from "../components/filters/SearchBar";
import FilterControls from "../components/filters/FilterControls";
import { debounce } from "../utils/debounce";

export default function FacultiesList() {
  const { faculties } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const debouncedSearch = useCallback(
    debounce((value) => setSearchTerm(value)),
    []
  );

  const categories = useMemo(
    () => [...new Set(faculties.map((f) => f.category))],
    [faculties]
  );

  const filteredFaculties = useMemo(() => {
    return [...faculties]
      .filter((faculty) => {
        const matchesSearch = faculty
          .title?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory =
          !selectedCategory || faculty.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        const direction = sortAsc ? 1 : -1;
        return a.title.localeCompare(b.title) * direction;
      });
  }, [faculties, searchTerm, selectedCategory, sortAsc]);

  return (
    <main className="container py-5">
      <header className="text-center mb-5">
        <h1 className="display-4 mb-3">Find Your Perfect Faculty</h1>
        <p className="lead text-muted">
          Compare different faculties and make an informed choice for your future
        </p>
      </header>

      <div className="row mb-4 g-3">
        <SearchBar onChange={debouncedSearch} />
        <FilterControls
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortAsc={sortAsc}
          onSortChange={setSortAsc}
        />
      </div>

      <section>
        {filteredFaculties.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted mb-0">No faculties found</p>
            <small className="text-muted">Try adjusting your search criteria</small>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <span className="text-muted">
                Showing {filteredFaculties.length} of {faculties.length} faculties
              </span>
            </div>
            <div className="row g-4">
              {filteredFaculties.map((faculty) => (
                <FacultyCard key={faculty.id} faculty={faculty} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
