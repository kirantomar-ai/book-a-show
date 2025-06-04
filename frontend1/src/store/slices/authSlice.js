import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  user: null,             // will store user object
  isLoginModalOpen: false,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openLoginModal(state) {
      state.isLoginModalOpen = true;
    },
    closeLoginModal(state) {
      state.isLoginModalOpen = false;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

// Exports
export const { openLoginModal, closeLoginModal, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
