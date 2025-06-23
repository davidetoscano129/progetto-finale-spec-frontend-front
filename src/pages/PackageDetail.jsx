import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

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
    return (
      <div className="page-container">
        <h1>Package Details</h1>
        <div className="card">
          <p>Loading package details...</p>
        </div>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="page-container">
        <h1>Package Not Found</h1>
        <div className="card">
          <p>The package with ID {id} does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Package Details</h1>
      <div className="card">
        <p>
          <strong>Name: </strong>
          {packageData.title}
        </p>
        <p>
          <strong>Category: </strong>
          {packageData.category}
        </p>
        <p>
          <strong>Duration: </strong>
          {packageData.details.duration} weeks
        </p>
        <p>
          <strong>Price: </strong>€{packageData.details.price}
        </p>
        <p>
          <strong>Team size: </strong>
          {packageData.details.team_size} consultants
        </p>
        <p>
          <strong>Remote option: </strong>
          {packageData.details.remote_option ? "Yes" : "No"}
        </p>
        <p>
          <strong>Support: </strong>
          {packageData.details.support}
        </p>
        <p>
          <strong>Best for: </strong>
          {packageData.details.best_for}
        </p>
      </div>
    </div>
  );
}
