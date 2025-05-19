import FavoriteButton from "./FavoriteButton";

export default function FacultyInfo({ faculty }) {
  return (
    <div className="card-body">
      <div className="d-flex justify-content-between align-items-start">
        <h2 className="card-title h2">{faculty.title}</h2>
        <FavoriteButton faculty={faculty} />
      </div>
      <span className="badge bg-primary mb-3">{faculty.category}</span>

      <ul className="list-group mb-3">
        <li className="list-group-item">Duration: {faculty.duration} years</li>
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
  );
}
