/*
 * Navigation component with links to other sections
 *
 * Gilberto Echeverria
 * 2022-08-30
 */

import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation ({token}) {
    if (token !== '') {
        return (
            <nav>
                <ul id="horizontal-list">
                    <li><Link to="/newFile">New File</Link></li>
                    <li><Link to="/search">Search</Link></li>
                    <li><Link to="/display">Data Display</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                </ul>
            </nav>
        );
    } else {
        return (
            <nav>
                <ul id="horizontal-list">
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>
        );
    }
}

export default Navigation;
