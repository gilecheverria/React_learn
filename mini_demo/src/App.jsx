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
import Logout from './components/Logout.jsx';
import NewFileForm from './components/NewFileForm.jsx';
import Search from './components/Search.jsx';
import DataDisplay from './components/DataDisplay.jsx';
// State for data shared across the whole application
import { useState } from 'react';

function App() {
  const [token, setToken] = useState({});

  return (
    <div className="App">
      <Navigation token={token} />
      <Routes>
        <Route path="/" element={<Login token={token} setToken={setToken} />} />
        <Route path="/login" element={<Login token={token} setToken={setToken} />} />
        <Route path="/logout" element={<Logout setToken={setToken} />} />
        <Route path="/newFile" element={<NewFileForm  />} />
        <Route path="/search" element={<Search />} />
        <Route path="/display" element={<DataDisplay />} />
      </Routes>
    </div>
  );
}

export default App;
