import { useState } from 'react';
import FilterItem from './FilterItem.jsx';
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

function Search ({setData}) {

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

    return (
        <div>
            <h1>Search page</h1>
            <form onSubmit={handleSubmit}>
                <div className="Buttons">
                    <button className="FilterButton" onClick={addFilter}>+</button>
                    <button className="FilterButton" onClick={delFilter}>-</button>
                </div>
                {filters.map( (filter, index) =>
                <FilterItem
                    key={index}
                    categories={categories}
                    filters={filters}
                    setFilters={setFilters}
                    index={index}
                />
                )}
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Search;
