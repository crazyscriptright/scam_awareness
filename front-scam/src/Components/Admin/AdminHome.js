import React, { useState, useEffect } from "react";
import AdminProfile from "./AdminProfile";
import { FaUsers, FaShieldAlt, FaChartBar } from "react-icons/fa";
import AdminNavbar from "./AdminNavbar";
import WithAuth from "../hooks/WithAuth";
import UserRegistrationChart from "./UserRegistrationChart";
import { motion } from "framer-motion";
import ScamReportsChart from "./ScamReportsChart";
import axios from "axios";
import ScamReportsTable from "./ScamReportsTable";

const AdminHome = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeSessions, setActiveSessions] = useState(0);
  const [securityAlerts, setSecurityAlerts] = useState(0);
  const [totalRegistrations, setTotalRegistrations] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users/active-sessions")
      .then((res) => {
        setActiveSessions(res.data.activeSessions);
      })
      .catch((err) => console.error("Error fetching active sessions:", err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/security-alerts")
      .then((res) => {
        setSecurityAlerts(res.data.securityAlerts);
      })
      .catch((err) => console.error("Error fetching security alerts:", err));
  }, []);

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
        {/* Dashboard Cards */}
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
            <FaShieldAlt className="text-red-500 text-3xl md:text-4xl mb-2 md:mb-3" />
            <h2 className="text-sm md:text-lg font-semibold">Security Alerts</h2>
            <p className="text-2xl md:text-3xl font-bold text-red-500">{securityAlerts}</p>
          </motion.div>
        </div>

        {/* Charts & Table */}
        <div className="mt-6 space-y-6">
          {/* User Registration Growth Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow rounded-lg p-4 md:p-6"
          >
            <UserRegistrationChart setTotalRegistrations={setTotalRegistrations} />
          </motion.div>

          {/* Scam Reports Chart & Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white shadow rounded-lg p-4 md:p-6 overflow-x-auto"
          >
            <ScamReportsChart />
            <ScamReportsTable />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default WithAuth(AdminHome);
