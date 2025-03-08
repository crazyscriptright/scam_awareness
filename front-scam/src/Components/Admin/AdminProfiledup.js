import React, { useState } from 'react';
import axios from 'axios';

const AdminProfiledup = () => {
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState('');

  const handleImageUpload = (event) => {
    setFile(event.target.files[0]); // Store the selected file
  };

  const handleSubmit = async () => {
    if (!file || !userId) {
      alert('Please upload an image and enter a user ID');
      return;
    }

    const formData = new FormData();
    formData.append('profile_picture', file); // Append the file to FormData
    formData.append('user_id', userId); // Append the user ID to FormData

    try {
      const response = await axios.post('http://localhost:5000/update-profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for file upload
        },
      });

      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert('Failed to update profile picture');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Upload Profile Picture</h1>
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <br />
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <br />
      {file && (
        <img
          src={URL.createObjectURL(file)} // Preview the uploaded image
          alt="Preview"
          style={{ width: '200px', marginTop: '10px' }}
        />
      )}
      <br />
      <button onClick={handleSubmit}>Update Profile Picture</button>
    </div>
  );
};

export default AdminProfiledup;