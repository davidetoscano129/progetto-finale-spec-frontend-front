import { memo } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./FacultyCard.css";

const FacultyCard = memo(({ faculty, onFavorite }) => {
  const navigate = useNavigate();

  if (!faculty || !faculty.details) {
    return (
      <div className="col-12">
        <div className="card h-100">Invalid faculty data</div>
      </div>
    );
  }

  const handleCardClick = () => {
    navigate(`/faculty/${faculty.id}`);
  };

  return (
    <div className="col-12 mb-3">
      <article
        className="faculty-harvard-card card h-100 shadow-sm border-0"
        onClick={handleCardClick}
      >
        <div
          className="card-body py-2 pb-1"
          style={{ paddingBottom: "0.25rem" }}
        >
          {/* Category Badge */}
          <div className="mb-1">
            <span className="badge bg-primary px-2 py-1 fs-7 rounded-pill">
              <span
                className="bi bi-bookmark-fill me-1"
                aria-hidden="true"
              ></span>
              {faculty.category}
            </span>
          </div>
          {/* Title, Favorite Button and Short Description */}
          <div className="d-flex justify-content-between align-items-start mb-1">
            <h4 className="card-title mb-0 fw-bold lh-sm">{faculty.title}</h4>
            <FavoriteButton
              faculty={faculty}
              onClick={(e) => {
                e.stopPropagation();
                if (onFavorite) onFavorite(faculty);
              }}
            />
          </div>
          {/* Short Description solo su mobile */}
          <div className="mb-1 text-light d-block d-md-none description">
            {faculty.details.shortDescription}
          </div>
          {/* Long Description solo su tablet/desktop */}
          <div className="mb-1 text-light d-none d-md-block description">
            {faculty.details.longDescription}
          </div>
        </div>
        {/* Card Footer */}
        <div className="card-footer bg-transparent border-0 text-end pt-0 pb-1">
          <small className="text-light fst-italic">
            Click to view details and compare
          </small>
        </div>
      </article>
    </div>
  );
});

export default FacultyCard;
