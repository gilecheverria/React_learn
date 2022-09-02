import DataTable from './DataTable.jsx';

/*
const sample_data = [
  {
    _id: "630e388fcf116465715ead2a",
    title: "Knight's tale",
    genres: [ 'Comedy', 'Adventure' ],
    runtime: 125,
    rated: 'PG',
    year: 2007,
    directors: [ 'Brian Helgeland' ],
    cast: [ 'Heath Ledger', 'Paul Bettany', 'Shannyn Sosa', 'Rufus Sewel' ],
    type: 'movie'
  },
  {
    _id: "630e38decf116465715ead2b",
    title: 'Jurassic World: Fallen Kingdom',
    genres: [ 'Action', 'Sci-Fi' ],
    runtime: 130,
    rated: 'PG-13',
    year: 2018,
    directors: [ 'J. A. Bayona' ],
    cast: [ 'Chris Pratt', 'Bryce Dallas Howard', 'Rafe Spall' ],
    type: 'movie'
  },
  {
    _id: "630e38decf116465715ead2c",
    title: 'Tag',
    genres: [ 'Comedy', 'Action' ],
    runtime: 105,
    rated: 'R',
    year: 2018,
    directors: [ 'Jeff Tomsic' ],
    cast: [ 'Annabelle Wallis', 'Jeremy Renner', 'Jon Hamm' ],
    type: 'movie'
  }
];
*/

// Should receive 'data' as a list of objects (JSON)
// This is the same format as MongoDB will use
function DataDisplay ({data}) {

    //const data = sample_data;

    const headers = Object.keys(data[0])
    const values = data.map(item => Object.values(item))

    return (
        <div>
            <h1>Search results</h1>
            <DataTable headers={headers} values={values} />
        </div>
    );
}

export default DataDisplay;
