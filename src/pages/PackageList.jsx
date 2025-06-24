import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import SearchBar from "../components/SearchBar";
import PackageTable from "../components/PackageTable";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import usePackageFiltering from "../hooks/usePackageFiltering";

export default function PackageList() {
  const { packages, loading } = useContext(GlobalContext);

  const {
    sortBy,
    sortIcon,
    filteredAndSortedPackages,
    handleSort,
    debouncedSetSearchQuery,
  } = usePackageFiltering(packages);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="page-container">
      <h1>Consulting Package List</h1>

      <div className="card">
        {filteredAndSortedPackages.length > 0 ? (
          <div>
            <SearchBar
              onSearch={debouncedSetSearchQuery}
              placeholder="Search packages..."
            />
            <PackageTable
              packages={filteredAndSortedPackages}
              sortBy={sortBy}
              sortIcon={sortIcon}
              onSort={handleSort}
            />
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
