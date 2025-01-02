import { createSlice } from '@reduxjs/toolkit';
import { WidgetState } from './types';
import { setSelectedWidget, addWidget, updateWidget, removeWidget } from './actions';

const initialState: WidgetState = {
  widgets: [],
  selectedWidget: null,
};

const widgetSlice = createSlice({
  name: 'widget',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setSelectedWidget, (state, action) => {
        state.selectedWidget = action.payload;
      })
      .addCase(addWidget, (state, action) => {
        state.widgets.push(action.payload);
      })
      .addCase(updateWidget, (state, action) => {
        const { id, updates } = action.payload;
        const widget = state.widgets.find(w => w.id === id);
        if (widget) {
          Object.assign(widget, updates);
        }
      })
      .addCase(removeWidget, (state, action) => {
        state.widgets = state.widgets.filter(w => w.id !== action.payload);
      });
  },
});

export default widgetSlice.reducer;