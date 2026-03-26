// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// localStorage থেকে কার্ট ডাটা লোড করার ফাংশন
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) return { items: [] };
    return { items: JSON.parse(serializedCart) };
  } catch (err) {
    return { items: [] };
  }
};

const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // আপডেটেড addItem: quantity প্যারামিটার গ্রহণ করে এবং তা যোগ করে
    addItem: (state, action) => {
      const { id, quantity = 1 } = action.payload; // ডিফল্ট 1
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...action.payload, quantity });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;