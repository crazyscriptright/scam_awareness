import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Register.css'; // Ensure this path is correct

const Register = () => {
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/register', {
                name,
                dob,
                email,
                password,
            });
            setMessage('Registration successful!');
        } catch (error) {
            setMessage('Error registering user.');
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Date of Birth:
                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;