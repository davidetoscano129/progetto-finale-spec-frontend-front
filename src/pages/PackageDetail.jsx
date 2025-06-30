import { useParams } from "react-router-dom";
import { useContext, useState, useEffect, useMemo } from "react";
import { GlobalContext } from "../context/GlobalContext";
import PackageInfo from "../components/PackageInfo";
import SearchBar from "../components/SearchBar";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import "../style/pages/PackageDetail.css";

export default function PackageDetail() {
  const { id } = useParams();
  const { packages, fetchPackageDetails, loading } = useContext(GlobalContext);
  const [packageData, setPackageData] = useState(null);
  const [comparePackageData, setComparePackageData] = useState(null);
  const [detailLoading, setDetailLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Load main package details
  useEffect(() => {
    const loadPackageDetails = async () => {
      if (!id) return;
      try {
        setDetailLoading(true);
        const details = await fetchPackageDetails(parseInt(id));
        setPackageData(details);
      } catch (error) {
        console.error("Error loading details:", error);
      } finally {
        setDetailLoading(false);
      }
    };
    loadPackageDetails();
  }, [id, fetchPackageDetails]);

  // Reset on package change
  useEffect(() => {
    setComparePackageData(null);
    setSearchQuery("");
    setSelectedCategory("");
    setShowResults(false);
  }, [id]);

  // Filtered packages
  const filteredPackages = useMemo(() => {
    if (!packages?.length || (!searchQuery.trim() && !selectedCategory))
      return [];

    return packages
      .filter((pkg) => pkg.id !== parseInt(id))
      .filter((pkg) => {
        const matchesSearch =
          !searchQuery.trim() ||
          pkg.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
          !selectedCategory || pkg.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .slice(0, 6); // Limit results
  }, [packages, id, searchQuery, selectedCategory]);

  // Available categories
  const categories = useMemo(() => {
    if (!packages?.length) return [];

    const cats = packages
      .filter((pkg) => pkg.id !== parseInt(id))
      .map((pkg) => pkg.category);

    const uniqueCategories = [];
    for (let i = 0; i < cats.length; i++) {
      if (!uniqueCategories.includes(cats[i])) {
        uniqueCategories.push(cats[i]);
      }
    }

    return uniqueCategories.sort();
  }, [packages, id]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setShowResults(!!query.trim() || !!selectedCategory);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShowResults(!!searchQuery.trim() || !!category);
  };

  const handlePackageSelect = async (packageId) => {
    try {
      const details = await fetchPackageDetails(parseInt(packageId));
      setComparePackageData(details);
      setShowResults(false);
      setSearchQuery("");
    } catch (error) {
      console.error("Error loading compare package:", error);
    }
  };

  const clearSelection = () => {
    setComparePackageData(null);
    setSearchQuery("");
    setSelectedCategory("");
    setShowResults(false);
  };

  if (loading || detailLoading) {
    return <LoadingState title="Package Details" />;
  }

  if (!packageData) {
    return (
      <div className="package-detail-container">
        <EmptyState
          title="Package Not Found"
          message={`Package with ID ${id} not found.`}
        />
      </div>
    );
  }

  return (
    <div className="package-detail-container">
      <h1 className="package-detail-title">
        {comparePackageData ? "Package Comparison" : "Package Details"}
      </h1>

      <div className="compare-search-section">
        <h3>Compare with another package</h3>

        <div
          className="search-container"
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
        >
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search packages to compare..."
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            categoriesLoading={loading}
          />

          {showResults && (
            <div className="search-results">
              {filteredPackages.length > 0 ? (
                filteredPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="search-result-item"
                    onClick={() => handlePackageSelect(pkg.id)}
                  >
                    <div className="result-title">{pkg.title}</div>
                    <div className="result-category">{pkg.category}</div>
                  </div>
                ))
              ) : (
                <div className="no-results">No packages found</div>
              )}
            </div>
          )}
        </div>

        {comparePackageData && (
          <div className="clear-comparison-container">
            <button onClick={clearSelection} className="clear-selection-btn">
              Clear Comparison
            </button>
          </div>
        )}
      </div>

      <div
        className={`packages-display ${
          comparePackageData ? "comparison-mode" : "single-mode"
        }`}
      >
        <div className="package-column">
          <PackageInfo packageData={packageData} />
        </div>
        {comparePackageData && (
          <div className="package-column">
            <PackageInfo packageData={comparePackageData} />
          </div>
        )}
      </div>
    </div>
  );
}
