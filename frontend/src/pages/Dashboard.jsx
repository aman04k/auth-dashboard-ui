import { useAuth } from '../context/AuthContext';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { FiUser, FiMail, FiCalendar, FiLogOut, FiHome, FiSettings } from 'react-icons/fi';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const data = [
    { name: 'Jan', users: 30 },
    { name: 'Feb', users: 45 },
    { name: 'Mar', users: 60 },
    { name: 'Apr', users: 80 },
    { name: 'May', users: 100 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6 text-2xl font-bold text-indigo-600">📊 MyDash</div>
        <nav className="mt-6 space-y-1">
          <a href="#" className="flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100">
            <FiHome className="mr-3" /> Dashboard
          </a>
          <a href="#" className="flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100">
            <FiUser className="mr-3" /> Profile
          </a>
          <a href="#" className="flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100">
            <FiSettings className="mr-3" /> Settings
          </a>
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">{user?.email}</p>
              <p className="text-xs text-gray-500">Logged In</p>
            </div>
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.email}`}
              alt="Avatar"
              className="h-10 w-10 rounded-full border"
            />
            <button
              onClick={logout}
              className="flex items-center px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600"
            >
              <FiLogOut className="mr-2" /> Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 space-y-6">
          {/* Welcome */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800">Welcome back 👋</h2>
            <p className="mt-1 text-sm text-gray-500">Here's what’s happening with your account today.</p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-indigo-100 p-4 rounded-lg shadow">
              <p className="text-sm text-indigo-600 flex items-center">
                <FiUser className="mr-2" /> User ID
              </p>
              <p className="text-xl font-semibold text-indigo-900">{user?.id}</p>
            </div>
            <div className="bg-emerald-100 p-4 rounded-lg shadow">
              <p className="text-sm text-emerald-600 flex items-center">
                <FiMail className="mr-2" /> Email
              </p>
              <p className="text-xl font-semibold text-emerald-900">{user?.email}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg shadow">
              <p className="text-sm text-yellow-600 flex items-center">
                <FiCalendar className="mr-2" /> Created On
              </p>
              <p className="text-xl font-semibold text-yellow-900">
                {new Date(user?.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">User Growth</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#4f46e5" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
