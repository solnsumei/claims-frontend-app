import axios from 'axios';


const axiosClient = axios.create({
  // baseURL: 'http://localhost:5000/api/v1',
  baseURL: 'http://167.99.91.68/api/v1',
});

Object.freeze(axiosClient);
export default axiosClient;