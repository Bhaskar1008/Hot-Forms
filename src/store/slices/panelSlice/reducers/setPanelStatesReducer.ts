import { PayloadAction } from '@reduxjs/toolkit';
import { PanelState, PanelPayloads } from '../types';

export const setPanelStatesReducer = (
  state: PanelState,
  action: PayloadAction<PanelPayloads['setPanelStates']>
) => {
  state.isComponentPanelOpen = action.payload.component;
  state.isPropertiesPanelOpen = action.payload.properties;
};