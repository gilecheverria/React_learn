/*
 * Connecting an app to a database through an API call
 * To solve the CORS errors:
 * https://www.stackhawk.com/blog/react-cors-guide-what-it-is-and-how-to-enable-it/
 * Add the proxy element to package.json, using the url of the API
 *  "proxy": "http://localhost:5000",
 *
 * Gilberto Echeverria
 * 2022-08-23
 */

import './App.css';
import { useState, useEffect } from 'react';
import DataTable from './components/DataTable';
import RecordForm from './components/RecordForm';

function App() {

  const [users, setUsers] = useState([]);

  async function getAllUsers() {
    try {
      const response = await fetch('/api/users',
                                   {mode:'cors'});
      const data = await response.json();
      console.log({data});
      setUsers(data);
    } catch(error) {
      console.log("ERROR at 'getAllUsers'");
      console.log(error);
      return [];
    }
  }

  // Fetch the data when the page loads
  useEffect(() => {
    getAllUsers();
  }, [])


  async function addUser(newName, newSurname) {
    try {
      const response = await fetch('/api/users', {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "accept": "application/json"
          },
          body: JSON.stringify({
            name: newName,
            surname: newSurname
          })
        })
        .then(response => response.json())
        .then(response => {
          console.log(response)
        })
      /*
        .catch(err => {
          console.log(err);
        });
        */
      console.log("addUser response: " + response);
    } catch(error) {
      console.log("ERROR at 'addUser'");
      console.log(error);
    }
  }

  return (
    <div className="App">
      <h1>Data from an API</h1>
      <DataTable data={users} id="data" />
      <RecordForm data={users} setData={setUsers} addNew={addUser} />
    </div>
  );
}

export default App;
