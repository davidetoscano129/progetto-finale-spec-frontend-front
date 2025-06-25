import PackageRow from "./PackageRow";
import "../style/components/PackageTable.css";

export default function PackageTable({ packages, sortBy, sortIcon, onSort }) {
  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => onSort("title")} style={{ cursor: "pointer" }}>
            Package Name {sortBy === "title" && sortIcon}
          </th>
          <th>Industry Category</th>
        </tr>
      </thead>
      <tbody>
        {packages.map((pkg) => (
          <PackageRow key={pkg.id} packageData={pkg} />
        ))}
      </tbody>
    </table>
  );
}
