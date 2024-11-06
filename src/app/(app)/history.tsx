// app/History.tsx
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import type { Product } from '@/core/products-api';
import mmkvStorage from '@/redux/storage';

const HistoryScreen = () => {
  const [history, setHistory] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const jsonValue = await mmkvStorage.getItem('@viewed_products'); // Use mmkvStorage
        if (jsonValue != null) {
          setHistory(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.log('Error loading history', e);
      }
    };
    loadHistory();
  }, []);

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() =>
        router.push({ pathname: '/product-details', params: { id: item.id } })
      }
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {history.length === 0 ? (
        <Text>No history available.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
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
