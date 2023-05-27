/*
 * Component to ask for the input file
 * This will also process the data as soon as it is read
 * From the tutorial at:
 * https://medium.com/how-to-react/how-to-parse-or-read-csv-files-in-reactjs-81e8ee4870b0
 *
 * Gilberto Echeverria
 * 2022-08-23
 */

import './Form.css';
import { dataLoad } from '../modules/studentData'


function FileForm(props) {

  const changeHandler = function(event) {
    // Calling a function that does the reading
    // Passing it the functions to modify the state and store the values read
    dataLoad(
      event.target.files[0],
      props.setTableRows,
      props.setValues
    );
  };

  return (
    <div className="Input">
      <h2>Select a CSV file</h2>
      <input
        type="file"
        name="file"
        accept=".csv"
        onChange={changeHandler}
        data-testid='inputForm'
      />
    </div>
  );
}

export default FileForm;
