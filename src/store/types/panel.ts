export interface PanelState {
  isComponentPanelOpen: boolean;
  isPropertiesPanelOpen: boolean;
}

export interface PanelActions {
  toggleComponentPanel: () => void;
  togglePropertiesPanel: () => void;
  setPanelStates: (component: boolean, properties: boolean) => void;
}

export interface PanelStore extends PanelState, PanelActions {}
