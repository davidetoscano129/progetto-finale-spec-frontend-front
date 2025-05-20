import { memo } from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

const FacultyCard = memo(({ faculty }) => {
  return (
    <div className="col-md-6 col-lg-4">
      <article className="card h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title mb-0">
              <Link
                to={`/faculty/${faculty.id}`}
                className="text-decoration-none"
              >
                {faculty.title}
              </Link>
            </h5>
            <FavoriteButton faculty={faculty} />
          </div>
          
          <p className="card-text">
            <span className="badge bg-primary">{faculty.category}</span>
          </p>
        </div>
      </article>
    </div>
  );
});

export default FacultyCard;
