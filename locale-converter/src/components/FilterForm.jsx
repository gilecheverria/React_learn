/*
 * Component to select filter parameters for the data to display
 *
 * Gilberto Echeverria
 * 2022-08-26
 */

import './FilterForm.css';

function FilterItem(props) {

  const categoryChangeHandler = function(event) {
    const filters = props.filters.slice();
    filters[props.index].category = event.target.value;
    props.setFilters(filters);
  };

  const valueChangeHandler = function(event) {
    const filters = props.filters.slice();
    filters[props.index].value = event.target.value;
    props.setFilters(filters);
  };

  return (
    <div className="FilterItem">
      <label htmlFor="category">Field: </label>
      {/* Generate the dropdown using the table headers */}
      <select
        name="category"
        form={props.form}
        index={props.index}
        onChange={categoryChangeHandler}
      >
        {props.categories.map((cat) => {
          return <option value={cat}>{cat}</option>
        })}
      </select>
      <label htmlFor="value">Value: </label>
      <input type="text" onChange={valueChangeHandler} />
    </div>
  )
}

function FilterForm({categories, filters, setFilters}) {

  function updateSearch(event) {
    event.preventDefault();
    console.log("FILTERS:")
    for (const filter of filters) {
      console.log(filter);
    }
  }

  function addFilter() {
    const newFilter = {category: "Index", value: ""};
    setFilters([...filters, newFilter]);
  }

  function delFilter(index) {
    // Can never remove all filters
    if (index > 0) {
      // Make a copy of the original list
      const tempFilters = [...filters];
      tempFilters.splice(index, 1);
      setFilters(tempFilters);
    }
  }

  const form_id = 'filterForm';

  return (
    <div className="FilterArea">
      <h2>Select filter categories </h2>
      <form onSubmit={updateSearch}>
        {/* Show each filter in a different row */}
        {filters.map((filter, index) => {
          return (
            <div className="FilterRow">
              <FilterItem
                form={form_id}
                index={index}
                key={index}
                categories={categories}
                filters={filters}
                setFilters={setFilters}
              />
              <button className="FilterButton" onClick={addFilter}>+</button>
              <button className="FilterButton" onClick={() => delFilter(index)}>-</button>
            </div>);
        })}
        <input type="submit" value="Submit" className="FilterButton" />
      </form>
    </div>
  );
}

export default FilterForm;
