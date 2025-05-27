import { useState, useMemo, useCallback } from "react";
import { debounce } from "../utils/debounce";

export default function useFilters(items, options = {}) {
  const {
    initialSearchTerm = "",
    initialSortAsc = true,
    initialCategory = "",
    propertyToFilter = "title",
    propertyForCategory = "category",
  } = options;

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortAsc, setSortAsc] = useState(initialSortAsc);

  const debouncedSearch = useCallback(
    debounce((value) => setSearchTerm(value)),
    []
  );

  // Extract unique categories
  const categories = useMemo(() => {
    const categoriesSet = new Set(
      items.map((item) => item[propertyForCategory]).filter(Boolean)
    );
    return [...categoriesSet];
  }, [items, propertyForCategory]);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    // First filter items by category and search term
    const filtered = items.filter((item) => {
      const itemText = item[propertyToFilter]?.toLowerCase() || "";
      const searchTermLower = searchTerm.toLowerCase();

      // Check if the item matches the search term
      const matchesSearch = !searchTerm || itemText.includes(searchTermLower);

      // Check if the item matches the selected category
      const matchesCategory =
        !selectedCategory || item[propertyForCategory] === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Sort items based on search relevance or alphabetically
    return filtered.sort((a, b) => {
      const aText = (a[propertyToFilter] || "").toLowerCase();
      const bText = (b[propertyToFilter] || "").toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();

      if (searchTerm) {
        // Relevance sorting for search results
        const aStartsWithSearch = aText.startsWith(searchTermLower);
        const bStartsWithSearch = bText.startsWith(searchTermLower);

        if (aStartsWithSearch !== bStartsWithSearch) {
          return aStartsWithSearch ? -1 : 1;
        }

        const aWords = aText.split(" ");
        const bWords = bText.split(" ");

        const aHasWordStartingWithSearch = aWords.some((word) =>
          word.startsWith(searchTermLower)
        );
        const bHasWordStartingWithSearch = bWords.some((word) =>
          word.startsWith(searchTermLower)
        );

        if (aHasWordStartingWithSearch !== bHasWordStartingWithSearch) {
          return aHasWordStartingWithSearch ? -1 : 1;
        }
      }

      // Default alphabetical sorting
      const direction = sortAsc ? 1 : -1;
      return a[propertyToFilter].localeCompare(b[propertyToFilter]) * direction;
    });
  }, [
    items,
    searchTerm,
    selectedCategory,
    sortAsc,
    propertyToFilter,
    propertyForCategory,
  ]);

  return {
    searchTerm,
    selectedCategory,
    sortAsc,
    debouncedSearch,
    setSearchTerm,
    setSelectedCategory,
    setSortAsc,
    categories,
    filteredItems,
  };
}
