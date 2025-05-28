import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import PageContainer from "../layout/PageContainer";
import FacultyInfo from "../components/faculty/FacultyInfo";
import ComparatorButton from "../components/faculty/ComparatorButton";
import EmptyState from "../components/ui/EmptyState";
import CloseButton from "../components/ui/CloseButton";

export default function FacultyDetails() {
  const { id } = useParams();
  const { faculties } = useContext(GlobalContext);
  const [compareWith, setCompareWith] = useState(null);

  const faculty = faculties.find((f) => f.id === parseInt(id));

  if (!faculty) {
    return (
      <PageContainer>
        <EmptyState
          icon="exclamation-triangle"
          title="Faculty not found"
          message="The faculty you're looking for doesn't exist or has been removed."
          actionLink="/"
          actionText="Back to Faculty List"
          iconClass="text-warning"
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Faculty comparison selector */}
      <section className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm p-3">
            <ComparatorButton faculty={faculty} onCompare={setCompareWith} />
          </div>
        </div>
      </section>

      {/* Faculties section */}
      <section className="row justify-content-center">
        {compareWith ? (
          /* Two faculties side by side */
          <>
            <div className="col-lg-6 mb-4">
              <div className="card shadow-sm p-4 h-100">
                <FacultyInfo faculty={faculty} />
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="card shadow-sm p-4 h-100 position-relative">
                <CloseButton onClick={() => setCompareWith(null)} />
                <FacultyInfo faculty={compareWith} />
              </div>
            </div>
          </>
        ) : (
          /* Single faculty at full width */
          <div className="col-12 mb-4">
            <div className="card shadow-sm p-4 h-100">
              <FacultyInfo faculty={faculty} />
            </div>
          </div>
        )}
      </section>
    </PageContainer>
  );
}
