/*
 * App to display the contents of a CSV file
 * From the tutorial at:
 * https://medium.com/how-to-react/how-to-parse-or-read-csv-files-in-reactjs-81e8ee4870b0
 *
 * Gilberto Echeverria
 * 2022-08-17
 */

import './App.css';
import { useState } from 'react';
import Papa from 'papaparse';

function App() {
  // Storage for the CSV data
  const [parseData, setParseData] = useState([]);
  // Storage for the table headers
  const [tableRows, setTableRows] = useState([]);
  // Storage for values
  const [values, setValues] = useState([]);

  const changeHandler = function(event) {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rowsArray = [];
        const valuesArray = [];

        // Iterate over the data to separate the contents
        results.data.map((item) => {
          rowsArray.push(Object.keys(item));
          valuesArray.push(Object.values(item));
        });

        // Store the values in the state
        setParseData(results.data);
        setTableRows(rowsArray[0]);
        setValues(valuesArray);
      }
    });
  };

  return (
    <div className="App">
      {/* File uploader */}
      <div className="Input">
        <h2>Select a CSV file</h2>
        <input
          type="file"
          name="file"
          accept=".csv"
          onChange={changeHandler}
        />
      </div>
      <br />
      <br />
      {/* Contents table */}
      <table className="Data-table">
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
    </div>
  );
}

export default App;
