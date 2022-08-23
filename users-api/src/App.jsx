/*
 * Connecting an app to a database through an API call
 * To solve the CORS errors:
 * https://www.stackhawk.com/blog/react-cors-guide-what-it-is-and-how-to-enable-it/
 *
 * Gilberto Echeverria
 * 2022-08-23
 */

import './App.css';
import { useState, useEffect } from 'react';
import DataTable from './components/DataTable';

function App() {

  const [users, setUsers] = useState([]);

  async function getAllUsers() {
    try {
      const response = await fetch('http://localhost:5000/api/users',
              {mode:'cors'});
      const data = await response.json();
      console.log({data});
      setUsers(data);
    } catch(error) {
      console.log(error);
      return [];
    }
  }

  useEffect(() => {
    getAllUsers();
  }, [])

  /*
  fetch("/api/users", {
    "method": "GET",
    "headers": {
      "content-type": "application/json",
      "accept": "application/json"
    },
    // "body": JSON.stringify({
    //   name: this.state.name,
    //   surname: this.state.surname
    // })
  })
  .then(response => response.json())
  .then(response => {
    console.log(response)
  })
  .catch(err => {
    console.log(err);
  });
  */

  return (
    <div className="App">
      <h1>Data from an API</h1>
      <DataTable data={users} id="data" />
    </div>
  );
}

export default App;
