import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Document {
  id: string;
  name: string;
  type: string;
  uri: string;
  status: 'pending' | 'valid' | 'invalid';
  validationErrors?: string[];
  uploadDate: string;
}

interface DocumentsState {
  documents: Document[];
  selectedDocument: Document | null;
  isScanning: boolean;
  scanResult: {
    isValid: boolean;
    errors: string[];
    suggestions: string[];
  } | null;
}

const initialState: DocumentsState = {
  documents: [],
  selectedDocument: null,
  isScanning: false,
  scanResult: null,
};

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    addDocument: (state, action: PayloadAction<Document>) => {
      state.documents.push(action.payload);
    },
    removeDocument: (state, action: PayloadAction<string>) => {
      state.documents = state.documents.filter(doc => doc.id !== action.payload);
    },
    updateDocument: (state, action: PayloadAction<Document>) => {
      const index = state.documents.findIndex(doc => doc.id === action.payload.id);
      if (index !== -1) {
        state.documents[index] = action.payload;
      }
    },
    setSelectedDocument: (state, action: PayloadAction<Document | null>) => {
      state.selectedDocument = action.payload;
    },
    setScanning: (state, action: PayloadAction<boolean>) => {
      state.isScanning = action.payload;
    },
    setScanResult: (state, action: PayloadAction<DocumentsState['scanResult']>) => {
      state.scanResult = action.payload;
    },
    resetDocuments: () => initialState,
  },
});

export const {
  addDocument,
  removeDocument,
  updateDocument,
  setSelectedDocument,
  setScanning,
  setScanResult,
  resetDocuments,
} = documentsSlice.actions;

export default documentsSlice.reducer; 