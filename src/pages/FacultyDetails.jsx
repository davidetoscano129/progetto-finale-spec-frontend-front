import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function FacultyDetails() {
  const { id } = useParams();
  const { faculties } = useContext(GlobalContext);
  const [compareWith, setCompareWith] = useState(null);

  const faculty = faculties.find((f) => f.id === parseInt(id));
  const otherFaculties = faculties.filter((f) => f.id !== parseInt(id));

  if (!faculty) {
    return (
      <main className="container py-5">
        <h2 className="text-center">Faculty not found</h2>
      </main>
    );
  }

  return (
    <main className="container py-5">
      <div className="row">
        {/* Current Faculty */}
        <div className={compareWith ? "col-md-6" : "col-12"}>
          <div className="card">
            <div className="card-body">
              <h1 className="card-title h2">{faculty.title}</h1>
              <span className="badge bg-primary mb-3">{faculty.category}</span>

              {/* Faculty Details */}
              <ul className="list-group mb-3">
                <li className="list-group-item">
                  Duration: {faculty.duration} years
                </li>
                <li className="list-group-item">Credits: {faculty.credits}</li>
                <li className="list-group-item">
                  Max Students: {faculty.maxStudents || "No limit"}
                </li>
                <li className="list-group-item">
                  Admission Test: {faculty.admissionTest ? "Yes" : "No"}
                </li>
                <li className="list-group-item">
                  Closed Course: {faculty.closedCourse ? "Yes" : "No"}
                </li>
              </ul>

              {/* Compare Section */}
              {!compareWith && (
                <div className="mt-4">
                  <select
                    className="form-select mb-2"
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
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Comparison Faculty */}
        {compareWith && (
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title h2">{compareWith.title}</h2>
                <span className="badge bg-primary mb-3">
                  {compareWith.category}
                </span>

                {/* Comparison Details */}
                <ul className="list-group mb-3">
                  <li className="list-group-item">
                    Duration: {compareWith.duration} years
                  </li>
                  <li className="list-group-item">
                    Credits: {compareWith.credits}
                  </li>
                  <li className="list-group-item">
                    Max Students: {compareWith.maxStudents || "No limit"}
                  </li>
                  <li className="list-group-item">
                    Admission Test: {compareWith.admissionTest ? "Yes" : "No"}
                  </li>
                  <li className="list-group-item">
                    Closed Course: {compareWith.closedCourse ? "Yes" : "No"}
                  </li>
                </ul>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => setCompareWith(null)}
                >
                  Remove Comparison
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
