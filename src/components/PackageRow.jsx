import { Link } from "react-router-dom";

const PackageRow = function ({ packageData }) {
  return (
    <tr>
      <td>
        <Link to={`/package/${packageData.id}`}>{packageData.title}</Link>
      </td>
      <td>{packageData.category}</td>
    </tr>
  );
};

export default PackageRow;
