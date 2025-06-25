import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import PackageInfo from "../components/PackageInfo";
import "../style/pages/PackageDetail.css";

export default function PackageDetail() {
  const { id } = useParams();
  const { fetchPackageDetails } = useContext(GlobalContext);
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPackageDetails = async () => {
      try {
        setLoading(true);
        const details = await fetchPackageDetails(parseInt(id));
        setPackageData(details);
      } catch (error) {
        console.error("Error loading details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadPackageDetails();
    }
  }, [id, fetchPackageDetails]);

  if (loading) {
    return <LoadingState title="Package Details" />;
  }

  if (!packageData) {
    return (
      <div className="package-detail-container">
        <EmptyState
          title="Package Not Found"
          message={`The package with ID ${id} does not exist.`}
        />
      </div>
    );
  }

  return (
    <div className="package-detail-container">
      <h1 className="package-detail-title">Package Details</h1>
      <PackageInfo packageData={packageData} />
    </div>
  );
}
