import { useState, useMemo, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import { debounce } from "../utils/debounce";

import FacultyRow from "../components/faculty/FacultyRow";
import SearchBar from "../components/filters/SearchBar";
import CategoryFilter from "../components/filters/CategoryFilter";
import SortButton from "../components/filters/SortButton";
import "./FavoritesFaculties.css";

export default function FavoritesFaculties() {
  const { favorites } = useContext(FavoritesContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const debouncedSearch = useCallback(
    debounce((value) => setSearchTerm(value)),
    []
  );

  const categories = useMemo(
    () => [...new Set(favorites.map((f) => f.category))],
    [favorites]
  );

  const filteredFavorites = useMemo(() => {
    // First filter faculties by category and search term
    const filtered = favorites.filter((faculty) => {
      // Check if the faculty matches the search term
      const matchesSearch = searchTerm
        ? faculty.title.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      // Check if the faculty matches the selected category
      const matchesCategory = selectedCategory
        ? faculty.category === selectedCategory
        : true;

      return matchesSearch && matchesCategory;
    });

    // If there's a search term, sort results by relevance
    if (searchTerm) {
      return filtered.sort((a, b) => {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();
        const searchTermLower = searchTerm.toLowerCase();

        // Check if titles start with the search term
        const aStartsWithSearch = aTitle.startsWith(searchTermLower);
        const bStartsWithSearch = bTitle.startsWith(searchTermLower);

        // If one starts with the search term but the other doesn't,
        // the one that starts with it comes first
        if (aStartsWithSearch && !bStartsWithSearch) return -1;
        if (!aStartsWithSearch && bStartsWithSearch) return 1;

        // If both or neither start with the search term,
        // check if any word in the titles starts with the search term
        const aWords = aTitle.split(" ");
        const bWords = bTitle.split(" ");

        const aHasWordStartingWithSearch = aWords.some((word) =>
          word.startsWith(searchTermLower)
        );
        const bHasWordStartingWithSearch = bWords.some((word) =>
          word.startsWith(searchTermLower)
        );

        // If one has a word starting with search but the other doesn't,
        // the one with a matching word comes first
        if (aHasWordStartingWithSearch && !bHasWordStartingWithSearch) return -1;
        if (!aHasWordStartingWithSearch && bHasWordStartingWithSearch) return 1;

        // If we get here, apply the regular alphabetical sorting
        const direction = sortAsc ? 1 : -1;
        return a.title.localeCompare(b.title) * direction;
      });
    } else {
      // If no search term, just apply regular alphabetical sorting
      return filtered.sort((a, b) => {
        const direction = sortAsc ? 1 : -1;
        return a.title.localeCompare(b.title) * direction;
      });
    }
  }, [favorites, searchTerm, selectedCategory, sortAsc]);

  return (
    <main className="container py-5 pb-5">
      <section className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm p-4">
            <h1>Your Favorite Faculties</h1>
            <p>
              Keep track of the faculties you're interested in comparing.
              <br />
              Review and compare your saved options to make an informed decision about your future.
            </p>
          </div>
        </div>
      </section>

      {favorites?.length === 0 ? (
        <section className="row">
          <div className="col-12">
            <div className="card shadow-sm p-5 text-center">
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
          </div>
        </section>
      ) : (
        <>
          <section className="row mb-4">
            <div className="col-12">
              <div className="card shadow-sm p-4">
                <div className="filters-container">
                  <div className="filter-group">
                    <label className="form-label">
                      <i className="bi bi-search me-2"></i>
                      Search faculties
                    </label>
                    <div className="search-sort-container">
                      <div className="sort-button-container">
                        <SortButton
                          asc={sortAsc}
                          onToggle={() => setSortAsc((asc) => !asc)}
                        />
                      </div>
                      <div className="faculty-search-container">
                        <SearchBar
                          value={searchTerm}
                          onChange={debouncedSearch}
                          placeholder="Type to search faculties..."
                          hideLabel={true}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="filter-group">
                    <label className="form-label">
                      <i className="bi bi-filter me-2"></i>
                      Filter by category
                    </label>
                    <CategoryFilter
                      categories={categories}
                      value={selectedCategory}
                      onChange={setSelectedCategory}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="row">
            <div className="col-12">
              <div className="card shadow-sm p-3">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th className="col-6">Faculty Name</th>
                      <th className="col-5">Category</th>
                      <th className="col-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFavorites.length > 0 ? (
                      filteredFavorites.map((faculty) => (
                        <FacultyRow key={faculty.id} faculty={faculty} />
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center py-4">
                          <i className="bi bi-exclamation-circle me-2"></i>
                          No faculties match your search criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
