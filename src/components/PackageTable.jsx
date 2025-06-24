import PackageRow from "./PackageRow";

export default function PackageTable({ 
  packages, 
  sortBy, 
  sortIcon, 
  onSort 
}) {
  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => onSort("title")}>
            Package Name {sortBy === "title" && sortIcon}
          </th>
          <th onClick={() => onSort("category")}>
            Industry Category {sortBy === "category" && sortIcon}
          </th>
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