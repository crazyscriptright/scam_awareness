import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // For animations

const ContactUs = () => {
  const [formData, setFormData] = useState({
    message: "",
    attachment: null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, attachment: reader.result }); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact",
        formData,
        { withCredentials: true } // Include cookies for session
      );
      if (response.status === 201) {
        setSuccess(true);
        setFormData({ message: "", attachment: null });
        setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Animate to this state
      transition={{ duration: 0.5 }} // Animation duration
      className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center p-4"
    >
      <motion.div
        whileHover={{ scale: 1.02 }} // Hover effect
        className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-100"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          Contact Us
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Message Field */}
          <motion.div
            whileHover={{ scale: 1.01 }} // Hover effect
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-gray-700">Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              rows="4"
              placeholder="Enter your message..."
            />
          </motion.div>

          {/* Attachment Field */}
          <motion.div
            whileHover={{ scale: 1.01 }} // Hover effect
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-gray-700">Attachment:</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            whileHover={{ scale: 1.05 }} // Hover effect
            whileTap={{ scale: 0.95 }} // Click effect
          >
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </motion.div>
        </form>

        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} // Initial animation state
            animate={{ opacity: 1, y: 0 }} // Animate to this state
            transition={{ duration: 0.5 }} // Animation duration
            className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center"
          >
            Form submitted successfully!
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ContactUs;