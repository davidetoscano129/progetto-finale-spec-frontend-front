import { useState, useMemo, useCallback, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { debounce } from "../utils/debounce";

import FacultyRow from "../components/faculty/FacultyRow";
import SearchBar from "../components/filters/SearchBar";
import CategoryFilter from "../components/filters/CategoryFilter";
import SortButton from "../components/filters/SortButton";
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
    <main className="container-fluid p-0" style={{ paddingTop: "64px" }}>
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
                    <SortButton asc={sortAsc} onToggle={() => setSortAsc((asc) => !asc)} />
                    <SearchBar value={searchTerm} onChange={debouncedSearch} />
                  </div>
                </th>
                <th style={{ textAlign: "left", width: "25%" }}>
                  <CategoryFilter
                    categories={categories}
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                  />
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
