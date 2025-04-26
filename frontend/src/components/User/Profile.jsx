// components/User/Profile.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.image || '');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateUserProfile({ name, image });
    navigate('/dashboard');
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <div className="flex flex-col items-center space-y-4">
        <img
          src={image || `https://ui-avatars.com/api/?name=${name || user.email}`}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
          placeholder="Enter your name"
        />
        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
