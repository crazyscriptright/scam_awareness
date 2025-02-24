import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/signin', {
                email,
                password,
            });
            const { redirectUrl, name } = response.data;
            setUserName(name); // Assuming the API returns user name
            setIsLoggedIn(true);

            // Redirect after animation
            setTimeout(() => {
                navigate(redirectUrl);
            }, 3000); // 3-second delay
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {isLoggedIn ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 1 }}
                    className="text-center bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
                >
                    <h2 className="text-3xl font-bold text-blue-500">Welcome, {userName}!</h2>
                    <p className="text-gray-600 mt-2">Redirecting to your dashboard...</p>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="mt-4 mx-auto w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
                    />
                </motion.div>
            ) : (
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Login;