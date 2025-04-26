 
 // components/User/Profile.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.image || '');
  const [preview, setPreview] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (image) {
      setPreview(image);
    } else {
      const fallbackName = name || user?.email || 'User';
      setPreview(`https://ui-avatars.com/api/?name=${encodeURIComponent(fallbackName)}&background=random`);
    }
  }, [image, name, user]);

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
    alert('Profile updated successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">👤 Your Profile</h2>

        <div className="flex flex-col items-center mb-6">
          <div className="relative group">
            <img
              src={preview}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-md transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          <label className="mt-4 cursor-pointer text-blue-600 font-semibold hover:underline">
            <span className="block mb-1">Change Photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition duration-300"
          >
            💾 Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

 
 