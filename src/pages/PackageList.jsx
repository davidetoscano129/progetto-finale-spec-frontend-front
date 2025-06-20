import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import PackageRow from "../components/PackageRow";

export default function PackageList() {
  const { packages } = useContext(GlobalContext);
  console.log("Packages:", packages);

  return (
    <div className="page-container">
      <h1>Consulting Package List</h1>

      <div className="card">
        {packages && packages.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Package Name</th>
                <th>Industry Category</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <PackageRow key={pkg.id} packageData={pkg} />
              ))}
            </tbody>
          </table>
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
