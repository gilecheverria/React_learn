/*
 * Component to search for data and display the results
 *
 * TODO: Probably separate this into two components:
 * - SearchForm
 * - DataTable
 *
 * Gilberto Echeverria
 * 2022-10-04
 */

import { useState, useEffect } from 'react';
import FilterItem from './FilterItem.jsx';
import DataTable from './DataTable.jsx';
import './Search.css';
// Functions for the database API
import { getFilteredDocuments } from '../modules/db_api.js';


// Preset data
// TODO: This should come from the DB
const categories = ['Caso', 'Folio', 'Materia', 'Persona']
//const materias = ['penal', 'civil', 'judicial', 'amparo'];

// Function to update the JSON with the search filters
function addField(state, event) {
    return {...state,
        // Use lowercase for the key
        [event.category.toLowerCase()]:
        // Convert numerical values to number instead of string
        (isNaN(event.value) ? event.value : Number(event.value) )};
}

// Helper function to identify when the response from the DB is empty
// https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}

function Search () {
    const [data, setData] = useState([{}]);
    const [headers, setHeaders] = useState([]);
    const [values, setValues] = useState([[]]);
    // Default filters
    const [filters, setFilters] = useState([
        {category: 'Caso', value: '1'}
    ]);

    function addFilter(event) {
        event.preventDefault()
        const newFilter = {category: '', value: ''}
        setFilters([...filters, newFilter])
    }

    function delFilter(event) {
        event.preventDefault()
        setFilters(filters.slice(0, -1))
    }

    function handleSubmit(event) {
        event.preventDefault();
        let mongoFilter = filters.reduce(addField, {});
        console.log("Current filters: " + JSON.stringify(filters));
        console.log("Mongo filters: " + JSON.stringify(mongoFilter));
        getFilteredDocuments(mongoFilter, setData);
    }

    // Update the headers and values when the data changes
    useEffect(() => {
        if (!is_empty(data)) {
            setHeaders(Object.keys(data[0]));
            setValues(data.map(item => Object.values(item)));
        }
    }, [data]);

    return (
        <div>
            <h1>Search page</h1>
            <form onSubmit={handleSubmit}>
                <div className="Buttons">
                    <button
                        className="FilterButton"
                        onClick={addFilter}
                        data-testid="addFilter"
                    >+</button>
                    <button
                        className="FilterButton"
                        onClick={delFilter}
                        data-testid="delFilter"
                    >-</button>
                </div>
                {filters.map( (filter, index) =>
                <FilterItem
                    key={index}
                    categories={categories}
                    filters={filters}
                    setFilters={setFilters}
                    index={index}
                    data-testid="filterItem"
                />
                )}
                <input type="submit" value="Submit" />
            </form>
            <h1>Search results</h1>
            {(!is_empty(data)) ? <DataTable
                headers={headers}
                values={values}
            /> : <p>No data found</p>}
        </div>
    );
}

export default Search;
