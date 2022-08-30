/*
 * Component to show the table with data
 *
 * Gilberto Echeverria
 * 2022-08-30
 */

import './DataTable.css';

// Receive properties:
// - headers: an array with the column titles
// - values: a matrix with the table data
// - id: string to identify the component
function DataTable({headers, values, id}) {
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
        {values.map((row, index) => {
          return (
            <tr key={index}>
              {row.map((item, col) => {
                return <td key={col}>{item}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default DataTable;
