import { create } from 'zustand';

interface DocsNavigationState {
  activeSection: string;
  sections: Array<{ id: string; title: string }>;
  setActiveSection: (section: string) => void;
}

export const useDocsNavigation = create<DocsNavigationState>((set) => ({
  activeSection: 'installation',
  sections: [
    { id: 'installation', title: 'Installation' },
    { id: 'usage', title: 'Usage Guide' },
    { id: 'live-demo', title: 'Live Demo' },
    { id: 'api', title: 'API Reference' }
  ],
  setActiveSection: (section) => set({ activeSection: section })
}));
