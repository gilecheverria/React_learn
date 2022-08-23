/*
 * App to display student data formatted for Mexico or USA
 *
 * Gilberto Echeverria
 * 2022-08-17
 * 2022-08-23   Refactor into multiple components
 */

import './App.css';
import { useState } from 'react';
import FileForm from './components/FileForm'
import DataDisplay from './components/DataDisplay'

function App() {
  // Storage for the CSV data
  //const [parseData, setParseData] = useState([]);
  // Storage for the table headers
  const [tableRows, setTableRows] = useState([]);
  // Storage for values
  const [values, setValues] = useState([]);
  // Storage for converted values
  const [newValues, setNewValues] = useState([]);

  return (
    <div className="App">
      {/* File uploader */}
      <FileForm
        setTableRows={setTableRows}
        setValues={setValues}
        setNewValues={setNewValues}
      />
      {/* Data containers */}
      <DataDisplay
        tableRows={tableRows}
        values={values}
        newValues={newValues}
      />
    </div>
  );
}

export default App;
