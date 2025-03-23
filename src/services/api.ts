import axios from 'axios';

const API_BASE_URL = 'https://api.alien2.com/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (userData: any) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  resetPassword: (email: string) =>
    api.post('/auth/reset-password', { email }),
};

export const profileAPI = {
  getProfile: () => api.get('/profile'),
  updateProfile: (profileData: any) =>
    api.put('/profile', profileData),
  uploadDocument: (documentData: FormData) =>
    api.post('/profile/documents', documentData),
};

export const visaAPI = {
  getVisaRequirements: (visaType: string) =>
    api.get(`/visa/${visaType}/requirements`),
  getProcessingTime: (visaType: string, profileData: any) =>
    api.post(`/visa/${visaType}/processing-time`, profileData),
  getCaseStatus: (caseId: string) =>
    api.get(`/visa/cases/${caseId}/status`),
  getCommunityMatches: (visaType: string) =>
    api.get(`/visa/${visaType}/community-matches`),
};

export const documentAPI = {
  scanDocument: (documentData: FormData) =>
    api.post('/documents/scan', documentData),
  validateDocument: (documentId: string) =>
    api.post(`/documents/${documentId}/validate`),
  translateDocument: (documentId: string, targetLanguage: string) =>
    api.post(`/documents/${documentId}/translate`, { targetLanguage }),
};

export const chatAPI = {
  sendMessage: (message: string) =>
    api.post('/chat/messages', { message }),
  getChatHistory: () => api.get('/chat/history'),
};

export default api; 