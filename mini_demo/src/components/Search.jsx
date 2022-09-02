import { useState } from 'react';
import FilterItem from './FilterItem.jsx';
import './Search.css';


function Search () {
    const categories = ['Area', 'Juicio', 'Juzgado', 'Dirección']

    const [filters, setFilters] = useState([
        {category: 'Juicio', value: 'Fiscal'}
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

    return (
        <div>
            <h1>Search page</h1>
            <form>
                <div className="Buttons">
                    <button className="FilterButton" onClick={addFilter}>+</button>
                    <button className="FilterButton" onClick={delFilter}>-</button>
                </div>
                {filters.map( (filter, index) =>
                <FilterItem
                    key={index}
                    categories={categories}
                    filters={filters}
                    setFilters={filters}
                    index={index}
                />
                )}
            </form>
        </div>
    );
}

export default Search;
