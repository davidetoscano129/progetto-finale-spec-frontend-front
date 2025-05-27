import React from "react";
import { Link } from "react-router-dom";
import "../../styles/EmptyState.css";

const EmptyState = ({
  icon = "bookmark",
  title = "No data available",
  message = "There's nothing to show here right now.",
  actionLink = null,
  actionText = "Go back",
  iconClass = "text-danger",
}) => {
  return (
    <div className="empty-state card shadow-sm p-5 text-center">
      <div className="icon-container mb-4">
        <i className={`bi bi-${icon} empty-state-icon ${iconClass}`}></i>
      </div>
      <h2 className="empty-state-title mb-3">{title}</h2>
      <p className="empty-state-message text-muted mb-4">{message}</p>
      {actionLink && (
        <div className="empty-state-action">
          <Link to={actionLink} className="btn btn-primary empty-state-button">
            <i className="bi bi-search me-2"></i>{" "}
            {/* Aggiunto icona al pulsante */}
            {actionText}
          </Link>
        </div>
      )}
    </div>
  );
};

export default React.memo(EmptyState);
