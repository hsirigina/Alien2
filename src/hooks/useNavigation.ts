import { useCallback } from 'react';
import { useNavigation as useReactNavigation } from '@react-navigation/native';
import { useAnalytics } from './useAnalytics';
import { useAuth } from './useAuth';
import { useBiometrics } from './useBiometrics';

export const useNavigation = () => {
  const navigation = useReactNavigation();
  const { logScreenView } = useAnalytics();
  const { isAuthenticated } = useAuth();
  const { authenticate } = useBiometrics();

  const navigate = useCallback(async (screen: string, params?: any) => {
    try {
      // Log screen view to analytics
      await logScreenView(screen, screen);
      
      // Check if screen requires authentication
      if (isAuthenticated) {
        // Check if screen requires biometric authentication
        if (screen === 'Profile' || screen === 'Settings') {
          const authenticated = await authenticate();
          if (!authenticated) {
            return;
          }
        }
      }

      navigation.navigate(screen as never, params as never);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }, [navigation, logScreenView, isAuthenticated, authenticate]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const reset = useCallback((screen: string, params?: any) => {
    navigation.reset({
      index: 0,
      routes: [{ name: screen, params }],
    });
  }, [navigation]);

  const navigateToAuth = useCallback(() => {
    reset('Auth');
  }, [reset]);

  const navigateToHome = useCallback(() => {
    reset('Home');
  }, [reset]);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const navigateToSettings = useCallback(() => {
    navigate('Settings');
  }, [navigate]);

  const navigateToVisaDetails = useCallback((visaId: string) => {
    navigate('VisaDetails', { visaId });
  }, [navigate]);

  const navigateToDocumentViewer = useCallback((documentId: string) => {
    navigate('DocumentViewer', { documentId });
  }, [navigate]);

  const navigateToChat = useCallback((chatId?: string) => {
    navigate('Chat', { chatId });
  }, [navigate]);

  return {
    navigate,
    goBack,
    reset,
    navigateToAuth,
    navigateToHome,
    navigateToProfile,
    navigateToSettings,
    navigateToVisaDetails,
    navigateToDocumentViewer,
    navigateToChat,
  };
}; 