import axios from 'axios';


const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // baseURL: 'http://167.99.91.68/api/v1',
});

Object.freeze(axiosClient);
export default axiosClient;