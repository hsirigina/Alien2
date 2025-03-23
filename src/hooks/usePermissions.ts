import { useCallback, useState, useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants';

export const usePermissions = () => {
  const [permissions, setPermissions] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPermissions();
  }, []);

  const loadPermissions = useCallback(async () => {
    try {
      const storedPermissions = await AsyncStorage.getItem(STORAGE_KEYS.PERMISSIONS);
      if (storedPermissions) {
        setPermissions(JSON.parse(storedPermissions));
      }
    } catch (error) {
      console.error('Failed to load permissions:', error);
    }
  }, []);

  const savePermissions = useCallback(async (newPermissions: Record<string, string>) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PERMISSIONS, JSON.stringify(newPermissions));
      setPermissions(newPermissions);
    } catch (error) {
      console.error('Failed to save permissions:', error);
    }
  }, []);

  const checkPermission = useCallback(async (permission: string) => {
    try {
      const result = await check(permission);
      const newPermissions = { ...permissions, [permission]: result };
      await savePermissions(newPermissions);
      return result === RESULTS.GRANTED;
    } catch (error) {
      setError('Failed to check permission');
      return false;
    }
  }, [permissions, savePermissions]);

  const requestPermission = useCallback(async (permission: string) => {
    try {
      const result = await request(permission);
      const newPermissions = { ...permissions, [permission]: result };
      await savePermissions(newPermissions);
      return result === RESULTS.GRANTED;
    } catch (error) {
      setError('Failed to request permission');
      return false;
    }
  }, [permissions, savePermissions]);

  const requestCameraPermission = useCallback(async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera to scan documents.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        setError('Failed to request camera permission');
        return false;
      }
    } else {
      return requestPermission(PERMISSIONS.IOS.CAMERA);
    }
  }, [requestPermission]);

  const requestStoragePermission = useCallback(async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage to save documents.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        setError('Failed to request storage permission');
        return false;
      }
    } else {
      return requestPermission(PERMISSIONS.IOS.PHOTO_LIBRARY);
    }
  }, [requestPermission]);

  const requestLocationPermission = useCallback(async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs access to your location to find nearby immigration offices.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        setError('Failed to request location permission');
        return false;
      }
    } else {
      return requestPermission(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    }
  }, [requestPermission]);

  return {
    permissions,
    error,
    checkPermission,
    requestPermission,
    requestCameraPermission,
    requestStoragePermission,
    requestLocationPermission,
  };
}; 