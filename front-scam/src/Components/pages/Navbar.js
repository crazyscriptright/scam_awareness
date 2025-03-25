import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaExclamationTriangle, FaInfoCircle, FaServicestack, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import "tailwindcss/tailwind.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    return (
        <div className="flex">
            {/* Overlay */}
            <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 ${isOpen ? "block" : "hidden"}`} onClick={closeSidebar}></div>

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 bg-gray-900 text-white w-64 z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <div className="p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Navigation</h1>
                    <button className="text-white" onClick={toggleSidebar}>
                        <FaTimes className="w-6 h-6" />
                    </button>
                </div>
                <nav className="mt-6">
                    <Link to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" onClick={closeSidebar}>
                        <FaHome className="inline-block mr-2 text-blue-500" /> Home
                    </Link>
                    <Link to="/report" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" onClick={closeSidebar}>
                        <FaExclamationTriangle className="inline-block mr-2 text-red-500" /> Report
                    </Link>
                    <Link to="/about" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" onClick={closeSidebar}>
                        <FaInfoCircle className="inline-block mr-2 text-yellow-500" /> About
                    </Link>
                    <Link to="/services" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" onClick={closeSidebar}>
                        <FaServicestack className="inline-block mr-2 text-green-500" /> Services
                    </Link>
                    <Link to="/contact" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" onClick={closeSidebar}>
                        <FaEnvelope className="inline-block mr-2 text-purple-500" /> Contact Us
                    </Link>
                </nav>
            </div>

            {/* Top Navbar */}
            <div className="flex-1 p-4 bg-gray-100 flex items-center">
                <button className="text-gray-900" onClick={toggleSidebar}>
                    <FaBars className="w-6 h-6" />
                </button>
                <h2 className="ml-4 text-xl font-bold">Scam Shield</h2>
            </div>
        </div>
    );
};

export default Navbar;
