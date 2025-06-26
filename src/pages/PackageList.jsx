import { useContext, useState, useMemo } from "react";
import { GlobalContext } from "../context/GlobalContext";
import SearchBar from "../components/SearchBar";
import PackageTable from "../components/PackageTable";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import usePackageFiltering from "../hooks/usePackageFiltering";

export default function PackageList() {
  const { packages, loading } = useContext(GlobalContext);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = useMemo(() => {
    if (!packages || packages.length === 0) return [];
    
    const uniqueCategories = [];
    packages.forEach((pkg) => {
      if (!uniqueCategories.includes(pkg.category)) {
        uniqueCategories.push(pkg.category);
      }
    });
    
    return uniqueCategories.sort();
  }, [packages]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const {
    sortBy,
    sortIcon,
    filteredAndSortedPackages,
    handleSort,
    debouncedSetSearchQuery,
  } = usePackageFiltering(packages, selectedCategory);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="page-container">
      <h1>Consulting Packages</h1>

      <div className="card">
        {packages.length > 0 ? (
          <div>
            <SearchBar
              onSearch={debouncedSetSearchQuery}
              placeholder="Search packages..."
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              categoriesLoading={loading}
            />
            {filteredAndSortedPackages.length > 0 ? (
              <PackageTable
                packages={filteredAndSortedPackages}
                sortBy={sortBy}
                sortIcon={sortIcon}
                onSort={handleSort}
              />
            ) : (
              <EmptyState
                title="No packages found"
                message={
                  selectedCategory
                    ? `No packages found in "${selectedCategory}" category with your search criteria.`
                    : "No packages found with your search criteria."
                }
              />
            )}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
