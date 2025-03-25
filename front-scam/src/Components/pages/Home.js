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
    <div className="bg-gray-50 text-gray-900 font-sans antialiased">
      {/* Modern Navbar with Lusion-inspired styling */}
      <Navbar colors={colors} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      {/* Profile positioned absolutely */}
      <div className="absolute top-6 right-6 z-50">
        <Profile colors={colors} />
      </div>

      {/* Hero Section */}
      {/* <Header colors={colors} /> */}
      <ScamShield colors={colors} />
      {/* Who We Are */}
      <WhoWeAre colors={colors} />

      {/* What We Do */}
      <WhatWeDo colors={colors} />

      {/* Achievements */}
      <OurAchievements colors={colors} />

      {/* Types of Scams - Enhanced with Lusion card styling */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-blue-500 tracking-widest mb-2">PROTECT YOURSELF</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Types of Digital Scams</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Understanding these common threats is your first line of defense against cyber criminals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-8 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
                <FaExclamationTriangle className="text-blue-500 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Phishing Scams</h3>
              <p className="text-gray-600 mb-4">
                Fraudulent emails, texts, or websites impersonating legitimate organizations to steal sensitive data.
              </p>
              <Link to="/phishing-info" className="flex items-center text-blue-500 font-medium">
                Learn more <FaArrowRight className="ml-2" />
              </Link>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-8 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 bg-amber-50 rounded-lg flex items-center justify-center mb-6">
                <FaShieldAlt className="text-amber-500 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Investment Scams</h3>
              <p className="text-gray-600 mb-4">
                "Get rich quick" schemes promising unrealistic returns with no risk.
              </p>
              <Link to="/investment-scams" className="flex items-center text-blue-500 font-medium">
                Learn more <FaArrowRight className="ml-2" />
              </Link>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-8 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 bg-purple-50 rounded-lg flex items-center justify-center mb-6">
                <FaNewspaper className="text-purple-500 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Social Media Scams</h3>
              <p className="text-gray-600 mb-4">
                Fake giveaways, romance scams, and impersonation on social platforms.
              </p>
              <Link to="/social-media-scams" className="flex items-center text-blue-500 font-medium">
                Learn more <FaArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Prevention Tips - Enhanced with gradient backgrounds */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-blue-500 tracking-widest mb-2">STAY SAFE ONLINE</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Essential Prevention Tips</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Proactive measures to protect your digital identity and assets.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="w-14 h-14 bg-green-50 rounded-lg flex items-center justify-center mb-6">
                <FaLock className="text-green-500 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Password Security</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Use unique, complex passwords for each account
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Enable two-factor authentication (2FA)
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Consider using a password manager
                </li>
              </ul>
            </div>
            
            <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
                <FaUsers className="text-blue-500 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Verification</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  Verify unexpected requests via official channels
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  Check for HTTPS and padlock icons on websites
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  Be wary of unsolicited communications
                </li>
              </ul>
            </div>
            
            <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="w-14 h-14 bg-red-50 rounded-lg flex items-center justify-center mb-6">
                <FaCheckCircle className="text-red-500 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Reporting</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✓</span>
                  Report suspicious activity immediately
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✓</span>
                  Warn friends/family about circulating scams
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✓</span>
                  Monitor accounts for unauthorized activity
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* News & Articles Section - Enhanced with Lusion styling */}
      <section className="py-20 bg-white">
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