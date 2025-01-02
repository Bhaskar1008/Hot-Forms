import { configureStore } from '@reduxjs/toolkit';
import formReducer from './slices/formSlice';
import widgetReducer from './slices/widgetSlice';
import panelReducer from './slices/panelSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
    widget: widgetReducer,
    panel: panelReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;