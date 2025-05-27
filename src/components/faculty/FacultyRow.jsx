import { useNavigate } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import "../../styles/FacultyRow.css";

export default function FacultyRow({ faculty, onFavorite }) {
  const navigate = useNavigate();

  return (
    <tr
      tabIndex={0}
      onClick={() => navigate(`/faculty/${faculty.id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          navigate(`/faculty/${faculty.id}`);
        }
      }}
    >
      <td>
        <span>
          <strong>{faculty.title}</strong>
        </span>
      </td>
      <td>
        <span>{faculty.category}</span>
      </td>
      <td>
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
