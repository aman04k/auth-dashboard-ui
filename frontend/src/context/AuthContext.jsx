import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      await checkAuth();
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      await checkAuth();
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  const updateEmail = async (newEmail) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/user`, {
        email: newEmail
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser((prevUser) => ({ ...prevUser, email: response.data.email }));
      toast.success('Email updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update email');
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    updateEmail
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
