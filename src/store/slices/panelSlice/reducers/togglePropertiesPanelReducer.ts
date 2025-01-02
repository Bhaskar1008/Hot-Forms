import { PanelState } from '../types';

export const togglePropertiesPanelReducer = (state: PanelState) => {
  state.isPropertiesPanelOpen = !state.isPropertiesPanelOpen;
};