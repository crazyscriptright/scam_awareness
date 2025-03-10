import cisa from './img/cisa.png'
import doj from './img/doj.png'
import ftc from './img/ftc.png'
import React, { useState } from "react";
import {
  FaSearch,
  FaShieldAlt,
  FaBook,
  FaHandsHelping,
  FaFileAlt,
} from "react-icons/fa";


// Data
const resources = [
  {
    id: 1,
    category: "Cyber Security",
    description: "Access reports on cyber threats, fraud, and online scams.",
    link: "https://www.cisa.gov/",
    icon: <FaShieldAlt className="text-blue-600 text-4xl mb-4" />,
  },
  {
    id: 2,
    category: "Legal & Compliance",
    description: "Find legal guidelines and compliance resources for investigation.",
    link: "https://www.justice.gov/",
    icon: <FaBook className="text-green-600 text-4xl mb-4" />,
  },
  {
    id: 3,
    category: "Support & Helpline",
    description: "Get help from government and private organizations.",
    link: "https://www.ftc.gov/",
    icon: <FaHandsHelping className="text-yellow-600 text-4xl mb-4" />,
  },
];

const reports = [
  {
    id: 1,
    title: "Fraudulent Investment Schemes",
    description: "A deep dive into recent investment fraud cases and legal actions.",
    link: "https://www.sec.gov/enforce",
  },
  {
    id: 2,
    title: "Online Scam Alerts",
    description: "Latest alerts from the FTC on phishing, fraud, and scams.",
    link: "https://www.consumer.ftc.gov/scam-alerts",
  },
  {
    id: 3,
    title: "Identity Theft Prevention",
    description: "Guidelines to protect yourself from identity theft and fraud.",
    link: "https://www.identitytheft.gov/",
  },
  {
    id: 4,
    title: "Data Breach Reports",
    description: "Track recent data breaches and compromised accounts.",
    link: "https://haveibeenpwned.com/",
  },
];

const featuredResources = [
  {
    id: 1,
    title: "Fraud Detection Toolkit",
    description: "A comprehensive toolkit for detecting and preventing fraud.",
    link: "https://www.fraud.com/toolkit",
    icon: <FaSearch className="text-purple-600 text-4xl mb-4" />,
  },
  {
    id: 2,
    title: "Cybersecurity Training",
    description: "Free online courses to improve your cybersecurity skills.",
    link: "https://www.cybrary.it/",
    icon: <FaShieldAlt className="text-blue-600 text-4xl mb-4" />,
  },
  {
    id: 3,
    title: "Legal Case Studies",
    description: "Explore real-world legal cases and their outcomes.",
    link: "https://www.legalstudies.com",
    icon: <FaBook className="text-green-600 text-4xl mb-4" />,
  },
];

const newsUpdates = [
  {
    id: 1,
    title: "New Phishing Scam Targets Small Businesses",
    description: "Learn how to protect your business from the latest phishing attacks.",
    link: "https://www.cybersecuritynews.com/phishing-scam",
    date: "2023-10-15",
  },
  {
    id: 2,
    title: "Government Launches New Anti-Fraud Initiative",
    description: "A new program to combat online fraud and scams.",
    link: "https://www.govnews.com/anti-fraud-initiative",
    date: "2023-10-10",
  },
  {
    id: 3,
    title: "Data Breach at Major Retailer",
    description: "Details on the recent data breach and how to check if you're affected.",
    link: "https://www.databreachnews.com/retail-breach",
    date: "2023-10-05",
  },
];

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Cybersecurity Analyst",
    quote: "This resource hub has been invaluable for staying updated on the latest threats and legal guidelines.",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Legal Consultant",
    quote: "The legal compliance resources are comprehensive and easy to navigate.",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    name: "Alex Johnson",
    role: "Fraud Investigator",
    quote: "The reports and tools provided here have significantly improved my workflow.",
    image: "https://via.placeholder.com/100",
  },
];

