import { combineReducers } from '@reduxjs/toolkit';
import { formReducer, widgetReducer, panelReducer } from './slices';

export const rootReducer = combineReducers({
  form: formReducer,
  widget: widgetReducer,
  panel: panelReducer,
});

export type RootState = ReturnType<typeof rootReducer>;