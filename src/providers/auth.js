import { createContext, useContext } from 'react';
import { useQueryClient } from 'react-query';
import client from '../services/axiosClient';
import { removeToken, setToken, verifyToken } from '../utils/tokenHelper'
import types from '../utils/types';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const isAuthenticated = () => {
    const verified = verifyToken();

    if (!verified) {
      queryClient.clear();
    }

    return verified;
  }

  const loginUser = async data => {
    try { 
      const response = await client.post('/auth/login', data);
      
      setToken(response.data.token);
      queryClient.setQueryData(types.USER, response.data);
    } catch(error) {
      throw (error);
    }
  }

  const logoutUser = () => {
    removeToken();
    queryClient.clear();
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}