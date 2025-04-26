import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Setting = () => {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [notifications, setNotifications] = useState(() => localStorage.getItem('notifications') === 'true');
  const [username, setUsername] = useState(() => localStorage.getItem('username') || '');
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'english');
  const [twoFactor, setTwoFactor] = useState(() => localStorage.getItem('twoFactor') === 'true');
  const [autoLogout, setAutoLogout] = useState(() => localStorage.getItem('autoLogout') || '10');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSave = () => {
    localStorage.setItem('darkMode', darkMode);
    localStorage.setItem('notifications', notifications);
    localStorage.setItem('username', username);
    localStorage.setItem('language', language);
    localStorage.setItem('twoFactor', twoFactor);
    localStorage.setItem('autoLogout', autoLogout);

    alert('✅ All settings saved and applied!');
    navigate('/dashboard');
  };

  const handleReset = () => {
    setDarkMode(false);
    setNotifications(false);
    setUsername('');
    setLanguage('english');
    setTwoFactor(false);
    setAutoLogout('10');
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-3xl mx-auto mt-8 transition-all">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">⚙️ Settings</h2>
      <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">Manage your preferences</p>

      <div className="space-y-6">
        {/* Username Input */}
        <div>
          <label className="block text-gray-700 dark:text-gray-100 font-medium mb-1">🙍‍♂️ Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter your name"
          />
        </div>

        {/* Language Dropdown */}
        <div>
          <label className="block text-gray-700 dark:text-gray-100 font-medium mb-1">🌐 Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white outline-none"
          >
            <option value="english">English</option>
            <option value="hindi">हिंदी</option>
            <option value="gujarati">ગુજરાતી</option>
            <option value="marathi">मराठी</option>
          </select>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex justify-between items-center">
          <span className="text-gray-700 dark:text-gray-100 font-medium">🌙 Dark Mode</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative inline-block w-12 h-6 transition duration-300 ease-in-out ${
              darkMode ? 'bg-primary-600' : 'bg-gray-300'
            } rounded-full`}
          >
            <span
              className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-300 ${
                darkMode ? 'translate-x-6' : ''
              }`}
            ></span>
          </button>
        </div>

        {/* Email Notifications Toggle */}
        <div className="flex justify-between items-center">
          <span className="text-gray-700 dark:text-gray-100 font-medium">📩 Email Notifications</span>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`relative inline-block w-12 h-6 transition duration-300 ease-in-out ${
              notifications ? 'bg-primary-600' : 'bg-gray-300'
            } rounded-full`}
          >
            <span
              className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-300 ${
                notifications ? 'translate-x-6' : ''
              }`}
            ></span>
          </button>
        </div>

        {/* Two-Factor Auth Toggle */}
        <div className="flex justify-between items-center">
          <span className="text-gray-700 dark:text-gray-100 font-medium">🔐 Enable 2FA</span>
          <button
            onClick={() => setTwoFactor(!twoFactor)}
            className={`relative inline-block w-12 h-6 transition duration-300 ease-in-out ${
              twoFactor ? 'bg-primary-600' : 'bg-gray-300'
            } rounded-full`}
          >
            <span
              className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-300 ${
                twoFactor ? 'translate-x-6' : ''
              }`}
            ></span>
          </button>
        </div>

        {/* Auto Logout Timer */}
        <div>
          <label className="block text-gray-700 dark:text-gray-100 font-medium mb-1">⏱️ Auto-Logout After</label>
          <select
            value={autoLogout}
            onChange={(e) => setAutoLogout(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white outline-none"
          >
            <option value="5">5 minutes</option>
            <option value="10">10 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 text-right space-x-2">
        <button
          onClick={handleReset}
          className="bg-red-100 text-red-700 py-2 px-4 rounded-lg hover:bg-red-200 transition-all"
        >
          🔄 Reset
        </button>

        <button
          onClick={() => navigate('/dashboard')}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-all"
        >
          Back
        </button>

        <button
          onClick={handleSave}
          className="bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-all"
        >
          💾 Save Changes
        </button>
      </div>
    </div>
  );
};

export default Setting;
