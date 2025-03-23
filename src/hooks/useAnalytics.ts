import { useCallback } from 'react';
import analytics from '@react-native-firebase/analytics';
import { User } from '../types';

export const useAnalytics = () => {
  const logEvent = useCallback(async (eventName: string, params?: Record<string, any>) => {
    try {
      await analytics().logEvent(eventName, params);
      return true;
    } catch (error) {
      console.error('Failed to log analytics event:', error);
      return false;
    }
  }, []);

  const setUserProperties = useCallback(async (user: User) => {
    try {
      await analytics().setUserId(user.id);
      await analytics().setUserProperty('email', user.email);
      await analytics().setUserProperty('preferred_language', user.preferredLanguage);
      await analytics().setUserProperty('nationality', user.nationality || 'unknown');
      await analytics().setUserProperty('current_country', user.currentCountry || 'unknown');
      return true;
    } catch (error) {
      console.error('Failed to set user properties:', error);
      return false;
    }
  }, []);

  const logScreenView = useCallback(async (screenName: string, screenClass: string) => {
    try {
      await analytics().logScreenView({
        screen_name: screenName,
        screen_class: screenClass,
      });
      return true;
    } catch (error) {
      console.error('Failed to log screen view:', error);
      return false;
    }
  }, []);

  const logError = useCallback(async (error: Error, context?: string) => {
    try {
      await analytics().logEvent('app_error', {
        error_message: error.message,
        error_stack: error.stack,
        context,
      });
      return true;
    } catch (analyticsError) {
      console.error('Failed to log error to analytics:', analyticsError);
      return false;
    }
  }, []);

  const logVisaApplication = useCallback(async (visaType: string, stage: string) => {
    try {
      await analytics().logEvent('visa_application', {
        visa_type: visaType,
        stage,
        timestamp: new Date().toISOString(),
      });
      return true;
    } catch (error) {
      console.error('Failed to log visa application:', error);
      return false;
    }
  }, []);

  const logDocumentUpload = useCallback(async (documentType: string, success: boolean) => {
    try {
      await analytics().logEvent('document_upload', {
        document_type: documentType,
        success,
        timestamp: new Date().toISOString(),
      });
      return true;
    } catch (error) {
      console.error('Failed to log document upload:', error);
      return false;
    }
  }, []);

  return {
    logEvent,
    setUserProperties,
    logScreenView,
    logError,
    logVisaApplication,
    logDocumentUpload,
  };
}; 