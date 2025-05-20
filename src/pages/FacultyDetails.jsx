import { useParams, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import FacultyInfo from "../components/faculty/FacultyInfo";

export default function FacultyDetails() {
  const { id } = useParams();
  const { faculties } = useContext(GlobalContext);
  const [compareWith, setCompareWith] = useState(null);

  const faculty = faculties.find((f) => f.id === parseInt(id));
  const otherFaculties = faculties.filter((f) => f.id !== parseInt(id));

  if (!faculty) {
    return (
      <div className="container py-5 text-center">
        <h2 className="mb-4">Faculty not found</h2>
        <p className="text-muted mb-4">
          The faculty you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to Faculty List
        </Link>
      </div>
    );
  }

  return (
    <main className="container py-5">
      {/* Header */}
      <header className="text-center mb-5">
        <h1 className="display-4 mb-3">{faculty.title}</h1>
        <p className="lead text-muted">
          Compare this faculty with others to make the best choice
        </p>
      </header>

      {/* Comparison Section */}
      <section className="row g-4">
        {/* Main Faculty Card */}
        <article className={compareWith ? "col-md-6" : "col-12"}>
          <div className="card shadow-sm">
            <div className="card-header bg-light">
              <h2 className="h5 mb-0">Faculty Details</h2>
            </div>
            <FacultyInfo faculty={faculty} />
            {!compareWith && (
              <footer className="card-footer">
                <label className="form-label">Compare with another faculty</label>
                <select
                  className="form-select"
                  onChange={(e) =>
                    setCompareWith(
                      faculties.find((f) => f.id === parseInt(e.target.value))
                    )
                  }
                  aria-label="Select faculty to compare"
                >
                  <option value="">Select a faculty to compare...</option>
                  {otherFaculties.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.title}
                    </option>
                  ))}
                </select>
                <small className="text-muted">
                  Choose another faculty to see them side by side
                </small>
              </footer>
            )}
          </div>
        </article>

        {/* Comparison Faculty Card */}
        {compareWith && (
          <article className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-header bg-light">
                <h2 className="h5 mb-0">Comparison Faculty</h2>
              </div>
              <FacultyInfo faculty={compareWith} />
              <footer className="card-footer">
                <button
                  className="btn btn-outline-danger w-100"
                  onClick={() => setCompareWith(null)}
                >
                  <i className="bi bi-x-circle me-2"></i>
                  Remove Comparison
                </button>
              </footer>
            </div>
          </article>
        )}
      </section>
    </main>
  );
}
