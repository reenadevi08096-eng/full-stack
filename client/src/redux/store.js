import { configureStore } from '@reduxjs/toolkit';
import shopReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    shop: shopReducer,
  },
});