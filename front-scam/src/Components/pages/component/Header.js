import { motion } from "framer-motion";

const Header = () => {
  return (
    <header className="relative bg-white text-black text-center py-14 px-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text hover:scale-105 hover:opacity-90 transition-transform duration-300"
      >
        Scam Awareness Portal
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mt-4 text-lg md:text-xl text-gray-700 hover:scale-105 transition-transform duration-300"
      >
        Identify, prevent, and report scams to protect yourself and others.
      </motion.p>
    </header>
  );
};

export default Header;
