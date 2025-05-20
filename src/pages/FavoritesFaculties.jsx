import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import FacultyCard from "../components/faculty/FacultyCard";

export default function FavoritesFaculties() {
  const { favorites } = useContext(FavoritesContext);

  return (
    <main className="container py-5">
      <h1 className="display-4 text-center mb-4">
        <i className="bi bi-heart-fill text-danger me-2"></i>
        Your Favorite Faculties
      </h1>

      <section className="row g-4">
        {favorites?.length === 0 ? (
          <div className="col-12 text-center">
            <p className="text-muted">No favorite faculties yet.</p>
            <p className="text-muted">
              Add some faculties to your favorites to see them here!
            </p>
          </div>
        ) : (
          favorites.map((faculty) => (
            <FacultyCard key={faculty.id} faculty={faculty} />
          ))
        )}
      </section>
    </main>
  );
}
