// src/features/cart/cartSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Product } from '../../core/products-api';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  location: {
    latitude: number;
    longitude: number;
  } | null;
}

const initialState: CartState = {
  items: [],
  location: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    setLocation(
      state,
      action: PayloadAction<{ latitude: number; longitude: number }>,
    ) {
      state.location = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  setLocation,
} = cartSlice.actions;

export default cartSlice.reducer;
