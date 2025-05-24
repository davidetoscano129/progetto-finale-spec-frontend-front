import { useState, useMemo, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import { debounce } from "../utils/debounce";

import FacultyRow from "../components/faculty/FacultyRow";
import SearchBar from "../components/filters/SearchBar";
import CategoryFilter from "../components/filters/CategoryFilter";
import SortButton from "../components/filters/SortButton";
import "./FacultiesList.css";

export default function FavoritesFaculties() {
  const { favorites } = useContext(FavoritesContext);

  // Stati per ricerca, filtro e ordinamento
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const debouncedSearch = useCallback(
    debounce((value) => setSearchTerm(value)),
    []
  );

  // Categorie disponibili nei preferiti
  const categories = useMemo(
    () => [...new Set(favorites.map((f) => f.category))],
    [favorites]
  );

  // Filtra e ordina i preferiti
  const filteredFavorites = useMemo(() => {
    return [...favorites]
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
  }, [favorites, searchTerm, selectedCategory, sortAsc]);

  return (
    <main className="container-fluid p-0">
      {/* Header Section */}
      <section
        className="hero-section mb-5"
        style={{ backgroundImage: 'url("FavoritesFacultiesImg.jpg")' }}
      >
        <div className="hero-overlay" />
        <div className="hero-content text-center">
          <h1 className="display-3 fw-bold mb-3">Your Favorite Faculties</h1>
          <p className="lead mb-2">
            Keep track of the faculties you're interested in comparing
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section>
        {favorites?.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-4">
              <i className="bi bi-heart text-danger display-1"></i>
            </div>
            <h2 className="h4 mb-3">No favorites yet</h2>
            <p className="text-muted mb-4">
              Start adding faculties to your favorites to compare them later!
            </p>
            <Link to="/" className="btn btn-primary">
              Browse All Faculties
            </Link>
          </div>
        ) : (
          <div className="faculties-cards-wrapper">
            <table className="faculty-table" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", width: "30%" }}>
                    <div className="search-sort-row">
                      <SortButton asc={sortAsc} onToggle={() => setSortAsc((asc) => !asc)} />
                      <SearchBar
                        value={searchTerm}
                        onChange={debouncedSearch}
                      />
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
                {filteredFavorites.map((faculty) => (
                  <FacultyRow key={faculty.id} faculty={faculty} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
