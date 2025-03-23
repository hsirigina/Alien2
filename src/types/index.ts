import { VISA_TYPES, DOCUMENT_TYPES, SUPPORTED_LANGUAGES } from '../constants';

export type VisaType = typeof VISA_TYPES[number];
export type DocumentType = typeof DOCUMENT_TYPES[number];
export type LanguageCode = typeof SUPPORTED_LANGUAGES[number]['code'];

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  nationality?: string;
  currentCountry?: string;
  preferredLanguage: LanguageCode;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  uri: string;
  status: 'pending' | 'validated' | 'rejected';
  validationErrors?: string[];
  uploadDate: string;
  expiryDate?: string;
  translatedUri?: string;
  translatedLanguage?: LanguageCode;
}

export interface VisaRequirement {
  id: string;
  title: string;
  description: string;
  isRequired: boolean;
  documents: DocumentType[];
  estimatedCost?: number;
  estimatedTime?: string;
  tips?: string[];
}

export interface VisaTimeline {
  id: string;
  stage: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  startDate?: string;
  endDate?: string;
  notes?: string;
  documents?: Document[];
}

export interface ProcessingTime {
  visaType: VisaType;
  averageTime: string;
  minTime: string;
  maxTime: string;
  factors: string[];
  lastUpdated: string;
}

export interface CaseStatus {
  caseNumber: string;
  status: string;
  lastUpdated: string;
  nextAction?: string;
  estimatedCompletion?: string;
  documents?: Document[];
}

export interface CommunityMatch {
  id: string;
  name: string;
  visaType: VisaType;
  currentStage: string;
  country: string;
  experience: string;
  tips: string[];
  contactInfo?: {
    email?: string;
    phone?: string;
    socialMedia?: {
      platform: string;
      username: string;
    }[];
  };
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  attachments?: Document[];
}

export interface AppSettings {
  notifications: boolean;
  darkMode: boolean;
  language: LanguageCode;
  autoTranslate: boolean;
  documentCompression: boolean;
  sessionTimeout: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
} 