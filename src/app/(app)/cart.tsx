// app/Cart.tsx
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '@/redux/slices/cart-slice';

const CartScreen = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.info}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text>${item.price}</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      onPress={() => dispatch(decreaseQuantity(item.id))}
                    >
                      <Text style={styles.quantityButton}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => dispatch(increaseQuantity(item.id))}
                    >
                      <Text style={styles.quantityButton}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => dispatch(removeFromCart(item.id))}
                >
                  <Text style={styles.remove}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <Text style={styles.total}>Total: ${total}</Text>
        </>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: { flexDirection: 'row', marginBottom: 10, alignItems: 'center' },
  image: { width: 50, height: 50, marginRight: 10 },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: 'bold' },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: { fontSize: 20, paddingHorizontal: 10 },
  quantity: { fontSize: 16, marginHorizontal: 10 },
  remove: { color: 'red' },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 10,
  },
});
