import { useCallback, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS, SUPPORTED_LANGUAGES } from '../constants';
import { LanguageCode } from '../types';

interface LocalizationState {
  currentLanguage: LanguageCode;
  isRTL: boolean;
  dateFormat: string;
  timeFormat: string;
  currency: string;
  region: string;
}

export const useLocalization = () => {
  const [state, setState] = useState<LocalizationState>({
    currentLanguage: 'en',
    isRTL: false,
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    currency: 'USD',
    region: 'US',
  });

  useEffect(() => {
    loadLocalizationSettings();
  }, []);

  const loadLocalizationSettings = useCallback(async () => {
    try {
      const settings = await AsyncStorage.getItem(STORAGE_KEYS.LOCALIZATION);
      if (settings) {
        setState(JSON.parse(settings));
      }
    } catch (error) {
      console.error('Failed to load localization settings:', error);
    }
  }, []);

  const saveLocalizationSettings = useCallback(async (settings: LocalizationState) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.LOCALIZATION, JSON.stringify(settings));
      setState(settings);
    } catch (error) {
      console.error('Failed to save localization settings:', error);
    }
  }, []);

  const setLanguage = useCallback(async (language: LanguageCode) => {
    try {
      const newSettings = {
        ...state,
        currentLanguage: language,
        isRTL: language === 'ar' || language === 'he',
      };
      await saveLocalizationSettings(newSettings);
      return true;
    } catch (error) {
      console.error('Failed to set language:', error);
      return false;
    }
  }, [state, saveLocalizationSettings]);

  const setDateFormat = useCallback(async (format: string) => {
    try {
      const newSettings = {
        ...state,
        dateFormat: format,
      };
      await saveLocalizationSettings(newSettings);
      return true;
    } catch (error) {
      console.error('Failed to set date format:', error);
      return false;
    }
  }, [state, saveLocalizationSettings]);

  const setTimeFormat = useCallback(async (format: '12h' | '24h') => {
    try {
      const newSettings = {
        ...state,
        timeFormat: format,
      };
      await saveLocalizationSettings(newSettings);
      return true;
    } catch (error) {
      console.error('Failed to set time format:', error);
      return false;
    }
  }, [state, saveLocalizationSettings]);

  const setCurrency = useCallback(async (currency: string) => {
    try {
      const newSettings = {
        ...state,
        currency,
      };
      await saveLocalizationSettings(newSettings);
      return true;
    } catch (error) {
      console.error('Failed to set currency:', error);
      return false;
    }
  }, [state, saveLocalizationSettings]);

  const setRegion = useCallback(async (region: string) => {
    try {
      const newSettings = {
        ...state,
        region,
      };
      await saveLocalizationSettings(newSettings);
      return true;
    } catch (error) {
      console.error('Failed to set region:', error);
      return false;
    }
  }, [state, saveLocalizationSettings]);

  const getSupportedLanguages = useCallback(() => {
    return SUPPORTED_LANGUAGES;
  }, []);

  const getLanguageName = useCallback((code: LanguageCode) => {
    const language = SUPPORTED_LANGUAGES.find(lang => lang.code === code);
    return language ? language.name : code;
  }, []);

  const formatDate = useCallback((date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };

    return new Intl.DateTimeFormat(state.currentLanguage, options).format(date);
  }, [state.currentLanguage]);

  const formatTime = useCallback((date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: state.timeFormat === '12h',
    };

    return new Intl.DateTimeFormat(state.currentLanguage, options).format(date);
  }, [state.currentLanguage, state.timeFormat]);

  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat(state.currentLanguage, {
      style: 'currency',
      currency: state.currency,
    }).format(amount);
  }, [state.currentLanguage, state.currency]);

  return {
    ...state,
    setLanguage,
    setDateFormat,
    setTimeFormat,
    setCurrency,
    setRegion,
    getSupportedLanguages,
    getLanguageName,
    formatDate,
    formatTime,
    formatCurrency,
  };
}; 