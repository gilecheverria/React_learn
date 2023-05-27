/*
 * App to display student data formatted for Mexico or USA
 *
 * Gilberto Echeverria
 * 2022-08-17
 * 2022-08-23   Refactor into multiple components
 * 2022-08-26   Add navigation using routes
 */

import './App.css';
import { useState } from 'react';
import Navigation from './components/Navigation';
import DataLoad from './components/DataLoad';
import DataConvert from './components/DataConvert';
import DataSearch from './components/DataSearch';
import { Routes, Route } from 'react-router-dom';

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
      <h1>DATA PROCESSING DEMO</h1>
      <Navigation />
      <Routes>
        <Route path="/" element={
          <DataLoad
            setTableRows={setTableRows}
            setValues={setValues}
            setNewValues={setNewValues}
          />
          } />
        <Route path="/convert" element={
          <DataConvert
            tableRows={tableRows}
            setTableRows={setTableRows}
            values={values}
            setValues={setValues}
            newValues={newValues}
            setNewValues={setNewValues}
          />
          } />
        <Route path="/search" element={
          <DataSearch
            tableRows={tableRows}
            setTableRows={setTableRows}
            values={values}
            setValues={setValues}
            newValues={newValues}
            setNewValues={setNewValues}
          />
          } />
      </Routes>
    </div>
  );
}

export default App;
