export const APP_NAME = 'Alien2';

export const API_ENDPOINTS = {
  BASE_URL: 'https://api.alien2.com/v1',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    RESET_PASSWORD: '/auth/reset-password',
  },
  PROFILE: {
    GET: '/profile',
    UPDATE: '/profile',
    UPLOAD_DOCUMENT: '/profile/documents',
  },
  VISA: {
    REQUIREMENTS: (type: string) => `/visa/${type}/requirements`,
    PROCESSING_TIME: (type: string) => `/visa/${type}/processing-time`,
    CASE_STATUS: (id: string) => `/visa/cases/${id}/status`,
    COMMUNITY_MATCHES: (type: string) => `/visa/${type}/community-matches`,
  },
  DOCUMENTS: {
    SCAN: '/documents/scan',
    VALIDATE: (id: string) => `/documents/${id}/validate`,
    TRANSLATE: (id: string) => `/documents/${id}/translate`,
  },
  CHAT: {
    MESSAGES: '/chat/messages',
    HISTORY: '/chat/history',
  },
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_PROFILE: 'userProfile',
  APP_SETTINGS: 'appSettings',
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection error. Please check your internet connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Unauthorized access. Please log in again.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  DOCUMENT_ERROR: 'Error processing document. Please try again.',
};

export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: 'Profile updated successfully.',
  DOCUMENT_UPLOADED: 'Document uploaded successfully.',
  PASSWORD_RESET: 'Password reset instructions sent to your email.',
  LOGOUT: 'Logged out successfully.',
};

export const VISA_TYPES = [
  'B1/B2',
  'F1',
  'H1B',
  'L1',
  'O1',
  'E2',
  'J1',
  'K1',
  'IR1/CR1',
  'DV Lottery',
] as const;

export const DOCUMENT_TYPES = [
  'Passport',
  'Visa',
  'Birth Certificate',
  'Marriage Certificate',
  'Divorce Decree',
  'Police Clearance',
  'Medical Records',
  'Bank Statements',
  'Employment Letter',
  'Tax Returns',
] as const;

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
] as const;

export const APP_SETTINGS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_FILE_TYPES: ['pdf', 'jpg', 'jpeg', 'png'],
  MAX_IMAGE_DIMENSION: 2048,
  COMPRESSION_QUALITY: 0.8,
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
}; 