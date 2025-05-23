import { useNavigate } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import "./FacultyRow.css";

export default function FacultyRow({ faculty, onFavorite }) {
  const navigate = useNavigate();

  return (
    <tr
      className="faculty-row clickable-row"
      tabIndex={0}
      onClick={() => navigate(`/faculty/${faculty.id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          navigate(`/faculty/${faculty.id}`);
        }
      }}
      style={{ cursor: "pointer" }}
    >
      <td>
        <span className="faculty-title">
          <strong>{faculty.title}</strong>
        </span>
      </td>
      <td className="faculty-category-col">
        <span className="faculty-badge">{faculty.category}</span>
      </td>
      <td style={{ textAlign: "right" }}>
        <FavoriteButton
          faculty={faculty}
          onClick={(e) => {
            e.stopPropagation();
            if (onFavorite) onFavorite(faculty);
          }}
        />
      </td>
    </tr>
  );
}
