import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/profile", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => {
        setUser(null);
        navigate("/login");
      });
  }, [navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "application/pdf"];
      const fileSizeMB = file.size / (1024 * 1024);

      if (!validTypes.includes(file.type)) {
        setResponseMessage("Invalid file type. Only .jpg, .png, and .pdf allowed.");
        setShowModal(true);
        setIsSuccess(false);
        return;
      }

      if (fileSizeMB > 5) {
        setResponseMessage("File size exceeds 5MB limit.");
        setShowModal(true);
        setIsSuccess(false);
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setAttachment(reader.result);
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message) {
      setResponseMessage("Message is required!");
      setShowModal(true);
      setIsSuccess(false);
      return;
    }

    const contactData = {
      message,
      attachment, // Base64 encoded file
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/contact",
        contactData,
        { withCredentials: true }
      );
      setResponseMessage(response.data.message);
      setIsSuccess(true);
      setShowModal(true);
      setMessage("");
      setAttachment(null);
    } catch (error) {
      setResponseMessage("Failed to submit contact request");
      setIsSuccess(false);
      setShowModal(true);
      console.error("Error submitting contact request:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      {user ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Your Message</label>
              <textarea
                className="w-full p-2 border rounded"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium">Attachment (Optional)</label>
              <input type="file" accept="image/jpeg, image/png, application/pdf" onChange={handleFileChange} />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>

          {showModal && (
            <Modal
              message={responseMessage}
              onClose={() => setShowModal(false)}
              isSuccess={isSuccess}
            />
          )}
        </>
      ) : (
        <p className="text-center text-red-500">Redirecting to login page...</p>
      )}
    </div>
  );
};

export default ContactUs;
