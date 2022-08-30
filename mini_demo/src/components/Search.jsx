import { useState } from 'react';

function FilterItem ({categories, filters, setFilters, index}) {

    function setCategory(event) {
        const newFilters = [...filters]
        newFilters[index].category = event.target.value
        setFilters(newFilters)
    }

    function setValue(event) {
        const newFilters = [...filters]
        newFilters[index].value = event.target.value
        setFilters(newFilters)
    }

    return (
        <div>
            <label>Category: </label>
            <select onChange={setCategory}>
                {categories.map(cat =>
                    <option value={cat}>{cat}</option>
                )}
            </select>
            <label>Value: </label>
            <input type="text" onChange={setValue}/>
        </div>
    );
}


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
                <button onClick={addFilter}>+</button>
                <button onClick={delFilter}>-</button>
                {filters.map( (filter, index) =>
                <div>
                    <FilterItem
                        key={index}
                        categories={categories}
                        filters={filters}
                        setFilters={filters}
                        index={index}
                    />
                </div>
                )}
            </form>
        </div>

    );
}

export default Search;
