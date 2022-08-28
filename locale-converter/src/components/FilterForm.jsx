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
    filters[props.index] = event.target.value;
    props.setFilters(filters);
  };

  const valueChangeHandler = function(event) {
    const filters = props.filters.slice();
    filters[props.index] = event.target.value;
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

  const form_id = 'filterForm';

  return (
    <div className="Input">
      <h2>Select filter categories </h2>
      <form onSubmit={updateSearch}>


        {/*filters.map((filter, index) => {
          return <FilterItem
            form={form_id}
            index={filter}
            key={index}
            categories={categories}
          />
        })*/}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default FilterForm;
