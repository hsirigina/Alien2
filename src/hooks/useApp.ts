import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { AppSettings } from '../types';
import { STORAGE_KEYS } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useApp = () => {
  const dispatch = useDispatch();
  const [settings, setSettings] = useState<AppSettings>({
    notifications: true,
    darkMode: false,
    language: 'en',
    autoTranslate: true,
    documentCompression: true,
    sessionTimeout: 30 * 60 * 1000,
  });

  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const loadSettings = useCallback(async () => {
    try {
      const storedSettings = await AsyncStorage.getItem(STORAGE_KEYS.APP_SETTINGS);
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  }, []);

  const updateSettings = useCallback(async (newSettings: Partial<AppSettings>) => {
    try {
      const updatedSettings = { ...settings, ...newSettings };
      await AsyncStorage.setItem(STORAGE_KEYS.APP_SETTINGS, JSON.stringify(updatedSettings));
      setSettings(updatedSettings);
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  }, [settings]);

  const clearAppData = useCallback(async () => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.USER_PROFILE,
        STORAGE_KEYS.APP_SETTINGS,
      ]);
      // Additional cleanup logic can be added here
    } catch (error) {
      console.error('Error clearing app data:', error);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  return {
    user,
    isAuthenticated,
    settings,
    updateSettings,
    clearAppData,
  };
}; 