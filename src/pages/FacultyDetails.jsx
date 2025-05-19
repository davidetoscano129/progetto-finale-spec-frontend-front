import { useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function FacultyDetails() {
  const { id } = useParams();
  const { faculties } = useContext(GlobalContext);
  // Debug logs
  console.log("ID from params:", id);
  console.log("All faculties:", faculties);

  const faculty = faculties.find((f) => f.id === parseInt(id));
  console.log("Found faculty:", faculty);

  if (!faculty) {
    return (
      <main className="container py-5">
        <h2 className="text-center">Faculty not found</h2>
      </main>
    );
  }

  const handleCompare = () => {
    const compareFaculties = faculties.filter((f) => f.id !== parseInt(id));
    console.log("Comparing with other faculties:", compareFaculties);
  };

  return (
    <main className="container py-5">
      {/* Header Section */}
      <header className="mb-5">
        <h1 className="display-4">{faculty.title}</h1>
        <span className="badge bg-primary">{faculty.category}</span>
      </header>

      {/* Main Info Section */}
      <section className="row mb-4">
        <div className="col-md-6">
          <h2 className="h4 mb-3">Basic Information</h2>
          <ul className="list-group">
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
        </div>

        <div className="col-md-6">
          <h2 className="h4 mb-3">Performance Metrics</h2>
          <ul className="list-group">
            <li className="list-group-item">
              Employment Rate: {faculty.employmentRate}%
            </li>
            <li className="list-group-item">
              Laboratory Hours: {faculty.laboratoryHours}
            </li>
          </ul>
        </div>
      </section>

      {/* Description Section */}
      <section className="mb-4">
        <h2 className="h4 mb-3">Description</h2>
        <p className="lead">{faculty.longDescription}</p>
      </section>

      {/* Career Section */}
      <section className="mb-5">
        <h2 className="h4 mb-3">Career Path</h2>
        <div className="card">
          <div className="card-body">
            <h3 className="h5">Main Subjects</h3>
            <p>{faculty.mainSubjects}</p>
            <h3 className="h5">Career Opportunities</h3>
            <p className="mb-0">{faculty.careerOpportunities}</p>
          </div>
        </div>
      </section>

      {/* Action Button */}
      <button className="btn btn-primary" onClick={handleCompare}>
        Compare with other faculties
      </button>
    </main>
  );
}
