import { createContext, useState, useContext } from 'react';
import jwtDecode from 'jwt-decode';
import client from '../services/axiosClient';
import types from '../utils/types';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

const removeToken = () => {
  if (localStorage.getItem(types.TOKEN)) {
    localStorage.removeItem(types.TOKEN);

    delete client.defaults.headers.common['Authorization'];
  }
}

const setTokenHeader = token => {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const isAuthenticated = () => {
    const token = localStorage.getItem(types.TOKEN);

    if (!token) {
      return false;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < (new Date().getTime())) {
        logoutUser();
      }

      return decoded.sub;

    } catch (error) {
      return false;
    }
  }

  const loginUser = async data => {
    try { 
      const response = await client.post('/auth/login', data);

      const token = response.data.token;
      localStorage.setItem(types.TOKEN, token);
      setTokenHeader(token);
      setUser(response.data.user);
    } catch(error) {
      throw (error);
    }
  }

  const logoutUser = () => {
    removeToken();
    setUser(null);
  }

  const getLoggedInUser = async () => {
    try { 
      const response = await client.get('/auth/user');
      setUser(response.data.user);
      return response.data.user;
    } catch(error) {
      if (error.response.status === 401) {
        logoutUser();
      }
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loginUser, logoutUser, getLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
}