import React, { useState } from 'react';
import { HashLink } from "react-router-hash-link";
import { FaTachometerAlt, FaUsers, FaShieldAlt, FaCog, FaChartBar, FaUserShield, FaComments, FaEnvelope, FaClipboardList, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';
import WithAuth from "../hooks/WithAuth"; // Corrected import path
import axios from "axios";
const Logout = () => {
    const [logoutMessage, setLogoutMessage] = useState(null);
    const [user, setUser] = useState({ name: "User", profilePic: "" });
    const navigate = useNavigate();
}
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
  const handleLogout = () => {
    axios
      .post("http://localhost:5000/logout", {}, { withCredentials: true })
      .then(() => {
        setUser({ name: "User", profilePic: "" });
        setLogoutMessage("You are being logged out...");
        setTimeout(() => {
          navigate("/"); // Redirect to home page
        }, 3000); // Wait for 3 seconds
      })
      .catch((err) => console.error("Logout error", err));
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
                    <HashLink smooth to="#home" className="text-2xl font-bold mt-4 block" onClick={closeSidebar}>Admin Panel</HashLink>
                </div>
                <nav className="mt-10">
                    <HashLink smooth to="#User_Metrics" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" onClick={closeSidebar}>
                        <FaChartBar className="inline-block mr-2 text-blue-500" /> User Metrics
                    </HashLink>
                    <HashLink smooth to="#Analytics" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" onClick={closeSidebar}>
                        <FaChartBar className="inline-block mr-2 text-blue-500" /> Analytics
                    </HashLink>
                    <HashLink smooth to="#Review" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" onClick={closeSidebar}>
                        <FaShieldAlt className="inline-block mr-2 text-red-500" /> Review
                    </HashLink>
                    <HashLink smooth to="#Contact_Us" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" onClick={closeSidebar}>
                        <FaClipboardList className="inline-block mr-2 text-yellow-500" /> Complaints
                    </HashLink>
                    {/* <div>
                        <button onClick={toggleFeedback} className="block w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                            <FaComments className="inline-block mr-2 text-purple-500" /> Feedback
                        </button>
                        {isFeedbackOpen && (
                            <div className="ml-4">
                                <HashLink smooth to="/admin/feedback/contactus" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" onClick={closeSidebar}>
                                    <FaEnvelope className="inline-block mr-2 text-pink-500" /> Contact Us
                                </HashLink>
                                <HashLink smooth to="/admin/feedback/complaints" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" onClick={closeSidebar}>
                                    <FaClipboardList className="inline-block mr-2 text-yellow-500" /> Complaints
                                </HashLink>
                            </div>
                        )}
                    </div>
                    <div>
                        <button onClick={toggleContent} className="block w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                            <FaCog className="inline-block mr-2 text-gray-500" /> Content
                        </button>
                        {isContentOpen && (
                            <div className="ml-4">
                                <HashLink smooth to="/admin/content/resources" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" onClick={closeSidebar}>
                                    <FaClipboardList className="inline-block mr-2 text-yellow-500" /> Resources
                                </HashLink>
                                <HashLink smooth to="/admin/content/quiz" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" onClick={closeSidebar}>
                                    <FaQuestionCircle className="inline-block mr-2 text-indigo-500" /> Quiz
                                </HashLink>
                            </div>
                        )}
                    </div> */}
                    <HashLink smooth to="#User_Management" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" onClick={closeSidebar}>
                        <FaUsers className="inline-block mr-2 text-green-500" /> User Management
                    </HashLink>
                    {/* Logout Button */}
                    <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 w-full text-red-500"
                    >
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </button>
                            
                </nav>
                        {/* Logout Message */}
                {logoutMessage && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <p>{logoutMessage}</p>
                    </div>
                    </div>
                )}
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