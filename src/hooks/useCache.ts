import { useCallback, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry?: number;
}

interface CacheState {
  size: number;
  items: string[];
}

export const useCache = () => {
  const [cacheState, setCacheState] = useState<CacheState>({
    size: 0,
    items: [],
  });

  useEffect(() => {
    loadCacheState();
  }, []);

  const loadCacheState = useCallback(async () => {
    try {
      const state = await AsyncStorage.getItem(STORAGE_KEYS.CACHE_STATE);
      if (state) {
        setCacheState(JSON.parse(state));
      }
    } catch (error) {
      console.error('Failed to load cache state:', error);
    }
  }, []);

  const saveCacheState = useCallback(async (state: CacheState) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.CACHE_STATE, JSON.stringify(state));
      setCacheState(state);
    } catch (error) {
      console.error('Failed to save cache state:', error);
    }
  }, []);

  const setItem = useCallback(async <T>(key: string, data: T, expiry?: number) => {
    try {
      const item: CacheItem<T> = {
        data,
        timestamp: Date.now(),
        expiry,
      };

      await AsyncStorage.setItem(key, JSON.stringify(item));
      
      const newState = {
        ...cacheState,
        items: [...cacheState.items, key],
        size: cacheState.size + 1,
      };
      await saveCacheState(newState);
      
      return true;
    } catch (error) {
      console.error('Failed to cache item:', error);
      return false;
    }
  }, [cacheState, saveCacheState]);

  const getItem = useCallback(async <T>(key: string): Promise<T | null> => {
    try {
      const item = await AsyncStorage.getItem(key);
      if (!item) return null;

      const cacheItem: CacheItem<T> = JSON.parse(item);
      
      // Check if item has expired
      if (cacheItem.expiry && Date.now() - cacheItem.timestamp > cacheItem.expiry) {
        await removeItem(key);
        return null;
      }

      return cacheItem.data;
    } catch (error) {
      console.error('Failed to get cached item:', error);
      return null;
    }
  }, []);

  const removeItem = useCallback(async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      
      const newState = {
        ...cacheState,
        items: cacheState.items.filter(item => item !== key),
        size: cacheState.size - 1,
      };
      await saveCacheState(newState);
      
      return true;
    } catch (error) {
      console.error('Failed to remove cached item:', error);
      return false;
    }
  }, [cacheState, saveCacheState]);

  const clearCache = useCallback(async () => {
    try {
      // Remove all cached items
      await Promise.all(
        cacheState.items.map(key => AsyncStorage.removeItem(key))
      );

      // Reset cache state
      const newState = {
        size: 0,
        items: [],
      };
      await saveCacheState(newState);
      
      return true;
    } catch (error) {
      console.error('Failed to clear cache:', error);
      return false;
    }
  }, [cacheState, saveCacheState]);

  const getCacheSize = useCallback(async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      let totalSize = 0;

      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          totalSize += value.length;
        }
      }

      return totalSize;
    } catch (error) {
      console.error('Failed to get cache size:', error);
      return 0;
    }
  }, []);

  return {
    cacheState,
    setItem,
    getItem,
    removeItem,
    clearCache,
    getCacheSize,
  };
}; 