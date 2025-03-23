import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { User } from '../types';
import { STORAGE_KEYS, API_ENDPOINTS } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuth = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Here you would typically make an API call to your backend
      // For now, we'll simulate a successful login
      const mockUser: User = {
        id: '1',
        email,
        firstName: 'John',
        lastName: 'Doe',
        preferredLanguage: 'en',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const mockToken = 'mock-jwt-token';

      // Store auth data
      await AsyncStorage.multiSet([
        [STORAGE_KEYS.AUTH_TOKEN, mockToken],
        [STORAGE_KEYS.USER_PROFILE, JSON.stringify(mockUser)],
      ]);

      // Here you would typically dispatch actions to update Redux state
      return true;
    } catch (error) {
      setError('Failed to login');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    setError(null);

    try {
      // Here you would typically make an API call to your backend
      // For now, we'll simulate a successful registration
      const mockUser: User = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const mockToken = 'mock-jwt-token';

      // Store auth data
      await AsyncStorage.multiSet([
        [STORAGE_KEYS.AUTH_TOKEN, mockToken],
        [STORAGE_KEYS.USER_PROFILE, JSON.stringify(mockUser)],
      ]);

      // Here you would typically dispatch actions to update Redux state
      return true;
    } catch (error) {
      setError('Failed to register');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Clear auth data
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.USER_PROFILE,
      ]);

      // Here you would typically dispatch actions to clear Redux state
      return true;
    } catch (error) {
      setError('Failed to logout');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Here you would typically make an API call to your backend
      // For now, we'll simulate a successful password reset request
      return true;
    } catch (error) {
      setError('Failed to reset password');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    resetPassword,
  };
}; 