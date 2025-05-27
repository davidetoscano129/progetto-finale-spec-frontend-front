import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import useFilters from "../hooks/useFilters";
import PageContainer from "../layout/PageContainer";
import FilterPanel from "../components/filters/FilterPanel";
import FacultiesTable from "../components/faculty/FacultiesTable";
import EmptyState from "../components/ui//EmptyState";
import "../styles/FavoritesFaculties.css";

export default function FavoritesFaculties() {
  const { favorites } = useContext(FavoritesContext);

  const {
    searchTerm,
    selectedCategory,
    sortAsc,
    debouncedSearch,
    setSelectedCategory,
    setSortAsc,
    categories,
    filteredItems: filteredFavorites,
  } = useFilters(favorites);

  // Prepare count info for display
  const countInfo =
    favorites.length > 0 ? (
      <>
        <i className="bi bi-heart-fill me-1" style={{ color: "#8b0000" }}></i>
        Showing {filteredFavorites.length} of {favorites.length} saved{" "}
        {favorites.length === 1 ? "faculty" : "faculties"}
        {searchTerm || selectedCategory ? " matching your criteria" : ""}
      </>
    ) : null;

  return (
    <PageContainer
      title="Your Favorite Faculties"
      description="Keep track of the faculties you're interested in comparing. <br /> Review and compare your saved options to make an informed decision about your future."
    >
      {favorites?.length === 0 ? (
        <section className="row">
          <div className="col-12">
            <EmptyState
              icon="bookmark"
              title="No favorites yet"
              message="Start adding faculties to your favorites to compare them later!"
              actionLink="/"
              actionText="Browse All Faculties"
            />
          </div>
        </section>
      ) : (
        <>
          {/* Filters */}
          <section className="row mb-4">
            <div className="col-12">
              <div className="card shadow-sm p-4">
                <FilterPanel
                  searchTerm={searchTerm}
                  onSearch={debouncedSearch}
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  sortAsc={sortAsc}
                  onSortToggle={() => setSortAsc((prev) => !prev)}
                />
              </div>
            </div>
          </section>

          {/* Table */}
          <section className="row">
            <div className="col-12">
              <FacultiesTable
                faculties={filteredFavorites}
                countInfo={countInfo}
              />
            </div>
          </section>
        </>
      )}
    </PageContainer>
  );
}
