import { useCallback, useState, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants';

interface LoadingState {
  isLoading: boolean;
  message?: string;
  progress?: number;
}

export const useLoading = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
  });
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = useCallback((nextAppState: AppStateStatus) => {
    setAppState(nextAppState);
    if (nextAppState === 'active') {
      // Handle app becoming active
      checkPendingOperations();
    }
  }, []);

  const checkPendingOperations = useCallback(async () => {
    try {
      const pendingOps = await AsyncStorage.getItem(STORAGE_KEYS.PENDING_OPERATIONS);
      if (pendingOps) {
        const operations = JSON.parse(pendingOps);
        // Handle any pending operations
        await AsyncStorage.removeItem(STORAGE_KEYS.PENDING_OPERATIONS);
      }
    } catch (error) {
      console.error('Failed to check pending operations:', error);
    }
  }, []);

  const startLoading = useCallback((message?: string) => {
    setLoadingState({
      isLoading: true,
      message,
    });
  }, []);

  const stopLoading = useCallback(() => {
    setLoadingState({
      isLoading: false,
    });
  }, []);

  const updateProgress = useCallback((progress: number) => {
    setLoadingState(prev => ({
      ...prev,
      progress,
    }));
  }, []);

  const updateMessage = useCallback((message: string) => {
    setLoadingState(prev => ({
      ...prev,
      message,
    }));
  }, []);

  const withLoading = useCallback(async <T>(
    operation: () => Promise<T>,
    message?: string
  ): Promise<T> => {
    startLoading(message);
    try {
      const result = await operation();
      return result;
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  return {
    ...loadingState,
    appState,
    startLoading,
    stopLoading,
    updateProgress,
    updateMessage,
    withLoading,
  };
}; 