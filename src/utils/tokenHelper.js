import jwtDecode from 'jwt-decode';
import types from './types';
import client from '../services/axiosClient';


export const removeToken = () => {
  if (localStorage.getItem(types.TOKEN)) {
    localStorage.removeItem(types.TOKEN);

    delete client.defaults.headers.common['Authorization'];
  }
}

export const setTokenHeader = token => {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const setToken = token => {
  localStorage.setItem(types.TOKEN, token);
  setTokenHeader(token);
}

export const getToken = () => {
  return localStorage.getItem(types.TOKEN);
}

const verifyTokenExpiry = token => {
    if (!token) {
      return false;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < (new Date().getTime())) {
        removeToken();
      }
      
      return decoded;
      
    } catch (error) {
      return false;
    }
}

export const checkAndSetTokenHeader = () => {
  const token = getToken();

  if(verifyTokenExpiry(token)) {
    setTokenHeader(token);
  }
}

export const verifyToken = () => {
  return verifyTokenExpiry(getToken());
}