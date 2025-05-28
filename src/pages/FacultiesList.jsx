import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { FavoritesContext } from "../context/FavoritesContext";
import useFilters from "../hooks/useFilters";
import PageContainer from "../layout/PageContainer";
import FilterPanel from "../components/filters/FilterPanel";
import FacultiesTable from "../components/faculty/FacultiesTable";

export default function FacultiesList() {
  const { faculties } = useContext(GlobalContext);
  const { favorites } = useContext(FavoritesContext);

  const {
    searchTerm,
    selectedCategory,
    sortAsc,
    debouncedSearch,
    setSelectedCategory,
    setSortAsc,
    categories,
    filteredItems: filteredFaculties,
  } = useFilters(faculties);

  // Prepare count info for display
  const countInfo = (
    <>
      <i className="bi bi-list-ul me-1"></i>
      Showing {filteredFaculties.length}{" "}
      {filteredFaculties.length === 1 ? "faculty" : "faculties"}
      {searchTerm || selectedCategory ? " matching your criteria" : ""}
      {favorites.length > 0 && (
        <>
          {" • "}
          <i className="bi bi-heart-fill me-1" style={{ color: "#8b0000" }}></i>
          {favorites.length}{" "}
          {favorites.length === 1 ? "saved" : "saved in favorites"}
        </>
      )}
    </>
  );

  return (
    <PageContainer
      title="Find Your Academic Path"
      description="Compare faculties and make an informed choice for your future. Our directory helps you explore academic fields that align with your career aspirations."
      backgroundImage="img7.jpg"
      backgroundOverlay={true}
      additionalText="Discover the university program that best matches your passions. Explore curriculum details, faculty expertise, and career outcomes to make the right choice for your future."
    >
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
            faculties={filteredFaculties}
            countInfo={countInfo}
            sortAsc={sortAsc}
            onSortToggle={() => setSortAsc((prev) => !prev)}
          />
        </div>
      </section>
    </PageContainer>
  );
}
