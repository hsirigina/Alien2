import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES } from '../constants';

export const useTranslation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.auth.user);
  const currentLanguage = user?.preferredLanguage || 'en';

  const translateText = useCallback(async (text: string, targetLanguage: LanguageCode) => {
    setIsLoading(true);
    setError(null);

    try {
      // Here you would typically make an API call to your translation service
      // For now, we'll simulate a successful translation
      await new Promise(resolve => setTimeout(resolve, 1000));
      return `Translated: ${text}`;
    } catch (error) {
      setError('Failed to translate text');
      return text;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const translateDocument = useCallback(async (documentId: string, targetLanguage: LanguageCode) => {
    setIsLoading(true);
    setError(null);

    try {
      // Here you would typically make an API call to your translation service
      // For now, we'll simulate a successful document translation
      await new Promise(resolve => setTimeout(resolve, 2000));
      return true;
    } catch (error) {
      setError('Failed to translate document');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getSupportedLanguages = useCallback(() => {
    return SUPPORTED_LANGUAGES;
  }, []);

  const getLanguageName = useCallback((code: LanguageCode) => {
    const language = SUPPORTED_LANGUAGES.find(lang => lang.code === code);
    return language?.name || code;
  }, []);

  return {
    currentLanguage,
    isLoading,
    error,
    translateText,
    translateDocument,
    getSupportedLanguages,
    getLanguageName,
  };
}; 