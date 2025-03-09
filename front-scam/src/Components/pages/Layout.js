import React from "react";
import ThemeToggle from "../User/ThemeToggle";

const Layout = ({ children, isDarkMode, toggleTheme }) => {
  return (
    <div>
      {/* Header */}
      <header className="p-4 flex justify-between items-center bg-gray-800 dark:bg-gray-950 text-white">
        <h1 className="text-xl font-bold">Scam Awareness Portal</h1>
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </header>

      {/* Main Content */}
      <main className="p-4">{children}</main>

      {/* Footer */}
      <footer className="w-screen py-6 bg-gray-800 dark:bg-gray-950 text-white text-center">
        <p>© 2025 Scam Awareness Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;