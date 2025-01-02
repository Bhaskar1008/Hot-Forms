import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormState, FormComponent } from '../../types/form';
import { addComponentReducer } from './reducers/addComponentReducer';
import { updateComponentReducer } from './reducers/updateComponentReducer';
import { removeComponentReducer } from './reducers/removeComponentReducer';
import { reorderComponentsReducer } from './reducers/reorderComponentsReducer';

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
    setSelectedComponent: (state, action: PayloadAction<string | null>) => {
      state.selectedComponent = action.payload;
    },
    toggleOrientation: (state) => {
      state.orientation = state.orientation === 'horizontal' ? 'vertical' : 'horizontal';
    },
    importComponents: (state, action: PayloadAction<FormComponent[]>) => {
      state.components = action.payload;
      state.selectedComponent = null;
    },
  },
});

export const {
  addComponent,
  updateComponent,
  removeComponent,
  reorderComponents,
  setSelectedComponent,
  toggleOrientation,
  importComponents,
} = formSlice.actions;

export default formSlice.reducer;
