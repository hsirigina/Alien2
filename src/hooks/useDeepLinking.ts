import { useCallback, useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useDeepLinking = () => {
  const navigation = useNavigation();
  const [initialUrl, setInitialUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    // Handle initial deep link
    Linking.getInitialURL().then(url => {
      if (url) {
        setInitialUrl(url);
        handleDeepLink(url);
      }
    });

    // Handle deep links while app is running
    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleDeepLink(url);
    });

    return () => {
      subscription.remove();
    };
  }, [isAuthenticated]);

  const handleDeepLink = useCallback(async (url: string) => {
    try {
      const { path, queryParams } = parseDeepLink(url);
      
      // Handle different deep link paths
      switch (path) {
        case 'visa':
          if (isAuthenticated) {
            navigation.navigate('VisaDetails', { visaId: queryParams?.id });
          } else {
            // Store the deep link to handle after authentication
            await storeDeepLink(url);
          }
          break;

        case 'document':
          if (isAuthenticated) {
            navigation.navigate('DocumentViewer', { documentId: queryParams?.id });
          } else {
            await storeDeepLink(url);
          }
          break;

        case 'chat':
          if (isAuthenticated) {
            navigation.navigate('Chat', { chatId: queryParams?.id });
          } else {
            await storeDeepLink(url);
          }
          break;

        case 'profile':
          if (isAuthenticated) {
            navigation.navigate('Profile');
          } else {
            await storeDeepLink(url);
          }
          break;

        default:
          console.warn('Unknown deep link path:', path);
      }
    } catch (error) {
      setError('Failed to handle deep link');
      console.error('Deep link error:', error);
    }
  }, [isAuthenticated, navigation]);

  const parseDeepLink = (url: string) => {
    const urlObj = new URL(url);
    const path = urlObj.pathname.split('/').filter(Boolean)[0];
    const queryParams = Object.fromEntries(urlObj.searchParams.entries());
    return { path, queryParams };
  };

  const storeDeepLink = async (url: string) => {
    try {
      await AsyncStorage.setItem('pendingDeepLink', url);
    } catch (error) {
      console.error('Failed to store deep link:', error);
    }
  };

  const handlePendingDeepLink = useCallback(async () => {
    try {
      const pendingUrl = await AsyncStorage.getItem('pendingDeepLink');
      if (pendingUrl && isAuthenticated) {
        await AsyncStorage.removeItem('pendingDeepLink');
        handleDeepLink(pendingUrl);
      }
    } catch (error) {
      console.error('Failed to handle pending deep link:', error);
    }
  }, [isAuthenticated, handleDeepLink]);

  return {
    initialUrl,
    error,
    handlePendingDeepLink,
  };
}; 