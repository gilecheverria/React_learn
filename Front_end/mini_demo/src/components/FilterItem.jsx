import './FilterItem.css';

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
        <div className="FilterItem">
            <label>Category: </label>
            <select onChange={setCategory}>
                {categories.map(cat =>
                    <option value={cat} key={cat}>{cat}</option>
                )}
            </select>
            <label>Value: </label>
            <input type="text" onChange={setValue}/>
        </div>
    );
}

export default FilterItem;
