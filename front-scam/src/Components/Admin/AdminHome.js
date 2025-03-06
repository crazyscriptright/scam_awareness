import React, { useState, useEffect } from "react";
import AdminProfile from "./AdminProfile";
import { FaUsers, FaShieldAlt, FaChartBar, FaEye, FaEyeSlash } from "react-icons/fa";
import AdminNavbar from "./AdminNavbar";
import WithAuth from "../hooks/WithAuth";
import UserRegistrationChart from "./UserRegistrationChart";
import { motion } from "framer-motion";
import ScamReportsChart from "./ScamReportsChart";
import axios from "axios";
import ScamReportsTable from "./ScamReportsTable";
import AllScamReportsTable from "./AllScamReportsTable";
import UserManagement from "./UserManagement";
import ContactsTable from "./ContactsTable";
import ContactUsView from "./ContactUsView";


const AdminHome = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeSessions, setActiveSessions] = useState(0);
  const [securityAlerts, setSecurityAlerts] = useState([]);
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [showAlerts, setShowAlerts] = useState(true); // Now alerts are visible by default

  useEffect(() => {
    axios.get("http://localhost:5000/api/users/active-sessions")
      .then((res) => {
        setActiveSessions(res.data.activeSessions);
      })
      .catch((err) => console.error("Error fetching active sessions:", err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/User/security-alerts")
      .then((res) => {
        // Check if the response has the message indicating no security alerts
        if (res.data.length === 1 && res.data[0].message === "No active security alerts") {
          setSecurityAlerts([]); // Set it to an empty array when no alerts
        } else {
          setSecurityAlerts(res.data); // Set it to the actual alerts array
        }
      })
      .catch((err) => console.error("Error fetching security alerts:", err));
  }, []);
  

  // Function to apply color animation to emails
  const highlightEmails = (message) => {
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    return message.split(emailRegex).map((part, index) => 
      emailRegex.test(part) ? (
        <motion.span
          key={index}
          className="font-bold"
          animate={{ color: ["#ff0000", "#ff9900", "#33cc33", "#0099ff", "#ff0000"] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          {part}
        </motion.span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow p-4 flex flex-wrap justify-between items-center">
        <AdminNavbar />
        <div className="absolute top-2 right-4 z-50">
          <AdminProfile />
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="p-4 md:p-6 flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-4">
          {/* Total Registrations */}
          <motion.div 
            className="bg-white shadow rounded-lg p-4 md:p-6 flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <FaUsers className="text-blue-500 text-3xl md:text-4xl mb-2 md:mb-3" />
            <h2 className="text-sm md:text-lg font-semibold">Total Registrations</h2>
            <p className="text-2xl md:text-3xl font-bold text-blue-500">{totalRegistrations}</p>
          </motion.div>

          {/* Active Sessions */}
          <motion.div 
            className="bg-white shadow rounded-lg p-4 md:p-6 flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <FaChartBar className="text-green-500 text-3xl md:text-4xl mb-2 md:mb-3" />
            <h2 className="text-sm md:text-lg font-semibold">Active Sessions</h2>
            <p className="text-2xl md:text-3xl font-bold text-green-500">{activeSessions}</p>
          </motion.div>
          
          {/* Security Alerts */}
          <motion.div  
            className="bg-white shadow rounded-lg p-4 md:p-6 flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <FaShieldAlt className="text-red-500 text-3xl mr-3 md:text-4xl mb-2 md:mb-3" />
            <h2 className="text-sm md:text-lg font-semibold">Security Alerts</h2>
            <p className="text-2xl md:text-3xl font-bold text-red-500">
              {securityAlerts.length === 0 ? 0 : securityAlerts.length}
            </p>
          </motion.div>

          {/* Only show Security Alerts Detailed Block if there are security alerts */}
          {securityAlerts.length > 0 && (
            <div className="mt-6">
              <motion.div 
                className="bg-white shadow-lg rounded-lg p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold">Security Alerts Details</h2>
                  <button
                    onClick={() => setShowAlerts(!showAlerts)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
                  >
                    {showAlerts ? <FaEyeSlash className="mr-2" /> : <FaEye className="mr-2" />}
                    {showAlerts ? "Hide Alerts" : "View Alerts"}
                  </button>
                </div>

                {/* Security Alert Details */}
                {showAlerts && (
                  <div className="space-y-3">
                    {securityAlerts.map((alert, index) => (
                      <motion.div
                        key={index}
                        className="bg-red-200 p-3 rounded-lg text-sm"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <p className="text-red-800">
                          <span className="mr-2">🚨</span> {highlightEmails(alert.message)}
                        </p>
                        <p className="text-xs text-gray-600">
                          {new Date(alert.timestamp).toLocaleString("en-IN")}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </div>
      
        {/* Charts & Table */}
        <div className="mt-6 space-y-6">
          {/* User Registration Growth Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <UserRegistrationChart setTotalRegistrations={setTotalRegistrations} />
          </motion.div>

          {/* Scam Reports Chart & Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ScamReportsChart />
            <ScamReportsTable />
            <AllScamReportsTable />
            <ContactsTable/>
            <UserManagement />
            <ContactUsView />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default WithAuth(AdminHome);
