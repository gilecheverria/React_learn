import { Link } from 'react-router-dom';

function Navigation () {
    return (
        <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/newFile">New File</Link></li>
            <li><Link to="/search">Search</Link></li>
        </ul>
    );
}

export default Navigation;
