import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import FacultyCard from "../components/faculty/FacultyCard";

export default function FavoritesFaculties() {
  const { favorites } = useContext(FavoritesContext);

  return (
    <main className="container py-5">
      {/* Header Section */}
      <header className="text-center mb-5">
        <h1 className="display-4 mb-3">Your Favorite Faculties</h1>
        <p className="lead text-muted">
          Keep track of the faculties you're interested in comparing
        </p>
      </header>

      {/* Content Section */}
      <section>
        {favorites?.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-4">
              <i className="bi bi-heart text-danger display-1"></i>
            </div>
            <h2 className="h4 mb-3">No favorites yet</h2>
            <p className="text-muted mb-4">
              Start adding faculties to your favorites to compare them later!
            </p>
            <Link to="/" className="btn btn-primary">
              Browse All Faculties
            </Link>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h5 mb-0">Your Saved Faculties</h2>
              <small className="text-muted">
                {favorites.length}{" "}
                {favorites.length === 1 ? "faculty" : "faculties"} saved
              </small>
            </div>
            <div className="row g-4">
              {favorites.map((faculty) => (
                <FacultyCard key={faculty.id} faculty={faculty} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
