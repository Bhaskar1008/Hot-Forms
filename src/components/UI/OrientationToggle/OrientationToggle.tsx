import React from 'react';
import { ArrowLeftRight, ArrowUpDown } from 'lucide-react';
import classNames from 'classnames';
import type { OrientationToggleProps } from './types';

export const OrientationToggle: React.FC<OrientationToggleProps> = ({
  orientation,
  onChange,
  className
}) => {
  return (
    <button
      onClick={onChange}
      className={classNames(
        'p-2 rounded-md hover:bg-gray-100 transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-blue-500',
        className
      )}
      title={`Switch to ${orientation === 'horizontal' ? 'vertical' : 'horizontal'} layout`}
      aria-label={`Switch to ${orientation === 'horizontal' ? 'vertical' : 'horizontal'} layout`}
    >
      {orientation === 'horizontal' ? (
        <ArrowLeftRight className="w-5 h-5 text-gray-600" />
      ) : (
        <ArrowUpDown className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );
};
