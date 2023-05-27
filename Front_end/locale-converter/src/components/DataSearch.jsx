/*
 * Component to search for specific items within the data
 *
 * Gilberto Echeverria
 * 2022-08-26
 */

import './DataSearch.css';
import { useState } from 'react';
import DataTable from './DataTable'
//import DataTableFilter from './DataTableFilter'
import FilterForm from './FilterForm'

function DataSearch({tableRows, setTableRows,
                      values, setValues,
                      newValues, setNewValues}) {
  // Create a list of filter objects, with a default one
  const [filters, setFilters] = useState([{category: tableRows[0], value: ""}]);

  return (
    <div className="DataSearch">
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
      {/*
      <DataTableFilter
        tableRows={tableRows}
        values={values}
        newValues={newValues}
        filters={filters}
      />
      */}
    </div>
  );
}

export default DataSearch;
