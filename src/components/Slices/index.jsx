// slices/index.js
import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../Slices/Slice';

const rootReducer = combineReducers({
  counter: counterReducer,
});

export default rootReducer;
