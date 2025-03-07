import React, { useState } from 'react';
import axios from 'axios';

const AdminProfiledup = () => {
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result); // Base64 string
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!image || !userId) {
      alert('Please upload an image and enter a user ID');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/Admin/update-admin-picture', {
        user_id: userId,
        profile_picture: image,
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
      {image && <img src={image} alt="Preview" style={{ width: '200px', marginTop: '10px' }} />}
      <br />
      <button onClick={handleSubmit}>Update Profile Picture</button>
    </div>
  );
};

export default AdminProfiledup;