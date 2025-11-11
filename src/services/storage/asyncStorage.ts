/**
 * AsyncStorage Service
 * Wrapper for AsyncStorage with type safety
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = '@ReelPerk:';

export const storage = {
  /**
   * Store data
   */
  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`${PREFIX}${key}`, jsonValue);
    } catch (error) {
      console.error('Error storing data:', error);
      throw error;
    }
  },

  /**
   * Retrieve data
   */
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(`${PREFIX}${key}`);
      return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  },

  /**
   * Remove item
   */
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(`${PREFIX}${key}`);
    } catch (error) {
      console.error('Error removing data:', error);
      throw error;
    }
  },

  /**
   * Clear all data
   */
  async clear(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const reelperkKeys = keys.filter(key => key.startsWith(PREFIX));
      await AsyncStorage.multiRemove(reelperkKeys);
    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  },
};

