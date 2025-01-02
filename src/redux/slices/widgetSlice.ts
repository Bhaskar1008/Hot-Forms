import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { WidgetComponent } from '../../types/form';

interface WidgetState {
  widgets: WidgetComponent[];
  selectedWidget: string | null;
}

const initialState: WidgetState = {
  widgets: [],
  selectedWidget: null,
};

export const widgetSlice = createSlice({
  name: 'widget',
  initialState,
  reducers: {
    addWidget: (state, action: PayloadAction<WidgetComponent>) => {
      state.widgets.push(action.payload);
    },
    updateWidget: (state, action: PayloadAction<{ id: string; updates: Partial<WidgetComponent> }>) => {
      const { id, updates } = action.payload;
      const widget = state.widgets.find(w => w.id === id);
      if (widget) {
        Object.assign(widget, updates);
      }
    },
    removeWidget: (state, action: PayloadAction<string>) => {
      state.widgets = state.widgets.filter(w => w.id !== action.payload);
    },
    setSelectedWidget: (state, action: PayloadAction<string | null>) => {
      state.selectedWidget = action.payload;
    },
  },
});

export const {
  addWidget,
  updateWidget,
  removeWidget,
  setSelectedWidget,
} = widgetSlice.actions;

export type { WidgetState };
export default widgetSlice.reducer;
