/*
 * Navigation component with links to other sections
 *
 * Gilberto Echeverria
 * 2022-08-30
 */

import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation () {
    return (
        <nav>
            <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/newFile">New File</Link></li>
                <li><Link to="/search">Search</Link></li>
                <li><Link to="/display">Data Display</Link></li>
            </ul>
        </nav>
    );
}

export default Navigation;
