/*
 * Component to ask for the data of a new record
 * This will also process the data as soon as it is read
 * From the tutorial at:
 * https://medium.com/how-to-react/how-to-parse-or-read-csv-files-in-reactjs-81e8ee4870b0
 *
 * Gilberto Echeverria
 * 2022-08-23
 */

import '../App.css';
import { useState } from 'react';

function RecordForm(props) {

  const [newName, setName] = useState('');
  const [newSurname, setSurname] = useState('');

  function updateName(event) {
    setName(event.target.value);
  }

  function updateSurname(event) {
    setSurname(event.target.value);
  }

  function registerRecord(event) {
    event.preventDefault();
    // Find out what the next index should be
    const lastIndex = props.data[props.data.length - 1].id_users;
    const index = parseInt(lastIndex) + 1;
    // Create the new record as an object
    const newRecord = {
      'id_users': index,
      'name': newName,
      'surname': newSurname
    };
    // Update the matrices in the App
    props.setData([...props.data, newRecord]);
    // Call the API to insert into the database
    props.addNew(newName, newSurname);

    // Reset the data in the form
    setName('');
    setSurname('');
  }

  return (
    <div>
      <h2>Enter a new record</h2>
      <form
        data-testid="recordForm"
        className="RecordForm"
        onSubmit={registerRecord}
      >
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={newName}
          onChange={updateName}
        />
        <label>Surname</label>
        <input
          type="text"
          name="surname"
          value={newSurname}
          onChange={updateSurname}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default RecordForm;
