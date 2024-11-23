// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../Slices/Slice';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
