// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://banking-backend-tqfs.onrender.com';

export const apiCall = async (endpoint, options = {}) => {
  // Remove leading slash from endpoint to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  const url = `${API_BASE_URL}/${cleanEndpoint}`;
  
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
  
  const response = await fetch(url, mergedOptions);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error retrieving data! status: ${response.status}, message: ${errorText}`);
  }
  
  return response.json();
};

export default API_BASE_URL;