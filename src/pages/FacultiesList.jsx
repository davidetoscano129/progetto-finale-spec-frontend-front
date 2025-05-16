import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import FacultyCard from "../components/FacultyCard";

export default function FacultiesList() {
  const { faculties } = useContext(GlobalContext);

  return (
    <main className="container py-5">
      <h1 className="display-4 text-center mb-4">
        Your choice is in this list
      </h1>

      <section className="row g-4">
        {faculties?.length === 0 ? (
          <p className="text-center text-muted">No faculties available...</p>
        ) : (
          faculties.map((faculty) => (
            <FacultyCard key={faculty.id} faculty={faculty} />
          ))
        )}
      </section>
    </main>
  );
}
