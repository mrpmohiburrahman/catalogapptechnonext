/* eslint-disable react/no-unstable-nested-components */
import { Slot, SplashScreen } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
    <SafeAreaProvider>
      <Slot />
    </SafeAreaProvider>
  );
}
