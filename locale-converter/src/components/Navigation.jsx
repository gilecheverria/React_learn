/*
 * Component to display a navigation bar with links to various sections
 *
 * Gilberto Echeverria
 * 2022-08-26
 */

import './Navigation.css';
import { Link } from 'react-router-dom';

function Navigation({tableRows, setTableRows,
                      values, setValues,
                      newValues, setNewValues}) {

  return (
    <div className="NavBar">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/convert">Conversion</Link>
        <Link to="/search">Search</Link>
      </nav>
    </div>
  );
}

export default Navigation;
