import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin ,user,setUser}) => {

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/login', credentials)
            .then(response => {
                console.log(response.data);
                // Handle success

                // if (response.data.user) {
                //     onLogin(response.data.user);
                //     // Optionally, redirect to a different page
                // }
                if (credentials.email === response.data.user.email && credentials.password === response.data.user.password && response.data.user.role === "seller") {
                    setUser(response.data.user); // Set the authenticated user in the state
                    navigate('/add-property')
                    return true; // Return true to indicate successful login
                }
                else{
                    navigate('/properties')
                }
            })
            .catch(error => {
                console.error('Error registering user:', error);
                // Handle error
            });
    };

    return (
<form onSubmit={handleSubmit}>
            <div>
                <label>
                    Email:
                    <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
                </label>
            </div>
            <button type="submit">Login</button>
        </form>

    );
};

export default LoginForm;
