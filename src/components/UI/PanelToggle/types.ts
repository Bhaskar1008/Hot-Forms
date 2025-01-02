export interface PanelToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  side: 'left' | 'right';
  className?: string;
  label?: string;
}
