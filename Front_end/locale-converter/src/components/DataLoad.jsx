/*
 * Component to display a navigation bar with links to various sections
 *
 * Gilberto Echeverria
 * 2022-08-26
 */

import '../App.css';
import FileForm from './FileForm'

function DataLoad({setTableRows, setValues, setNewValues}) {
  return (
    <div className="App">
      <h2>Welcome to the test site</h2>
      <p>Select a file to load the data from</p>
      {/* File uploader */}
      <FileForm
        setTableRows={setTableRows}
        setValues={setValues}
        setNewValues={setNewValues}
      />
    </div>
  );
}

export default DataLoad;
