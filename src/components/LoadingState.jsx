export default function LoadingState({ title = "Consulting Package List" }) {
  return (
    <div className="page-container">
      <h1>{title}</h1>
      <div className="card">
        <p>Loading packages...</p>
      </div>
    </div>
  );
}