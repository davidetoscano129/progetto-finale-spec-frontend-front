import { Link } from "react-router-dom";

const PackageRow = function ({ packageData }) {
  return (
    <tr>
      <td>
        <Link to={`/package/${packageData.id}`}>{packageData.title}</Link>
      </td>
      <td>
        <span className="category-badge">{packageData.category}</span>
      </td>
    </tr>
  );
};

export default PackageRow;
