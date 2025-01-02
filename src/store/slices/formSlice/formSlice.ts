import { createSlice } from '@reduxjs/toolkit';
import { FormState } from './types';
import { addComponentReducer } from './reducers/addComponentReducer';
import { updateComponentReducer } from './reducers/updateComponentReducer';
import { removeComponentReducer } from './reducers/removeComponentReducer';
import { reorderComponentsReducer } from './reducers/reorderComponentsReducer';
import { setSelectedComponent, toggleOrientation, importComponents } from './actions';

const initialState: FormState = {
  components: [],
  selectedComponent: null,
  draggedComponent: null,
  orientation: 'horizontal',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addComponent: addComponentReducer,
    updateComponent: updateComponentReducer,
    removeComponent: removeComponentReducer,
    reorderComponents: reorderComponentsReducer,
  },
  extraReducers: (builder) => {
    builder
      .addCase(setSelectedComponent, (state, action) => {
        state.selectedComponent = action.payload;
      })
      .addCase(toggleOrientation, (state) => {
        state.orientation = state.orientation === 'horizontal' ? 'vertical' : 'horizontal';
      })
      .addCase(importComponents, (state, action) => {
        state.components = action.payload;
        state.selectedComponent = null;
      });
  },
});

export const { addComponent, updateComponent, removeComponent, reorderComponents } = formSlice.actions;

export default formSlice.reducer;