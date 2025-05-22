import { useState, useMemo, useCallback, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import FacultyCard from "../components/faculty/FacultyCard";
import SearchBar from "../components/filters/SearchBar";
import FilterControls from "../components/filters/FilterControls";
import { debounce } from "../utils/debounce";
import "./FacultiesList.css";

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
        const matchesSearch = faculty.title
          ?.toLowerCase()
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
    <main className="container-fluid p-0">
      {/* HERO SECTION */}
      <section className="faculties-hero-section mb-5">
        <div className="faculties-hero-overlay" />
        <div className="faculties-hero-content">
          <h1 className="display-3 fw-bold mb-3">Find Your Perfect Faculty</h1>
          <p className="lead mb-2">
            Compare different faculties and make an informed choice for your
            future. <br />
            Choose the university path that best suits you: explore, compare and
            find the faculty that reflects your passions and goals.
          </p>
        </div>
      </section>

      <div className="container">
        <div className="row align-items-center g-2 mb-4">
          <div className="col-12 col-md-8">
            <SearchBar value={searchTerm} onChange={debouncedSearch} />
          </div>
          <div className="col-12 col-md-4">
            <FilterControls
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortAsc={sortAsc}
              onSortChange={setSortAsc}
            />
          </div>
        </div>

        <section>
          {filteredFaculties.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted mb-0">No faculties found</p>
              <small className="text-muted">
                Try adjusting your search criteria
              </small>
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="text-muted">
                  Showing {filteredFaculties.length} of {faculties.length}{" "}
                  faculties
                </span>
              </div>
              {/* BOX CONTENITORE CARDS */}
              <div className="faculties-cards-wrapper mb-5">
                <div className="row g-4">
                  {filteredFaculties.map((faculty) => (
                    <FacultyCard key={faculty.id} faculty={faculty} />
                  ))}
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
