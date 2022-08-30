/*
 * App using Router module to navigate between different pages
 *
 * Gilberto Echeverria
 * 2022-08-29
 */

import './App.css';
// Import the Components for routing
import { Routes, Route } from 'react-router-dom';
// Custom components
import Navigation from './components/Navigation.jsx';
import Login from './components/Login.jsx';
import NewFile from './components/NewFile.jsx';
import Search from './components/Search.jsx';
import DataDisplay from './components/DataDisplay.jsx';
// State for data shared across the whole application
import { useState } from 'react';

function App() {
  const [name, setName] = useState('');

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Login setName={setName} />} />
        <Route path="/login" element={<Login setName={setName} />} />
        <Route path="/newFile" element={<NewFile name={name} />} />
        <Route path="/search" element={<Search />} />
        <Route path="/display" element={<DataDisplay />} />
      </Routes>
    </div>
  );
}

export default App;
