/*
 * Simple login page to demonstrate the use of state
 *
 * Gilberto Echeverria
 * 2022-08-29
 */

import { useEffect } from 'react';
import { useNavigate }  from 'react-router-dom';

// Receive the set method from the parent component to modify its state
function Logout ({setToken}) {
    const navigate = useNavigate();

    useEffect(() => {
        setToken('');   // Reset the token to an empty string
        navigate('/');  // Redirect to the home page
    });

    return (
        <div>
        <h1>Thanks for visiting</h1>
        </div>
    );
}

export default Logout;
