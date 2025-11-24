import { createSlice } from '@reduxjs/toolkit';

// Load token and user from localStorage on initialization
const loadFromLocalStorage = () => {
  try {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return {
      token: token || null,
      user: user ? JSON.parse(user) : null,
    };
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return { token: null, user: null };
  }
};

const initialState = {
  ...loadFromLocalStorage(),
  isAuthenticated: !!loadFromLocalStorage().token,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;
      
      // Persist to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
