import { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { AppSettings } from '../types';
import { STORAGE_KEYS } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

export const useNotifications = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<boolean>(false);

  const settings = useSelector((state: RootState) => state.settings);

  const requestPermission = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      setPermissionStatus(enabled);
      return enabled;
    } catch (error) {
      setError('Failed to request notification permission');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getFCMToken = useCallback(async () => {
    try {
      const token = await messaging().getToken();
      return token;
    } catch (error) {
      setError('Failed to get FCM token');
      return null;
    }
  }, []);

  const createChannel = useCallback(async () => {
    try {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
      return channelId;
    } catch (error) {
      setError('Failed to create notification channel');
      return null;
    }
  }, []);

  const displayNotification = useCallback(async (title: string, body: string) => {
    try {
      const channelId = await createChannel();
      if (!channelId) return false;

      await notifee.displayNotification({
        title,
        body,
        android: {
          channelId,
          pressAction: {
            id: 'default',
          },
        },
        ios: {
          foregroundPresentationOptions: {
            badge: true,
            sound: true,
            banner: true,
            list: true,
          },
        },
      });
      return true;
    } catch (error) {
      setError('Failed to display notification');
      return false;
    }
  }, [createChannel]);

  const updateNotificationSettings = useCallback(async (newSettings: Partial<AppSettings>) => {
    setIsLoading(true);
    setError(null);

    try {
      const updatedSettings = { ...settings, ...newSettings };
      await AsyncStorage.setItem(STORAGE_KEYS.APP_SETTINGS, JSON.stringify(updatedSettings));
      return true;
    } catch (error) {
      setError('Failed to update notification settings');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [settings]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (settings.notifications) {
        await displayNotification(
          remoteMessage.notification?.title || 'New Message',
          remoteMessage.notification?.body || 'You have a new message'
        );
      }
    });

    return unsubscribe;
  }, [settings.notifications, displayNotification]);

  return {
    isLoading,
    error,
    permissionStatus,
    requestPermission,
    getFCMToken,
    displayNotification,
    updateNotificationSettings,
  };
}; 