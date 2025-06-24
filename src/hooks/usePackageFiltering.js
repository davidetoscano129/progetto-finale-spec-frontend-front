import { useState, useMemo, useCallback } from "react";

// Debounce function
function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(value), delay);
  };
}

export default function usePackageFiltering(packages) {
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSetSearchQuery = useCallback(
    debounce(setSearchQuery, 500),
    []
  );

  const handleSort = (field) => {
    if (field === "title") {
      if (sortBy === field) {
        setSortOrder((prev) => prev * -1);
      } else {
        setSortBy(field);
        setSortOrder(1);
      }
    }
  };

  const filteredAndSortedPackages = useMemo(() => {
    if (!packages || packages.length === 0) return [];

    return [...packages]
      .filter((pkg) => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        const title = pkg.title.toLowerCase();
        const titleWords = title.split(" ");
        return titleWords.some((word) => word.startsWith(query));
      })
      .sort((a, b) => {
        const comparison = a.title.localeCompare(b.title);
        return comparison * sortOrder;
      });
  }, [packages, sortBy, sortOrder, searchQuery]);

  const sortIcon = sortOrder === 1 ? "↓" : "↑";

  return {
    sortBy,
    sortOrder,
    sortIcon,
    filteredAndSortedPackages,
    handleSort,
    debouncedSetSearchQuery,
  };
}
