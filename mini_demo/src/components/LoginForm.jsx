/*
Component to perform user login

Made almost entirely with React Hooks and GitHub Copilot

Gilberto Echeverria
2022-09-22
*/

import { useState } from 'react';
import { redirect } from 'react-router-dom';
import { loginUser } from '../modules/db_api.js';
import './LoginForm.css';

function LoginForm({setToken}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        // Validate the form
        if (username === '' || password === '') {
            alert('Please fill in all the fields');
            return;
        }
        // Send the data to the server
        const formData = {'user': username, 'pwd': password};
        loginUser(formData, setToken);
        redirect("/display");
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
