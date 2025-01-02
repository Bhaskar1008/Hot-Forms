import { PanelState } from '../types';

export const toggleComponentPanelReducer = (state: PanelState) => {
  state.isComponentPanelOpen = !state.isComponentPanelOpen;
};