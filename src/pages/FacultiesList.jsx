import { useState, useMemo, useCallback, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import FacultyRow from "../components/faculty/FacultyRow";
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
      <section
        className="hero-section mb-5"
        style={{ backgroundImage: 'url("brightspot.jpg")' }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="display-3 fw-bold mb-3">Find Your Perfect Faculty</h1>
          <p className="lead mb-2">
            Compare different faculties and make an informed choice for your
            future. <br />
            Choose the university path that best suits you: explore, compare and
            find the faculty that reflects your passions and goals.
          </p>
        </div>
      </section>

      <section>
        <div className="faculties-cards-wrapper">
          <table className="faculty-table" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", width: "30%" }}>
                  <div className="search-sort-row">
                    <button
                      className={`sort-btn sort-btn--small${
                        sortAsc ? " active" : ""
                      }`}
                      onClick={() => setSortAsc((asc) => !asc)}
                      aria-label="Toggle alphabetical order"
                    >
                      {sortAsc ? "A→Z" : "Z→A"}
                    </button>
                    <input
                      className="search-bar-input"
                      placeholder="Search faculties..."
                      value={searchTerm}
                      onChange={(e) => debouncedSearch(e.target.value)}
                    />
                  </div>
                </th>
                <th style={{ textAlign: "left", width: "25%" }}>
                  <select
                    className="category-dropdown"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </th>
                <th style={{ textAlign: "right" }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredFaculties.map((faculty) => (
                <FacultyRow key={faculty.id} faculty={faculty} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
