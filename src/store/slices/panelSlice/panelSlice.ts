import { createSlice } from '@reduxjs/toolkit';
import { PanelState } from './types';
import {
  toggleComponentPanelReducer,
  togglePropertiesPanelReducer,
  setPanelStatesReducer,
} from './reducers';

const initialState: PanelState = {
  isComponentPanelOpen: true,
  isPropertiesPanelOpen: true,
};

const panelSlice = createSlice({
  name: 'panel',
  initialState,
  reducers: {
    toggleComponentPanel: toggleComponentPanelReducer,
    togglePropertiesPanel: togglePropertiesPanelReducer,
    setPanelStates: setPanelStatesReducer,
  },
});

export const { toggleComponentPanel, togglePropertiesPanel, setPanelStates } = panelSlice.actions;

export default panelSlice.reducer;
