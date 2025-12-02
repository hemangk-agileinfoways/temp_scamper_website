import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// Create axios instance with default configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_BASE,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // You can add auth tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    // Log request in development
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log(`[API Response] ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error: AxiosError) => {
    // Handle common error cases
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const message = (error.response.data as { message?: string })?.message || error.message;

      switch (status) {
        case 401:
          // Unauthorized - could redirect to login
          console.error('[API Error] Unauthorized:', message);
          // You can add redirect logic here if needed
          break;
        case 403:
          console.error('[API Error] Forbidden:', message);
          break;
        case 404:
          console.error('[API Error] Not Found:', message);
          break;
        case 500:
          console.error('[API Error] Server Error:', message);
          break;
        default:
          console.error(`[API Error] ${status}:`, message);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('[API Error] No response received:', error.message);
    } else {
      // Something else happened
      console.error('[API Error] Request setup error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
