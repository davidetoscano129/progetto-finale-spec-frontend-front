import "../style/components/EmptyState.css";

export default function EmptyState({
  title = "No packages available",
  message = "Check back later for consulting packages.",
}) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}
