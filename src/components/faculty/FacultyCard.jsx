import { memo } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import "bootstrap-icons/font/bootstrap-icons.css";

const FacultyCard = memo(({ faculty, onFavorite }) => {
  const navigate = useNavigate();

  if (!faculty || !faculty.details) {
    return (
      <div className="col-md-6 col-lg-4">
        <div className="card h-100">Invalid faculty data</div>
      </div>
    );
  }

  // Card click handling (excluding FavoriteButton)
  const handleCardClick = () => {
    navigate(`/faculty/${faculty.id}`);
  };

  return (
    <div className="col-md-6 col-lg-4">
      <article
        className="card h-100 shadow-sm hover-card"
        style={{ cursor: "pointer" }}
        onClick={handleCardClick}
      >
        <div className="card-body">
          {/* Title and Favorite Button */}
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h5 className="card-title mb-0">
              <span className="text-decoration-none">{faculty.title}</span>
            </h5>
            <FavoriteButton
              faculty={faculty}
              onClick={(e) => {
                e.stopPropagation();
                if (onFavorite) onFavorite(faculty);
              }}
            />
          </div>

          {/* Category Badge */}
          <div className="mb-2">
            <span className="badge bg-primary">
              <span
                className="bi bi-bookmark-fill me-1"
                aria-hidden="true"
              ></span>
              {faculty.category}
            </span>
          </div>

          {/* Quick Info */}
          <div className="text-muted small">
            <div className="mb-1">
              <span className="bi bi-clock me-1" aria-hidden="true"></span>
              Duration: {faculty.details.duration} years
            </div>
            {faculty.details.maxStudents && (
              <div>
                <span className="bi bi-people me-1" aria-hidden="true"></span>
                Max Students: {faculty.details.maxStudents}
              </div>
            )}
          </div>
        </div>

        {/* Card Footer */}
        <div className="card-footer bg-light text-end">
          <small className="text-muted">
            Click to view details and compare
          </small>
        </div>
      </article>
    </div>
  );
});

export default FacultyCard;
