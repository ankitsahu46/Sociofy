import { configureStore } from '@reduxjs/toolkit';
import navReducer from '../features/nav/navSlice.js';

export default configureStore({
  reducer: {
    nav: navReducer,
  }
});