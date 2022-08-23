/*
 * Component to show the table with data
 * From the tutorial at:
 *
 * Gilberto Echeverria
 * 2022-08-23
 */

import '../App.css';

function DataTable({data, id}) {
  console.log("DATA: " + data);
  const headers = Object.keys(data[0]);
  console.log("HEADERS: " + headers);
  // Contents table
  return (
    <table className="Data-table" data-testid={id}>
      <thead className="Data-header">
        <tr>
          {headers.map((row, index) => {
            return <th key={index}>{row}</th>;
          })}
        </tr>
      </thead>
      <tbody className="Data-values">
        {data.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.id_users}</td>
              <td>{item.name}</td>
              <td>{item.surname}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default DataTable;
