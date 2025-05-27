import React from "react";
import FacultyRow from "./FacultyRow";

const FacultiesTable = ({
  faculties,
  countInfo,
  emptyMessage = "No faculties match your search criteria",
}) => {
  return (
    <div className="card shadow-sm p-3">
      {countInfo && (
        <div className="d-flex justify-content-end align-items-center px-2 mb-2">
          <span className="text-muted faculty-count">{countInfo}</span>
        </div>
      )}

      <table className="table table-hover">
        <thead>
          <tr>
            <th className="col-6">Faculty Name</th>
            <th className="col-5">Category</th>
            <th className="col-1"></th>
          </tr>
        </thead>
        <tbody>
          {faculties.length > 0 ? (
            faculties.map((faculty) => (
              <FacultyRow key={faculty.id} faculty={faculty} />
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4">
                <i className="bi bi-exclamation-circle me-2"></i>
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(FacultiesTable);
