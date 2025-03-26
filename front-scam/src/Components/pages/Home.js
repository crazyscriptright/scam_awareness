import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Profile from "../User/Profile";
import scamAwarenessImg from "../../Img/scam-awareness.jpg";
import hackingThreatImg from "../../Img/hacking-threat.jpg";
import passwordSecurityImg from "../../Img/password-security.jpg";
import ReportScam from "../User/ReportScam";
import WhoWeAre from "./component/WhoWeAre";
import WhatWeDo from "./component/WhatWeDo";
import OurAchievements from "./component/OurAchievements";
import Header from "./component/Header";
import ScamShield from "./component/ScamShield";
import ScamTypesSection from "./component/ScamTypesSection";
import PreventionTipsSection from "./component/PreventionTipsSection";
import {
  FaTrophy,
  FaUsers,
  FaCheckCircle,
  FaUserCircle,
  FaShieldAlt,
  FaExclamationTriangle,
  FaNewspaper,
  FaLock,
  FaArrowRight
} from "react-icons/fa";
import { motion } from "framer-motion";

// Import Lusion-inspired fonts
import "./font.css";

// Enhanced SVG Background Component
const AnimatedBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
    <svg 
      className="w-full h-full" 
      viewBox="0 0 1000 1000" 
      preserveAspectRatio="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradient background */}
        <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#f1f5f9" />
        </linearGradient>
        
        {/* Dot pattern */}
        <pattern 
          id="dot-pattern" 
          x="0" 
          y="0" 
          width="40" 
          height="40" 
          patternUnits="userSpaceOnUse"
        >
          <circle cx="20" cy="20" r="1" fill="#cbd5e1" opacity="0.2" />
        </pattern>
        
        {/* Radial gradients for blobs */}
        <radialGradient id="blob-gradient-1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </radialGradient>
        
        <radialGradient id="blob-gradient-2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Background */}
      <rect width="100%" height="100%" fill="url(#bg-gradient)" />
      <rect width="100%" height="100%" fill="url(#dot-pattern)" />
      
      {/* Animated blobs */}
      <motion.circle 
        cx="20%" 
        cy="30%" 
        r="15%" 
        fill="url(#blob-gradient-1)"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.1, 0],
          cx: ["20%", "22%", "20%"],
          cy: ["30%", "32%", "30%"]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      
      <motion.circle 
        cx="80%" 
        cy="70%" 
        r="18%" 
        fill="url(#blob-gradient-2)"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.1, 0],
          cx: ["80%", "78%", "80%"],
          cy: ["70%", "68%", "70%"]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 10
        }}
      />
    </svg>
    
    {/* Floating gradient blobs (HTML elements for better performance) */}
    <motion.div 
      className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500 opacity-10 blur-[100px]"
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.1, 0],
        x: ["-50%", "-45%", "-50%"],
        y: ["-50%", "-55%", "-50%"]
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    />
    
    <motion.div 
      className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500 opacity-10 blur-[100px]"
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.1, 0],
        x: ["50%", "55%", "50%"],
        y: ["50%", "45%", "50%"]
      }}
      transition={{
        duration: 30,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: 15
      }}
    />
  </div>
);

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const user = localStorage.getItem("user");
      setIsAuthenticated(!!user);
    };

    checkAuthentication();
    window.addEventListener("authChange", checkAuthentication);
    return () => {
      window.removeEventListener("authChange", checkAuthentication);
    };
  }, []);

  // Lusion-inspired color palette
  const colors = {
    primary: "#2563eb",       // Vibrant blue
    secondary: "#1e293b",     // Dark slate
    accent: "#f59e0b",        // Amber
    light: "#f8fafc",         // Lightest slate
    dark: "#0f172a",          // Darkest slate
  };

  return (
    <div className="bg-gray-50 text-gray-900 font-sans antialiased relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Modern Navbar with Lusion-inspired styling */}
      <Navbar colors={colors} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      {/* Profile positioned absolutely */}
      <div className="absolute top-6 right-6 z-50">
        <Profile colors={colors} />
      </div>

      {/* Hero Section */}
      <ScamShield colors={colors} />
      
      {/* Who We Are */}
      <WhoWeAre colors={colors} />

      {/* What We Do */}
      <WhatWeDo colors={colors} />

      {/* Achievements */}
      <OurAchievements colors={colors} />

      {/* Types of Scams - Enhanced with Lusion card styling */}
      <ScamTypesSection colors={colors} />

      {/* Prevention Tips - Enhanced with gradient backgrounds */}
      <PreventionTipsSection colors={colors} />

      {/* News & Articles Section - Enhanced with Lusion styling */}
      <section className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-blue-500 tracking-widest mb-2">LATEST UPDATES</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">News & Articles</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stay informed with the latest cybersecurity trends and scam alerts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Article 1 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative overflow-hidden h-60">
                <img 
                  src={scamAwarenessImg} 
                  alt="Online Scams" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="p-6 bg-white">
                <span className="text-xs font-medium text-blue-500">CYBER SECURITY</span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">5 Common Online Scams & How to Avoid Them</h3>
                <p className="text-gray-600 mb-4">
                  Learn about phishing, fake job offers, and other cyber threats affecting users daily.
                </p>
                <a 
                  href="https://www.scamwatch.gov.au/types-of-scams" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-500 font-medium group-hover:text-blue-600 transition-colors"
                >
                  Read Article
                  <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
            
            {/* Article 2 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative overflow-hidden h-60">
                <img 
                  src={hackingThreatImg} 
                  alt="Hacking Threats" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="p-6 bg-white">
                <span className="text-xs font-medium text-purple-500">DATA PROTECTION</span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">How Hackers Steal Personal Data</h3>
                <p className="text-gray-600 mb-4">
                  Discover the latest techniques cybercriminals use to access sensitive information.
                </p>
                <a 
                  href="https://www.cyber.gov.au/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-500 font-medium group-hover:text-blue-600 transition-colors"
                >
                  Read Article
                  <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
            
            {/* Article 3 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative overflow-hidden h-60">
                <img 
                  src={passwordSecurityImg} 
                  alt="Password Security" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="p-6 bg-white">
                <span className="text-xs font-medium text-green-500">PRIVACY</span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">Why Strong Passwords Are Essential</h3>
                <p className="text-gray-600 mb-4">
                  A weak password is a hacker's best friend. Find out how to secure your accounts.
                </p>
                <a 
                  href="https://www.ncsc.gov.uk/collection/passwords" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-500 font-medium group-hover:text-blue-600 transition-colors"
                >
                  Read Article
                  <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Report a Scam Section - Enhanced with Lusion-inspired CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Have You Encountered a Scam?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Your report can help protect others from falling victim to similar scams.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center mx-auto"
            onClick={() => setModalOpen(true)}
          >
            Report a Scam Now
            <FaArrowRight className="ml-2" />
          </motion.button>
        </div>
      </section>

      {/* Report Scam Modal */}
      {modalOpen && <ReportScam isOpen={modalOpen} onClose={() => setModalOpen(false)} colors={colors} />}
      
      {/* Footer - Enhanced with Lusion styling */}
      <footer className="py-12 bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Scam Awareness</h3>
              <p className="mb-4">
                Empowering individuals with knowledge to combat digital fraud and cybercrime.
              </p>
              <div className="flex space-x-4">
                {/* Social icons would go here */}
              </div>
            </div>
            
            <div>
              <h4 className="text-white text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/scam-types" className="hover:text-white transition-colors">Scam Types</Link></li>
                <li><Link to="/prevention" className="hover:text-white transition-colors">Prevention</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white text-lg font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Glossary</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Statistics</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white text-lg font-bold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li>help@scamaware.org</li>
                <li>+1 (800) 123-4567</li>
                <li>24/7 Support Hotline</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>© {new Date().getFullYear()} Scam Awareness Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;