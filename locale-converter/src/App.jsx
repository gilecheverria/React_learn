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
import DataTable from './components/DataTable'
import { format_line } from './modules/conversions'

function App() {
  // Storage for the CSV data
  //const [parseData, setParseData] = useState([]);
  // Storage for the table headers
  const [tableRows, setTableRows] = useState([]);
  // Storage for values
  const [values, setValues] = useState([]);
  // Storage for converted values
  const [newValues, setNewValues] = useState([]);

  const changeHandler = function(event) {
    // Read the contents of a CSV file
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      // Function to process the data read
      complete: (results) => {
        const rowsArray = [];
        const valuesArray = [];
        const newValuesArray = [];

        // Iterate over the data to separate the contents
        results.data.map((item) => {
          rowsArray.push(Object.keys(item));
          valuesArray.push(Object.values(item));
          newValuesArray.push(format_line(Object.values(item)));
          // Return a null to silence a warning.
          // The map result is not used in any case
          return null;
        });

        // Store the values in the state
        //setParseData(results.data);
        setTableRows(rowsArray[0]);
        setValues(valuesArray);
        setNewValues(newValuesArray);
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
          data-testid='input'
        />
      </div>
      <table className="Data-table" data-testid='contents'>
        <tbody>
          <tr>
            <td data-testid='original'>
              <h2>Original</h2>
              {/* Contents table */}
              <DataTable tableRows={tableRows} values={values} />
            </td>
            <td data-testid='result'>
              <h2>Result</h2>
              {/* Contents table */}
              <DataTable tableRows={tableRows} values={newValues} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
