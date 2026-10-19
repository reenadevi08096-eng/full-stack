import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  filters: {
    category: 'All',
    priceRange: 1000,
  },
  darkMode: false,
  isCartOpen: false,
};

const cartSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload;
    },
    setPriceFilter: (state, action) => {
      state.filters.priceRange = action.payload;
    },
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { addToCart, removeFromCart, toggleCart, setCategoryFilter, setPriceFilter, toggleTheme } = cartSlice.actions;
export default cartSlice.reducer;