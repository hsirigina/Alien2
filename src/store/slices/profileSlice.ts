import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  basicInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
  };
  immigrationStatus: {
    currentStatus: string;
    visaType: string;
    countryOfOrigin: string;
    intendedDestination: string;
  };
  documents: {
    passport: string;
    visa: string;
    otherDocuments: string[];
  };
  preferences: {
    language: string;
    notifications: boolean;
    theme: 'light' | 'dark';
  };
  isComplete: boolean;
}

const initialState: ProfileState = {
  basicInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
  },
  immigrationStatus: {
    currentStatus: '',
    visaType: '',
    countryOfOrigin: '',
    intendedDestination: '',
  },
  documents: {
    passport: '',
    visa: '',
    otherDocuments: [],
  },
  preferences: {
    language: 'en',
    notifications: true,
    theme: 'light',
  },
  isComplete: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateBasicInfo: (state, action: PayloadAction<Partial<ProfileState['basicInfo']>>) => {
      state.basicInfo = { ...state.basicInfo, ...action.payload };
    },
    updateImmigrationStatus: (state, action: PayloadAction<Partial<ProfileState['immigrationStatus']>>) => {
      state.immigrationStatus = { ...state.immigrationStatus, ...action.payload };
    },
    updateDocuments: (state, action: PayloadAction<Partial<ProfileState['documents']>>) => {
      state.documents = { ...state.documents, ...action.payload };
    },
    updatePreferences: (state, action: PayloadAction<Partial<ProfileState['preferences']>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    setProfileComplete: (state, action: PayloadAction<boolean>) => {
      state.isComplete = action.payload;
    },
    resetProfile: () => initialState,
  },
});

export const {
  updateBasicInfo,
  updateImmigrationStatus,
  updateDocuments,
  updatePreferences,
  setProfileComplete,
  resetProfile,
} = profileSlice.actions;

export default profileSlice.reducer; 