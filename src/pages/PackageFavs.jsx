import { useContext, useMemo } from "react";
import { GlobalContext } from "../context/GlobalContext";
import PackageTable from "../components/PackageTable";
import EmptyState from "../components/EmptyState";
import usePackageFiltering from "../hooks/usePackageFiltering";

export default function PackageFavs() {
  const { packages, favorites, loading } = useContext(GlobalContext);

  const favoritePackages = useMemo(() => {
    if (!packages || packages.length === 0) return [];
    return packages.filter((pkg) => favorites.includes(pkg.id));
  }, [packages, favorites]);

  const { sortBy, sortIcon, filteredAndSortedPackages, handleSort } =
    usePackageFiltering(favoritePackages);

  if (loading) {
    return (
      <div className="page-container">
        <h1>Your Favorite Consulting Packages</h1>
        <div className="card">
          <p>Loading favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Your Favorite Consulting Packages</h1>
      <div className="card">
        {favoritePackages.length > 0 ? (
          <PackageTable
            packages={filteredAndSortedPackages}
            sortBy={sortBy}
            sortIcon={sortIcon}
            onSort={handleSort}
          />
        ) : (
          <EmptyState
            title="No favorites yet"
            message="Start adding packages to your favorites to see them here."
          />
        )}
      </div>
    </div>
  );
}
