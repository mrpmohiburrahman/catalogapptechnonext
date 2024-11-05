/* eslint-disable react/no-unstable-nested-components */
import { SplashScreen, Stack } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate

import { persistor, store } from '@/redux/store';

export default function TabLayout() {
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      hideSplash();
    }, 1000);
  }, [hideSplash]);

  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <SafeAreaProvider>
          <Stack />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
