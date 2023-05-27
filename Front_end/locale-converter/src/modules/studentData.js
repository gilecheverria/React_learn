/*
 * Module with functions to read and handle CSV files with student data
 *
 * Gilberto Echeverria
 * 2022-08-27
 */

import Papa from 'papaparse';

function dataLoad(filename, setHeaders, setValues) {
  Papa.parse(filename, {
    header: true,
    skipEmptyLines: true,
    // Function to process the data read
    complete: (results) => {
      const rowsArray = [];
      const valuesArray = [];

      // Iterate over the data to separate the contents
      for (const item of results.data) {
        rowsArray.push(Object.keys(item));
        valuesArray.push(Object.values(item));
      }

      // Call the state functions to save the data recovered
      setHeaders(rowsArray[0]);
      setValues(valuesArray);
    }
  });
}

export { dataLoad };
