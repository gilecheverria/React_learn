/*
 * Component to show the table with data
 * From the tutorial at:
 * https://medium.com/how-to-react/how-to-parse-or-read-csv-files-in-reactjs-81e8ee4870b0
 *
 * Gilberto Echeverria
 * 2022-08-17
 */

import '../App.css';

function DataTable({tableRows, values}) {
  // Contents table
  return (
    <table className="Data-table" data-testid='dataTable'>
      <thead className="Data-header">
        <tr>
          {tableRows.map((row, index) => {
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
