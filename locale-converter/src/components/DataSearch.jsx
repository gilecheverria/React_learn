/*
 * Component to search for specific items within the data
 *
 * Gilberto Echeverria
 * 2022-08-26
 */

import '../App.css';
import { useState } from 'react';
import DataTable from './DataTable'
import FilterForm from './FilterForm'

function DataSearch({tableRows, setTableRows,
                      values, setValues,
                      newValues, setNewValues}) {
  // Create a list of filter objects
  const [filters, setFilters] = useState([1]);

  return (
    <div className="App">
      <FilterForm
        categories={tableRows}
        filters={filters}
        setFilters={setFilters}
      />
      {/* Data containers */}
      <DataTable
        tableRows={tableRows}
        values={values}
        newValues={newValues}
      />
    </div>
  );
}

export default DataSearch;
