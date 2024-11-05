// app/ProductDetails.tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { type Product, useGetProductByIdQuery } from '@/core/products-api';
import { useAppDispatch } from '@/redux/hooks';
import { addToCart } from '@/redux/slices/cart-slice';
import mmkvStorage from '@/redux/storage';

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const {
    data: product,
    error,
    isLoading,
  } = useGetProductByIdQuery(Number(id));
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (product) {
      const saveHistory = async () => {
        try {
          const jsonValue = await mmkvStorage.getItem('@viewed_products'); // Use mmkvStorage
          let history: Product[] =
            jsonValue != null ? JSON.parse(jsonValue) : [];
          // Avoid duplicates
          history = history.filter((item) => item.id !== product.id);
          history.unshift(product);
          // Keep only last 20
          if (history.length > 20) history.pop();
          await mmkvStorage.setItem(
            '@viewed_products',
            JSON.stringify(history),
          ); // Use mmkvStorage
        } catch (e) {
          console.log('Error saving history', e);
        }
      };
      saveHistory();
    }
  }, [product]);
  if (isLoading)
    return <ActivityIndicator size="large" style={styles.loader} />;
  if (error || !product) return <Text>Error loading product</Text>;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          dispatch(addToCart(product));
          alert('Added to cart');
        }}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: 200, height: 200, marginBottom: 20 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  price: { fontSize: 18, color: '#888', marginBottom: 10 },
  description: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16 },
});
