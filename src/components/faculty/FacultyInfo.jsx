import FavoriteButton from "./FavoriteButton";

export default function FacultyInfo({ faculty }) {
  if (!faculty || !faculty.details) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card-body">
      {/* Header with Title and Favorite Button */}
      <div className="d-flex justify-content-between align-items-start mb-3">
        <h2 className="card-title h2">{faculty.title}</h2>
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
            <i className="bi bi-pencil-square me-2"></i>
            Admission Test
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
            <i className="bi bi-lock me-2"></i>
            Closed Course
          </span>
          <span
            className={`badge ${
              faculty.details.closedCourse ? "bg-warning" : "bg-success"
            }`}
          >
            {faculty.details.closedCourse ? "Limited Seats" : "Open Access"}
          </span>
        </li>
      </ul>
    </div>
  );
}
