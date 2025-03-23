import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { AppSettings } from '../types';
import { STORAGE_KEYS } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';

export const useSettings = () => {
  const dispatch = useDispatch();
  const { colors, dark } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const settings = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = useCallback(async () => {
    try {
      const storedSettings = await AsyncStorage.getItem(STORAGE_KEYS.APP_SETTINGS);
      if (storedSettings) {
        const parsedSettings = JSON.parse(storedSettings);
        // Here you would typically dispatch an action to update Redux state
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  }, []);

  const updateSettings = useCallback(async (newSettings: Partial<AppSettings>) => {
    setIsLoading(true);
    setError(null);

    try {
      const updatedSettings = { ...settings, ...newSettings };
      await AsyncStorage.setItem(STORAGE_KEYS.APP_SETTINGS, JSON.stringify(updatedSettings));
      // Here you would typically dispatch an action to update Redux state
      return true;
    } catch (error) {
      setError('Failed to update settings');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [settings]);

  const toggleDarkMode = useCallback(async () => {
    return updateSettings({ darkMode: !settings.darkMode });
  }, [settings.darkMode, updateSettings]);

  const toggleNotifications = useCallback(async () => {
    return updateSettings({ notifications: !settings.notifications });
  }, [settings.notifications, updateSettings]);

  const toggleAutoTranslate = useCallback(async () => {
    return updateSettings({ autoTranslate: !settings.autoTranslate });
  }, [settings.autoTranslate, updateSettings]);

  const toggleDocumentCompression = useCallback(async () => {
    return updateSettings({ documentCompression: !settings.documentCompression });
  }, [settings.documentCompression, updateSettings]);

  const updateLanguage = useCallback(async (language: string) => {
    return updateSettings({ language });
  }, [updateSettings]);

  const updateSessionTimeout = useCallback(async (timeout: number) => {
    return updateSettings({ sessionTimeout: timeout });
  }, [updateSettings]);

  const resetSettings = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const defaultSettings: AppSettings = {
        notifications: true,
        darkMode: false,
        language: 'en',
        autoTranslate: true,
        documentCompression: true,
        sessionTimeout: 30 * 60 * 1000,
      };

      await AsyncStorage.setItem(STORAGE_KEYS.APP_SETTINGS, JSON.stringify(defaultSettings));
      // Here you would typically dispatch an action to update Redux state
      return true;
    } catch (error) {
      setError('Failed to reset settings');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    settings,
    isLoading,
    error,
    updateSettings,
    toggleDarkMode,
    toggleNotifications,
    toggleAutoTranslate,
    toggleDocumentCompression,
    updateLanguage,
    updateSessionTimeout,
    resetSettings,
  };
}; 