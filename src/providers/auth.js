import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const isAuthenticated = () => {
    return user != null;
  }

  const login = async ({ username, password }) => {
    setUser({ username: username, password: password });
  }

  const logout = () => {
    setUser(null);
  }

  const updateLoggedInUser = async () => {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
}