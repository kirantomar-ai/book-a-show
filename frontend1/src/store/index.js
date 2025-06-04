// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './slices/movieSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    movies: movieReducer,
    auth:authReducer
  },
});

export default store;
