/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
// src/screens/HomeScreen.tsx
import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useGetProductsQuery } from '@/core/products-api';
import useNetwork from '@/hooks/use-network';
import { useAppDispatch } from '@/redux/hooks';
import { setLocation } from '@/redux/slices/cart-slice';
import { Button } from '@/ui';

const HomeScreen = () => {
  const isConnected = useNetwork();
  const {
    data: products,
    error,
    isLoading,
  } = useGetProductsQuery(undefined, {
    skip: !isConnected,
  });
  const dispatch = useAppDispatch();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

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

  const sortedProducts = products
    ? [...products]
        .sort((a, b) =>
          sortOrder === 'asc' ? a.price - b.price : b.price - a.price,
        )
        .slice(0, 10)
    : [];
  if (!isConnected) {
    return (
      <View style={{ flex: 1 }}>
        <Text>You are offline. Showing cached products.</Text>
        {/* Optionally display cached products if available */}
      </View>
    );
  }
  if (isLoading)
    return <ActivityIndicator size="large" style={styles.loader} />;

  if (error) return <Text>Error fetching products</Text>;

  return (
    <View style={styles.container}>
      <Button
        label="user location"
        onPress={() => {
          router.push('/map');
        }}
      />
      <Button
        label="go to cart"
        onPress={() => {
          router.push('/cart');
        }}
      />
      <Button
        label="history"
        onPress={() => {
          router.push('/history');
        }}
      />
      <View style={styles.sortContainer}>
        <Text>Sort by Price:</Text>
        <TouchableOpacity
          onPress={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          <Text>{sortOrder === 'asc' ? 'Ascending' : 'Descending'}</Text>
        </TouchableOpacity>
      </View>
      {/*  */}
      <FlatList
        data={sortedProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productItem}
            onPress={() => {
              router.push({
                pathname: '/product-details',
                params: { id: item.id },
              });
            }}
          >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
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
