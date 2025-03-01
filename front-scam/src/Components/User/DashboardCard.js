import React from "react";
import { motion } from "framer-motion";

const DashboardCard = ({ title, value, color }) => {
  return (
    <motion.div className={`p-6 rounded-lg shadow-md text-white ${color}`} whileHover={{ scale: 1.05 }}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </motion.div>
  );
};

export default DashboardCard;
