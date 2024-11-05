/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
// src/screens/HomeScreen.tsx
import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import useNetwork from '@/hooks/use-network';
import { useAppDispatch } from '@/redux/hooks';
import { setLocation } from '@/redux/slices/cart-slice';
import { Button } from '@/ui';

const HomeScreen = () => {
  const isConnected = useNetwork();
  const dispatch = useAppDispatch();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      console.log('🚀 ~ location:', location);
      dispatch(
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }),
      );
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        label="user location"
        onPress={() => {
          router.push('/map');
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productItem: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  productImage: { width: 50, height: 50, marginRight: 10 },
  productInfo: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: '#888' },
});
