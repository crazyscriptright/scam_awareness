import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaShieldAlt, FaCog, FaChartBar, FaUserShield, FaComments, FaEnvelope, FaClipboardList, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';
import WithAuth from "../hooks/WithAuth"; // Corrected import path


const AdminNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const [isContentOpen, setIsContentOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    const toggleFeedback = () => {
        setIsFeedbackOpen(!isFeedbackOpen);
    };

    const toggleContent = () => {
        setIsContentOpen(!isContentOpen);
    };

    return (
        <div className="flex">
            <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 ${isOpen ? 'block' : 'hidden'}`} onClick={closeSidebar}></div>
            <div className={`fixed inset-y-0 left-0 bg-gray-900 text-white w-64 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
                <div className="p-4">
                    <button className="text-white" onClick={toggleSidebar}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <Link to="/admin" className="text-2xl font-bold mt-4 block" onClick={closeSidebar}>Admin Panel</Link>
                </div>
                <nav className="mt-10">
                    <Link to="/admin/analytics" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" onClick={closeSidebar}>
                        <FaChartBar className="inline-block mr-2 text-blue-500" /> Analytics
                    </Link>
                    <Link to="/admin/users" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" onClick={closeSidebar}>
                        <FaUsers className="inline-block mr-2 text-green-500" /> User Management
                    </Link>
                    <Link to="/admin/complaints" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" onClick={closeSidebar}>
                        <FaClipboardList className="inline-block mr-2 text-yellow-500" /> Complaints
                    </Link>
                    <Link to="/admin/review" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" onClick={closeSidebar}>
                        <FaShieldAlt className="inline-block mr-2 text-red-500" /> Review
                    </Link>
                    <div>
                        <button onClick={toggleFeedback} className="block w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                            <FaComments className="inline-block mr-2 text-purple-500" /> Feedback
                        </button>
                        {isFeedbackOpen && (
                            <div className="ml-4">
                                <Link to="/admin/feedback/contactus" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" onClick={closeSidebar}>
                                    <FaEnvelope className="inline-block mr-2 text-pink-500" /> Contact Us
                                </Link>
                                <Link to="/admin/feedback/complaints" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" onClick={closeSidebar}>
                                    <FaClipboardList className="inline-block mr-2 text-yellow-500" /> Complaints
                                </Link>
                            </div>
                        )}
                    </div>
                    <div>
                        <button onClick={toggleContent} className="block w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                            <FaCog className="inline-block mr-2 text-gray-500" /> Content
                        </button>
                        {isContentOpen && (
                            <div className="ml-4">
                                <Link to="/admin/content/resources" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" onClick={closeSidebar}>
                                    <FaClipboardList className="inline-block mr-2 text-yellow-500" /> Resources
                                </Link>
                                <Link to="/admin/content/quiz" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" onClick={closeSidebar}>
                                    <FaQuestionCircle className="inline-block mr-2 text-indigo-500" /> Quiz
                                </Link>
                            </div>
                        )}
                    </div>
                    <Link to="/admin/settings" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" onClick={closeSidebar}>
                        <FaCog className="inline-block mr-2 text-gray-500" /> Settings
                    </Link>
                    <Link to="/logout" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" onClick={closeSidebar}>
                        <FaSignOutAlt className="inline-block mr-2 text-red-500" /> Logout
                    </Link>
                </nav>
            </div>
            <div className="flex-1 p-4">
                <button className="text-gray-900" onClick={toggleSidebar}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default WithAuth(AdminNavbar);