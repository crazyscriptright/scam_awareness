import React, { useState } from "react";
import { HashLink } from "react-router-hash-link";
import { FaHome, FaExclamationTriangle, FaInfoCircle, FaServicestack, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import "tailwindcss/tailwind.css";
import { FaTrophy, FaShieldAlt, FaNewspaper, FaFlag } from "react-icons/fa";

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
            <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-50 ${isOpen ? "block" : "hidden"}`} onClick={closeSidebar}></div>

            <div className={`fixed inset-y-0 left-0 bg-gray-900 text-white w-64 z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <div className="p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-center">Scam Shield</h1>
                    <button className="text-white" onClick={toggleSidebar}>
                        <FaTimes className="w-6 h-6" />
                    </button>
                </div>
            <nav className="mt-6">
            {/* Home */}
            <HashLink 
                smooth 
                to="/#home" 
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" 
                onClick={closeSidebar}
            >
                <FaHome className="inline-block mr-2 text-blue-500" /> Home
            </HashLink>

            {/* About */}
            <HashLink 
                smooth 
                to="/aboutus" 
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" 
                onClick={closeSidebar}
            >
                <FaInfoCircle className="inline-block mr-2 text-yellow-500" /> About Us
            </HashLink>

            {/* Services */}
            <HashLink 
                smooth 
                to="/#services" 
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" 
                onClick={closeSidebar}
            >
                <FaServicestack className="inline-block mr-2 text-green-500" /> Services
            </HashLink>

            {/* Achievements */}
            <HashLink 
                smooth 
                to="/#achievements" 
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" 
                onClick={closeSidebar}
            >
                <FaTrophy className="inline-block mr-2 text-purple-500" /> Achievements
            </HashLink>

            {/* Scam Types */}
            <HashLink 
                smooth 
                to="/#scam-types" 
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" 
                onClick={closeSidebar}
            >
                <FaExclamationTriangle className="inline-block mr-2 text-red-500" /> Scam Types
            </HashLink>

            {/* Prevention Tips */}
            <HashLink 
                smooth 
                to="/#prevention-tips" 
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" 
                onClick={closeSidebar}
            >
                <FaShieldAlt className="inline-block mr-2 text-blue-400" /> Prevention Tips
            </HashLink>

            {/* Articles */}
            <HashLink 
                smooth 
                to="/AllArticlesPage" 
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" 
                onClick={closeSidebar}
            >
                <FaNewspaper className="inline-block mr-2 text-orange-500" /> News & Articles
            </HashLink>

            {/* Report */}
            <HashLink 
                smooth 
                to="/#report" 
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" 
                onClick={closeSidebar}
            >
                <FaFlag className="inline-block mr-2 text-red-400" /> Report Scam
            </HashLink>

            {/* Contact - Keep this last as per standard navigation conventions */}
            <HashLink 
                smooth 
                to="/aboutus#contactus" 
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" 
                onClick={closeSidebar}
            >
                <FaEnvelope className="inline-block mr-2 text-purple-500" /> Contact Us
            </HashLink>
            </nav>
            </div>

            <div className="fixed top-0 left-0 w-full bg-gray-900 text-white p-4 z-50 flex items-center">
                <button className="text-white" onClick={toggleSidebar}>
                    <FaBars className="w-6 h-6" />
                </button>
                <h2 className="ml-4 text-xl font-bold">Scam Shield</h2>
            </div>
        </div>
    );
};

export default Navbar;
