import { useState } from "react";
import { motion } from "framer-motion";
import whoweare from "../img/whoweare.jpg";

export default function WhoWeAre() {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="py-20 px-8 bg-white overflow-hidden relative">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: hovered ? 50 : 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 text-center md:text-left relative z-10"
        >
          <motion.h2 
            className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight transition-all duration-300"
            whileHover={{ scale: 1.05, x: -10, color: "#4f46e5" }}
          >
            Who We Are
          </motion.h2>
          <motion.p 
            className="max-w-lg text-lg text-gray-600 mb-8 transition-all duration-300"
            whileHover={{ scale: 1.02, x: -10, color: "#6b7280" }}
          >
            We are dedicated to raising awareness about scams, educating the public, and
            providing a secure platform to report fraudulent activities.
          </motion.p>
          <motion.button 
            className="bg-black text-white px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-900"
            whileHover={{ scale: 1.1 }}
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: hovered ? -50 : 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 relative cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <motion.img 
            src={whoweare}
            alt="Scam Awareness Illustration" 
            className="rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            whileHover={{ scale: 1.1 }}
          />
          {/* Background Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-3xl transform scale-110"></div>
        </motion.div>
      </div>
    </section>
  );
}