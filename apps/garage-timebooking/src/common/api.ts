import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL;

if (!baseURL) throw Error('Please make sure REACT_APP_BACKEND_URL env is provided');

const apiClient = axios.create({
  baseURL,
});

export default apiClient;
