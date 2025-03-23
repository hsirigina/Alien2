import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/profileSlice';
import documentsReducer from './slices/documentsSlice';
import visaReducer from './slices/visaSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    documents: documentsReducer,
    visa: visaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 