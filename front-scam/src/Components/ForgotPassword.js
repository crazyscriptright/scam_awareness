import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/ForgotPassword.css'; // Ensure this path is correct

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/forgot-password', {
                email,
                dob,
                newPassword,
            });
            setMessage('Password reset successful!');
        } catch (error) {
            setMessage('Error resetting password.');
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Date of Birth:
                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
                </label>
                <label>
                    New Password:
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                </label>
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPassword;