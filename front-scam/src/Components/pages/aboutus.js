import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaUsers, FaLightbulb, FaHandsHelping } from "react-icons/fa";
import teamImage from "../../Img/group.avif"; // Updated path to your team image
import { Helmet } from "react-helmet";
import DynamicBackground from "./component/DynamicBackground";
import Navbar from "./Navbar";
import Profile from "../User/Profile";
import Footer from "../User/Footer";
import ContactUs from "../User/ContactUs";
import OurAchievements from "./component/OurAchievements";



const AboutUs = () => {

    // Define the missing variables
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false); // Added state for contact modal
    
  
    // Lusion-inspired color palette
    const colors = {
      primary: "#2563eb",       // Vibrant blue
      secondary: "#1e293b",     // Dark slate
      accent: "#f59e0b",        // Amber
      light: "#f8fafc",         // Lightest slate
      dark: "#0f172a",          // Darkest slate
    };

  // Team members data
  const teamMembers = [
    {
      name: "Anil",
      role: "Cybersecurity Expert",
      bio: "10+ years experience in fraud detection and digital security",
      expertise: ["Phishing Scams", "Identity Theft", "Data Protection"]
    },
    {
      name: "Sameer",
      role: "Financial Fraud Specialist",
      bio: "Former bank investigator focused on financial scams",
      expertise: ["Investment Fraud", "Money Scams", "Cryptocurrency Scams"]
    },
    {
      name: "Mubbassir",
      role: "Tech Security Analyst",
      bio: "Specializes in tech support scams and malware prevention",
      expertise: ["Tech Support Scams", "Ransomware", "Online Security"]
    }
  ];

  
  const navigateToContactUs = () => {
    window.location.href = "/ContactUs"; // Adjust the path as per your routing setup
  };
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
        <div>
            <DynamicBackground/>
        </div>
              {/* Modern Navbar with Lusion-inspired styling */}
      <Navbar colors={colors} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      {/* Profile positioned absolutely */}
      <div className="absolute top-6 right-6 z-50">
        <Profile colors={colors} />
      </div>
      <Helmet>
        <title>About Us | Scam Awareness Platform</title>
        <meta
          name="description"
          content="Learn about our mission to combat scams and protect consumers through education and awareness"
        />
      </Helmet>

      {/* Hero Section */}
      <motion.section
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="relative py-20 text-gray-900"
>
  <div className="max-w-7xl mx-auto px-6 text-center">
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      className="inline-block mb-6"
    >
      <FaShieldAlt className="text-5xl text-blue-600" />
    </motion.div>
    <motion.h1
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-4xl md:text-5xl font-bold mb-6"
    >
      Protecting People From Scams
    </motion.h1>
    <motion.p
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="text-xl text-gray-600 max-w-3xl mx-auto"
    >
      Our mission is to empower individuals with knowledge to recognize and avoid scams in an increasingly digital world.
    </motion.p>
  </div>
</motion.section>

      {/* Our Story */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 max-w-7xl mx-auto px-6"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Founded in 2020 after witnessing the devastating impact of pandemic-related scams, our team of cybersecurity experts and consumer advocates came together to create a free resource for scam prevention. What started as a small blog has grown into a comprehensive platform helping thousands avoid fraud each month.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
  <motion.div variants={itemVariants} className="aspect-square"> {/* or aspect-square */}
    <img
      src={teamImage}
      alt="Our team working together"
      className="rounded-xl shadow-xl w-full h-full object-cover"
    />
  </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why We Do This</h3>
            <p className="text-gray-600 mb-6">
              Every day, people lose money, personal information, and peace of mind to sophisticated scams. We believe education is the most powerful tool to prevent these losses. Unlike paywalled security services, we provide free, accessible information to everyone.
            </p>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FaLightbulb className="text-blue-500 text-xl" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Our Vision</h4>
                  <p className="text-gray-600">
                    A world where no one falls victim to preventable scams due to lack of awareness.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FaHandsHelping className="text-blue-500 text-xl" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Our Approach</h4>
                  <p className="text-gray-600">
                    Combining expert analysis with real-world examples to create practical, actionable advice.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Team */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Cybersecurity professionals and consumer advocates dedicated to scam prevention
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="h-48 bg-blue-50 flex items-center justify-center">
                  <FaUsers className="text-5xl text-blue-400" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((item, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <div>
        <OurAchievements colors={colors} />
      </div>

      {/* /* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8">
              Help us protect more people by sharing our resources or contributing your expertise
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 " id="contactus">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
              >
                Share Your Story
              </button>
            </div>
          </motion.div>
          {isContactModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                <button
                  onClick={() => setIsContactModalOpen(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
                <ContactUs />
              </div>
            </div>
          )}
        </div>
      </section>
        <Footer />
    </div>
  );
};

export default AboutUs;