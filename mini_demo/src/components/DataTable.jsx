/*
 * Component to show the table with data
 *
 * Gilberto Echeverria
 * 2022-08-30
 */

import './DataTable.css';
//import { downloadFile } from '../modules/db_api.js';

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
                if (col === 4) {
                  // Use the environment variable for the Backend URL
                  const link = process.env.REACT_APP_API + `/api/getfile/${item}`;
                  return (
                    <td key={col}>
                      <a href={link} download>Download</a>
                    </td>
                  );
                  // return (
                  //   <td key={col}>
                  //     <button onClick={() => downloadFile(item)}>
                  //       Download
                  //     </button>
                  //   </td>
                  // );
                } else {
                  return <td key={col}>{item}</td>;
                }
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default DataTable;
