// src/utils/mmkvStorage.ts
import { MMKV } from 'react-native-mmkv';

// Initialize MMKV instance
const storage = new MMKV();

// Create a custom storage adapter for redux-persist
const mmkvStorage = {
  setItem: async (key: string, value: string) => {
    try {
      storage.set(key, value);
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getItem: async (key: string) => {
    try {
      const value = storage.getString(key);
      return Promise.resolve(value);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  removeItem: async (key: string) => {
    try {
      storage.delete(key);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  // Optional: Implement other methods if needed
  // mergeItem: async (key: string, value: any) => { ... },
  // clear: async () => { ... },
};

export default mmkvStorage;
