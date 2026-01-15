// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}/${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };
  
  return fetch(url, mergedOptions);
};

export default API_BASE_URL;