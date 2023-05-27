/*
Component to perform user login

Made almost entirely with React Hooks and GitHub Copilot

To navigate to a different page after login:
https://www.makeuseof.com/redirect-user-after-login-react/

Gilberto Echeverria
2022-09-22
*/

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../modules/db_api.js';
import './LoginForm.css';

function LoginForm({token, setToken}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // Allow redirection to other pages
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setToken({}) // Clear the token
        // Validate the form
        if (username === '' || password === '') {
            alert('Please fill in all the fields');
            return;
        }
        // Send the data to the server
        const formData = {'user': username, 'pwd': password};
        token = await loginUser(formData, setToken);
        console.log("Received token: " + token);
        if(token !== null) {
            navigate('/display');
        } else {
            alert('Invalid username or password');
        }
    }

    return (
        <form id="form-login" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;
