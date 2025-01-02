import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import classNames from 'classnames';
import type { PanelToggleProps } from './types';

export const PanelToggle: React.FC<PanelToggleProps> = ({
  isOpen,
  onToggle,
  side,
  className,
  label = 'panel'
}) => {
  const Icon = side === 'left' ? ChevronRight : ChevronLeft;

  return (
    <div 
      className={classNames(
        'absolute top-1/2 -translate-y-1/2',
        side === 'left' ? 'right-0 translate-x-full' : 'left-0 -translate-x-full',
        'z-50'
      )}
    >
      <button
        onClick={onToggle}
        className={classNames(
          'w-6 h-24 flex items-center justify-center',
          'bg-white border rounded-lg shadow-md',
          'hover:bg-gray-50 transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          className
        )}
        title={`${isOpen ? 'Hide' : 'Show'} ${label}`}
        aria-label={`${isOpen ? 'Hide' : 'Show'} ${label}`}
        aria-expanded={isOpen}
      >
        <Icon className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
};
