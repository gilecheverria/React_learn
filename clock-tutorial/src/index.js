import React from 'react';
import ReactDOM from 'react-dom/client';
import Clock from './clock.js';
import './index.css';

function App() {
  return (
    <div>
      <Clock color='#FF0000' />
      <Clock color='#00FF00' />
      <Clock color='#0000FF' />
    </div>
  );
}

function MapApp() {
  const colors = ['#FF0000', '#00FF00', '#0000FF', '#888888', '#FF9999'];
  return (
    colors.map((color, key) =>
    <div key={key}>
      <Clock color={color} />
    </div>)
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <MapApp /> );
