import React from 'react';
import { OrientationToggle } from '../../UI/OrientationToggle';

interface PropertyHeaderProps {
  orientation: 'horizontal' | 'vertical';
  onOrientationChange: () => void;
}

export const PropertyHeader: React.FC<PropertyHeaderProps> = ({
  orientation,
  onOrientationChange
}) => {
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-white border-b">
      <h3 className="text-lg font-semibold text-gray-800">Properties</h3>
      <OrientationToggle
        orientation={orientation}
        onChange={onOrientationChange}
      />
    </div>
  );
};
