import FavoriteButton from "./FavoriteButton";
import "./FacultyInfo.css";

export default function FacultyInfo({ faculty }) {
  if (!faculty || !faculty.details) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card-body">
      {/* Header with Title and Favorite Button */}
      <div className="d-flex justify-content-between align-items-start mb-3">
        <h2 className="card-title h2">{faculty.title} </h2>
        <FavoriteButton faculty={faculty} />
      </div>

      {/* Category Badge */}
      <div className="mb-4">
        <span className="badge bg-primary">
          <i className="bi bi-bookmark-fill me-2"></i>
          {faculty.category}
        </span>
      </div>

      {/* Faculty Details */}
      <ul className="list-group mb-3">
        <li className="list-group-item">
          <div className="d-flex align-items-center mb-1">
            <i className="bi bi-info-circle me-2"></i>
            <strong>Description</strong>
          </div>
          <div className="text-break faculty-info-detail-box">
            {faculty.details.longDescription}
          </div>
        </li>
        <li className="list-group-item">
          <div className="d-flex align-items-center mb-1">
            <i className="bi bi-journal-text me-2"></i>
            <strong>Main Subjects</strong>
          </div>
          <div className="text-break faculty-info-detail-box">
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
          <div className="text-break faculty-info-detail-box">
            {Array.isArray(faculty.details.careerOpportunities)
              ? faculty.details.careerOpportunities.join(", ")
              : faculty.details.careerOpportunities}
          </div>
        </li>

        <li className="list-group-item d-flex justify-content-between align-items-center">
          <span>
            <i className="bi bi-pencil-square me-2"></i>
            <strong>Admission Test</strong>
          </span>
          <span
            className={`badge ${
              faculty.details.admissionTest ? "bg-success" : "bg-danger"
            }`}
          >
            {faculty.details.admissionTest ? "Required" : "Not Required"}
          </span>
        </li>

        <li className="list-group-item d-flex justify-content-between align-items-center">
          <span>
            <i className="bi bi-clock me-2"></i>
            Duration
          </span>
          <span className="badge bg-secondary">
            {faculty.details.duration} years
          </span>
        </li>

        <li className="list-group-item d-flex justify-content-between align-items-center">
          <span>
            <i className="bi bi-award me-2"></i>
            Credits
          </span>
          <span className="badge bg-secondary">
            {faculty.details.credits} CFU
          </span>
        </li>

        <li className="list-group-item d-flex justify-content-between align-items-center">
          <span>
            <i className="bi bi-people me-2"></i>
            Max Students
          </span>
          <span className="badge bg-secondary">
            {faculty.details.maxStudents || "No limit"}
          </span>
        </li>

        <li className="list-group-item d-flex justify-content-between align-items-center">
          <span>
            <i className="bi bi-bar-chart-line me-2"></i>
            Employment Rate
          </span>
          <span className="badge bg-info text-dark">
            {faculty.details.employmentRate}%
          </span>
        </li>

        <li className="list-group-item d-flex justify-content-between align-items-center">
          <span>
            <i className="bi bi-flask me-2"></i>
            Laboratory Hours
          </span>
          <span className="badge bg-secondary">
            {faculty.details.laboratoryHours}
          </span>
        </li>
      </ul>
    </div>
  );
}
