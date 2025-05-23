import FavoriteButton from "./FavoriteButton";
import "./FacultyRow.css";

export default function FacultyRow({ faculty, onFavorite }) {
  return (
    <tr className="faculty-row">
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
