import { useParams, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import FacultyInfo from "../components/faculty/FacultyInfo";
import ComparatorButton from "../components/faculty/ComparatorButton";
import "./FacultyDetails.css";

export default function FacultyDetails() {
  const { id } = useParams();
  const { faculties } = useContext(GlobalContext);
  const [compareWith, setCompareWith] = useState(null);

  const faculty = faculties.find((f) => f.id === parseInt(id));

  if (!faculty) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning mt-5">
          <h2>Faculty not found</h2>
          <p>
            The faculty you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">Back to Faculty List</Link>
        </div>
      </div>
    );
  }

  // Function to handle the selection of a new faculty to compare with
  const handleCompareChange = (newFaculty) => {
    setCompareWith(newFaculty);
  };

  return (
    <main className="container py-5 pb-5">
      {/* Add ComparatorButton always visible at the top */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm p-3">
            <ComparatorButton
              faculty={faculty}
              onCompare={handleCompareChange}
              compareWith={compareWith}
            />
          </div>
        </div>
      </div>

      {/* Faculties section */}
      <section className="row justify-content-center">
        {compareWith ? (
          /* Layout with two faculties side by side */
          <>
            <div className="col-lg-6 mb-4">
              <div className="card shadow-sm p-4 h-100">
                <FacultyInfo faculty={faculty} />
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="card shadow-sm p-4 h-100 position-relative">
                <button
                  className="btn-close comparison-close-btn"
                  aria-label="Close comparison"
                  onClick={() => setCompareWith(null)}
                />
                <FacultyInfo faculty={compareWith} />
              </div>
            </div>
          </>
        ) : (
          /* Layout with a single faculty at full width */
          <div className="col-12 mb-4">
            <div className="card shadow-sm p-4 h-100">
              <FacultyInfo faculty={faculty} />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