const partners = [
  { id: 1, name: "CISA", logo: cisa, link: "https://www.cisa.gov/" },
  { id: 2, name: "FTC", logo: ftc, link: "https://www.ftc.gov/" },
  { id: 3, name: "DOJ", logo: doj, link: "https://www.justice.gov/" },
];

const ExternalResourceHome = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Global search function
  const filterData = (data, query) => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const filteredResources = filterData(resources, searchQuery);
  const filteredReports = filterData(reports, searchQuery);
  const filteredFeaturedResources = filterData(featuredResources, searchQuery);
  const filteredNewsUpdates = filterData(newsUpdates, searchQuery);
  const filteredTestimonials = filterData(testimonials, searchQuery);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-80 flex items-center justify-center text-center text-white"
        style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?cybersecurity,hacking')" }}
      >
        <div className="bg-black bg-opacity-60 p-6 rounded-lg">
          <h1 className="text-3xl font-bold">Investigation Resource Hub</h1>
          <p className="mt-2 text-lg">Find trusted external resources for fraud investigations and security reports.</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mt-6 flex bg-white shadow-md rounded-lg overflow-hidden">
        <input
          type="text"
          className="w-full p-3 outline-none"
          placeholder="Search investigative resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-3 hover:bg-blue-700 flex items-center">
          <FaSearch className="mr-2" /> Search
        </button>
      </div>

      {/* Filtered Results */}
      <div className="max-w-6xl mx-auto mt-6">
        {/* Resources */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Resources</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                {resource.icon}
                <h3 className="text-xl font-semibold">{resource.category}</h3>
                <p className="mt-2 text-gray-600">{resource.description}</p>
                <a href={resource.link} target="_blank" rel="noopener noreferrer" className="mt-3 text-blue-500 hover:underline">
                  Learn More
                </a>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">No results found.</p>
          )}
        </div>

        {/* Reports */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center mt-12">Latest Investigation Reports</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReports.map((report) => (
            <div key={report.id} className="bg-white p-4 shadow-md rounded-lg">
              <FaFileAlt className="text-red-600 text-3xl mb-2" />
              <h4 className="font-semibold">{report.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{report.description}</p>
              <a href={report.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm mt-2 block">
                Read Report
              </a>
            </div>
          ))}
        </div>

        {/* Featured Resources */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center mt-12">Featured Resources</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredFeaturedResources.map((resource) => (
            <div key={resource.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              {resource.icon}
              <h3 className="text-xl font-semibold">{resource.title}</h3>
              <p className="mt-2 text-gray-600">{resource.description}</p>
              <a href={resource.link} target="_blank" rel="noopener noreferrer" className="mt-3 text-blue-500 hover:underline">
                Explore
              </a>
            </div>
          ))}
        </div>

        {/* News & Updates */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center mt-12">News & Updates</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredNewsUpdates.map((news) => (
            <div key={news.id} className="bg-white p-4 shadow-md rounded-lg">
              <h4 className="font-semibold">{news.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{news.description}</p>
              <p className="text-xs text-gray-500 mt-2">{news.date}</p>
              <a href={news.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm mt-2 block">
                Read More
              </a>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center mt-12">What Our Users Say</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md text-center">
              <img src={testimonial.image} alt={testimonial.name} className="w-20 h-20 rounded-full mx-auto mb-4" />
              <h4 className="font-semibold">{testimonial.name}</h4>
              <p className="text-sm text-gray-600">{testimonial.role}</p>
              <p className="mt-2 text-gray-600 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Partners */}
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Our Partners</h2>
        <div className="mt-6 flex justify-center gap-8">
          {partners.map((partner) => (
            <a key={partner.id} href={partner.link} target="_blank" rel="noopener noreferrer">
              <img src={partner.logo} alt={partner.name} className="w-24 h-24 object-contain" />
            </a>
          ))}
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