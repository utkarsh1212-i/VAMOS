import axios from 'axios';
import Cookies from 'js-cookie';

// Create an axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Extract token from cookies
    const token = Cookies.get('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
