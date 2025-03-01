import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Profile from "../User/Profile";
import scamAwarenessImg from "../../Img/scam-awareness.jpg";
import hackingThreatImg from "../../Img/hacking-threat.jpg";
import passwordSecurityImg from "../../Img/password-security.jpg";
import ReportScam from "../User/ReportScam";

import {
  FaTrophy,
  FaUsers,
  FaCheckCircle,
  FaUserCircle,
  FaShieldAlt,
  FaExclamationTriangle,
  FaNewspaper,
  FaLock
} from "react-icons/fa";
import { motion } from "framer-motion";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false); // ✅ Define modal state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  return (
    <div className="bg-gray-100 text-gray-900">
      <Navbar />
      <div className="absolute top-2 right-4 z-50">
        <Profile />
      </div>

      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-20 px-6">
        <h1 className="text-4xl md:text-6xl font-bold">Scam Awareness Portal</h1>
        <p className="mt-4 text-lg md:text-xl">
          Identify, prevent, and report scams to protect yourself and others.
        </p>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="mt-6 inline-block bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gray-200 transition"
        >
          <Link to="/about">Learn More</Link>
        </motion.div>
      </header>

      {/* Who We Are */}
      <section className="py-12 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
        <p className="max-w-3xl mx-auto text-lg">
          We are dedicated to raising awareness about scams, educating the public, and
          providing a secure platform to report fraudulent activities.
        </p>
      </section>

      {/* What We Do */}
      <section className="py-12 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-6">What We Do</h2>
        <p className="max-w-3xl mx-auto text-lg mb-6">
          Our platform provides resources to help users identify scams, stay protected, and
          report fraud. We work with experts to ensure up-to-date information and secure
          reporting mechanisms.
        </p>
      </section>

      {/* Achievements */}
      <section className="py-12 px-6 bg-gray-200">
        <h2 className="text-center text-3xl font-bold mb-6">Our Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-white shadow rounded-lg">
            <FaUsers className="text-blue-500 text-4xl mx-auto mb-4" />
            <h3 className="font-semibold">50,000+ Users</h3>
            <p className="text-sm mt-2">People using our platform to stay safe.</p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg">
            <FaTrophy className="text-yellow-500 text-4xl mx-auto mb-4" />
            <h3 className="font-semibold">10,000+ Scams Reported</h3>
            <p className="text-sm mt-2">Fraudulent activities prevented.</p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg">
            <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />
            <h3 className="font-semibold">Verified Reports</h3>
            <p className="text-sm mt-2">Ensuring accuracy and credibility.</p>
          </div>
        </div>
      </section>

      {/* Types of Scams */}
      <section className="py-12 px-6 bg-gray-200 text-center">
        <h2 className="text-3xl font-bold mb-6">Types of Scams</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white shadow rounded-lg">
            <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
            <h3 className="font-semibold">Phishing Scams</h3>
            <p className="text-sm mt-2">Fake emails and websites tricking users into sharing personal data.</p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg">
            <FaShieldAlt className="text-blue-500 text-4xl mx-auto mb-4" />
            <h3 className="font-semibold">Investment Scams</h3>
            <p className="text-sm mt-2">Fraudulent schemes promising unrealistic financial gains.</p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg">
            <FaNewspaper className="text-yellow-500 text-4xl mx-auto mb-4" />
            <h3 className="font-semibold">Fake News & Social Media Scams</h3>
            <p className="text-sm mt-2">Misinformation and fraud through social platforms.</p>
          </div>
        </div>
      </section>

      {/* Prevention Tips */}
      <section className="py-12 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6">Prevention Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-100 shadow rounded-lg">
            <FaLock className="text-green-500 text-4xl mx-auto mb-4" />
            <h3 className="font-semibold">Use Strong Passwords</h3>
            <p className="text-sm mt-2">Enable two-factor authentication for extra security.</p>
          </div>
          <div className="p-6 bg-gray-100 shadow rounded-lg">
            <FaUsers className="text-blue-500 text-4xl mx-auto mb-4" />
            <h3 className="font-semibold">Verify Sources</h3>
            <p className="text-sm mt-2">Don't trust unknown links or senders.</p>
          </div>
          <div className="p-6 bg-gray-100 shadow rounded-lg">
            <FaCheckCircle className="text-red-500 text-4xl mx-auto mb-4" />
            <h3 className="font-semibold">Report Suspicious Activity</h3>
            <p className="text-sm mt-2">Alert authorities and prevent scams from spreading.</p>
          </div>
        </div>
      </section>

      {/* News & Articles Section */}
      <section className="py-12 px-6 bg-white">
        <h2 className="text-center text-3xl font-bold mb-6">Latest News & Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Article 1 */}
          <div className="p-6 bg-gray-100 shadow rounded-lg">

            <img src={scamAwarenessImg} alt="Online Scams" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h3 className="font-semibold text-lg">5 Common Online Scams & How to Avoid Them</h3>
            <p className="text-sm text-gray-600 mt-2">Learn about phishing, fake job offers, and other cyber threats affecting users daily.</p>
            <a href="https://www.scamwatch.gov.au/types-of-scams" target="_blank" className="text-blue-500 font-semibold mt-3 inline-block">Read More →</a>
          </div>

          {/* Article 2 */}
          <div className="p-6 bg-gray-100 shadow rounded-lg">
            <img src={hackingThreatImg} alt="Hacking Threats" className="w-full h-40 object-cover rounded-lg mb-4" />

            <h3 className="font-semibold text-lg">How Hackers Steal Personal Data & How to Protect Yourself</h3>
            <p className="text-sm text-gray-600 mt-2">Discover the latest techniques cybercriminals use to access sensitive information.</p>
            <a href="https://www.cyber.gov.au/" target="_blank" className="text-blue-500 font-semibold mt-3 inline-block">Read More →</a>
          </div>

          {/* Article 3 */}
          <div className="p-6 bg-gray-100 shadow rounded-lg">
            <img src={passwordSecurityImg} alt="Online Privacy" className="w-full h-40 object-cover rounded-lg mb-4" />

            <h3 className="font-semibold text-lg">Why Strong Passwords Are More Important Than Ever</h3>
            <p className="text-sm text-gray-600 mt-2">A weak password is a hacker’s best friend. Find out how to secure your accounts.</p>
            <a href="https://www.ncsc.gov.uk/collection/passwords" target="_blank" className="text-blue-500 font-semibold mt-3 inline-block">Read More →</a>
          </div>

        </div>
      </section>


 {/* Report a Scam Section */}
 <section className="py-12 px-6 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold">Have You Encountered a Scam?</h2>
        <p className="mt-2 text-lg">Report it and help protect others!</p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gray-200 transition"
          onClick={() => setModalOpen(true)}
        >
          Report a Scam
        </motion.button>
      </section>

      {/* Report Scam Modal */}
      {modalOpen && <ReportScam isOpen={modalOpen} onClose={() => setModalOpen(false)} />} 
      
      {/* Footer */}
      <footer className="py-6 bg-gray-800 text-white text-center">
        <p>© 2025 Scam Awareness Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
