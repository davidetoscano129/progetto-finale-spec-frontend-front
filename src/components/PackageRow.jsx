const PackageRow = function ({ packageData }) {
  return (
    <tr>
      <td>{packageData.title}</td>
      <td>{packageData.category}</td>
    </tr>
  );
};

export default PackageRow;
