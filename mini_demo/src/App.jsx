/*
 * App using Router module to navigate between different pages
 *
 * Gilberto Echeverria
 * 2022-08-29
 * 2022-09-01   Fixed the API call:
 *              - Add proxy configuration to package.json
 *              - Use a different endpoint from '/'
 */

import './App.css';
// Import the Components for routing
import { Routes, Route } from 'react-router-dom';
// Custom components
import Navigation from './components/Navigation.jsx';
import Login from './components/Login.jsx';
import NewFileForm from './components/NewFileForm.jsx';
import Search from './components/Search.jsx';
import DataDisplay from './components/DataDisplay.jsx';
// State for data shared across the whole application
import { useState, useEffect } from 'react';
// Functions for the database API
import { getFilteredDocuments } from './modules/db_api.js';

function App() {
  const [name, setName] = useState('');
  const [data, setData] = useState([]);

  // Fetch the data when the page loads
  useEffect(() => {
    getFilteredDocuments({}, setData);
    //getDocuments(setData);
  }, [])

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Login setName={setName} />} />
        <Route path="/login" element={<Login setName={setName} />} />
        <Route path="/newFile" element={<NewFileForm name={name} />} />
        <Route path="/search" element={<Search />} />
        <Route path="/display" element={<DataDisplay data={data} />} />
      </Routes>
    </div>
  );
}

export default App;
