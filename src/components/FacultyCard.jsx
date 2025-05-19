import { memo } from "react";
import { Link } from "react-router-dom";

const FacultyCard = memo(({ faculty }) => {
  return (
    <div className="col-md-6 col-lg-4">
      <article className="card h-100">
        <div className="card-body">
          {/* title */}
          <h5 className="card-title">
            <Link to={`/faculty/${faculty.id}`}>{faculty.title}</Link>
          </h5>
          {/* category */}
          <p className="card-text">
            <span className="badge bg-primary">{faculty.category}</span>
          </p>
        </div>
      </article>
    </div>
  );
});

export default FacultyCard;
