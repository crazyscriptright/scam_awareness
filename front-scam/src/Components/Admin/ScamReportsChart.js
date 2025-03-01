import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import axios from "axios";
import { motion } from "framer-motion";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF", "#FF6384", "#36A2EB", "#4BC0C0", "#FF9F40"];

const ScamReportsChart = () => {
  const [reportStatusData, setReportStatusData] = useState([]);
  const [scamTypeData, setScamTypeData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users/scam-reports")
      .then((res) => {
        processChartData(res.data);
      })
      .catch((err) => console.error("Error fetching scam reports", err));
  }, []);

  const processChartData = (data) => {
    // Processing report_status distribution
    const statusCounts = data.reduce((acc, report) => {
      acc[report.report_status] = (acc[report.report_status] || 0) + 1;
      return acc;
    }, {});

    const reportStatusChartData = Object.keys(statusCounts).map((key) => ({
      name: key,
      count: statusCounts[key],
    }));

    // Processing scam_type distribution
    const scamCounts = data.reduce((acc, report) => {
      acc[report.scam_type] = (acc[report.scam_type] || 0) + 1;
      return acc;
    }, {});

    const scamTypeChartData = Object.keys(scamCounts).map((key, index) => ({
      name: key,
      value: scamCounts[key],
      color: COLORS[index % COLORS.length],
    }));

    setReportStatusData(reportStatusChartData);
    setScamTypeData(scamTypeChartData);
  };

  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Scam Reports Overview</h2>

      {/* Report Status Bar Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-md font-semibold text-gray-600 mb-3">Report Status Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={reportStatusData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Scam Type Pie Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8"
      >
        <h3 className="text-md font-semibold text-gray-600 mb-3">Scam Type Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={scamTypeData} dataKey="value" nameKey="name" outerRadius={100}>
              {scamTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default ScamReportsChart;
