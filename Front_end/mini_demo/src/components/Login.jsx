/*
 * Simple login page to demonstrate the use of state
 *
 * Gilberto Echeverria
 * 2022-08-29
 */

import LoginForm from './LoginForm';

// Receive the set method from the parent component to modify its state
function Login ({setToken}) {

    return (
        <div>
        <h1>Login page</h1>
        <LoginForm setToken={setToken}/>
        </div>
    );
}

export default Login;
