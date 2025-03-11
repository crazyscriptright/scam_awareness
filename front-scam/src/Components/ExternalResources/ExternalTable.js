import ExternalNavbar from "./ExtrnalNavbar"; // Import your AdminNavbar component
import ExternalProfile from "./ExternalProfile"; // Import your AdminProfile component
import React, { useState } from "react";
import AllScamReportsTable from "./AllScamReportsTable";
import ScamReportsTable from "./ScamReportsTable";
import {
  FaSearch,
  FaShieldAlt,
  FaBook,
  FaHandsHelping,
  FaFileAlt,
} from "react-icons/fa";

const ExternalTable = () => {
  return (
    <div id="home" className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow flex flex-wrap justify-between items-center">
        <ExternalNavbar />
        <div className="absolute top-2 right-4 z-50">
          <ExternalProfile />
        </div>
      </header>
      <body>
        <div>
          <ScamReportsTable/>
          <AllScamReportsTable/>
        </div>
      </body>
    </div>
  )
}
export default ExternalTable;