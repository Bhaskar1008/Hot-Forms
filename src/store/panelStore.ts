import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PanelState {
  isComponentPanelOpen: boolean;
  isPropertiesPanelOpen: boolean;
  toggleComponentPanel: () => void;
  togglePropertiesPanel: () => void;
  setPanelStates: (component: boolean, properties: boolean) => void;
}

export const usePanelStore = create<PanelState>()(
  persist(
    (set) => ({
      isComponentPanelOpen: true,
      isPropertiesPanelOpen: true,
      toggleComponentPanel: () => 
        set((state) => ({ isComponentPanelOpen: !state.isComponentPanelOpen })),
      togglePropertiesPanel: () => 
        set((state) => ({ isPropertiesPanelOpen: !state.isPropertiesPanelOpen })),
      setPanelStates: (component, properties) => 
        set({ isComponentPanelOpen: component, isPropertiesPanelOpen: properties }),
    }),
    {
      name: 'panel-state',
    }
  )
);
