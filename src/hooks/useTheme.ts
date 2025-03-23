import { useCallback, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants';

interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  info: string;
}

interface ThemeState {
  isDarkMode: boolean;
  colors: ThemeColors;
  fontSize: 'small' | 'medium' | 'large';
  spacing: 'compact' | 'normal' | 'spacious';
  borderRadius: 'small' | 'medium' | 'large';
}

const lightColors: ThemeColors = {
  primary: '#007AFF',
  secondary: '#5856D6',
  background: '#FFFFFF',
  surface: '#F2F2F7',
  text: '#000000',
  textSecondary: '#6C757D',
  border: '#E5E5EA',
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
  info: '#5856D6',
};

const darkColors: ThemeColors = {
  primary: '#0A84FF',
  secondary: '#5E5CE6',
  background: '#000000',
  surface: '#1C1C1E',
  text: '#FFFFFF',
  textSecondary: '#8E8E93',
  border: '#38383A',
  error: '#FF453A',
  success: '#32D74B',
  warning: '#FFD60A',
  info: '#5E5CE6',
};

export const useTheme = () => {
  const [state, setState] = useState<ThemeState>({
    isDarkMode: false,
    colors: lightColors,
    fontSize: 'medium',
    spacing: 'normal',
    borderRadius: 'medium',
  });

  useEffect(() => {
    loadThemeSettings();
  }, []);

  const loadThemeSettings = useCallback(async () => {
    try {
      const settings = await AsyncStorage.getItem(STORAGE_KEYS.THEME);
      if (settings) {
        const parsedSettings = JSON.parse(settings);
        setState({
          ...parsedSettings,
          colors: parsedSettings.isDarkMode ? darkColors : lightColors,
        });
      }
    } catch (error) {
      console.error('Failed to load theme settings:', error);
    }
  }, []);

  const saveThemeSettings = useCallback(async (settings: ThemeState) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(settings));
      setState(settings);
    } catch (error) {
      console.error('Failed to save theme settings:', error);
    }
  }, []);

  const toggleDarkMode = useCallback(async () => {
    try {
      const newSettings = {
        ...state,
        isDarkMode: !state.isDarkMode,
        colors: !state.isDarkMode ? darkColors : lightColors,
      };
      await saveThemeSettings(newSettings);
      return true;
    } catch (error) {
      console.error('Failed to toggle dark mode:', error);
      return false;
    }
  }, [state, saveThemeSettings]);

  const setFontSize = useCallback(async (size: 'small' | 'medium' | 'large') => {
    try {
      const newSettings = {
        ...state,
        fontSize: size,
      };
      await saveThemeSettings(newSettings);
      return true;
    } catch (error) {
      console.error('Failed to set font size:', error);
      return false;
    }
  }, [state, saveThemeSettings]);

  const setSpacing = useCallback(async (spacing: 'compact' | 'normal' | 'spacious') => {
    try {
      const newSettings = {
        ...state,
        spacing,
      };
      await saveThemeSettings(newSettings);
      return true;
    } catch (error) {
      console.error('Failed to set spacing:', error);
      return false;
    }
  }, [state, saveThemeSettings]);

  const setBorderRadius = useCallback(async (radius: 'small' | 'medium' | 'large') => {
    try {
      const newSettings = {
        ...state,
        borderRadius: radius,
      };
      await saveThemeSettings(newSettings);
      return true;
    } catch (error) {
      console.error('Failed to set border radius:', error);
      return false;
    }
  }, [state, saveThemeSettings]);

  const getSpacingValue = useCallback((size: 'small' | 'medium' | 'large') => {
    const baseSpacing = state.spacing === 'compact' ? 4 : state.spacing === 'spacious' ? 8 : 6;
    switch (size) {
      case 'small':
        return baseSpacing;
      case 'medium':
        return baseSpacing * 2;
      case 'large':
        return baseSpacing * 3;
      default:
        return baseSpacing * 2;
    }
  }, [state.spacing]);

  const getFontSizeValue = useCallback((size: 'small' | 'medium' | 'large') => {
    const baseSize = state.fontSize === 'small' ? 14 : state.fontSize === 'large' ? 18 : 16;
    switch (size) {
      case 'small':
        return baseSize - 2;
      case 'medium':
        return baseSize;
      case 'large':
        return baseSize + 2;
      default:
        return baseSize;
    }
  }, [state.fontSize]);

  const getBorderRadiusValue = useCallback((size: 'small' | 'medium' | 'large') => {
    const baseRadius = state.borderRadius === 'small' ? 4 : state.borderRadius === 'large' ? 12 : 8;
    switch (size) {
      case 'small':
        return baseRadius;
      case 'medium':
        return baseRadius * 2;
      case 'large':
        return baseRadius * 3;
      default:
        return baseRadius * 2;
    }
  }, [state.borderRadius]);

  return {
    ...state,
    toggleDarkMode,
    setFontSize,
    setSpacing,
    setBorderRadius,
    getSpacingValue,
    getFontSizeValue,
    getBorderRadiusValue,
  };
}; 