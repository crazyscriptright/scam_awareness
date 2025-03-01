import React, { useState, useEffect } from "react";
import axios from "axios";

const scamTypes = [
  "Investment",
  "Romance scams",
  "Product and service scams",
  "Threats and extortion scams",
  "Jobs and employment scams",
  "Unexpected money",
  "Phishing",
  "Buying or selling scams",
  "Other",
];

const ReportScam = () => {
  const [scamType, setScamType] = useState("");
  const [description, setDescription] = useState("");
  const [scamDate, setScamDate] = useState("");
  const [proof, setProof] = useState(null);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  // Fetch user session to check authentication
  useEffect(() => {
    axios
      .get("http://localhost:5000/profile", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const handleFileChange = (e) => {
    setProof(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!scamType || !description || !scamDate) {
      setMessage("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("scam_type", scamType);
    formData.append("description", description);
    formData.append("scam_date", scamDate);
    if (proof) {
      formData.append("proof", proof);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/scam-reports",
        formData,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
      );
      setMessage(response.data.message);
      setScamType("");
      setDescription("");
      setScamDate("");
      setProof(null);
    } catch (error) {
      setMessage("Failed to submit scam report");
      console.error("Error submitting scam report:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      {user ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Submit a Scam Report</h2>
          {message && <p className="text-red-500">{message}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Scam Type Dropdown */}
            <div>
              <label className="block text-sm font-medium">Scam Type</label>
              <select
                className="w-full p-2 border rounded"
                value={scamType}
                onChange={(e) => setScamType(e.target.value)}
                required
              >
                <option value="">Select a scam type</option>
                {scamTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                className="w-full p-2 border rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Scam Date */}
            <div>
              <label className="block text-sm font-medium">Scam Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={scamDate}
                onChange={(e) => setScamDate(e.target.value)}
                required
              />
            </div>

            {/* Proof Upload */}
            <div>
              <label className="block text-sm font-medium">Proof (optional)</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Submit Report
            </button>
          </form>
        </>
      ) : (
        <p className="text-center text-red-500">Please log in to submit a scam report.</p>
      )}
    </div>
  );
};

export default ReportScam;
