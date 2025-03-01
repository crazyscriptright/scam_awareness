import React, { useEffect, useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import axios from "axios";
import { FaChartBar, FaChartLine, FaUsers } from "react-icons/fa";

const UserRegistrationChart = ({ setTotalRegistrations }) => {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState("bar"); // "bar" or "line"

  useEffect(() => {
    axios.get("http://localhost:5000/api/users/registration-stats")
      .then((res) => {
        const formattedData = res.data.map(entry => ({
          date: entry.date.split("T")[0], // Extract only the date part
          count: Number(entry.count) || 0, // Convert count to number, default to 0 if NaN
        }));

        setData(formattedData);

        // 🔹 Calculate total registrations and update parent state
        const total = formattedData.reduce((sum, entry) => sum + entry.count, 0);
        setTotalRegistrations(total);
      })
      .catch((err) => console.error("Error fetching registration stats:", err));
  }, [setTotalRegistrations]);

  // 🔹 Calculate Average Growth Rate
  const avgGrowthRate = data.length > 1 
    ? ((data[data.length - 1].count - data[0].count) / data[0].count) * 100 
    : 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-xl transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
          <FaUsers className="mr-2 text-blue-500" /> User Registrations
        </h2>
        <div className="flex space-x-2">
          <button
            className={`p-2 rounded-md transition ${chartType === "bar" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-600"}`}
            onClick={() => setChartType("bar")}
          >
            <FaChartBar />
          </button>
          <button
            className={`p-2 rounded-md transition ${chartType === "line" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-600"}`}
            onClick={() => setChartType("line")}
          >
            <FaChartLine />
          </button>
        </div>
      </div>

      {/* Total Registrations & Growth */}

      <div className="text-center text-md font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center justify-center">
        <FaChartLine className="text-green-500 mr-2" /> Avg Growth Rate: 
        <span className={`ml-2 ${avgGrowthRate >= 0 ? "text-green-500" : "text-red-500"}`}>
            {avgGrowthRate.toFixed(2)}%
        </span>
      </div>

      {/* Chart Container */}
      <ResponsiveContainer width="100%" height={300}>
        {chartType === "bar" ? (
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#4f46e5" animationDuration={500} />
          </BarChart>
        ) : (
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={3} animationDuration={500} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default UserRegistrationChart;
