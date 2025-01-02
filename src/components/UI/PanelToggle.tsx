import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import classNames from 'classnames';

interface PanelToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  side: 'left' | 'right';
  className?: string;
  label?: string;
}

const PanelToggle: React.FC<PanelToggleProps> = ({
  isOpen,
  onToggle,
  side,
  className,
  label = 'panel'
}) => {
  const Icon = side === 'left' ? ChevronRight : ChevronLeft;

  return (
    <button
      onClick={onToggle}
      className={classNames(
        'absolute top-1/2 -translate-y-1/2 z-50',
        'w-6 h-24 flex items-center justify-center',
        'bg-white border rounded-lg shadow-md',
        'hover:bg-gray-50 transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        side === 'left' ? '-right-3' : '-left-3',
        className
      )}
      title={`${isOpen ? 'Hide' : 'Show'} ${label}`}
      aria-label={`${isOpen ? 'Hide' : 'Show'} ${label}`}
      aria-expanded={isOpen}
    >
      <Icon className="w-4 h-4 text-gray-600" />
    </button>
  );
};

export default PanelToggle;  // Default export
