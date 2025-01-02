export interface PanelState {
  isComponentPanelOpen: boolean;
  isPropertiesPanelOpen: boolean;
}

export interface PanelPayloads {
  setPanelStates: {
    component: boolean;
    properties: boolean;
  };
}