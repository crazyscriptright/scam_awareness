import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css'; // Ensure this path is correct

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    SAP
                </Link>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/login" className="nav-links">
                            Login
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register" className="nav-links">
                            Register
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/forgot-password" className="nav-links">
                            Forgot Password
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;