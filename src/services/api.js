/**
 * API Service Layer for PurohitApp
 * Centralized HTTP client that replaces all Firebase direct calls.
 * All API requests go through this service with automatic JWT token injection.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// ==================== HTTP HELPERS ====================

const getHeaders = (isFormData = false) => {
  const headers = {};
  const token = localStorage.getItem('authToken');

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
};

const handleResponse = async (response) => {
  // Parse the body defensively: proxies or crashed servers may return empty/non-JSON bodies
  const text = await response.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text || 'Server returned an invalid response' };
  }
  if (!response.ok) {
    // If token expired and user had a token, clear auth and redirect to login
    if (response.status === 401 && localStorage.getItem('authToken')) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('users');
      // Only redirect if not already on the login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }
  return data;
};

const api = {
  get: async (endpoint, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}${endpoint}${queryString ? '?' + queryString : ''}`;
    const response = await fetch(url, { method: 'GET', headers: getHeaders() });
    return handleResponse(response);
  },

  post: async (endpoint, body) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  },

  put: async (endpoint, body) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  },

  delete: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  upload: async (endpoint, formData) => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    return handleResponse(response);
  },

  putUpload: async (endpoint, formData) => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    return handleResponse(response);
  },
};

// ==================== AUTH SERVICE ====================

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (email, password) => api.post('/auth/login', { email, password }),
  googleLogin: (data) => api.post('/auth/google', data),
  getPurohitRegister: (data) => api.post('/auth/purohit-register', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
};

// ==================== PRODUCT SERVICE ====================

export const productService = {
  getAll: (params) => api.get('/products', params),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

// ==================== ORDER SERVICE ====================

export const orderService = {
  getAll: (params) => api.get('/orders', params),
  getById: (id) => api.get(`/orders/${id}`),
  create: (data) => api.post('/orders', data),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
  delete: (id) => api.delete(`/orders/${id}`),
};

// ==================== USER SERVICE ====================

export const userService = {
  getAll: (params) => api.get('/users', params),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
};

// ==================== PUROHIT SERVICE ====================

export const purohitService = {
  getAll: (params) => api.get('/purohits', params),
  getById: (id) => api.get(`/purohits/${id}`),
  getByUserId: (userId) => api.get(`/purohits/user/${userId}`),
  update: (id, data) => api.put(`/purohits/${id}`, data),
  updateStatus: (id, status) => api.put(`/purohits/${id}/status`, { status }),
  delete: (id) => api.delete(`/purohits/${id}`),
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.upload('/purohits/upload', formData);
  },
};

// ==================== BOOKING SERVICE ====================

export const bookingService = {
  getAll: (params) => api.get('/bookings', params),
  getById: (id) => api.get(`/bookings/${id}`),
  create: (data) => api.post('/bookings', data),
  updateStatus: (id, status) => api.put(`/bookings/${id}/status`, { status }),
  assignPurohit: (id, data) => api.put(`/bookings/${id}/assign`, data),
  delete: (id) => api.delete(`/bookings/${id}`),
};

// ==================== ZONAL PUROHIT SERVICE ====================

export const zonalPurohitService = {
  getAll: (params) => api.get('/zonalpurohits', params),
  create: (data) => api.post('/zonalpurohits', data),
  update: (id, data) => api.put(`/zonalpurohits/${id}`, data),
  delete: (id) => api.delete(`/zonalpurohits/${id}`),
};

// ==================== CONTENT SERVICE ====================

export const contentService = {
  // Pujas
  getPujas: () => api.get('/content/pujas'),
  getAllPujas: () => api.get('/content/pujas/all'),
  createPuja: (data) => api.post('/content/pujas', data),
  updatePuja: (id, data) => api.put(`/content/pujas/${id}`, data),
  deletePuja: (id) => api.delete(`/content/pujas/${id}`),

  // Aartis
  getAartis: () => api.get('/content/aartis'),
  createAarti: (formData) => api.upload('/content/aartis', formData),
  updateAarti: (id, formData) => api.putUpload(`/content/aartis/${id}`, formData),
  deleteAarti: (id) => api.delete(`/content/aartis/${id}`),

  // Stotras
  getStotras: () => api.get('/content/stotras'),
  createStotra: (formData) => api.upload('/content/stotras', formData),
  updateStotra: (id, formData) => api.putUpload(`/content/stotras/${id}`, formData),
  deleteStotra: (id) => api.delete(`/content/stotras/${id}`),

  // Festivals
  getFestivals: () => api.get('/content/festivals'),
  createFestival: (data) => api.post('/content/festivals', data),
  updateFestival: (id, data) => api.put(`/content/festivals/${id}`, data),
  deleteFestival: (id) => api.delete(`/content/festivals/${id}`),

  // Reviews
  getReviews: (params) => api.get('/content/reviews', params),
  createReview: (data) => api.post('/content/reviews', data),
  hideReview: (id) => api.delete(`/content/reviews/${id}`),

  // Quiz
  getQuizQuestions: (params) => api.get('/content/quiz', params),
  createQuizQuestion: (data) => api.post('/content/quiz', data),
  deleteQuizQuestion: (id) => api.delete(`/content/quiz/${id}`),

  // Gift Cards
  getGiftCards: () => api.get('/content/giftcards'),
  createGiftCard: (data) => api.post('/content/giftcards', data),

  // Rashifal (Daily Horoscope)
  getRashifal: (params) => api.get('/content/rashifal', params),
  createRashifal: (data) => api.post('/content/rashifal', data),
  updateRashifal: (id, data) => api.put(`/content/rashifal/${id}`, data),

  // File Upload
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.upload('/content/upload', formData);
  },

  // Dashboard Stats
  getDashboardStats: () => api.get('/content/dashboard/stats'),
};

export default api;
