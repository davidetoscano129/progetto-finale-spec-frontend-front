import { useParams } from "react-router-dom";
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
    return <h2 className="text-center py-5">Faculty not found</h2>;
  }

  return (
    <main className="container py-5">
      <section className="row g-4">
        <article className={compareWith ? "col-md-6" : "col-12"}>
          <div className="card">
            <FacultyInfo faculty={faculty} />
            {!compareWith && (
              <footer className="card-footer">
                <select
                  className="form-select"
                  onChange={(e) =>
                    setCompareWith(
                      faculties.find((f) => f.id === parseInt(e.target.value))
                    )
                  }
                >
                  <option value="">Compare with another faculty...</option>
                  {otherFaculties.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.title}
                    </option>
                  ))}
                </select>
              </footer>
            )}
          </div>
        </article>

        {compareWith && (
          <article className="col-md-6">
            <div className="card">
              <FacultyInfo faculty={compareWith} />
              <footer className="card-footer">
                <button
                  className="btn btn-outline-danger w-100"
                  onClick={() => setCompareWith(null)}
                >
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
