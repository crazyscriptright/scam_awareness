import ExternalNavbar from "./ExtrnalNavbar"; // Import your AdminNavbar component
import ExternalProfile from "./ExternalProfile"; // Import your AdminProfile component
import React from "react";
import AllScamReportsTable from "./AllScamReportsTable";
import ScamReportsTable from "./ScamReportsTable";
import WithAuthEx from "../hooks/WithAuthEx";
import DynamicBackground from "../pages/component/DynamicBackground";


const ExternalTable = () => {
  return (
    <div id="home" className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-1">
        <ExternalNavbar />
        <div className="absolute top-2 right-4">
          <ExternalProfile />
        </div>
      </header>

      {/* Body */}
      <main className="flex-grow pt-16"> {/* Add padding-top to avoid overlap with fixed header */}
        <div className="p-4">
          <DynamicBackground colors={["#f0f4ff", "#e0e7ff"]} />
          <ScamReportsTable />
          <AllScamReportsTable />
        </div>
      </main>
    </div>
  );
};

export default WithAuthEx(ExternalTable);