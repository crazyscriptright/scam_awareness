import { HashLink } from "react-router-hash-link";
import { FaShieldAlt, FaEnvelope, FaBook, FaChartBar, FaQuestionCircle } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="py-16 bg-gray-900 text-gray-300 z-50 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <FaShieldAlt className="text-blue-400 text-2xl" />
                            <h3 className="text-white text-xl font-bold">Scam Shield</h3>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Empowering individuals with knowledge to combat digital fraud and cybercrime through awareness and education.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h4 className="text-white text-lg font-semibold mb-5 pb-2 border-b border-gray-800">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><HashLink smooth to="/#home" className="hover:text-blue-400 transition-colors flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>Home</HashLink></li>
                            <li><HashLink smooth to="/#about" className="hover:text-blue-400 transition-colors flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>About</HashLink></li>
                            <li><HashLink smooth to="/#scam-types" className="hover:text-blue-400 transition-colors flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>Scam Types</HashLink></li>
                            <li><HashLink smooth to="/#prevention-tips" className="hover:text-blue-400 transition-colors flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>Prevention</HashLink></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-white text-lg font-semibold mb-5 pb-2 border-b border-gray-800">Resources</h4>
                        <ul className="space-y-3">
                            <li><HashLink to="/AllArticlesPage" className="hover:text-blue-400 transition-colors flex items-center"><FaBook className="text-blue-400 mr-2" />Blog</HashLink></li>
                            <li><HashLink to="/contact" className="hover:text-blue-400 transition-colors flex items-center"><FaQuestionCircle className="text-blue-400 mr-2" />FAQs</HashLink></li>
                            <li><HashLink to="#home" className="hover:text-blue-400 transition-colors flex items-center"><FaBook className="text-blue-400 mr-2" />Glossary</HashLink></li>
                            <li><HashLink to="#achievements" className="hover:text-blue-400 transition-colors flex items-center"><FaChartBar className="text-blue-400 mr-2" />Statistics</HashLink></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white text-lg font-semibold mb-5 pb-2 border-b border-gray-800">Contact</h4>
                        <ul className="space-y-3">
                            <li><HashLink to="/aboutus#contactus" className="hover:text-blue-400 transition-colors flex items-center"><FaEnvelope className="text-blue-400 mr-2" />Contact Us</HashLink></li>
                            <li className="mt-6">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-colors">
                                    Report a Scam
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Scam Shield. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</a>
                        <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;