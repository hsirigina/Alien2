import { useCallback, useState, useEffect } from 'react';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants';

export const useBiometrics = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [biometryType, setBiometryType] = useState<BiometryTypes | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rnBiometrics = new ReactNativeBiometrics();

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = useCallback(async () => {
    try {
      const { available, biometryType } = await rnBiometrics.isSensorAvailable();
      setIsAvailable(available);
      setBiometryType(biometryType);

      // Check if biometrics is enabled in app settings
      const settings = await AsyncStorage.getItem(STORAGE_KEYS.APP_SETTINGS);
      if (settings) {
        const { biometricsEnabled } = JSON.parse(settings);
        setIsEnabled(biometricsEnabled);
      }
    } catch (error) {
      setError('Failed to check biometric availability');
    }
  }, []);

  const enableBiometrics = useCallback(async () => {
    try {
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Enable biometric authentication',
        disableDeviceFallback: false,
        cancelButtonText: 'Cancel',
        fallbackPromptMessage: 'Use device passcode',
      });

      if (success) {
        setIsEnabled(true);
        const settings = await AsyncStorage.getItem(STORAGE_KEYS.APP_SETTINGS);
        if (settings) {
          const updatedSettings = {
            ...JSON.parse(settings),
            biometricsEnabled: true,
          };
          await AsyncStorage.setItem(STORAGE_KEYS.APP_SETTINGS, JSON.stringify(updatedSettings));
        }
        return true;
      }
      return false;
    } catch (error) {
      setError('Failed to enable biometrics');
      return false;
    }
  }, []);

  const disableBiometrics = useCallback(async () => {
    try {
      setIsEnabled(false);
      const settings = await AsyncStorage.getItem(STORAGE_KEYS.APP_SETTINGS);
      if (settings) {
        const updatedSettings = {
          ...JSON.parse(settings),
          biometricsEnabled: false,
        };
        await AsyncStorage.setItem(STORAGE_KEYS.APP_SETTINGS, JSON.stringify(updatedSettings));
      }
      return true;
    } catch (error) {
      setError('Failed to disable biometrics');
      return false;
    }
  }, []);

  const authenticate = useCallback(async () => {
    if (!isEnabled) return false;

    try {
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate to continue',
        disableDeviceFallback: false,
        cancelButtonText: 'Cancel',
        fallbackPromptMessage: 'Use device passcode',
      });

      return success;
    } catch (error) {
      setError('Authentication failed');
      return false;
    }
  }, [isEnabled]);

  return {
    isAvailable,
    biometryType,
    isEnabled,
    error,
    enableBiometrics,
    disableBiometrics,
    authenticate,
  };
}; 