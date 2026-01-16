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
  
  // Check if response has content before parsing JSON
  const contentType = response.headers.get('content-type');
  const contentLength = response.headers.get('content-length');
  
  // Handle empty responses (common with DELETE operations)
  if (contentLength === '0' || response.status === 204) {
    return null;
  }
  
  // Only parse JSON if response contains JSON content
  if (contentType && contentType.includes('application/json')) {
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }
  
  // For non-JSON responses, return the text
  return await response.text();
};

export default API_BASE_URL;