import { useState, useEffect } from "react";
const { VITE_API_URL } = import.meta.env;

export default function usePackages() {
  const [packages, setPackages] = useState([]);
  const [packageDetails, setPackageDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${VITE_API_URL}/consultingpackages`);
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error("Error loading details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const fetchPackageDetails = async (id) => {
    if (packageDetails[id]) {
      return packageDetails[id];
    }

    try {
      const response = await fetch(`${VITE_API_URL}/consultingpackages/${id}`);
      const result = await response.json();

      if (result.success) {
        const details = result.consultingpackage;

        setPackageDetails((prev) => ({
          ...prev,
          [id]: details,
        }));

        return details;
      }
    } catch (error) {
      console.error("Error loading details:", error);
      return null;
    }
  };

  return {
    packages,
    packageDetails,
    fetchPackageDetails,
    loading,
  };
}
