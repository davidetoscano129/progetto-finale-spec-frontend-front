import { useState, useContext, useMemo, useCallback } from "react";
import { GlobalContext } from "../context/GlobalContext";
import PackageRow from "../components/PackageRow";

// Debounce function to limit the number of times a function can be called
function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
}

export default function PackageList() {
  const { packages, loading } = useContext(GlobalContext);

  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSetSearchQuery = useCallback(
    debounce(setSearchQuery, 500),
    []
  );

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => prev * -1);
    } else {
      setSortBy(field);
      setSortOrder(1);
    }
  };

  const sortIcon = sortOrder === 1 ? "↓" : "↑";

  const filteredAndSortedPackage = useMemo(() => {
    if (!packages || packages.length === 0) {
      return [];
    }

    return [...packages]
      .filter((pkg) => {
        if (!searchQuery) return true;

        const query = searchQuery.toLowerCase();
        const title = pkg.title.toLowerCase();

        const titleWords = title.split(" ");

        return titleWords.some((word) => word.startsWith(query));
      })
      .sort((a, b) => {
        let comparison;

        if (sortBy === "title") {
          comparison = a.title.localeCompare(b.title);
        } else if (sortBy === "category") {
          comparison = a.category.localeCompare(b.category);
        }
        return comparison * sortOrder;
      });
  }, [packages, sortBy, sortOrder, searchQuery]);

  if (loading) {
    return (
      <div className="page-container">
        <h1>Consulting Package List</h1>
        <div className="card">
          <p>Loading packages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Consulting Package List</h1>

      <div className="card">
        {filteredAndSortedPackage && filteredAndSortedPackage.length > 0 ? (
          <div>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search packages..."
                onChange={(e) => debouncedSetSearchQuery(e.target.value)}
              />
            </div>

            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSort("title")}>
                    {" "}
                    Package Name {sortBy === "title" && sortIcon}{" "}
                  </th>
                  <th onClick={() => handleSort("category")}>
                    Industry Category {sortBy === "category" && sortIcon}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedPackage.map((pkg) => (
                  <PackageRow key={pkg.id} packageData={pkg} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <h3>No packages available</h3>
            <p>Check back later for consulting packages.</p>
          </div>
        )}
      </div>
    </div>
  );
}
