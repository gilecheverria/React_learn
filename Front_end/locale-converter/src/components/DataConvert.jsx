/*
 * App to display student data formatted for Mexico or USA
 *
 * Gilberto Echeverria
 * 2022-08-17
 * 2022-08-23   Refactor into multiple components
 */

import '../App.css';
import { useEffect } from 'react';
import RecordForm from './RecordForm'
import DataDisplay from './DataDisplay'
import { format_line } from '../modules/conversions'

function DataConvert({tableRows, setTableRows,
                      values, setValues,
                      newValues, setNewValues}) {

  // Whenever 'values' changes, re-do the conversion
  useEffect(() => {
    const newValuesArray = values.map((item) => format_line(item));
    setNewValues(newValuesArray);
  }, [values, setNewValues]);

  return (
    <div className="App">
      {/* Add new users */}
      <RecordForm
        values={values}
        newValues={newValues}
        setValues={setValues}
        setNewValues={setNewValues}
      />
      {/* Data containers */}
      <DataDisplay
        tableRows={tableRows}
        values={values}
        newValues={newValues}
      />
    </div>
  );
}

export default DataConvert;
