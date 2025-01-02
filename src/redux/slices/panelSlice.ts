import { createSlice } from '@reduxjs/toolkit';

interface PanelState {
  isComponentPanelOpen: boolean;
  isPropertiesPanelOpen: boolean;
}

const initialState: PanelState = {
  isComponentPanelOpen: true,
  isPropertiesPanelOpen: true,
};

const panelSlice = createSlice({
  name: 'panel',
  initialState,
  reducers: {
    toggleComponentPanel: (state) => {
      state.isComponentPanelOpen = !state.isComponentPanelOpen;
    },
    togglePropertiesPanel: (state) => {
      state.isPropertiesPanelOpen = !state.isPropertiesPanelOpen;
    },
  },
});

export const { toggleComponentPanel, togglePropertiesPanel } = panelSlice.actions;

export default panelSlice.reducer;