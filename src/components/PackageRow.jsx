import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import FavoriteButton from "./FavoriteButton";

const PackageRow = function ({ packageData }) {
  const { isFavorite, toggleFavorite } = useContext(GlobalContext);

  return (
    <tr>
      <td>
        <Link to={`/package/${packageData.id}`}>{packageData.title}</Link>
      </td>
      <td>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span className="category-badge">{packageData.category}</span>
          <FavoriteButton
            packageId={packageData.id}
            isFavorite={isFavorite(packageData.id)}
            onToggle={toggleFavorite}
            size="small"
          />
        </div>
      </td>
    </tr>
  );
};

export default PackageRow;
