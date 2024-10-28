const API_URL = 'your-api-base-url';

// Request types enum
const REQUEST_TYPES = {
  PUBLIC: 'PUBLIC',        // No token needed (login, register)
  PROTECTED: 'PROTECTED',  // Requires token
  ADMIN: 'ADMIN'          // Requires token + admin role
};

// Generic fetch function for API calls
const fetchAPI = async (endpoint, options = {}, requestType = REQUEST_TYPES.PROTECTED) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Handle authorization based on request type
  if (requestType !== REQUEST_TYPES.PUBLIC) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }
    defaultOptions.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    });

    // Handle token expiration
    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      throw new Error('Session expired');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth-related API calls (Public endpoints)
export const loginUser = (credentials) => {
  return fetchAPI('/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }, REQUEST_TYPES.PUBLIC);
};

export const registerUser = (userData) => {
  return fetchAPI('/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }, REQUEST_TYPES.PUBLIC);
};

export const forgotPassword = (email) => {
  return fetchAPI('/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  }, REQUEST_TYPES.PUBLIC);
};

export const resetPassword = (token, newPassword) => {
  return fetchAPI('/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, newPassword }),
  }, REQUEST_TYPES.PUBLIC);
};

// Protected endpoints (requires authentication)
export const updateProfile = (userData) => {
  return fetchAPI('/user/profile', {
    method: 'PUT',
    body: JSON.stringify(userData),
  }, REQUEST_TYPES.PROTECTED);
};

export const getUserData = () => {
  return fetchAPI('/user/profile', {
    method: 'GET',
  }, REQUEST_TYPES.PROTECTED);
};

// Admin endpoints (requires authentication + admin role)
export const getAllUsers = () => {
  return fetchAPI('/admin/users', {
    method: 'GET',
  }, REQUEST_TYPES.ADMIN);
};

// Refresh token function
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await fetchAPI('/refresh-token', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    }, REQUEST_TYPES.PUBLIC);

    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    
    return response;
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    throw error;
  }
};

// Utility function to check if token exists and is valid
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  // Optional: Add JWT decode and expiration check
  // This is a basic example, you might want to add more sophisticated token validation
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};

// Export the generic fetchAPI and request types for use in other parts of the application
export const api = {
  fetch: fetchAPI,
  REQUEST_TYPES,
  isAuthenticated,
};

// Optional: Add an axios-like interface
export const apiClient = {
  get: (endpoint, options = {}) => fetchAPI(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, data, options = {}) => fetchAPI(endpoint, { 
    ...options, 
    method: 'POST',
    body: JSON.stringify(data)
  }),
  put: (endpoint, data, options = {}) => fetchAPI(endpoint, { 
    ...options, 
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (endpoint, options = {}) => fetchAPI(endpoint, { ...options, method: 'DELETE' }),
};