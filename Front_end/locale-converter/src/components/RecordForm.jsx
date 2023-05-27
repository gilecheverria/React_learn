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
import { format_line } from '../modules/conversions'

function RecordForm(props) {

  const [newName, setName] = useState('');
  const [newId, setId] = useState('');
  const [newDate, setDate] = useState('');
  const [newGrade, setGrade] = useState(0);

  function updateName(event) {
    setName(event.target.value);
  }

  function updateId(event) {
    setId(event.target.value);
  }

  function updateDate(event) {
    setDate(event.target.value);
  }

  function updateGrade(event) {
    setGrade(event.target.value);
  }

  function formatDate(date) {
    const [year, month, day] = newDate.split('-');
    return ([day, month, year].join('/'));
  }

  function registerRecord(event) {
    event.preventDefault();
    // Find out what the next index should be
    const lastIndex = props.values[props.values.length - 1][0];
    const index = parseInt(lastIndex) + 1;
    // Create the new records as lists
    const newValue = [index, newName, newId, formatDate(newDate), newGrade];
    const newResultValue = format_line(newValue);
    // Update the matrices in the App
    props.setValues([...props.values, newValue]);
    props.setNewValues([...props.newValues, newResultValue]);

    // Reset the values in the form
    setName('');
    setId('');
    setDate('');
    setGrade(0);
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
        <label>ID</label>
        <input
          type="text"
          name="id"
          value={newId}
          onChange={updateId}
        />
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={newDate}
          onChange={updateDate}
        />
        <label>Grade</label>
        <input
          type="number"
          name="grade"
          value={newGrade}
          onChange={updateGrade}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default RecordForm;
