import FavoriteButton from "./FavoriteButton";
import "./FacultyInfo.css";

export default function FacultyInfo({ faculty }) {
  if (!faculty || !faculty.details) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Header with Title and Favorite Button */}
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h3 className="mb-0">{faculty.title}</h3>
        <FavoriteButton faculty={faculty} />
      </div>

      {/* Faculty Details */}
      <ul className="list-group mb-3">
        <li className="list-group-item">
          <div className="d-flex align-items-center mb-1">
            <i className="bi bi-info-circle me-2"></i>
            <strong>Description</strong>
          </div>
          <div className="description-container">{faculty.details.longDescription}</div>
        </li>
        <li className="list-group-item">
          <div className="d-flex align-items-center mb-1">
            <i className="bi bi-list-ul me-2"></i>
            <strong>Main Subjects</strong>
          </div>
          <div>
            {Array.isArray(faculty.details.mainSubjects)
              ? faculty.details.mainSubjects.join(", ")
              : faculty.details.mainSubjects}
          </div>
        </li>
        <li className="list-group-item">
          <div className="d-flex align-items-center mb-1">
            <i className="bi bi-briefcase me-2"></i>
            <strong>Career Opportunities</strong>
          </div>
          <div>
            {Array.isArray(faculty.details.careerOpportunities)
              ? faculty.details.careerOpportunities.join(", ")
              : faculty.details.careerOpportunities}
          </div>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="d-flex align-items-center">
            <i className="bi bi-mortarboard me-2"></i>
            <strong>Category</strong>
          </span>
          <span>{faculty.category}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="d-flex align-items-center">
            <i className="bi bi-clipboard-check me-2"></i>
            <strong>Admission Test</strong>
          </span>
          <span>
            {faculty.details.admissionTest ? "Required" : "Not required"}
          </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="d-flex align-items-center">
            <i className="bi bi-clock me-2"></i>
            <strong>Duration</strong>
          </span>
          <span>{faculty.details.duration} years</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="d-flex align-items-center">
            <i className="bi bi-award me-2"></i>
            <strong>Credits</strong>
          </span>
          <span>{faculty.details.credits} CFU</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="d-flex align-items-center">
            <i className="bi bi-people me-2"></i>
            <strong>Max Students</strong>
          </span>
          <span>{faculty.details.maxStudents || "No limit"}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="d-flex align-items-center">
            <i className="bi bi-graph-up me-2"></i>
            <strong>Employment Rate</strong>
          </span>
          <span>{faculty.details.employmentRate}%</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="d-flex align-items-center">
            <i className="bi bi-flask me-2"></i>
            <strong>Laboratory Hours</strong>
          </span>
          <span>{faculty.details.laboratoryHours}</span>
        </li>
      </ul>
    </div>
  );
}
