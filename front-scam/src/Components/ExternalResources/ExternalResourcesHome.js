import React from "react";
import { FaSearch, FaShieldAlt, FaBook, FaHandsHelping, FaFileAlt } from "react-icons/fa";

const ExternalResourceHome = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-80 flex items-center justify-center text-center text-white" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?cybersecurity,hacking')" }}>
        <div className="bg-black bg-opacity-60 p-6 rounded-lg">
          <h1 className="text-3xl font-bold">Investigation Resource Hub</h1>
          <p className="mt-2 text-lg">Find trusted external resources for fraud investigations and security reports.</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mt-6 flex bg-white shadow-md rounded-lg overflow-hidden">
        <input type="text" className="w-full p-3 outline-none" placeholder="Search investigative resources..." />
        <button className="bg-blue-600 text-white px-4 py-3 hover:bg-blue-700 flex items-center">
          <FaSearch className="mr-2" /> Search
        </button>
      </div>

      {/* Feature Sections */}
      <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cyber Security */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <FaShieldAlt className="text-blue-600 text-4xl mb-4" />
          <h3 className="text-xl font-semibold">Cyber Security</h3>
          <p className="mt-2 text-gray-600">Access reports on cyber threats, fraud, and online scams.</p>
          <a href="https://www.cisa.gov/" target="_blank" rel="noopener noreferrer" className="mt-3 text-blue-500 hover:underline">
            Learn More
          </a>
        </div>

        {/* Legal & Compliance */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <FaBook className="text-green-600 text-4xl mb-4" />
          <h3 className="text-xl font-semibold">Legal & Compliance</h3>
          <p className="mt-2 text-gray-600">Find legal guidelines and compliance resources for investigation.</p>
          <a href="https://www.justice.gov/" target="_blank" rel="noopener noreferrer" className="mt-3 text-blue-500 hover:underline">
            Explore
          </a>
        </div>

        {/* Support & Helpline */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <FaHandsHelping className="text-yellow-600 text-4xl mb-4" />
          <h3 className="text-xl font-semibold">Support & Helpline</h3>
          <p className="mt-2 text-gray-600">Get help from government and private organizations.</p>
          <a href="https://www.ftc.gov/" target="_blank" rel="noopener noreferrer" className="mt-3 text-blue-500 hover:underline">
            Get Help
          </a>
        </div>
      </div>

      {/* Recent Reports Section */}
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Latest Investigation Reports</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <FaFileAlt className="text-red-600 text-3xl mb-2" />
            <h4 className="font-semibold">Fraudulent Investment Schemes</h4>
            <p className="text-sm text-gray-600 mt-1">A deep dive into recent investment fraud cases and legal actions.</p>
            <a href="https://www.sec.gov/enforce" target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm mt-2 block">
              Read Report
            </a>
          </div>

          <div className="bg-white p-4 shadow-md rounded-lg">
            <FaFileAlt className="text-red-600 text-3xl mb-2" />
            <h4 className="font-semibold">Online Scam Alerts</h4>
            <p className="text-sm text-gray-600 mt-1">Latest alerts from the FTC on phishing, fraud, and scams.</p>
            <a href="https://www.consumer.ftc.gov/scam-alerts" target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm mt-2 block">
              Read Report
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 bg-gray-800 text-white text-center py-4">
        <p>© {new Date().getFullYear()} Investigation Resource Hub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ExternalResourceHome;
