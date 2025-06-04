// src/store/slices/movieSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient, { tmdbClient } from '../../services/apiClient';

// export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
//   const res = await apiClient.get("/movies");
//   return res.data;
// });

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const res = await tmdbClient.get('/movie/now_playing');
  return res.data.results;
});

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies:[],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;
